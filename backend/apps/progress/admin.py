from django.contrib import admin
from .models import LessonProgress

@admin.register(LessonProgress)
class LessonProgressAdmin(admin.ModelAdmin):
    list_display = ('student', 'lesson', 'enrollment', 'status', 'completed_at', 'updated_at')
    list_filter = ('status', 'completed_at', 'lesson__module__course')
    search_fields = ('student__username', 'student__email', 'lesson__title')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-updated_at',)
    date_hierarchy = 'updated_at'
