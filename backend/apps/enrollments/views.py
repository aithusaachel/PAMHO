from rest_framework import viewsets, mixins, permissions, status
from rest_framework.response import Response
from .models import Enrollment
from .serializers import EnrollmentSerializer
from .permissions import IsStudentRole

class EnrollmentViewSet(mixins.CreateModelMixin,
                        mixins.ListModelMixin,
                        mixins.RetrieveModelMixin,
                        viewsets.GenericViewSet):
    """
    API endpoint that allows students to view and create their enrollments.
    Update and delete operations are intentionally omitted to preserve the
    enrollment lifecycle integrity.
    """
    serializer_class = EnrollmentSerializer
    # We will use IsAuthenticated and handle role checks in get_queryset and create methods.
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role in ['content_manager', 'administrator', 'superadmin']:
            return Enrollment.objects.all()
        # Students can exclusively see their own enrollments
        return Enrollment.objects.filter(student=user)

    def create(self, request, *args, **kwargs):
        # Only students can create enrollments for themselves via this endpoint
        if request.user.role != 'student':
            return Response({"error": "Only students can enroll in courses."}, status=status.HTTP_403_FORBIDDEN)
        return super().create(request, *args, **kwargs)
