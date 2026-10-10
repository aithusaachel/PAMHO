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

class EventRegistration(TimeStampedModel):
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    whatsapp = models.CharField(max_length=50, blank=True)
    occupation = models.CharField(max_length=255, blank=True)
    country = models.CharField(max_length=100, blank=True)
    theme = models.CharField(max_length=255, blank=True)
    referral = models.CharField(max_length=255, blank=True)
    message = models.TextField(blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Registration: {self.full_name}"

class AmbassadorApplication(TimeStampedModel):
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    whatsapp = models.CharField(max_length=50, blank=True)
    city = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)
    occupation = models.CharField(max_length=255, blank=True)
    twitter = models.CharField(max_length=255, blank=True)
    linkedin = models.CharField(max_length=255, blank=True)
    instagram = models.CharField(max_length=255, blank=True)
    prior_experience = models.CharField(max_length=50, blank=True)
    reach = models.CharField(max_length=50, blank=True)
    meaning = models.TextField(blank=True)
    why = models.TextField(blank=True)
    promote = models.TextField(blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Ambassador: {self.full_name}"

class PartnerApplication(TimeStampedModel):
    org_name = models.CharField(max_length=255)
    org_type = models.CharField(max_length=100, blank=True)
    regions = models.CharField(max_length=255, blank=True)
    country_reg = models.CharField(max_length=100, blank=True)
    website = models.CharField(max_length=255, blank=True)
    twitter = models.CharField(max_length=255, blank=True)
    linkedin = models.CharField(max_length=255, blank=True)
    instagram = models.CharField(max_length=255, blank=True)
    contact_name = models.CharField(max_length=255, blank=True)
    contact_role = models.CharField(max_length=255, blank=True)
    contact_email = models.EmailField(blank=True)
    contact_whatsapp = models.CharField(max_length=50, blank=True)
    description = models.TextField(blank=True)
    speaking = models.CharField(max_length=50, blank=True)
    contribution = models.TextField(blank=True)
    additional = models.TextField(blank=True)
    heard_about = models.CharField(max_length=255, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Partner: {self.org_name}"
