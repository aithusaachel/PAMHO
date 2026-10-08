from rest_framework import serializers
from django.db import IntegrityError
from .models import Enrollment, EnrollmentStatus
from apps.courses.models import Course, CourseStatus, Lesson

class EnrollmentSerializer(serializers.ModelSerializer):
    course_slug = serializers.SlugRelatedField(
        slug_field='slug',
        queryset=Course.objects.filter(status=CourseStatus.PUBLISHED),
        source='course',
        write_only=True
    )
    # Read-only nested fields for response
    course_title = serializers.CharField(source='course.title', read_only=True)
    course_identifier = serializers.CharField(source='course.slug', read_only=True)
    student_id = serializers.IntegerField(source='student.id', read_only=True)
    student_username = serializers.CharField(source='student.username', read_only=True)
    progress_summary = serializers.SerializerMethodField()

    class Meta:
        model = Enrollment
        fields = [
            'id', 
            'course_slug', 
            'course_identifier', 
            'course_title',
            'student_id',
            'student_username',
            'status', 
            'enrolled_at', 
            'completed_at',
            'progress_summary'
        ]
        read_only_fields = ['id', 'status', 'enrolled_at', 'completed_at', 'progress_summary']

    def get_progress_summary(self, obj):
        total_lessons = Lesson.objects.filter(module__course=obj.course, status=CourseStatus.PUBLISHED).count()
        completed_lessons = obj.progress_records.filter(status='completed').count()
        return {
            'total_lessons': total_lessons,
            'completed_lessons': completed_lessons,
            'percent_complete': int((completed_lessons / total_lessons * 100)) if total_lessons > 0 else 0
        }


    def create(self, validated_data):
        request = self.context.get('request')
        student = request.user
        course = validated_data['course']
        
        # Check uniqueness at the serializer level to return a clean error 
        # before hitting the database constraint (though DB constraint is the final safeguard)
        if Enrollment.objects.filter(student=student, course=course).exists():
            raise serializers.ValidationError({"detail": "You are already enrolled in this course."})

        return Enrollment.objects.create(student=student, course=course)
