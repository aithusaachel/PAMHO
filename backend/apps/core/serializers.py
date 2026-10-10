from rest_framework import serializers
from .models import Enquiry, EventRegistration, AmbassadorApplication, PartnerApplication

class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = ['id', 'name', 'email', 'enquiry_type', 'organization', 'message', 'status', 'created_at']
        read_only_fields = ['id', 'created_at']

class EventRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventRegistration
        fields = '__all__'

class AmbassadorApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AmbassadorApplication
        fields = '__all__'

class PartnerApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartnerApplication
        fields = '__all__'
