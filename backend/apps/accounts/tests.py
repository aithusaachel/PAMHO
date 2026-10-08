from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status

User = get_user_model()

class UserAccountTests(TestCase):
    def test_create_student_user(self):
        user = User.objects.create_user(
            username='student1', 
            password='password123',
            role='student'
        )
        self.assertEqual(user.username, 'student1')
        self.assertEqual(user.role, 'student')
        self.assertTrue(user.check_password('password123'))

    def test_create_admin_user(self):
        user = User.objects.create_superuser(
            username='admin1', 
            password='password123',
            email='admin@pamho.org',
            role='superadmin'
        )
        self.assertEqual(user.username, 'admin1')
        self.assertEqual(user.role, 'superadmin')
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)

class UserViewSetTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.student = User.objects.create_user(username='student2', password='pw', role='student')
        self.manager = User.objects.create_user(username='manager', password='pw', role='content_manager')
        self.admin = User.objects.create_user(username='admin', password='pw', role='administrator')
        self.superadmin = User.objects.create_user(username='superadmin', password='pw', role='superadmin')
        self.target_user = User.objects.create_user(username='target', password='pw', role='student')
        self.list_url = reverse('user-list')
        self.detail_url = reverse('user-detail', kwargs={'pk': self.target_user.pk})

    def test_unauthenticated_access_rejected(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_student_rejected(self):
        self.client.force_authenticate(user=self.student)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_content_manager_rejected(self):
        self.client.force_authenticate(user=self.manager)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_administrator_works_but_cannot_mutate(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Admin trying to update role
        response = self.client.patch(self.detail_url, {'role': 'administrator'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_superadmin_works_and_can_mutate(self):
        self.client.force_authenticate(user=self.superadmin)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Superadmin updating role
        response = self.client.patch(self.detail_url, {'role': 'administrator'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.target_user.refresh_from_db()
        self.assertEqual(self.target_user.role, 'administrator')

class RegistrationAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = reverse('auth_register')

    def test_normal_registration_works(self):
        data = {
            'username': 'newuser',
            'email': 'new@test.com',
            'password': 'SecurePassword123!',
            'first_name': 'New',
            'last_name': 'User'
        }
        response = self.client.post(self.register_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        user = User.objects.get(username='newuser')
        self.assertEqual(user.role, 'student')
        self.assertTrue(user.check_password('SecurePassword123!'))

    def test_privileged_role_injection_rejected(self):
        data = {
            'username': 'hacker',
            'email': 'hacker@test.com',
            'password': 'SecurePassword123!',
            'role': 'superadmin'  # Attempting privilege escalation
        }
        response = self.client.post(self.register_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # User should still only be a student
        user = User.objects.get(username='hacker')
        self.assertEqual(user.role, 'student')

    def test_insecure_password_rejected(self):
        data = {
            'username': 'weakuser',
            'email': 'weak@test.com',
            'password': '123'  # Too short, should fail validation
        }
        response = self.client.post(self.register_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('password', response.data)

class TokenBehaviorTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.protected_url = reverse('user-list')

    def test_invalid_token_rejected(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer invalid.token.value')
        response = self.client.get(self.protected_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data['code'], 'token_not_valid')
