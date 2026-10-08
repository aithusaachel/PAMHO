from django.contrib import admin
from .models import Program

@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'program_type', 'scheduled_start', 'scheduled_end', 'zoom_enabled', 'published_at')
    list_filter = ('status', 'program_type', 'zoom_enabled')
    search_fields = ('title', 'slug', 'description')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-scheduled_start',)
