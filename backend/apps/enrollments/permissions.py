from rest_framework import permissions

class IsStudentRole(permissions.BasePermission):
    """
    Custom permission to only allow students to access their enrollments.
    Administrators and content managers should not be impersonating students.
    """

    def has_permission(self, request, view):
        return bool(
            request.user and 
            request.user.is_authenticated and 
            request.user.role == 'student'
        )
