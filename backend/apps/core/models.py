from django.db import models
from django.utils import timezone

class TimeStampedModel(models.Model):
    """
    An abstract base class model that provides self-updating
    'created_at' and 'updated_at' fields.
    """
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class EnquiryStatus(models.TextChoices):
    NEW = 'new', 'New'
    IN_PROGRESS = 'in_progress', 'In Progress'
    RESOLVED = 'resolved', 'Resolved'
    ARCHIVED = 'archived', 'Archived'

class Enquiry(TimeStampedModel):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    enquiry_type = models.CharField(max_length=100)
    organization = models.CharField(max_length=255, blank=True)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=EnquiryStatus.choices, default=EnquiryStatus.NEW)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.enquiry_type} from {self.name}"
