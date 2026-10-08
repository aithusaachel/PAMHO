from django.contrib import admin
from .models import Resource

@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'resource_type', 'featured', 'published_at')
    list_filter = ('status', 'resource_type', 'featured', 'published_at')
    search_fields = ('title', 'slug', 'excerpt', 'content')
    prepopulated_fields = {'slug': ('title',)}
    ordering = ('-published_at', '-created_at')
    date_hierarchy = 'published_at'
    
    fieldsets = (
        ('Content', {
            'fields': ('title', 'slug', 'excerpt', 'content')
        }),
        ('Classification & Display', {
            'fields': ('resource_type', 'status', 'featured')
        }),
        ('Media & External', {
            'fields': ('cover_image', 'external_url')
        }),
        ('Meta', {
            'fields': ('author_name', 'published_at')
        }),
    )
