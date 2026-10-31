from django.contrib import admin
from .models import (
    Enquiry, 
    EventRegistration, 
    AmbassadorApplication, 
    PartnerApplication, 
    WaitlistSubmission,
    VolunteerApplication
)

@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'enquiry_type', 'status', 'created_at')
    list_filter = ('status', 'enquiry_type', 'created_at')
    search_fields = ('name', 'email', 'organization', 'message')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)

@admin.register(EventRegistration)
class EventRegistrationAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'country', 'created_at')
    list_filter = ('country',)
    search_fields = ('full_name', 'email')

@admin.register(AmbassadorApplication)
class AmbassadorApplicationAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'country', 'city', 'created_at')
    list_filter = ('country',)
    search_fields = ('full_name', 'email')

@admin.register(PartnerApplication)
class PartnerApplicationAdmin(admin.ModelAdmin):
    list_display = ('org_name', 'org_type', 'contact_name', 'contact_email', 'created_at')
    list_filter = ('org_type',)
    search_fields = ('org_name', 'contact_name', 'contact_email')

@admin.register(WaitlistSubmission)
class WaitlistSubmissionAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'country', 'role', 'agreed_to_contact', 'interested_future', 'created_at')
    list_filter = ('role', 'country', 'heard_about', 'interested_future', 'agreed_to_contact')
    search_fields = ('full_name', 'email', 'country', 'organisation')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)

@admin.register(VolunteerApplication)
class VolunteerApplicationAdmin(admin.ModelAdmin):
    list_display = ('reference_id', 'full_name', 'application_type', 'selected_team', 'country', 'status', 'created_at')
    list_filter = ('application_type', 'selected_team', 'status', 'country', 'created_at')
    search_fields = ('full_name', 'email', 'whatsapp', 'reference_id', 'country', 'current_occupation')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)
    fieldsets = (
        ('Overview', {
            'fields': ('reference_id', 'application_type', 'status', 'created_at', 'updated_at')
        }),
        ('Part 1: Applicant Details', {
            'fields': (
                'full_name', 'email', 'whatsapp', 'country', 'time_zone',
                'highest_qualification', 'current_occupation',
                'cv_file_name', 'cv_data', 'work_links', 'languages', 'reliable_internet_device'
            )
        }),
        ('Part 2: Team Selection', {
            'fields': ('selected_team', 'hours_per_week')
        }),
        ('Part 3: Application Responses', {
            'fields': (
                'why_pamho', 'team_project_led', 'first_30_days_plan', 'pamho_most_needs',
                'skills', 'work_samples', 'weekly_deliverables'
            )
        }),
        ('Part 4: Referees', {
            'fields': (
                'referee_1_name', 'referee_1_relationship', 'referee_1_organization', 'referee_1_email', 'referee_1_phone',
                'referee_2_name', 'referee_2_relationship', 'referee_2_organization', 'referee_2_email', 'referee_2_phone'
            )
        }),
        ('Part 5: Confirmations', {
            'fields': (
                'agreed_unpaid_probation', 'agreed_weekly_hours', 'agreed_referees_contacted', 'agreed_data_storage'
            )
        }),
    )

