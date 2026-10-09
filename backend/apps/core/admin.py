from django.contrib import admin
from .models import Enquiry

@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'enquiry_type', 'status', 'created_at')
    list_filter = ('status', 'enquiry_type', 'created_at')
    search_fields = ('name', 'email', 'organization', 'message')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)
