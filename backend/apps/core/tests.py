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


class VolunteerApplicationAdminTests(APITestCase):
    """The volunteer forms POST anonymously; the admin Volunteer Applications page lists and updates them."""

    url = '/api/v1/volunteers/'

    def setUp(self):
        from django.contrib.auth import get_user_model
        self.admin = get_user_model().objects.create_user(
            username='admin', password='pw-12345!', role='administrator'
        )
        self.payload = {
            'reference_id': 'PAMHO-VOL-TEST1', 'application_type': 'join', 'status': 'new',
            'full_name': 'Ama Mensah', 'email': 'ama@example.com', 'whatsapp': '+233200000000',
            'country': 'Ghana', 'time_zone': 'GMT', 'highest_qualification': 'BSc',
            'current_occupation': 'Designer', 'selected_team': 'Design', 'hours_per_week': '5-8',
            'skills': 'Figma\nIllustration', 'agreed_unpaid_probation': True,
            'agreed_weekly_hours': True, 'agreed_referees_contacted': True, 'agreed_data_storage': True,
        }

    def test_public_submission_then_admin_can_see_and_update(self):
        res = self.client.post(self.url, self.payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED, res.data)

        # Anonymous visitors must not be able to read responses
        self.assertIn(self.client.get(self.url).status_code, (401, 403))

        self.client.force_authenticate(self.admin)
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        entry = res.data[0]
        self.assertEqual(entry['full_name'], 'Ama Mensah')
        self.assertEqual(entry['selected_team'], 'Design')

        res = self.client.patch(f"{self.url}{entry['id']}/", {'status': 'shortlisted'}, format='json')
        self.assertEqual(res.status_code, status.HTTP_200_OK, res.data)
        self.assertEqual(res.data['status'], 'shortlisted')

        res = self.client.delete(f"{self.url}{entry['id']}/")
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
