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


class WaitlistSubmission(TimeStampedModel):
    """Stores waitlist sign-ups for the Certified Mental Health Advocate programme."""
    ROLE_CHOICES = [
        ('student', 'Student / Postgraduate'),
        ('community_leader', 'Community Organizer / Activist'),
        ('healthcare', 'Healthcare / Public Health Worker'),
        ('educator', 'Educator / Academic / Counsellor'),
        ('faith_leader', 'Faith / Pastoral Leader'),
        ('corporate_hr', 'Workplace Wellbeing / HR Professional'),
        ('professional', 'Professional'),
        ('community_faith_leader', 'Community or Faith Leader'),
        ('other', 'Other Community Champion'),
    ]
    HEARD_ABOUT_CHOICES = [
        ('pamhc', 'Pan-African Mental Health Conversation'),
        ('social_media', 'Social media'),
        ('colleague', 'Colleague or Peer Referral'),
        ('friend_colleague', 'Friend or Colleague'),
        ('ambassador', 'Ambassador or Community Mobilizer'),
        ('other', 'Other'),
    ]

    # Required fields
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    country = models.CharField(max_length=100)
    role = models.CharField(max_length=100, choices=ROLE_CHOICES)
    agreed_to_contact = models.BooleanField(default=False)

    # Optional fields
    whatsapp = models.CharField(max_length=50, blank=True)
    organisation = models.CharField(max_length=255, blank=True)
    motivation = models.TextField(blank=True)
    heard_about = models.CharField(max_length=100, choices=HEARD_ABOUT_CHOICES, blank=True)
    interested_future = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Waitlist: {self.full_name} ({self.email})"


class VolunteerApplication(TimeStampedModel):
    """Stores volunteer applications for both Lead a Team and Join a Team tracks."""
    APPLICATION_TYPE_CHOICES = [
        ('lead', 'Lead a Team'),
        ('join', 'Join a Team'),
    ]
    STATUS_CHOICES = [
        ('new', 'New'),
        ('reviewed', 'Reviewed'),
        ('shortlisted', 'Shortlisted'),
        ('interviewed', 'Interviewed'),
        ('accepted', 'Accepted'),
        ('declined', 'Declined'),
    ]

    reference_id = models.CharField(max_length=50, blank=True)
    application_type = models.CharField(max_length=20, choices=APPLICATION_TYPE_CHOICES, default='join')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')

    # Part 1: About you
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    whatsapp = models.CharField(max_length=50)
    country = models.CharField(max_length=100)
    time_zone = models.CharField(max_length=100)
    highest_qualification = models.CharField(max_length=255)
    current_occupation = models.CharField(max_length=255)
    cv_file_name = models.CharField(max_length=255, blank=True)
    cv_data = models.TextField(blank=True, help_text="Base64 or URL data of uploaded CV")
    work_links = models.TextField(blank=True, help_text="LinkedIn / Instagram / Twitter or portfolio links")
    languages = models.CharField(max_length=255, blank=True)
    reliable_internet_device = models.CharField(max_length=20, blank=True)

    # Part 2: Your team
    selected_team = models.CharField(max_length=100)
    hours_per_week = models.CharField(max_length=50)

    # Part 3: Application questions
    why_pamho = models.TextField(blank=True, help_text="Why lead/join this team & PAMHO (up to 150 words)")
    team_project_led = models.TextField(blank=True, help_text="Team or project led and achievements (Lead)")
    first_30_days_plan = models.TextField(blank=True, help_text="First 30 days action plan (Lead)")
    pamho_most_needs = models.TextField(blank=True, help_text="What PAMHO most needs in this area (Lead)")
    
    skills = models.TextField(blank=True, help_text="Main skills up to five (Join)")
    work_samples = models.TextField(blank=True, help_text="Three links or uploads of best relevant work (Join)")
    weekly_deliverables = models.TextField(blank=True, help_text="Realistic weekly deliverables (Join)")

    # Part 4: Referees
    referee_1_name = models.CharField(max_length=255, blank=True)
    referee_1_relationship = models.CharField(max_length=255, blank=True)
    referee_1_organization = models.CharField(max_length=255, blank=True)
    referee_1_email = models.CharField(max_length=255, blank=True)
    referee_1_phone = models.CharField(max_length=50, blank=True)

    referee_2_name = models.CharField(max_length=255, blank=True)
    referee_2_relationship = models.CharField(max_length=255, blank=True)
    referee_2_organization = models.CharField(max_length=255, blank=True)
    referee_2_email = models.CharField(max_length=255, blank=True)
    referee_2_phone = models.CharField(max_length=50, blank=True)

    # Part 5: Confirmation
    agreed_unpaid_probation = models.BooleanField(default=False)
    agreed_weekly_hours = models.BooleanField(default=False)
    agreed_referees_contacted = models.BooleanField(default=False)
    agreed_data_storage = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Volunteer ({self.get_application_type_display()} - {self.selected_team}): {self.full_name}"

