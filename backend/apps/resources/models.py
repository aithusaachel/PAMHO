from django.db import models
from django.utils import timezone
from apps.core.models import TimeStampedModel

class ResourceType(models.TextChoices):
    ARTICLE = 'article', 'Article & Perspectives'
    REPORT = 'report', 'Reports & Publications'
    PUBLIC_RESOURCE = 'public_resource', 'Public Resources'
    INSTITUTIONAL_NEWS = 'institutional_news', 'Institutional News'

class ResourceStatus(models.TextChoices):
    DRAFT = 'draft', 'Draft'
    PUBLISHED = 'published', 'Published'
    ARCHIVED = 'archived', 'Archived'

class Resource(TimeStampedModel):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    excerpt = models.TextField(blank=True)
    content = models.TextField(blank=True)
    resource_type = models.CharField(max_length=50, choices=ResourceType.choices, default=ResourceType.ARTICLE, db_index=True)
    status = models.CharField(max_length=20, choices=ResourceStatus.choices, default=ResourceStatus.DRAFT, db_index=True)
    featured = models.BooleanField(default=False, db_index=True)
    cover_image = models.URLField(blank=True, help_text="URL to the resource cover image")
    external_url = models.URLField(blank=True, help_text="Link to external document or resource")
    author_name = models.CharField(max_length=255, blank=True, help_text="Display name for the author")
    published_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-published_at', '-created_at']

    def __str__(self):
        return self.title

    def publish(self):
        self.status = ResourceStatus.PUBLISHED
        if not self.published_at:
            self.published_at = timezone.now()
        self.save()

    def archive(self):
        self.status = ResourceStatus.ARCHIVED
        self.save()
