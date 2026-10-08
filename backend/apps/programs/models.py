from django.db import models
from django.utils import timezone
from apps.core.models import TimeStampedModel

class ProgramType(models.TextChoices):
    LIVE_CONVERSATION = 'live_conversation', 'Live Conversation'
    WEBINAR = 'webinar', 'Webinar'
    WORKSHOP = 'workshop', 'Workshop'
    DISCUSSION = 'discussion', 'Discussion'
    OTHER = 'other', 'Other'

class ProgramStatus(models.TextChoices):
    DRAFT = 'draft', 'Draft'
    PUBLISHED = 'published', 'Published'
    ARCHIVED = 'archived', 'Archived'

class Program(TimeStampedModel):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    description = models.TextField(blank=True)
    
    status = models.CharField(max_length=20, choices=ProgramStatus.choices, default=ProgramStatus.DRAFT, db_index=True)
    program_type = models.CharField(max_length=50, choices=ProgramType.choices, default=ProgramType.LIVE_CONVERSATION, db_index=True)
    
    scheduled_start = models.DateTimeField(null=True, blank=True)
    scheduled_end = models.DateTimeField(null=True, blank=True)
    timezone = models.CharField(max_length=100, default='Africa/Accra')
    
    zoom_enabled = models.BooleanField(default=False)
    zoom_meeting_id = models.CharField(max_length=255, blank=True)
    zoom_passcode = models.CharField(max_length=255, blank=True)
    
    published_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-scheduled_start', '-created_at']

    def __str__(self):
        return self.title

    @property
    def event_state(self):
        if not self.scheduled_start or not self.scheduled_end:
            return 'unconfigured'
            
        now = timezone.now()
        if now < self.scheduled_start:
            return 'upcoming'
        elif self.scheduled_start <= now < self.scheduled_end:
            return 'live'
        else:
            return 'completed'

    def publish(self):
        self.status = ProgramStatus.PUBLISHED
        if not self.published_at:
            self.published_at = timezone.now()
        self.save()

    def archive(self):
        self.status = ProgramStatus.ARCHIVED
        self.save()
