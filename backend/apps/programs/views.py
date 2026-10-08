import jwt
import time
from django.conf import settings
from rest_framework import viewsets, permissions, status
from .permissions import IsProgramManagerOrReadOnly
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Program, ProgramStatus
from .serializers import ProgramSerializer

class ProgramViewSet(viewsets.ModelViewSet):
    """
    Public API for discovering PAMHO Programs.
    Only returns published programs for public/students.
    Managers can see all programs.
    """
    serializer_class = ProgramSerializer
    permission_classes = [IsProgramManagerOrReadOnly]
    lookup_field = 'slug'

    def get_queryset(self):
        user = self.request.user
        if user and user.is_authenticated and user.role in ['content_manager', 'administrator', 'superadmin']:
            return Program.objects.all()
        return Program.objects.filter(status=ProgramStatus.PUBLISHED)

    @action(detail=True, methods=['post'], url_path='zoom/join', permission_classes=[permissions.AllowAny])
    def zoom_join(self, request, slug=None):
        program = self.get_object()
        
        if not program.zoom_enabled:
            return Response(
                {"error": "Zoom is not enabled for this program."},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        if not program.zoom_meeting_id:
            return Response(
                {"error": "Live meeting configuration is not yet available."},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        sdk_key = settings.ZOOM_SDK_KEY
        sdk_secret = settings.ZOOM_SDK_SECRET
        
        if not sdk_key or not sdk_secret:
            return Response(
                {"error": "Server is missing Zoom SDK configuration."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
        # Enforce server-side meeting ID.
        meeting_number = program.zoom_meeting_id
        
        # Attendee role must be strictly enforced.
        role = 0 
        
        iat = int(time.time()) - 30
        exp = iat + (60 * 60 * 2) # 2 hours
        
        payload = {
            'sdkKey': sdk_key,
            'appKey': sdk_key,
            'mn': meeting_number,
            'role': role,
            'iat': iat,
            'exp': exp,
            'tokenExp': exp
        }
        
        try:
            signature = jwt.encode(payload, sdk_secret, algorithm='HS256')
            # Handle if jwt.encode returns bytes in some PyJWT versions
            if isinstance(signature, bytes):
                signature = signature.decode('utf-8')
        except Exception:
            return Response(
                {"error": "Failed to generate meeting signature."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
        return Response({
            "signature": signature,
            "sdkKey": sdk_key
        })
