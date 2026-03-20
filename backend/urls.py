from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
# Import YOUR custom view instead of the default one
from emp.views import MyTokenObtainPairView 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('emp.urls')),
    
    # Use YOUR custom view here
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
