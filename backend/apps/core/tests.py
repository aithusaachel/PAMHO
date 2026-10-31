from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import WaitlistSubmission


class WaitlistSubmissionTests(APITestCase):
    def setUp(self):
        self.url = '/api/v1/waitlist/'

    def test_all_frontend_roles_accepted(self):
        roles = [
            'student',
            'community_leader',
            'healthcare',
            'educator',
            'faith_leader',
            'corporate_hr',
            'other',
            'professional',
            'community_faith_leader',
        ]
        for role in roles:
            payload = {
                'full_name': f'Test Candidate {role}',
                'email': f'{role}@example.com',
                'country': 'Ghana',
                'role': role,
                'agreed_to_contact': True,
                'whatsapp': '+233 20 000 0000',
                'organisation': 'PAMHO Test Org',
                'motivation': 'Advocacy passion test',
                'heard_about': 'colleague',
                'interested_future': True,
            }
            response = self.client.post(self.url, payload, format='json')
            self.assertEqual(
                response.status_code, 
                status.HTTP_201_CREATED,
                f"Failed for role: {role}. Errors: {response.data}"
            )
            self.assertTrue(
                WaitlistSubmission.objects.filter(email=f'{role}@example.com', role=role).exists()
            )

    def test_heard_about_colleague_and_aliases(self):
        sources = ['colleague', 'friend_colleague', 'pamhc', 'social_media', 'ambassador', 'other', '']
        for src in sources:
            email = f'src_{src or "none"}@example.com'
            payload = {
                'full_name': f'Source Test {src}',
                'email': email,
                'country': 'Nigeria',
                'role': 'community_leader',
                'agreed_to_contact': True,
                'heard_about': src,
            }
            response = self.client.post(self.url, payload, format='json')
            self.assertEqual(
                response.status_code, 
                status.HTTP_201_CREATED,
                f"Failed for heard_about source: {src}. Errors: {response.data}"
            )

    def test_consent_required(self):
        payload = {
            'full_name': 'No Consent Candidate',
            'email': 'noconsent@example.com',
            'country': 'Kenya',
            'role': 'student',
            'agreed_to_contact': False,
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('agreed_to_contact', response.data)

    def test_missing_role_fails_cleanly(self):
        payload = {
            'full_name': 'No Role Candidate',
            'email': 'norole@example.com',
            'country': 'Kenya',
            'role': '',
            'agreed_to_contact': True,
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('role', response.data)
