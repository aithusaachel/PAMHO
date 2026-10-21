import os
import sys
import django

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.courses.models import Course


images = [
    "/images/institute_hero.jpg",
    "/images/home_institute.jpg",
    "/images/home_advocacy.jpg",
    "/images/about_hero.jpg"
]

courses = Course.objects.all()
for i, c in enumerate(courses):
    c.thumbnail = images[i % len(images)]
    c.save()

print("Thumbnails updated to authentic Pan-African photography.")

