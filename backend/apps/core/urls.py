from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    EnquiryViewSet, 
    EventRegistrationViewSet, 
    AmbassadorApplicationViewSet, 
    PartnerApplicationViewSet
)

router = DefaultRouter()
router.register(r'enquiries', EnquiryViewSet, basename='enquiry')
router.register(r'registrations', EventRegistrationViewSet, basename='registration')
router.register(r'ambassadors', AmbassadorApplicationViewSet, basename='ambassador')
router.register(r'partners', PartnerApplicationViewSet, basename='partner')
urlpatterns = [
    path('', include(router.urls)),
]
