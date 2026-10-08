from rest_framework import viewsets, filters
from django.db.models import Q
from .models import Course, CourseStatus
from .serializers import CourseListSerializer, CourseDetailSerializer, ModuleSerializer, LessonSerializer
from .permissions import IsCourseManagerOrReadOnly
from rest_framework.permissions import AllowAny

class CourseViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows courses to be viewed or edited.
    """
    permission_classes = [IsCourseManagerOrReadOnly]
    lookup_field = 'slug'
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'short_description', 'difficulty']
    ordering_fields = ['created_at', 'published_at', 'title']
    ordering = ['-published_at']

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.role in ['content_manager', 'administrator', 'superadmin']:
            # Managers can see everything
            return Course.objects.all()
        # Everyone else (students, anonymous) can only see published courses
        return Course.objects.filter(status=CourseStatus.PUBLISHED)

    def get_serializer_class(self):
        if self.action == 'list':
            return CourseListSerializer
        return CourseDetailSerializer

class ModuleViewSet(viewsets.ModelViewSet):
    permission_classes = [IsCourseManagerOrReadOnly]
    serializer_class = ModuleSerializer
    
    def get_queryset(self):
        return Module.objects.all()

class LessonViewSet(viewsets.ModelViewSet):
    permission_classes = [IsCourseManagerOrReadOnly]
    serializer_class = LessonSerializer
    
    def get_queryset(self):
        return Lesson.objects.all()
