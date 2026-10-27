export type VolunteerTeam =
  | 'Sponsorships & Grants'
  | 'Research & Innovation'
  | 'Communications & Media'
  | 'Programs & Operations';

export interface RefereeInfo {
  fullName: string;
  relationship: string;
  organization: string;
  email: string;
  phone: string;
}

export interface BaseVolunteerForm {
  // Part 1: About you
  fullName: string;
  email: string;
  whatsapp: string;
  country: string;
  timeZone: string;
  highestQualification: string;
  currentOccupation: string;
  cvFileName?: string;
  cvFileSize?: number;
  cvDataUrl?: string;
  workLinks: string; // LinkedIn / Instagram / Twitter / Portfolio
  languages: string[];
  otherLanguages?: string;
  reliableInternetAndDevice: 'Yes' | 'No' | '';

  // Part 2: Your team
  selectedTeam: VolunteerTeam | '';
  hoursPerWeek: string;

  // Part 4: Referees
  referee1: RefereeInfo;
  referee2: RefereeInfo;

  // Part 5: Confirmation
  agreedUnpaidAndProbation: boolean;
  agreedWeeklyHours: boolean;
  agreedRefereesContacted: boolean;
  agreedDataStorage: boolean;
}

export interface LeadApplicationData extends BaseVolunteerForm {
  // Part 3: Leadership application
  whyLeadAndPamho: string; // up to 150 words
  teamOrProjectLed: string;
  first30DaysPlan: string;
  pamhoMostNeeds: string;
}

export interface JoinApplicationData extends BaseVolunteerForm {
  // Part 3: Member application
  whyJoinAndPamho: string; // up to 150 words
  skills: string[]; // up to 5 skills
  workSample1: string; // link or upload description
  workSample2: string;
  workSample3: string;
  weeklyDeliverables: string;
}

export interface SubmissionReceipt {
  referenceId: string;
  type: 'lead' | 'join';
  fullName: string;
  email: string;
  team: string;
  submittedAt: string;
  responseDate: string;
  closingDate: string;
  summary: {
    country: string;
    qualification: string;
    hoursPerWeek: string;
    whyExcerpt: string;
  };
}
