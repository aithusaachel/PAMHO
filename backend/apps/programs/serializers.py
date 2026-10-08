from rest_framework import serializers
from .models import Program

class ProgramSerializer(serializers.ModelSerializer):
    event_state = serializers.CharField(read_only=True)

    class Meta:
        model = Program
        fields = [
            'id', 'title', 'slug', 'description', 'program_type',
            'scheduled_start', 'scheduled_end', 'timezone',
            'event_state', 'zoom_enabled'
        ]
        # We purposely do not expose zoom_meeting_id or zoom_passcode here.
        # They should only be accessed if absolutely needed or via the join endpoint.
        read_only_fields = ['event_state']

class ZoomJoinResponseSerializer(serializers.Serializer):
    signature = serializers.CharField()
    sdkKey = serializers.CharField()
