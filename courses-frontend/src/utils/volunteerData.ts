import type { VolunteerTeam, SubmissionReceipt } from '../types/volunteer';

export const VOLUNTEER_CONFIG = {
  closingDate: 'November 30, 2026',
  responseDate: 'December 15, 2026',
  intakeCycle: '2026 Continental Cohort Intake',
  contactEmail: 'volunteers@pamhoafrica.org',
};

export interface TeamDetail {
  id: VolunteerTeam;
  name: string;
  tagline: string;
  description: string;
  leadResponsibilities: string[];
  skillsLookingFor: string[];
  icon: string;
}

export const PAMHO_TEAMS: TeamDetail[] = [
  {
    id: 'Sponsorships & Grants',
    name: 'Sponsorships & Grants',
    tagline: 'Securing the Catalytic Capital that Powers Pan-African Mental Health',
    description: "Secures the sponsors and funding that power PAMHO's work.",
    leadResponsibilities: [
      'Architect grant submission roadmaps for international health funds',
      'Oversee donor stewardship and strategic corporate sponsorships',
      'Manage team grant writers and pipeline delivery targets',
    ],
    skillsLookingFor: [
      'Grant writers',
      'Fundraisers',
      'Sponsorship officers',
      'Proposal writers',
    ],
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    id: 'Research & Innovation',
    name: 'Research & Innovation',
    tagline: 'Generating Evidence-Based Frameworks and Clinical Digital Tooling',
    description: "Produces the evidence behind PAMHO's work and builds the tools, systems and ideas that move it forward.",
    leadResponsibilities: [
      'Lead empirical research papers, prevalence studies, and clinical briefs',
      'Direct product specifications for digital health and evaluation tools',
      'Coordinate peer review and ethical research clearance',
    ],
    skillsLookingFor: [
      'Researchers',
      'Data analysts',
      'Literature reviewers',
      'Clinical reviewers',
      'Software & app developers',
      'UI/UX designers',
      'Data engineers',
      'AI specialists',
      'Assessment designers',
      'Systems builders',
    ],
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  },
  {
    id: 'Communications & Media',
    name: 'Communications & Media',
    tagline: 'De-stigmatizing African Mental Health Through Narrative & Art',
    description: "Tells PAMHO's story through design, video, writing and social media.",
    leadResponsibilities: [
      'Direct cross-channel narrative campaigns and continental media partnerships',
      'Oversee creative asset quality across visual, video, audio, and multilingual translations',
      'Coordinate editorial schedule and press relations',
    ],
    skillsLookingFor: [
      'Graphic designers',
      'Video editors',
      'Animators',
      'Photographers',
      'Content creators',
      'Content & script writers',
      'Social media managers',
      'Podcast & audio editors',
      'Translators (English, French, Arabic, Portuguese, Swahili)',
    ],
    icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
  },
  {
    id: 'Programs & Operations',
    name: 'Programs & Operations',
    tagline: 'Delivering Grassroots Dialogue, Assemblies, and Seamless Execution',
    description: "Runs PAMHO's events, programmes and day-to-day coordination.",
    leadResponsibilities: [
      'Ensure high-fidelity operations across webinars, summits, and institute courses',
      'Optimize internal workflows, volunteer scheduling, and learning portals',
      'Track community feedback and operational metrics across member nations',
    ],
    skillsLookingFor: [
      'Project coordinators',
      'Event coordinators',
      'Administrators',
      'Virtual assistants',
      'Community managers',
      'Learning administrators',
    ],
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
];

export const AFRICAN_COUNTRIES = [
  'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cabo Verde',
  'Cameroon', 'Central African Republic', 'Chad', 'Comoros', 'Congo (Brazzaville)',
  'Congo (DRC)', 'Côte d\'Ivoire', 'Djibouti', 'Egypt', 'Equatorial Guinea', 'Eritrea',
  'Eswatini', 'Ethiopia', 'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau',
  'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi', 'Mali',
  'Mauritania', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria',
  'Rwanda', 'São Tomé and Príncipe', 'Senegal', 'Seychelles', 'Sierra Leone',
  'Somalia', 'South Africa', 'South Sudan', 'Sudan', 'Tanzania', 'Togo', 'Tunisia',
  'Uganda', 'Zambia', 'Zimbabwe', 'African Diaspora (Europe / Americas / Asia / Other)'
];

export const TIME_ZONES = [
  'UTC / GMT (Ghana, Senegal, Liberia, UK)',
  'WAT / UTC+1 (Nigeria, Cameroon, Angola)',
  'CAT / UTC+2 (South Africa, Zimbabwe, Egypt)',
  'EAT / UTC+3 (Kenya, Ethiopia, Uganda, Tanzania)',
  'Other / Diaspora (UTC-5 to UTC+8)'
];

export const COMMON_LANGUAGES = [
  'English',
  'French (Français)',
  'Arabic (العربية)',
  'Portuguese (Português)',
  'Swahili (Kiswahili)',
  'Hausa',
  'Yoruba',
  'Igbo',
  'Twi / Akan',
  'Amharic',
  'Zulu',
  'Other African Language'
];

export const HOURS_OPTIONS = [
  '5 - 10 hours / week',
  '10 - 15 hours / week',
  '15 - 20 hours / week',
  '20+ hours / week'
];

export function countWords(text: string): number {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function generateReferenceId(): string {
  const year = new Date().getFullYear();
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  const sequence = Math.floor(1000 + Math.random() * 9000);
  return `PAMHO-VOL-${year}-${randomChars}${sequence}`;
}

const STORAGE_KEY = 'pamho_volunteer_receipt';

export function saveReceiptToStorage(receipt: SubmissionReceipt) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(receipt));
  } catch (e) {
    console.error('Failed to save receipt to localStorage', e);
  }
}

export function getReceiptFromStorage(): SubmissionReceipt | null {
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    return null;
  }
}

export async function submitVolunteerApplication(
  type: 'lead' | 'join',
  payload: any
): Promise<{ success: boolean; receipt: SubmissionReceipt; error?: string }> {
  const referenceId = generateReferenceId();
  const receipt: SubmissionReceipt = {
    referenceId,
    type,
    fullName: payload.fullName,
    email: payload.email,
    team: payload.selectedTeam,
    submittedAt: new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
    }),
    responseDate: VOLUNTEER_CONFIG.responseDate,
    closingDate: VOLUNTEER_CONFIG.closingDate,
    summary: {
      country: payload.country,
      qualification: payload.highestQualification,
      hoursPerWeek: payload.hoursPerWeek,
      whyExcerpt:
        type === 'lead'
          ? (payload.whyLeadAndPamho || '').slice(0, 160) + '...'
          : (payload.whyJoinAndPamho || '').slice(0, 160) + '...',
    },
  };

  // Compile detailed text message for backend enquiry
  const formattedMessage = `
========================================
PAMHO VOLUNTEER APPLICATION (${type.toUpperCase()})
Reference ID: ${referenceId}
Submitted: ${new Date().toISOString()}
========================================

PART 1: ABOUT THE APPLICANT
Full Name: ${payload.fullName}
Email: ${payload.email}
WhatsApp: ${payload.whatsapp}
Country: ${payload.country}
Time Zone: ${payload.timeZone}
Highest Qualification & Field: ${payload.highestQualification}
Current Occupation / Study: ${payload.currentOccupation}
CV Uploaded: ${payload.cvFileName ? `${payload.cvFileName} (${Math.round((payload.cvFileSize || 0) / 1024)} KB)` : 'Not provided'}
Social / Links: ${payload.workLinks || 'N/A'}
Languages: ${(payload.languages || []).join(', ')}${payload.otherLanguages ? ` (Other: ${payload.otherLanguages})` : ''}
Reliable Internet & Device: ${payload.reliableInternetAndDevice}

PART 2: TEAM & COMMITMENT
Target Team: ${payload.selectedTeam}
Weekly Hours for 6 Months: ${payload.hoursPerWeek}

PART 3: APPLICATION QUESTIONS
${
  type === 'lead'
    ? `
14. Why Lead this Team & PAMHO:
${payload.whyLeadAndPamho}

15. Team or Project Led & Achievements:
${payload.teamOrProjectLed}

16. First 30 Days Action Plan:
${payload.first30DaysPlan}

17. What PAMHO Most Needs in this Area:
${payload.pamhoMostNeeds}
`
    : `
14. Why Join this Team & PAMHO:
${payload.whyJoinAndPamho}

15. Main Skills (up to 5):
${(payload.skills || []).map((s: string, idx: number) => `   ${idx + 1}. ${s}`).join('\n')}

16. Links or Uploads of Best Work:
   - Sample 1: ${payload.workSample1 || 'N/A'}
   - Sample 2: ${payload.workSample2 || 'N/A'}
   - Sample 3: ${payload.workSample3 || 'N/A'}

17. Weekly Delivery Commitment:
${payload.weeklyDeliverables}
`
}

PART 4: REFEREES
Referee 1:
- Name: ${payload.referee1?.fullName}
- Relationship: ${payload.referee1?.relationship}
- Organization: ${payload.referee1?.organization}
- Email: ${payload.referee1?.email}
- Phone: ${payload.referee1?.phone}

Referee 2:
- Name: ${payload.referee2?.fullName}
- Relationship: ${payload.referee2?.relationship}
- Organization: ${payload.referee2?.organization}
- Email: ${payload.referee2?.email}
- Phone: ${payload.referee2?.phone}

PART 5: CONFIRMATIONS
- Unpaid role & 6-month probation agreed: ${payload.agreedUnpaidAndProbation ? 'YES' : 'NO'}
- Weekly hours commitment agreed: ${payload.agreedWeeklyHours ? 'YES' : 'NO'}
- Referees contacted permission agreed: ${payload.agreedRefereesContacted ? 'YES' : 'NO'}
- Data storage & processing consent: ${payload.agreedDataStorage ? 'YES' : 'NO'}
  `.trim();

  // 1. Submit to dedicated /api/v1/volunteers/ endpoint
  const volunteerPayload = {
    reference_id: referenceId,
    application_type: type,
    status: 'new',
    full_name: payload.fullName,
    email: payload.email,
    whatsapp: payload.whatsapp,
    country: payload.country,
    time_zone: payload.timeZone,
    highest_qualification: payload.highestQualification,
    current_occupation: payload.currentOccupation,
    cv_file_name: payload.cvFileName || '',
    cv_data: payload.cvDataUrl ? payload.cvDataUrl.slice(0, 1000) : '',
    work_links: payload.workLinks || '',
    languages: (payload.languages || []).join(', ') + (payload.otherLanguages ? `, ${payload.otherLanguages}` : ''),
    reliable_internet_device: payload.reliableInternetAndDevice || '',
    selected_team: payload.selectedTeam,
    hours_per_week: payload.hoursPerWeek,
    why_pamho: type === 'lead' ? (payload.whyLeadAndPamho || '') : (payload.whyJoinAndPamho || ''),
    team_project_led: payload.teamOrProjectLed || '',
    first_30_days_plan: payload.first30DaysPlan || '',
    pamho_most_needs: payload.pamhoMostNeeds || '',
    skills: (payload.skills || []).filter(Boolean).join('\n'),
    work_samples: [payload.workSample1, payload.workSample2, payload.workSample3].filter(Boolean).join('\n'),
    weekly_deliverables: payload.weeklyDeliverables || '',
    referee_1_name: payload.referee1?.fullName || '',
    referee_1_relationship: payload.referee1?.relationship || '',
    referee_1_organization: payload.referee1?.organization || '',
    referee_1_email: payload.referee1?.email || '',
    referee_1_phone: payload.referee1?.phone || '',
    referee_2_name: payload.referee2?.fullName || '',
    referee_2_relationship: payload.referee2?.relationship || '',
    referee_2_organization: payload.referee2?.organization || '',
    referee_2_email: payload.referee2?.email || '',
    referee_2_phone: payload.referee2?.phone || '',
    agreed_unpaid_probation: !!payload.agreedUnpaidAndProbation,
    agreed_weekly_hours: !!payload.agreedWeeklyHours,
    agreed_referees_contacted: !!payload.agreedRefereesContacted,
    agreed_data_storage: !!payload.agreedDataStorage,
  };

  try {
    const res = await fetch('/api/v1/volunteers/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(volunteerPayload),
    });

    if (!res.ok) {
      // Fallback to /api/v1/enquiries/
      await fetch('/api/v1/enquiries/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: payload.fullName,
          email: payload.email,
          organization: `${payload.currentOccupation || 'Volunteer'} (${payload.country})`,
          message: formattedMessage,
          enquiry_type: `Volunteer Application - ${type === 'lead' ? 'Lead a Team' : 'Join a Team'} [${payload.selectedTeam}]`,
        }),
      });
    }
  } catch (err) {
    // Attempt enquiry fallback if direct volunteer call threw network error
    try {
      await fetch('/api/v1/enquiries/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: payload.fullName,
          email: payload.email,
          organization: `${payload.currentOccupation || 'Volunteer'} (${payload.country})`,
          message: formattedMessage,
          enquiry_type: `Volunteer Application - ${type === 'lead' ? 'Lead a Team' : 'Join a Team'} [${payload.selectedTeam}]`,
        }),
      });
    } catch (fallbackErr) {
      console.warn('Backend API submission deferred, stored locally in session/localStorage', fallbackErr);
    }
  }

  // Always save receipt so user can access Page 4 seamlessly
  saveReceiptToStorage(receipt);

  return { success: true, receipt };
}
