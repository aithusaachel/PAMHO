from rest_framework import serializers
from .models import Course, Module, Lesson, CourseStatus

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'module', 'title', 'slug', 'description', 'lesson_type', 'content', 'video_url', 'duration', 'ordering', 'status']

class ModuleSerializer(serializers.ModelSerializer):
    lessons = serializers.SerializerMethodField()

    class Meta:
        model = Module
        fields = ['id', 'course', 'title', 'description', 'ordering', 'lessons']

    def get_lessons(self, obj):
        # Only return published lessons for public API, or all if user is staff/manager.
        # We can check the request context if needed, but for safe defaults, return published.
        request = self.context.get('request')
        is_manager = request and request.user.is_authenticated and request.user.role in ['content_manager', 'administrator', 'superadmin']
        
        if is_manager:
            lessons = obj.lessons.all()
        else:
            lessons = obj.lessons.filter(status=CourseStatus.PUBLISHED)
            
        return LessonSerializer(lessons, many=True).data

class CourseListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'title', 'slug', 'short_description', 'status', 'thumbnail', 'estimated_duration', 'difficulty', 'published_at']

class CourseDetailSerializer(serializers.ModelSerializer):
    modules = ModuleSerializer(many=True, read_only=True)
    is_enrolled = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['id', 'title', 'slug', 'short_description', 'description', 'status', 'thumbnail', 'estimated_duration', 'difficulty', 'published_at', 'modules', 'is_enrolled']

    def get_is_enrolled(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            # We can't easily import Enrollment here without circular imports, 
            # so we'll query through the reverse relation or use the string reference.
            from apps.enrollments.models import Enrollment, EnrollmentStatus
            return Enrollment.objects.filter(
                student=request.user,
                course=obj,
                status=EnrollmentStatus.ACTIVE
            ).exists()
        return False

