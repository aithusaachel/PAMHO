from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from apps.courses.models import Course, Module, Lesson, CourseStatus
from apps.enrollments.models import Enrollment
from .models import LessonProgress, ProgressStatus

User = get_user_model()

class ProgressAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.student = User.objects.create_user(username='student', password='pw', role='student')
        self.student_2 = User.objects.create_user(username='student2', password='pw', role='student')
        self.manager = User.objects.create_user(username='manager', password='pw', role='content_manager')
        
        self.course = Course.objects.create(title="Course 1", slug="course-1", status=CourseStatus.PUBLISHED)
        self.module = Module.objects.create(course=self.course, title="Module 1", ordering=1)
        self.lesson = Lesson.objects.create(module=self.module, title="Lesson 1", slug="lesson-1", ordering=1, status=CourseStatus.PUBLISHED)
        
        self.course_unenrolled = Course.objects.create(title="Course 2", slug="course-2", status=CourseStatus.PUBLISHED)
        self.module_unenrolled = Module.objects.create(course=self.course_unenrolled, title="Module 2", ordering=1)
        self.lesson_unenrolled = Lesson.objects.create(module=self.module_unenrolled, title="Lesson 2", slug="lesson-2", ordering=1, status=CourseStatus.PUBLISHED)

        self.draft_course = Course.objects.create(title="Draft Course", slug="draft-course", status=CourseStatus.DRAFT)
        self.draft_module = Module.objects.create(course=self.draft_course, title="Module 3", ordering=1)
        self.draft_lesson = Lesson.objects.create(module=self.draft_module, title="Lesson 3", slug="lesson-3", ordering=1, status=CourseStatus.PUBLISHED)

        # Active enrollment for student 1 in Course 1
        self.enrollment = Enrollment.objects.create(student=self.student, course=self.course)

    def test_anonymous_cannot_access_progress(self):
        response = self.client.get('/api/v1/progress/')
        self.assertEqual(response.status_code, 401)
        response = self.client.post('/api/v1/progress/', {'lesson_id': self.lesson.id})
        self.assertEqual(response.status_code, 401)

    def test_manager_cannot_use_student_progress_endpoint(self):
        self.client.force_authenticate(user=self.manager)
        response = self.client.post('/api/v1/progress/', {'lesson_id': self.lesson.id})
        self.assertEqual(response.status_code, 403)

    def test_student_can_create_progress_for_enrolled_course(self):
        self.client.force_authenticate(user=self.student)
        response = self.client.post('/api/v1/progress/', {'lesson_id': self.lesson.id})
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['status'], 'in_progress')
        self.assertEqual(LessonProgress.objects.count(), 1)
        
        progress = LessonProgress.objects.first()
        self.assertEqual(progress.student, self.student)
        self.assertEqual(progress.lesson, self.lesson)
        self.assertEqual(progress.enrollment, self.enrollment)

    def test_student_cannot_create_progress_for_unenrolled_course(self):
        self.client.force_authenticate(user=self.student)
        response = self.client.post('/api/v1/progress/', {'lesson_id': self.lesson_unenrolled.id})
        self.assertEqual(response.status_code, 400)
        self.assertIn('detail', response.data)

    def test_student_cannot_create_progress_for_draft_course(self):
        self.client.force_authenticate(user=self.student)
        response = self.client.post('/api/v1/progress/', {'lesson_id': self.draft_lesson.id})
        self.assertEqual(response.status_code, 400)
        self.assertIn('lesson_id', response.data)

    def test_student_can_only_see_own_progress(self):
        enrollment_2 = Enrollment.objects.create(student=self.student_2, course=self.course)
        LessonProgress.objects.create(student=self.student_2, lesson=self.lesson, enrollment=enrollment_2)
        
        self.client.force_authenticate(user=self.student)
        response = self.client.get('/api/v1/progress/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 0)

    def test_invalid_lesson_id_fails_cleanly(self):
        self.client.force_authenticate(user=self.student)
        response = self.client.post('/api/v1/progress/', {'lesson_id': 9999})
        self.assertEqual(response.status_code, 400)
        self.assertIn('lesson_id', response.data)

    def test_complete_lesson_changes_state_and_sets_timestamp(self):
        self.client.force_authenticate(user=self.student)
        self.client.post('/api/v1/progress/', {'lesson_id': self.lesson.id})
        progress = LessonProgress.objects.first()
        
        response = self.client.post(f'/api/v1/progress/{progress.id}/complete/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['status'], 'completed')
        self.assertIsNotNone(response.data['completed_at'])

    def test_complete_lesson_is_idempotent(self):
        self.client.force_authenticate(user=self.student)
        self.client.post('/api/v1/progress/', {'lesson_id': self.lesson.id})
        progress = LessonProgress.objects.first()
        
        self.client.post(f'/api/v1/progress/{progress.id}/complete/')
        progress.refresh_from_db()
        first_completed_at = progress.completed_at
        
        response = self.client.post(f'/api/v1/progress/{progress.id}/complete/')
        self.assertEqual(response.status_code, 200)
        progress.refresh_from_db()
        self.assertEqual(progress.completed_at, first_completed_at)
