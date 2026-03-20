from django.contrib import admin
from .models import EmployeeProfile, LeaveRequest, LeaveBalance, Holiday, Announcement

# 1. Profile Management
@admin.register(EmployeeProfile)
class EmployeeProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'first_name', 'last_name', 'department', 'role', 'date_joined')
    search_fields = ('user__username', 'first_name', 'last_name')
    list_filter = ('department', 'role')

# 2. Leave Approvals
@admin.register(LeaveRequest)
class LeaveRequestAdmin(admin.ModelAdmin):
    list_display = ('user', 'start_date', 'end_date', 'status', 'applied_on')
    list_filter = ('status',)
    actions = ['approve_leave', 'reject_leave']

    def approve_leave(self, request, queryset):
        queryset.update(status='Approved')
    
    def reject_leave(self, request, queryset):
        queryset.update(status='Rejected')

# 3. Quota & Balances
@admin.register(LeaveBalance)
class LeaveBalanceAdmin(admin.ModelAdmin):
    list_display = ('user', 'paid_leave', 'sick_leave')

# 4. HR News & Holidays
admin.site.register(Holiday)
admin.site.register(Announcement)
