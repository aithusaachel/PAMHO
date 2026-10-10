import os
import sys
import json
import django

# Setup Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from apps.core.models import EventRegistration, AmbassadorApplication, PartnerApplication

def load_data():
    with open('old_submissions.json', 'r', encoding='utf-8') as f:
        records = json.load(f)

    # Clear old
    EventRegistration.objects.all().delete()
    AmbassadorApplication.objects.all().delete()
    PartnerApplication.objects.all().delete()

    reg_count = 0
    amb_count = 0
    part_count = 0
    errors = 0

    for record in records:
        try:
            form_type = record.get("formType")
            data = record.get("data", {})

            if form_type == "join":
                EventRegistration.objects.create(
                    full_name=str(data.get("fullName", ""))[:255],
                    email=str(data.get("email", ""))[:254],
                    whatsapp=str(data.get("whatsapp", ""))[:50],
                    occupation=str(data.get("occupation", ""))[:255],
                    country=str(data.get("country", ""))[:100],
                    theme=str(data.get("theme", ""))[:255],
                    referral=str(data.get("referral", ""))[:255],
                    message=str(data.get("message", ""))
                )
                reg_count += 1
            elif form_type == "ambassadors":
                AmbassadorApplication.objects.create(
                    full_name=str(data.get("fullName", ""))[:255],
                    email=str(data.get("email", ""))[:254],
                    whatsapp=str(data.get("whatsapp", ""))[:50],
                    city=str(data.get("city", ""))[:100],
                    country=str(data.get("country", ""))[:100],
                    occupation=str(data.get("occupation", ""))[:255],
                    twitter=str(data.get("twitter", ""))[:255],
                    linkedin=str(data.get("linkedin", ""))[:255],
                    instagram=str(data.get("instagram", ""))[:255],
                    prior_experience=str(data.get("prior", ""))[:50],
                    reach=str(data.get("reach", ""))[:50],
                    meaning=str(data.get("meaning", "")),
                    why=str(data.get("why", "")),
                    promote=str(data.get("promote", ""))
                )
                amb_count += 1
            elif form_type == "partners":
                PartnerApplication.objects.create(
                    org_name=str(data.get("orgName", ""))[:255],
                    org_type=str(data.get("orgType", ""))[:100],
                    regions=str(data.get("regions", ""))[:255],
                    country_reg=str(data.get("countryReg", ""))[:100],
                    website=str(data.get("website", ""))[:255],
                    twitter=str(data.get("twitter", ""))[:255],
                    linkedin=str(data.get("linkedin", ""))[:255],
                    instagram=str(data.get("instagram", ""))[:255],
                    contact_name=str(data.get("contactName", ""))[:255],
                    contact_role=str(data.get("contactRole", ""))[:255],
                    contact_email=str(data.get("contactEmail", ""))[:254],
                    contact_whatsapp=str(data.get("contactWhatsapp", ""))[:50],
                    description=str(data.get("description", "")),
                    speaking=str(data.get("speaking", ""))[:50],
                    contribution=str(data.get("contribution", "")),
                    additional=str(data.get("additional", "")),
                    heard_about=str(data.get("heardAbout", ""))[:255]
                )
                part_count += 1
        except Exception as e:
            errors += 1
            print(f"Error loading {form_type}: {e}")

    print(f"Loaded {reg_count} registrations, {amb_count} ambassadors, {part_count} partners. {errors} errors.")

if __name__ == '__main__':
    load_data()
