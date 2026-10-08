from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from .models import Course, CourseStatus

User = get_user_model()

class CourseAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.manager = User.objects.create_user(username='manager', password='pw', role='content_manager')
        self.student = User.objects.create_user(username='student', password='pw', role='student')
        
        self.published_course = Course.objects.create(
            title="Published Course",
            slug="published-course",
            status=CourseStatus.PUBLISHED
        )
        self.draft_course = Course.objects.create(
            title="Draft Course",
            slug="draft-course",
            status=CourseStatus.DRAFT
        )

    def test_anonymous_can_only_see_published_courses(self):
        response = self.client.get('/api/v1/courses/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['slug'], 'published-course')

    def test_student_can_only_see_published_courses(self):
        self.client.force_authenticate(user=self.student)
        response = self.client.get('/api/v1/courses/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['slug'], 'published-course')

    def test_manager_can_see_all_courses(self):
        self.client.force_authenticate(user=self.manager)
        response = self.client.get('/api/v1/courses/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    def test_manager_can_create_course(self):
        self.client.force_authenticate(user=self.manager)
        response = self.client.post('/api/v1/courses/', {
            'title': 'New Course',
            'slug': 'new-course',
            'status': 'draft'
        })
        self.assertEqual(response.status_code, 201)

    def test_student_cannot_create_course(self):
        self.client.force_authenticate(user=self.student)
        response = self.client.post('/api/v1/courses/', {
            'title': 'Bad Course',
            'slug': 'bad-course',
            'status': 'draft'
        })
        self.assertEqual(response.status_code, 403)

    def test_manager_can_create_module_and_lesson(self):
        self.client.force_authenticate(user=self.manager)
        mod_res = self.client.post('/api/v1/modules/', {
            'course': self.draft_course.id,
            'title': 'New Module',
            'ordering': 1
        })
        self.assertEqual(mod_res.status_code, 201)
        mod_id = mod_res.data['id']

        les_res = self.client.post('/api/v1/lessons/', {
            'module': mod_id,
            'title': 'New Lesson',
            'slug': 'new-lesson',
            'lesson_type': 'text',
            'ordering': 1
        })
        self.assertEqual(les_res.status_code, 201)
