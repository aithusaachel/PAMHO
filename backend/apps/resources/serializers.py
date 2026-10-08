from rest_framework import serializers
from .models import Resource

class ResourceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = [
            'title',
            'slug',
            'excerpt',
            'resource_type',
            'featured',
            'cover_image',
            'published_at'
        ]

class ResourceDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = [
            'title',
            'slug',
            'excerpt',
            'content',
            'resource_type',
            'featured',
            'cover_image',
            'external_url',
            'author_name',
            'published_at'
        ]

class ResourceManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = '__all__'
