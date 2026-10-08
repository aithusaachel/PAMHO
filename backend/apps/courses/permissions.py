from rest_framework import permissions

class IsCourseManagerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow content managers, admins, and superadmins to edit it.
    Students and anonymous users have read-only access.
    """

    def has_permission(self, request, view):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to authenticated managers.
        return bool(
            request.user and 
            request.user.is_authenticated and 
            request.user.role in ['content_manager', 'administrator', 'superadmin']
        )
