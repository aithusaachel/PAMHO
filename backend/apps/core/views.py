from rest_framework import viewsets, permissions
from .models import Enquiry
from .serializers import EnquirySerializer

class EnquiryViewSet(viewsets.ModelViewSet):
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer
    
    def get_permissions(self):
        if self.action == 'create':
            # Anyone can submit an enquiry
            return [permissions.AllowAny()]
        # Only managers/admins can view/edit/delete enquiries
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.role in ['content_manager', 'administrator', 'superadmin']:
            return Enquiry.objects.all()
        return Enquiry.objects.none()
