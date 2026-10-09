import os
import sys
import django

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.courses.models import Course

images = [
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80", # Group study
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=80", # Workshop
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80", # Team meeting
    "https://images.unsplash.com/photo-1529156069898-49953eb1f5ff?auto=format&fit=crop&w=1920&q=80", # Diverse group
    "https://images.unsplash.com/photo-1571260899304-425dea57a274?auto=format&fit=crop&w=1920&q=80"  # University students
]

courses = Course.objects.all()
for i, c in enumerate(courses):
    c.thumbnail = images[i % len(images)]
    c.save()

print("Thumbnails updated to distinct real photography.")
