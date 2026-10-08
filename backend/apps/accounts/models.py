from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # AbstractUser already provides username, first_name, last_name, email, password, groups, user_permissions, is_staff, is_active, is_superuser, last_login, date_joined
    
    ROLE_CHOICES = (
        ('student', 'Student/Learner'),
        ('content_manager', 'Content Manager'),
        ('administrator', 'Administrator'),
        ('superadmin', 'Superadmin'),
    )
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='student')

    def __str__(self):
        return self.username
