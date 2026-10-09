import os
import sys
import django

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.courses.models import Course

images = [
    "https://images.unsplash.com/photo-1542884748-2b87b36c6b90?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1571260899304-425dea57a274?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1541814674753-2746816e87a9?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=1920&q=80"
]

courses = Course.objects.all()
for i, c in enumerate(courses):
    c.thumbnail = images[i % len(images)]
    c.save()

print("Thumbnails updated.")
