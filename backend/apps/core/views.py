from rest_framework import viewsets, permissions
from .models import (
    Enquiry, 
    EventRegistration, 
    AmbassadorApplication, 
    PartnerApplication, 
    WaitlistSubmission,
    VolunteerApplication
)
from .serializers import (
    EnquirySerializer, 
    EventRegistrationSerializer, 
    AmbassadorApplicationSerializer, 
    PartnerApplicationSerializer, 
    WaitlistSubmissionSerializer,
    VolunteerApplicationSerializer
)

class BaseSubmissionViewSet(viewsets.ModelViewSet):
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and (
            user.is_staff or user.is_superuser or getattr(user, 'role', '') in ['content_manager', 'administrator', 'superadmin']
        ):
            return self.queryset
        return self.queryset.none()

class EnquiryViewSet(BaseSubmissionViewSet):
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer

class EventRegistrationViewSet(BaseSubmissionViewSet):
    queryset = EventRegistration.objects.all()
    serializer_class = EventRegistrationSerializer

class AmbassadorApplicationViewSet(BaseSubmissionViewSet):
    queryset = AmbassadorApplication.objects.all()
    serializer_class = AmbassadorApplicationSerializer

class PartnerApplicationViewSet(BaseSubmissionViewSet):
    queryset = PartnerApplication.objects.all()
    serializer_class = PartnerApplicationSerializer

class WaitlistSubmissionViewSet(BaseSubmissionViewSet):
    queryset = WaitlistSubmission.objects.all()
    serializer_class = WaitlistSubmissionSerializer

class VolunteerApplicationViewSet(BaseSubmissionViewSet):
    queryset = VolunteerApplication.objects.all()
    serializer_class = VolunteerApplicationSerializer

