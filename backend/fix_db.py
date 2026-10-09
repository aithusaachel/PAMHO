import os
import sys
import django

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.core.models import Program

programs = Program.objects.filter(title__icontains='Conversation')
if programs.exists():
    p = programs.first()
    p.event_state = 'live'
    p.is_zoom_event = True
    p.save()
    print(f"Updated '{p.title}' to LIVE state.")
else:
    print("Could not find The Conversation program in the database.")
