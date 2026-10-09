from rest_framework import serializers
from .models import Program

class ProgramSerializer(serializers.ModelSerializer):
    event_state = serializers.CharField(read_only=True)

    class Meta:
        model = Program
        fields = [
            'id', 'title', 'slug', 'description', 'program_type',
            'scheduled_start', 'scheduled_end', 'timezone',
            'event_state', 'zoom_enabled', 'zoom_meeting_id', 'zoom_passcode'
        ]
        read_only_fields = ['event_state']

class ZoomJoinResponseSerializer(serializers.Serializer):
    signature = serializers.CharField()
    sdkKey = serializers.CharField()
