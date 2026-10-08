from rest_framework import viewsets, mixins, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import LessonProgress, ProgressStatus
from .serializers import LessonProgressSerializer
from apps.enrollments.permissions import IsStudentRole

class LessonProgressViewSet(mixins.CreateModelMixin,
                            mixins.ListModelMixin,
                            mixins.RetrieveModelMixin,
                            viewsets.GenericViewSet):
    """
    API endpoint that allows students to view and create their lesson progress.
    """
    serializer_class = LessonProgressSerializer
    permission_classes = [IsStudentRole]

    def get_queryset(self):
        # Students can exclusively see their own progress records
        return LessonProgress.objects.filter(student=self.request.user)

    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        progress = self.get_object()
        
        # Idempotent: if already completed, do nothing but return 200
        if progress.status != ProgressStatus.COMPLETED:
            progress.status = ProgressStatus.COMPLETED
            progress.completed_at = timezone.now()
            progress.save(update_fields=['status', 'completed_at', 'updated_at'])
            
        serializer = self.get_serializer(progress)
        return Response(serializer.data, status=status.HTTP_200_OK)
