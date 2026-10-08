from django.db import models
from django.conf import settings
from apps.core.models import TimeStampedModel
from apps.courses.models import Lesson
from apps.enrollments.models import Enrollment

class ProgressStatus(models.TextChoices):
    IN_PROGRESS = 'in_progress', 'In Progress'
    COMPLETED = 'completed', 'Completed'

class LessonProgress(TimeStampedModel):
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='progress_records'
    )
    lesson = models.ForeignKey(
        Lesson,
        on_delete=models.CASCADE,
        related_name='progress_records'
    )
    enrollment = models.ForeignKey(
        Enrollment,
        on_delete=models.CASCADE,
        related_name='progress_records'
    )
    status = models.CharField(
        max_length=20,
        choices=ProgressStatus.choices,
        default=ProgressStatus.IN_PROGRESS
    )
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-updated_at']
        constraints = [
            models.UniqueConstraint(fields=['student', 'lesson'], name='unique_student_lesson_progress')
        ]

    def __str__(self):
        return f"{self.student.username} - {self.lesson.title} - {self.status}"
