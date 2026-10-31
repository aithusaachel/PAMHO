from rest_framework import serializers
from .models import (
    Enquiry, 
    EventRegistration, 
    AmbassadorApplication, 
    PartnerApplication, 
    WaitlistSubmission,
    VolunteerApplication
)

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

class WaitlistSubmissionSerializer(serializers.ModelSerializer):
    role = serializers.CharField(max_length=100, required=True)
    heard_about = serializers.CharField(max_length=100, required=False, allow_blank=True, default='')

    class Meta:
        model = WaitlistSubmission
        fields = ['id', 'full_name', 'email', 'country', 'role', 'agreed_to_contact',
                  'whatsapp', 'organisation', 'motivation', 'heard_about',
                  'interested_future', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_role(self, value):
        val = (value or '').strip()
        if not val:
            raise serializers.ValidationError("Please select or enter your primary background / role.")
        return val

    def validate_heard_about(self, value):
        val = (value or '').strip()
        if val == 'friend_colleague':
            return 'colleague'
        return val

    def validate_agreed_to_contact(self, value):
        if not value:
            raise serializers.ValidationError("Consent to be contacted is required to join the waitlist.")
        return value

class VolunteerApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = VolunteerApplication
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']

