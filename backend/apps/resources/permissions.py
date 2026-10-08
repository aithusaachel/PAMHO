from rest_framework import permissions

class IsResourceManagerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow content managers, admins, and superadmins to edit resources.
    Students and anonymous users have read-only access.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        return bool(
            request.user and 
            request.user.is_authenticated and 
            request.user.role in ['content_manager', 'administrator', 'superadmin']
        )
