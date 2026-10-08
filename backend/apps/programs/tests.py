from django.test import TestCase
from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APIClient
from datetime import timedelta
import jwt
from django.conf import settings

from apps.accounts.models import User
from .models import Program, ProgramStatus, ProgramType

class ProgramVisibilityTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.student = User.objects.create_user(username='student', email='student@example.com', password='password123', role='student')
        
        self.published_program = Program.objects.create(
            title="Published Program",
            slug="published-program",
            status=ProgramStatus.PUBLISHED,
        )
        self.draft_program = Program.objects.create(
            title="Draft Program",
            slug="draft-program",
            status=ProgramStatus.DRAFT,
        )
        self.archived_program = Program.objects.create(
            title="Archived Program",
            slug="archived-program",
            status=ProgramStatus.ARCHIVED,
        )

    def test_anonymous_sees_only_published(self):
        url = reverse('program-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['slug'], 'published-program')

    def test_anonymous_cannot_access_draft_by_slug(self):
        url = reverse('program-detail', kwargs={'slug': 'draft-program'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_anonymous_cannot_bypass_with_query_params(self):
        url = reverse('program-list')
        response = self.client.get(f"{url}?status=draft")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1) # Still only 1 published program

    def test_student_sees_only_published(self):
        self.client.force_authenticate(user=self.student)
        url = reverse('program-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

class ProgramManagementTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.student = User.objects.create_user(username='student2', email='student@example.com', password='password123', role='student')
        self.manager = User.objects.create_user(username='manager', email='manager@example.com', password='password123', role='content_manager')
        self.program = Program.objects.create(
            title="Initial Program",
            slug="initial-program",
            status=ProgramStatus.DRAFT,
        )

    def test_student_cannot_update(self):
        self.client.force_authenticate(user=self.student)
        url = reverse('program-detail', kwargs={'slug': 'initial-program'})
        response = self.client.patch(url, {'title': 'Hacked'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_anonymous_cannot_update(self):
        url = reverse('program-detail', kwargs={'slug': 'initial-program'})
        response = self.client.patch(url, {'title': 'Hacked'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)



class EventStateTests(TestCase):
    def test_event_state_calculation(self):
        now = timezone.now()
        
        upcoming_program = Program(scheduled_start=now + timedelta(days=1), scheduled_end=now + timedelta(days=1, hours=2))
        self.assertEqual(upcoming_program.event_state, 'upcoming')
        
        live_program = Program(scheduled_start=now - timedelta(hours=1), scheduled_end=now + timedelta(hours=1))
        self.assertEqual(live_program.event_state, 'live')
        
        completed_program = Program(scheduled_start=now - timedelta(days=1), scheduled_end=now - timedelta(hours=23))
        self.assertEqual(completed_program.event_state, 'completed')
        
        unconfigured_program = Program(scheduled_start=None, scheduled_end=None)
        self.assertEqual(unconfigured_program.event_state, 'unconfigured')

class ZoomJoinEndpointTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.student = User.objects.create_user(username='student3', email='student@example.com', password='password123', role='student')
        
        self.program = Program.objects.create(
            title="Pan-African Mental Health Conversation",
            slug="pan-african-conversation",
            status=ProgramStatus.PUBLISHED,
            zoom_enabled=True,
            zoom_meeting_id="9332105985"
        )
        
        settings.ZOOM_SDK_KEY = 'test_key'
        settings.ZOOM_SDK_SECRET = 'test_secret'

    def test_can_request_signature_for_published_program(self):
        url = reverse('program-zoom-join', kwargs={'slug': self.program.slug})
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('signature', response.data)
        self.assertIn('sdkKey', response.data)
        self.assertEqual(response.data['sdkKey'], 'test_key')
        self.assertNotIn('test_secret', str(response.data))
        
        # Verify JWT payload
        payload = jwt.decode(response.data['signature'], 'test_secret', algorithms=['HS256'])
        self.assertEqual(payload['mn'], "9332105985")
        self.assertEqual(payload['role'], 0) # Attendee role

    def test_cannot_request_signature_for_draft(self):
        self.program.status = ProgramStatus.DRAFT
        self.program.save()
        url = reverse('program-zoom-join', kwargs={'slug': self.program.slug})
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_cannot_request_if_zoom_disabled(self):
        self.program.zoom_enabled = False
        self.program.save()
        url = reverse('program-zoom-join', kwargs={'slug': self.program.slug})
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Zoom is not enabled for this program.')

    def test_cannot_request_if_missing_meeting_id(self):
        self.program.zoom_meeting_id = ""
        self.program.save()
        url = reverse('program-zoom-join', kwargs={'slug': self.program.slug})
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
