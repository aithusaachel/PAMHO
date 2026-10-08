from django.contrib import admin
from .models import Course, Module, Lesson

class LessonInline(admin.TabularInline):
    model = Lesson
    extra = 0
    prepopulated_fields = {'slug': ('title',)}

class ModuleInline(admin.TabularInline):
    model = Module
    extra = 0

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'difficulty', 'estimated_duration', 'published_at', 'created_at')
    list_filter = ('status', 'difficulty', 'created_at')
    search_fields = ('title', 'slug', 'short_description')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ModuleInline]
    date_hierarchy = 'created_at'

@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'ordering', 'created_at')
    list_filter = ('course',)
    search_fields = ('title', 'course__title')
    inlines = [LessonInline]
    ordering = ('course', 'ordering')

@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ('title', 'module', 'lesson_type', 'status', 'ordering', 'duration')
    list_filter = ('status', 'lesson_type', 'module__course')
    search_fields = ('title', 'slug', 'module__title', 'module__course__title')
    prepopulated_fields = {'slug': ('title',)}
    ordering = ('module', 'ordering')
