from django.db import models
from django.utils import timezone
from apps.core.models import TimeStampedModel

class CourseStatus(models.TextChoices):
    DRAFT = 'draft', 'Draft'
    PUBLISHED = 'published', 'Published'
    ARCHIVED = 'archived', 'Archived'

class Difficulty(models.TextChoices):
    BEGINNER = 'beginner', 'Beginner'
    INTERMEDIATE = 'intermediate', 'Intermediate'
    ADVANCED = 'advanced', 'Advanced'

class Course(TimeStampedModel):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    short_description = models.TextField(blank=True)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=CourseStatus.choices, default=CourseStatus.DRAFT)
    thumbnail = models.URLField(blank=True, help_text="URL to the course thumbnail image")
    estimated_duration = models.CharField(max_length=100, blank=True, help_text="e.g., '4 weeks', '12 hours'")
    difficulty = models.CharField(max_length=20, choices=Difficulty.choices, blank=True)
    published_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    def publish(self):
        self.status = CourseStatus.PUBLISHED
        self.published_at = timezone.now()
        self.save()


class Module(TimeStampedModel):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='modules')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    ordering = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['ordering']
        constraints = [
            models.UniqueConstraint(fields=['course', 'ordering'], name='unique_module_ordering')
        ]

    def __str__(self):
        return f"{self.course.title} - {self.title}"


class LessonType(models.TextChoices):
    TEXT = 'text', 'Text'
    VIDEO = 'video', 'Video'
    RESOURCE = 'resource', 'Resource'

class Lesson(TimeStampedModel):
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, db_index=True)
    description = models.TextField(blank=True)
    lesson_type = models.CharField(max_length=20, choices=LessonType.choices, default=LessonType.TEXT)
    content = models.TextField(blank=True)
    video_url = models.URLField(blank=True)
    duration = models.PositiveIntegerField(help_text="Estimated duration in minutes", null=True, blank=True)
    ordering = models.PositiveIntegerField(default=0)
    status = models.CharField(max_length=20, choices=CourseStatus.choices, default=CourseStatus.DRAFT)

    class Meta:
        ordering = ['ordering']
        constraints = [
            models.UniqueConstraint(fields=['module', 'ordering'], name='unique_lesson_ordering'),
            models.UniqueConstraint(fields=['module', 'slug'], name='unique_lesson_slug_per_module')
        ]

    def __str__(self):
        return f"{self.module.title} - {self.title}"
