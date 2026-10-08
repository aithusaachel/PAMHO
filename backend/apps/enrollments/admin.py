from django.contrib import admin
from .models import Enrollment

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('student', 'course', 'status', 'enrolled_at', 'completed_at')
    list_filter = ('status', 'enrolled_at', 'course')
    search_fields = ('student__username', 'student__email', 'course__title', 'course__slug')
    readonly_fields = ('enrolled_at', 'created_at', 'updated_at')
    ordering = ('-enrolled_at',)
    date_hierarchy = 'enrolled_at'
