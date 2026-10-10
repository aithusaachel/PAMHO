from django.contrib import admin
from .models import Enquiry, EventRegistration, AmbassadorApplication, PartnerApplication

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
