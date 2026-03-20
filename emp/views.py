from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

# Import your models and serializers
from .models import EmployeeProfile, LeaveRequest, Holiday, Announcement, LeaveBalance
from .serializers import (
    EmployeeProfileSerializer, LeaveRequestSerializer, MyTokenObtainPairSerializer,
    HolidaySerializer, AnnouncementSerializer, LeaveBalanceSerializer
)

# 1. LOGIN VIEW (Sends Token to React)
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# 2. PROFILE VIEW (Matches the "Personal Details" Form in your image)
class EmployeeProfileViewSet(viewsets.ModelViewSet):
    serializer_class = EmployeeProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # ADMIN: Sees ALL profiles (for the Admin Panel)
        if user.is_staff or (hasattr(user, 'employeeprofile') and user.employeeprofile.role == 'admin'):
            return EmployeeProfile.objects.all()
        # EMPLOYEE: Sees ONLY their own profile
        return EmployeeProfile.objects.filter(user=user)

    @action(detail=False, methods=['get', 'put'])
    def me(self, request):
        """Used by the 'My Profile' tab in your Sidebar"""
        profile, _ = EmployeeProfile.objects.get_or_create(user=request.user)
        if request.method == 'GET':
            return Response(self.get_serializer(profile).data)
        
        serializer = self.get_serializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 3. LEAVE REQUEST VIEW (Matches "My Leaves" and "All Requests")
class LeaveRequestViewSet(viewsets.ModelViewSet):
    serializer_class = LeaveRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or (hasattr(user, 'employeeprofile') and user.employeeprofile.role == 'admin'):
            return LeaveRequest.objects.all()
        return LeaveRequest.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        leave = self.get_object()
        leave.status = 'Approved'
        leave.save()
        return Response({'message': 'Leave Approved Successfully'})

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        leave = self.get_object()
        leave.status = 'Rejected'
        leave.save()
        return Response({'message': 'Leave Rejected'})

# 4. HOLIDAY & NEWS (Matches the Yellow Banner and Sidebar News)
class HolidayViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Holiday.objects.all().order_by('date')
    serializer_class = HolidaySerializer
    permission_classes = [IsAuthenticated]

class AnnouncementViewSet(viewsets.ModelViewSet):
    queryset = Announcement.objects.all().order_by('-created_at')
    serializer_class = AnnouncementSerializer
    permission_classes = [IsAuthenticated]

# 5. LEAVE BALANCE (Specific to the logged-in user)
class LeaveBalanceViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = LeaveBalanceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return LeaveBalance.objects.filter(user=self.request.user)
