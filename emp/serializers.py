from rest_framework import serializers
from .models import EmployeeProfile, LeaveRequest, LeaveBalance, Holiday, Announcement
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# --- 1. LOGIN SERIALIZER (This fixes your error) ---
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Safe role check
        profile = getattr(user, 'employeeprofile', None)
        if user.is_staff or user.is_superuser:
            token['role'] = 'admin'
        else:
            token['role'] = profile.role if profile else 'employee'
        return token

# --- 2. PROFILE & LEAVE SERIALIZERS ---
class EmployeeProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = EmployeeProfile
        fields = '__all__'

class LeaveRequestSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = LeaveRequest
        fields = '__all__'
        read_only_fields = ['user', 'status']

# --- 3. KASTURI HR SERIALIZERS ---
class LeaveBalanceSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = LeaveBalance
        fields = '__all__'

class HolidaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Holiday
        fields = '__all__'

class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = '__all__'
