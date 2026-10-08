from rest_framework import serializers
from django.db import IntegrityError
from .models import LessonProgress, ProgressStatus
from apps.courses.models import Lesson, CourseStatus
from apps.enrollments.models import Enrollment, EnrollmentStatus

class LessonProgressSerializer(serializers.ModelSerializer):
    lesson_id = serializers.IntegerField()
    # Read-only nested fields
    lesson_title = serializers.CharField(source='lesson.title', read_only=True)
    lesson_slug = serializers.CharField(source='lesson.slug', read_only=True)
    course_slug = serializers.CharField(source='enrollment.course.slug', read_only=True)

    class Meta:
        model = LessonProgress
        fields = [
            'id', 
            'lesson_id', 
            'lesson_title', 
            'lesson_slug', 
            'course_slug', 
            'status', 
            'completed_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'status', 'completed_at', 'updated_at']

    def create(self, validated_data):
        student = self.context['request'].user
        lesson_id = validated_data['lesson_id']

        try:
            lesson = Lesson.objects.select_related('module__course').get(id=lesson_id)
        except Lesson.DoesNotExist:
            raise serializers.ValidationError({"lesson_id": "Invalid lesson ID."})

        # Check lesson and course publication status
        if lesson.status != CourseStatus.PUBLISHED or lesson.module.course.status != CourseStatus.PUBLISHED:
            raise serializers.ValidationError({"lesson_id": "This lesson is not available."})

        # Check active enrollment
        try:
            enrollment = Enrollment.objects.get(
                student=student,
                course=lesson.module.course,
                status=EnrollmentStatus.ACTIVE
            )
        except Enrollment.DoesNotExist:
            raise serializers.ValidationError({"detail": "You must have an active enrollment in this course to track progress."})

        # Create or get progress (Idempotent)
        progress, created = LessonProgress.objects.get_or_create(
            student=student,
            lesson=lesson,
            defaults={
                'enrollment': enrollment,
                'status': ProgressStatus.IN_PROGRESS
            }
        )
        return progress
