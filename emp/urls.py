from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    EmployeeProfileViewSet, 
    LeaveRequestViewSet,
    HolidayViewSet, 
    AnnouncementViewSet, 
    LeaveBalanceViewSet,
    MyTokenObtainPairView
)

# 1. Initialize the Router
router = DefaultRouter()

# 2. Register ALL your routes (Fixed with basenames)
router.register(r'profiles', EmployeeProfileViewSet, basename='profile')
router.register(r'leave', LeaveRequestViewSet, basename='leave') 
router.register(r'holidays', HolidayViewSet, basename='holiday')
router.register(r'announcements', AnnouncementViewSet, basename='announcement')
router.register(r'balances', LeaveBalanceViewSet, basename='balance')

# 3. Define URL Patterns
urlpatterns = [
    # Login Token
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # This now includes ALL the registered routes above
    path('', include(router.urls)),
]
