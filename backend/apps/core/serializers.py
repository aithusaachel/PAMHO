from rest_framework import serializers
from .models import Enquiry

class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = ['id', 'name', 'email', 'enquiry_type', 'organization', 'message', 'status', 'created_at']
        read_only_fields = ['id', 'created_at']
