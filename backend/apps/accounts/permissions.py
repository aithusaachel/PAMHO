from rest_framework import permissions

class IsSuperAdminUser(permissions.BasePermission):
    """
    Allows access only to superadmin users.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and 
            request.user.is_authenticated and 
            request.user.role == 'superadmin'
        )

class IsAdminOrSuperAdmin(permissions.BasePermission):
    """
    Allows access to administrators and superadmins for listing/viewing users.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and 
            request.user.is_authenticated and 
            request.user.role in ['administrator', 'superadmin']
        )
