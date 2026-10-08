from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.http import JsonResponse

def health_check(request):
    return JsonResponse({"status": "ok", "message": "PAMHO API is running"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/', include('apps.accounts.urls')),
    path('api/v1/health/', health_check, name='health_check'),
    path('api/v1/', include('apps.courses.urls')),
    path('api/v1/', include('apps.enrollments.urls')),
    path('api/v1/', include('apps.progress.urls')),
    path('api/v1/', include('apps.resources.urls')),
    path('api/v1/', include('apps.programs.urls')),
    path('api/v1/', include('apps.core.urls')),
    
    # React Catch-All Route (must be last)
    # Serves the built index.html for any path not starting with api/, admin/, static/, or media/
    re_path(r'^(?!api/|admin/|static/|media/).*', TemplateView.as_view(template_name='index.html')),
]
