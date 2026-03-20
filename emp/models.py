from django.db import models
from django.contrib.auth.models import User

class EmployeeProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    email = models.EmailField(unique=True, null=True)
    phone = models.CharField(max_length=15, blank=True)
    address = models.TextField(blank=True)
    department = models.CharField(max_length=100, blank=True)
    designation = models.CharField(max_length=100, blank=True)
    role = models.CharField(max_length=20, default='employee')
    date_joined = models.DateField(auto_now_add=True)

class LeaveRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.TextField()
    status = models.CharField(max_length=10, default='Pending')
    applied_on = models.DateTimeField(auto_now_add=True)
class LeaveBalance(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    paid_leave = models.IntegerField(default=15)
    sick_leave = models.IntegerField(default=10)

class Holiday(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateField()

class Announcement(models.Model):
    title = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
