from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from .models import Resource, ResourceStatus, ResourceType

User = get_user_model()

class ResourceAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.student = User.objects.create_user(username='student', password='pw', role='student')
        self.manager = User.objects.create_user(username='manager', password='pw', role='content_manager')
        
        self.published = Resource.objects.create(
            title="Published Resource",
            slug="published-resource",
            status=ResourceStatus.PUBLISHED,
            resource_type=ResourceType.ARTICLE
        )
        self.draft = Resource.objects.create(
            title="Draft Resource",
            slug="draft-resource",
            status=ResourceStatus.DRAFT,
            resource_type=ResourceType.REPORT
        )
        self.archived = Resource.objects.create(
            title="Archived Resource",
            slug="archived-resource",
            status=ResourceStatus.ARCHIVED,
            resource_type=ResourceType.PUBLIC_RESOURCE
        )

    def test_anonymous_can_list_published_only(self):
        response = self.client.get('/api/v1/resources/')
        self.assertEqual(response.status_code, 200)
        
        results = response.data['results']
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['slug'], 'published-resource')

    def test_anonymous_can_retrieve_published(self):
        response = self.client.get(f'/api/v1/resources/{self.published.slug}/')
        self.assertEqual(response.status_code, 200)

    def test_anonymous_cannot_retrieve_draft_or_archived(self):
        response = self.client.get(f'/api/v1/resources/{self.draft.slug}/')
        self.assertEqual(response.status_code, 404)
        
        response = self.client.get(f'/api/v1/resources/{self.archived.slug}/')
        self.assertEqual(response.status_code, 404)

    def test_student_cannot_create_or_edit(self):
        self.client.force_authenticate(user=self.student)
        
        response = self.client.post('/api/v1/resources/', {
            'title': 'New Resource',
            'slug': 'new-resource',
            'status': ResourceStatus.PUBLISHED
        })
        self.assertEqual(response.status_code, 403)
        
        response = self.client.patch(f'/api/v1/resources/{self.published.slug}/', {
            'title': 'Hacked Title'
        })
        self.assertEqual(response.status_code, 403)

    def test_manager_can_see_all_statuses(self):
        self.client.force_authenticate(user=self.manager)
        response = self.client.get('/api/v1/resources/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['results']), 3)

    def test_manager_can_create_and_edit(self):
        self.client.force_authenticate(user=self.manager)
        response = self.client.post('/api/v1/resources/', {
            'title': 'Manager Created',
            'slug': 'manager-created',
            'status': ResourceStatus.DRAFT
        })
        self.assertEqual(response.status_code, 201)
        
        response = self.client.patch(f'/api/v1/resources/{self.published.slug}/', {
            'title': 'Updated Title'
        })
        self.assertEqual(response.status_code, 200)
        self.published.refresh_from_db()
        self.assertEqual(self.published.title, 'Updated Title')

    def test_filtering_by_type(self):
        response = self.client.get('/api/v1/resources/?resource_type=article')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['results']), 1)
        
        # Test anonymous user trying to bypass status filter
        response = self.client.get('/api/v1/resources/?status=draft')
        self.assertEqual(response.status_code, 200)
        # Should still only return 1 published resource because the status parameter is completely ignored
        self.assertEqual(len(response.data['results']), 1)
