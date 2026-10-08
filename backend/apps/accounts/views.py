from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, RegisterSerializer, AdminUserSerializer
from .permissions import IsAdminOrSuperAdmin, IsSuperAdminUser

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

class CurrentUserView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint for admin user management.
    """
    queryset = User.objects.all()
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsAdminOrSuperAdmin]
        else:
            # Only superadmins can mutate (update roles/is_active)
            permission_classes = [IsSuperAdminUser]
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        return AdminUserSerializer
