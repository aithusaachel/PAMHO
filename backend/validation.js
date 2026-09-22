import { z } from 'zod';

const ContactSchema = z.object({
  fullName: z.string().min(1).max(100),
  email: z.string().email().max(150),
  whatsapp: z.string().min(1).max(50),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(5000),
}).strict();

const JoinSchema = z.object({
  fullName: z.string().min(1).max(100),
  country: z.string().min(1).max(100),
  email: z.string().email().max(150),
  whatsapp: z.string().min(1).max(50),
  occupation: z.string().min(1).max(200),
  referral: z.string().min(1).max(200),
  ambassadorReferral: z.string().max(200).optional().or(z.literal("")),
  theme: z.string().min(1).max(100),
  message: z.string().max(5000).optional().or(z.literal("")),
}).strict();

const PartnersSchema = z.object({
  orgName: z.string().min(1).max(200),
  orgType: z.enum(["NGO", "University", "Research Institution", "Professional Association", "Youth Organization", "Community Organization", "International Organization", "Other"]),
  countryReg: z.string().min(1).max(100),
  regions: z.string().min(1).max(500),
  contactName: z.string().min(1).max(100),
  contactRole: z.string().min(1).max(100),
  contactEmail: z.string().email().max(150),
  contactWhatsapp: z.string().min(1).max(50),
  website: z.string().url().max(300).optional().or(z.literal("")),
  instagram: z.string().max(100).optional().or(z.literal("")),
  twitter: z.string().max(100).optional().or(z.literal("")),
  linkedin: z.string().url().max(300).optional().or(z.literal("")),
  description: z.string().min(1).max(5000),
  heardAbout: z.string().min(1).max(200),
  contribution: z.string().min(1).max(5000),
  speaking: z.enum(["Yes", "No"]),
  additional: z.string().max(5000).optional().or(z.literal("")),
}).strict();

const ConversationSchema = z.object({
  fullName: z.string().min(1).max(100),
  country: z.string().min(1).max(100),
  whatsapp: z.string().min(1).max(50),
  email: z.string().email().max(150),
  background: z.string().min(1).max(5000),
  title: z.string().min(1).max(200),
  theme: z.string().min(1).max(100),
  format: z.string().min(1).max(100),
  abstract: z.string().min(1).max(5000),
  panelSuggestions: z.string().max(5000).optional().or(z.literal("")),
  why: z.string().min(1).max(5000),
  instagram: z.string().max(100).optional().or(z.literal("")),
  twitter: z.string().max(100).optional().or(z.literal("")),
  linkedin: z.string().url().max(300).optional().or(z.literal("")),
}).strict();

const AmbassadorsSchema = z.object({
  fullName: z.string().min(1).max(100),
  country: z.string().min(1).max(100),
  city: z.string().min(1).max(100),
  email: z.string().email().max(150),
  whatsapp: z.string().min(1).max(50),
  instagram: z.string().max(100).optional().or(z.literal("")),
  twitter: z.string().max(100).optional().or(z.literal("")),
  linkedin: z.string().url().max(300).optional().or(z.literal("")),
  occupation: z.string().min(1).max(200),
  why: z.string().min(1).max(5000),
  promote: z.string().min(1).max(5000),
  meaning: z.string().min(1).max(5000),
  reach: z.enum(["Under 500", "500 to 2000", "2000 to 10000", "Over 10000"]),
  prior: z.enum(["Yes", "No"]),
  priorDetails: z.string().max(5000).optional().or(z.literal("")),
}).strict();

// Master schema with discriminated union based on formType
export const SubmissionSchema = z.discriminatedUnion("formType", [
  z.object({ formType: z.literal("contact"), data: ContactSchema }),
  z.object({ formType: z.literal("join"), data: JoinSchema }),
  z.object({ formType: z.literal("partners"), data: PartnersSchema }),
  z.object({ formType: z.literal("conversation"), data: ConversationSchema }),
  z.object({ formType: z.literal("ambassadors"), data: AmbassadorsSchema }),
]);
