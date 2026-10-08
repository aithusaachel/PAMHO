from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, CurrentUserView, UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='auth_register'),
    path('auth/me/', CurrentUserView.as_view(), name='auth_me'),
    path('', include(router.urls)),
]
