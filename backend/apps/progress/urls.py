from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LessonProgressViewSet

router = DefaultRouter()
router.register(r'progress', LessonProgressViewSet, basename='progress')

urlpatterns = [
    path('', include(router.urls)),
]
