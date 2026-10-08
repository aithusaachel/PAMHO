from rest_framework import viewsets
from .models import Resource, ResourceStatus
from .serializers import ResourceListSerializer, ResourceDetailSerializer, ResourceManagementSerializer
from .permissions import IsResourceManagerOrReadOnly

from .pagination import ResourcePagination

class ResourceViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows resources to be viewed or edited.
    Public users see only published resources.
    Managers see all resources.
    """
    lookup_field = 'slug'
    permission_classes = [IsResourceManagerOrReadOnly]
    pagination_class = ResourcePagination

    def get_queryset(self):
        user = self.request.user
        queryset = Resource.objects.all()

        if user and user.is_authenticated and user.role in ['content_manager', 'administrator', 'superadmin']:
            # Managers can see everything (drafts, archived, published)
            pass
        else:
            # Everyone else (anonymous, student) only sees published resources
            queryset = queryset.filter(status=ResourceStatus.PUBLISHED)

        # Basic filtering
        resource_type = self.request.query_params.get('resource_type')
        if resource_type:
            queryset = queryset.filter(resource_type=resource_type)
            
        featured = self.request.query_params.get('featured')
        if featured is not None:
            queryset = queryset.filter(featured=(featured.lower() == 'true'))

        return queryset

    def get_serializer_class(self):
        if self.action == 'list':
            if self.request.user and self.request.user.is_authenticated and self.request.user.role in ['content_manager', 'administrator', 'superadmin']:
                return ResourceManagementSerializer
            return ResourceListSerializer
        
        if self.action == 'retrieve':
            if self.request.user and self.request.user.is_authenticated and self.request.user.role in ['content_manager', 'administrator', 'superadmin']:
                return ResourceManagementSerializer
            return ResourceDetailSerializer
        
        # Write operations (create, update, partial_update)
        return ResourceManagementSerializer
