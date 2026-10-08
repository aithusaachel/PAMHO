from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from apps.courses.models import Course, CourseStatus
from .models import Enrollment, EnrollmentStatus

User = get_user_model()

class EnrollmentAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.student = User.objects.create_user(username='student', password='pw', role='student')
        self.student_2 = User.objects.create_user(username='student2', password='pw', role='student')
        self.manager = User.objects.create_user(username='manager', password='pw', role='content_manager')
        
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

    def test_anonymous_cannot_access_enrollments(self):
        response = self.client.get('/api/v1/enrollments/')
        self.assertEqual(response.status_code, 401)
        
        response = self.client.post('/api/v1/enrollments/', {'course_slug': 'published-course'})
        self.assertEqual(response.status_code, 401)

    def test_manager_cannot_use_student_enrollment_endpoint(self):
        self.client.force_authenticate(user=self.manager)
        response = self.client.post('/api/v1/enrollments/', {'course_slug': 'published-course'})
        # Should be forbidden because they don't have 'student' role
        self.assertEqual(response.status_code, 403)

    def test_student_can_enroll_in_published_course(self):
        self.client.force_authenticate(user=self.student)
        response = self.client.post('/api/v1/enrollments/', {'course_slug': 'published-course'})
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['course_identifier'], 'published-course')
        self.assertEqual(Enrollment.objects.count(), 1)
        self.assertEqual(Enrollment.objects.first().student, self.student)

    def test_student_cannot_enroll_in_draft_course(self):
        self.client.force_authenticate(user=self.student)
        response = self.client.post('/api/v1/enrollments/', {'course_slug': 'draft-course'})
        # Validation error because the SlugRelatedField queryset excludes draft courses
        self.assertEqual(response.status_code, 400)
        self.assertIn('course_slug', response.data)

    def test_student_cannot_enroll_in_same_course_twice(self):
        self.client.force_authenticate(user=self.student)
        self.client.post('/api/v1/enrollments/', {'course_slug': 'published-course'})
        
        # Second attempt
        response = self.client.post('/api/v1/enrollments/', {'course_slug': 'published-course'})
        self.assertEqual(response.status_code, 400)
        self.assertIn('detail', response.data)
        self.assertEqual(Enrollment.objects.count(), 1)

    def test_student_can_only_see_own_enrollments(self):
        Enrollment.objects.create(student=self.student_2, course=self.published_course)
        
        self.client.force_authenticate(user=self.student)
        response = self.client.get('/api/v1/enrollments/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 0)
        
        # Now student 1 enrolls
        self.client.post('/api/v1/enrollments/', {'course_slug': 'published-course'})
        response = self.client.get('/api/v1/enrollments/')
        self.assertEqual(len(response.data), 1)
