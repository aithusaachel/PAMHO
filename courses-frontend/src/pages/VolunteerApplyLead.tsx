import { useState, useEffect, useId } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { Reveal } from '../components/Reveal';
import {
  PAMHO_TEAMS,
  AFRICAN_COUNTRIES,
  TIME_ZONES,
  COMMON_LANGUAGES,
  HOURS_OPTIONS,
  countWords,
  submitVolunteerApplication,
} from '../utils/volunteerData';
import type { LeadApplicationData, VolunteerTeam } from '../types/volunteer';

export default function VolunteerApplyLead() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fileInputId = useId();

  const [formData, setFormData] = useState<LeadApplicationData>({
    // Part 1: About you
    fullName: '',
    email: '',
    whatsapp: '',
    country: '',
    timeZone: '',
    highestQualification: '',
    currentOccupation: '',
    cvFileName: '',
    cvFileSize: 0,
    cvDataUrl: '',
    workLinks: '',
    languages: ['English'],
    otherLanguages: '',
    reliableInternetAndDevice: '',

    // Part 2: Your team
    selectedTeam: '',
    hoursPerWeek: '10 - 15 hours / week',

    // Part 3: Leadership application
    whyLeadAndPamho: '',
    teamOrProjectLed: '',
    first30DaysPlan: '',
    pamhoMostNeeds: '',

    // Part 4: Referees
    referee1: {
      fullName: '',
      relationship: '',
      organization: '',
      email: '',
      phone: '',
    },
    referee2: {
      fullName: '',
      relationship: '',
      organization: '',
      email: '',
      phone: '',
    },

    // Part 5: Confirmation
    agreedUnpaidAndProbation: false,
    agreedWeeklyHours: false,
    agreedRefereesContacted: false,
    agreedDataStorage: false,
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const teamParam = searchParams.get('team');
    if (teamParam && PAMHO_TEAMS.some((t) => t.id === teamParam)) {
      setFormData((prev) => ({ ...prev, selectedTeam: teamParam as VolunteerTeam }));
    }
  }, [searchParams]);

  const whyLeadWordCount = countWords(formData.whyLeadAndPamho);
  const isWordCountExceeded = whyLeadWordCount > 150;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setErrorMessage('Please upload a valid PDF document for your CV.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('CV file size exceeds 10MB limit. Please upload a smaller PDF.');
      return;
    }

    setErrorMessage('');
    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        cvFileName: file.name,
        cvFileSize: file.size,
        cvDataUrl: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeUploadedCV = () => {
    setFormData((prev) => ({
      ...prev,
      cvFileName: '',
      cvFileSize: 0,
      cvDataUrl: '',
    }));
  };

  const handleLanguageToggle = (lang: string) => {
    setFormData((prev) => {
      const exists = prev.languages.includes(lang);
      return {
        ...prev,
        languages: exists
          ? prev.languages.filter((l) => l !== lang)
          : [...prev.languages, lang],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.whatsapp.trim()) {
      setErrorMessage('Please complete all required fields in Part 1 (Full Name, Email, WhatsApp).');
      return;
    }

    if (!formData.country || !formData.timeZone) {
      setErrorMessage('Please select your Country of residence and Time zone.');
      return;
    }

    if (!formData.highestQualification.trim() || !formData.currentOccupation.trim()) {
      setErrorMessage('Please provide your highest qualification and current occupation/study.');
      return;
    }

    if (!formData.cvFileName) {
      setErrorMessage('Please upload your CV in PDF format (Question 8).');
      return;
    }

    if (formData.languages.length === 0 && !formData.otherLanguages?.trim()) {
      setErrorMessage('Please select at least one language you can work in.');
      return;
    }

    if (!formData.reliableInternetAndDevice) {
      setErrorMessage('Please indicate if you have a reliable internet connection and device (Question 11).');
      return;
    }

    if (!formData.selectedTeam) {
      setErrorMessage('Please select which team you want to lead (Part 2, Question 12).');
      return;
    }

    if (!formData.whyLeadAndPamho.trim() || !formData.teamOrProjectLed.trim() || !formData.first30DaysPlan.trim() || !formData.pamhoMostNeeds.trim()) {
      setErrorMessage('Please answer all application questions in Part 3.');
      return;
    }

    if (isWordCountExceeded) {
      setErrorMessage('Question 14 exceeds the 150-word limit. Please shorten your response.');
      return;
    }

    if (
      !formData.referee1.fullName.trim() ||
      !formData.referee1.relationship.trim() ||
      !formData.referee1.email.trim() ||
      !formData.referee2.fullName.trim() ||
      !formData.referee2.relationship.trim() ||
      !formData.referee2.email.trim()
    ) {
      setErrorMessage('Please provide complete information for both Referee 1 and Referee 2.');
      return;
    }

    if (
      !formData.agreedUnpaidAndProbation ||
      !formData.agreedWeeklyHours ||
      !formData.agreedRefereesContacted ||
      !formData.agreedDataStorage
    ) {
      setErrorMessage('Please confirm all four check-boxes in Part 5 to submit your application.');
      return;
    }

    setStatus('submitting');

    try {
      const result = await submitVolunteerApplication('lead', formData);
      if (result.success) {
        navigate('/volunteer/success');
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Submission failed. Please try again.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'An error occurred during submission.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-[#030303]">
      <SEO
        title="Apply to Lead a Team | PAMHO"
        description="PAMHO Volunteer Application — Apply to Lead a Team. Complete all fields."
      />
      <div className="grain-overlay"></div>

      {/*  */}
      {/* 1. THE OPENING                                               */}
      {/* */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24 border-b border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container flex flex-col items-start max-w-5xl">
          <Reveal>
            <h1 className="title-hero mb-8">
              Apply to Lead a <span className="italic text-[rgba(245,242,233,0.7)]">Team.</span>
            </h1>
            <p className="text-body-large text-[rgba(245,242,233,0.6)] font-light leading-relaxed">
              Complete all fields. Questions marked (optional) can be skipped.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. FORM BODY                                                 */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 bg-[#110E0C]">
        <div className="canvas-container max-w-4xl mx-auto">
          <Reveal>
            <form onSubmit={handleSubmit} className="flex flex-col gap-16 border border-[rgba(245,242,233,0.1)] p-8 md:p-16 bg-[#110E0C]">

              {errorMessage && (
                <div className="text-red-400 border border-red-900/50 bg-red-900/10 p-4 font-sans font-light text-sm">
                  {errorMessage}
                </div>
              )}

              {/* ──────────────────────────────────────────────────────────
                  PART 1: ABOUT YOU
              ────────────────────────────────────────────────────────── */}
              <div>
                <div className="border-b border-[rgba(245,242,233,0.1)] pb-4 mb-10">
                  <h2 className="font-serif text-3xl md:text-4xl text-[#F5F2E9]">About you</h2>
                </div>

                <div className="flex flex-col gap-8">
                  {/* 1. Full name & 2. Email address */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#8442FA] transition-colors pb-2">
                      <label htmlFor="fullName" className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">
                        1. Full name
                      </label>
                      <input
                        id="fullName"
                        required
                        type="text"
                        className="w-full bg-transparent font-serif text-xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]"
                        placeholder="Your full name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>

                    <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#8442FA] transition-colors pb-2">
                      <label htmlFor="email" className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">
                        2. Email address
                      </label>
                      <input
                        id="email"
                        required
                        type="email"
                        className="w-full bg-transparent font-serif text-xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]"
                        placeholder="yourname@domain.org"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* 3. WhatsApp & 4. Country of residence */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#8442FA] transition-colors pb-2">
                      <label htmlFor="whatsapp" className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">
                        3. WhatsApp number
                      </label>
                      <input
                        id="whatsapp"
                        required
                        type="text"
                        className="w-full bg-transparent font-serif text-xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]"
                        placeholder="+233 24 000 0000"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      />
                    </div>

                    <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#8442FA] transition-colors pb-2">
                      <label htmlFor="country" className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">
                        4. Country of residence
                      </label>
                      <select
                        id="country"
                        required
                        className="w-full bg-transparent font-serif text-xl text-[#F5F2E9] focus:outline-none appearance-none cursor-pointer"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      >
                        <option value="" className="bg-[#110E0C]">Select country...</option>
                        {AFRICAN_COUNTRIES.map((c) => (
                          <option key={c} value={c} className="bg-[#110E0C]">{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* 5. Time zone & 6. Highest qualification */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#8442FA] transition-colors pb-2">
                      <label htmlFor="timeZone" className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">
                        5. Time zone
                      </label>
                      <select
                        id="timeZone"
                        required
                        className="w-full bg-transparent font-serif text-xl text-[#F5F2E9] focus:outline-none appearance-none cursor-pointer"
                        value={formData.timeZone}
                        onChange={(e) => setFormData({ ...formData, timeZone: e.target.value })}
                      >
                        <option value="" className="bg-[#110E0C]">Select time zone...</option>
                        {TIME_ZONES.map((tz) => (
                          <option key={tz} value={tz} className="bg-[#110E0C]">{tz}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#8442FA] transition-colors pb-2">
                      <label htmlFor="highestQualification" className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">
                        6. Highest qualification and field of study
                      </label>
                      <input
                        id="highestQualification"
                        required
                        type="text"
                        className="w-full bg-transparent font-serif text-xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]"
                        placeholder="e.g. Master's in Clinical Psychology"
                        value={formData.highestQualification}
                        onChange={(e) => setFormData({ ...formData, highestQualification: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* 7. Current occupation or study */}
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#8442FA] transition-colors pb-2">
                    <label htmlFor="currentOccupation" className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">
                      7. Current occupation or study
                    </label>
                    <input
                      id="currentOccupation"
                      required
                      type="text"
                      className="w-full bg-transparent font-serif text-xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]"
                      placeholder="e.g. Project Lead, Global Health Institute"
                      value={formData.currentOccupation}
                      onChange={(e) => setFormData({ ...formData, currentOccupation: e.target.value })}
                    />
                  </div>

                  {/* 8. Upload your CV (PDF) */}
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] pb-4">
                    <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-3">
                      8. Upload your CV (PDF)
                    </label>
                    {!formData.cvFileName ? (
                      <div className="flex items-center gap-4">
                        <label
                          htmlFor={fileInputId}
                          className="cursor-pointer border border-[rgba(245,242,233,0.2)] hover:border-[#8442FA] hover:text-[#8442FA] px-6 py-3 font-sans font-medium text-[11px] uppercase tracking-[0.2em] transition-colors inline-block"
                        >
                          Select PDF Document
                        </label>
                        <input
                          id={fileInputId}
                          type="file"
                          accept="application/pdf"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <span className="font-sans font-light text-xs text-[rgba(245,242,233,0.4)]">
                          PDF format only, maximum 10MB
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between border border-[rgba(245,242,233,0.2)] p-4 bg-[#030303]/40">
                        <div>
                          <p className="font-serif text-lg text-[#F5F2E9]">{formData.cvFileName}</p>
                          <p className="font-sans text-xs text-[rgba(245,242,233,0.4)]">
                            {Math.round((formData.cvFileSize || 0) / 1024)} KB &mdash; Attached
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={removeUploadedCV}
                          className="font-sans text-xs text-red-400 hover:text-red-300 uppercase tracking-wider"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 9. LinkedIn / Instagram / Twitter */}
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#8442FA] transition-colors pb-2">
                    <label htmlFor="workLinks" className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">
                      9. LinkedIn profile /Instagram Profile/Twiter Profile or links to your work (optional)
                    </label>
                    <input
                      id="workLinks"
                      type="text"
                      className="w-full bg-transparent font-serif text-xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]"
                      placeholder="Profile links or portfolio URL"
                      value={formData.workLinks}
                      onChange={(e) => setFormData({ ...formData, workLinks: e.target.value })}
                    />
                  </div>

                  {/* 10. Languages you can work in */}
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] pb-4">
                    <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-3">
                      10. Languages you can work in
                    </label>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {COMMON_LANGUAGES.map((lang) => {
                        const isChecked = formData.languages.includes(lang);
                        return (
                          <button
                            key={lang}
                            type="button"
                            onClick={() => handleLanguageToggle(lang)}
                            className={`border px-4 py-2 font-sans font-light text-xs transition-colors ${isChecked
                                ? 'border-[#8442FA] text-[#F5F2E9] bg-[#8442FA]/15'
                                : 'border-[rgba(245,242,233,0.15)] text-[rgba(245,242,233,0.5)] hover:border-[rgba(245,242,233,0.4)]'
                              }`}
                          >
                            {isChecked ? '✓ ' : ''}{lang}
                          </button>
                        );
                      })}
                    </div>
                    <input
                      type="text"
                      placeholder="Other languages not listed..."
                      value={formData.otherLanguages || ''}
                      onChange={(e) => setFormData({ ...formData, otherLanguages: e.target.value })}
                      className="w-full bg-transparent font-serif text-lg text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)] border-t border-[rgba(245,242,233,0.06)] pt-2"
                    />
                  </div>

                  {/* 11. Reliable internet connection and device */}
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] pb-4">
                    <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-3">
                      11. Do you have a reliable internet connection and a device for working online? (Yes / No)
                    </label>
                    <div className="flex gap-8">
                      {['Yes', 'No'].map((val) => (
                        <label key={val} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="reliableInternetAndDevice"
                            value={val}
                            checked={formData.reliableInternetAndDevice === val}
                            onChange={() => setFormData({ ...formData, reliableInternetAndDevice: val as 'Yes' | 'No' })}
                            className="accent-[#8442FA]"
                          />
                          <span className="font-serif text-xl text-[#F5F2E9]">{val}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ──────────────────────────────────────────────────────────
                  PART 2: YOUR TEAM
              ────────────────────────────────────────────────────────── */}
              <div>
                <div className="border-b border-[rgba(245,242,233,0.1)] pb-4 mb-10">
                  <h2 className="font-serif text-3xl md:text-4xl text-[#F5F2E9]">Your team</h2>
                </div>

                <div className="flex flex-col gap-8">
                  {/* 12. Which team do you want to lead? */}
                  <div>
                    <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-4 block">
                      12. Which team do you want to lead? Choose one:
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {PAMHO_TEAMS.map((team) => {
                        const isChosen = formData.selectedTeam === team.id;
                        return (
                          <div
                            key={team.id}
                            onClick={() => setFormData({ ...formData, selectedTeam: team.id })}
                            className={`border p-6 cursor-pointer transition-colors ${isChosen
                                ? 'border-[#8442FA] bg-[#8442FA]/10'
                                : 'border-[rgba(245,242,233,0.1)] hover:border-[rgba(245,242,233,0.3)] bg-[#030303]/30'
                              }`}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <span className={`w-3 h-3 rounded-full border ${isChosen ? 'border-[#8442FA] bg-[#8442FA]' : 'border-[rgba(245,242,233,0.3)]'}`}></span>
                              <h4 className="font-serif text-2xl text-[#F5F2E9]">{team.name}</h4>
                            </div>
                            <p className="font-sans font-light text-xs text-[rgba(245,242,233,0.6)] leading-relaxed">
                              {team.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 13. How many hours per week */}
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] pb-4">
                    <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-3">
                      13. How many hours per week can you reliably give for the next six months?
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {HOURS_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setFormData({ ...formData, hoursPerWeek: opt })}
                          className={`border px-5 py-3 font-sans text-xs transition-colors ${formData.hoursPerWeek === opt
                              ? 'border-[#8442FA] text-[#F5F2E9] bg-[#8442FA]/15'
                              : 'border-[rgba(245,242,233,0.15)] text-[rgba(245,242,233,0.6)] hover:border-[rgba(245,242,233,0.4)]'
                            }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ──────────────────────────────────────────────────────────
                  PART 3: YOUR APPLICATION
              ────────────────────────────────────────────────────────── */}
              <div>
                <div className="border-b border-[rgba(245,242,233,0.1)] pb-4 mb-10">
                  <h2 className="font-serif text-3xl md:text-4xl text-[#F5F2E9]">Your application</h2>
                </div>

                <div className="flex flex-col gap-10">
                  {/* 14. Why do you want to lead this team */}
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#8442FA] transition-colors pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="whyLead" className="label-tracking text-[rgba(245,242,233,0.4)]">
                        14. Why do you want to lead this team, and why PAMHO? (up to 150 words)
                      </label>
                      <span className={`font-mono text-xs ${isWordCountExceeded ? 'text-red-400 font-bold' : 'text-[rgba(245,242,233,0.4)]'}`}>
                        {whyLeadWordCount} / 150 words
                      </span>
                    </div>
                    <textarea
                      id="whyLead"
                      required
                      rows={4}
                      className="w-full bg-transparent font-sans font-light text-lg text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)] resize-none"
                      placeholder="Share your personal leadership motivation and organizational alignment..."
                      value={formData.whyLeadAndPamho}
                      onChange={(e) => setFormData({ ...formData, whyLeadAndPamho: e.target.value })}
                    />
                  </div>

                  {/* 15. Describe a team or project you have led */}
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#8442FA] transition-colors pb-4">
                    <label htmlFor="teamOrProjectLed" className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">
                      15. Describe a team or project you have led and what it achieved.
                    </label>
                    <textarea
                      id="teamOrProjectLed"
                      required
                      rows={4}
                      className="w-full bg-transparent font-sans font-light text-lg text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)] resize-none"
                      placeholder="Outline the scope, team structure, and concrete outcomes achieved..."
                      value={formData.teamOrProjectLed}
                      onChange={(e) => setFormData({ ...formData, teamOrProjectLed: e.target.value })}
                    />
                  </div>

                  {/* 16. What would you do in your first 30 days */}
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#8442FA] transition-colors pb-4">
                    <label htmlFor="first30DaysPlan" className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">
                      16. What would you do in your first 30 days leading this team?
                    </label>
                    <textarea
                      id="first30DaysPlan"
                      required
                      rows={4}
                      className="w-full bg-transparent font-sans font-light text-lg text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)] resize-none"
                      placeholder="Detail your immediate milestones, onboarding priorities, and team deliverables..."
                      value={formData.first30DaysPlan}
                      onChange={(e) => setFormData({ ...formData, first30DaysPlan: e.target.value })}
                    />
                  </div>

                  {/* 17. What does PAMHO most need in this area right now */}
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#8442FA] transition-colors pb-4">
                    <label htmlFor="pamhoMostNeeds" className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">
                      17. What does PAMHO most need in this area right now?
                    </label>
                    <textarea
                      id="pamhoMostNeeds"
                      required
                      rows={4}
                      className="w-full bg-transparent font-sans font-light text-lg text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)] resize-none"
                      placeholder="Give your appraisal of strategic gaps, systemic needs, and high-impact interventions..."
                      value={formData.pamhoMostNeeds}
                      onChange={(e) => setFormData({ ...formData, pamhoMostNeeds: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* ──────────────────────────────────────────────────────────
                  PART 4: REFEREES
              ────────────────────────────────────────────────────────── */}
              <div>
                <div className="border-b border-[rgba(245,242,233,0.1)] pb-4 mb-10">
                  <h2 className="font-serif text-3xl md:text-4xl text-[#F5F2E9]">Referees</h2>
                  <p className="font-sans font-light text-sm text-[rgba(245,242,233,0.5)] mt-2">
                    Please give two referees, ideally one academic and one professional.
                  </p>
                </div>

                <div className="flex flex-col gap-12">
                  {/* Referee 1 */}
                  <div className="border border-[rgba(245,242,233,0.1)] p-6 bg-[#030303]/40">
                    <label className="label-tracking text-[rgba(245,242,233,0.4)] block mb-4">
                      18. Referee 1: full name, relationship to you, organization, email, phone number
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border-b border-[rgba(245,242,233,0.1)] pb-2">
                        <input
                          required
                          type="text"
                          className="w-full bg-transparent font-serif text-lg text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.2)]"
                          placeholder="Full name"
                          value={formData.referee1.fullName}
                          onChange={(e) => setFormData({ ...formData, referee1: { ...formData.referee1, fullName: e.target.value } })}
                        />
                      </div>
                      <div className="border-b border-[rgba(245,242,233,0.1)] pb-2">
                        <input
                          required
                          type="text"
                          className="w-full bg-transparent font-serif text-lg text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.2)]"
                          placeholder="Relationship to you"
                          value={formData.referee1.relationship}
                          onChange={(e) => setFormData({ ...formData, referee1: { ...formData.referee1, relationship: e.target.value } })}
                        />
                      </div>
                      <div className="border-b border-[rgba(245,242,233,0.1)] pb-2">
                        <input
                          required
                          type="text"
                          className="w-full bg-transparent font-serif text-lg text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.2)]"
                          placeholder="Organization"
                          value={formData.referee1.organization}
                          onChange={(e) => setFormData({ ...formData, referee1: { ...formData.referee1, organization: e.target.value } })}
                        />
                      </div>
                      <div className="border-b border-[rgba(245,242,233,0.1)] pb-2">
                        <input
                          required
                          type="email"
                          className="w-full bg-transparent font-serif text-lg text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.2)]"
                          placeholder="Email address"
                          value={formData.referee1.email}
                          onChange={(e) => setFormData({ ...formData, referee1: { ...formData.referee1, email: e.target.value } })}
                        />
                      </div>
                      <div className="md:col-span-2 border-b border-[rgba(245,242,233,0.1)] pb-2">
                        <input
                          required
                          type="tel"
                          className="w-full bg-transparent font-serif text-lg text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.2)]"
                          placeholder="Phone number"
                          value={formData.referee1.phone}
                          onChange={(e) => setFormData({ ...formData, referee1: { ...formData.referee1, phone: e.target.value } })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Referee 2 */}
                  <div className="border border-[rgba(245,242,233,0.1)] p-6 bg-[#030303]/40">
                    <label className="label-tracking text-[rgba(245,242,233,0.4)] block mb-4">
                      19. Referee 2: full name, relationship to you, organization, email, phone number
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border-b border-[rgba(245,242,233,0.1)] pb-2">
                        <input
                          required
                          type="text"
                          className="w-full bg-transparent font-serif text-lg text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.2)]"
                          placeholder="Full name"
                          value={formData.referee2.fullName}
                          onChange={(e) => setFormData({ ...formData, referee2: { ...formData.referee2, fullName: e.target.value } })}
                        />
                      </div>
                      <div className="border-b border-[rgba(245,242,233,0.1)] pb-2">
                        <input
                          required
                          type="text"
                          className="w-full bg-transparent font-serif text-lg text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.2)]"
                          placeholder="Relationship to you"
                          value={formData.referee2.relationship}
                          onChange={(e) => setFormData({ ...formData, referee2: { ...formData.referee2, relationship: e.target.value } })}
                        />
                      </div>
                      <div className="border-b border-[rgba(245,242,233,0.1)] pb-2">
                        <input
                          required
                          type="text"
                          className="w-full bg-transparent font-serif text-lg text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.2)]"
                          placeholder="Organization"
                          value={formData.referee2.organization}
                          onChange={(e) => setFormData({ ...formData, referee2: { ...formData.referee2, organization: e.target.value } })}
                        />
                      </div>
                      <div className="border-b border-[rgba(245,242,233,0.1)] pb-2">
                        <input
                          required
                          type="email"
                          className="w-full bg-transparent font-serif text-lg text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.2)]"
                          placeholder="Email address"
                          value={formData.referee2.email}
                          onChange={(e) => setFormData({ ...formData, referee2: { ...formData.referee2, email: e.target.value } })}
                        />
                      </div>
                      <div className="md:col-span-2 border-b border-[rgba(245,242,233,0.1)] pb-2">
                        <input
                          required
                          type="tel"
                          className="w-full bg-transparent font-serif text-lg text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.2)]"
                          placeholder="Phone number"
                          value={formData.referee2.phone}
                          onChange={(e) => setFormData({ ...formData, referee2: { ...formData.referee2, phone: e.target.value } })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ──────────────────────────────────────────────────────────
                  PART 5: CONFIRMATION
              ────────────────────────────────────────────────────────── */}
              <div>
                <div className="border-b border-[rgba(245,242,233,0.1)] pb-4 mb-8">
                  <h2 className="font-serif text-3xl md:text-4xl text-[#F5F2E9]">Confirmation</h2>
                  <p className="font-sans font-light text-sm text-[rgba(245,242,233,0.5)] mt-2">
                    Please tick each box:
                  </p>
                </div>

                <div className="flex flex-col gap-6 mb-12">
                  <label className="flex items-start gap-4 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.agreedUnpaidAndProbation}
                      onChange={(e) => setFormData({ ...formData, agreedUnpaidAndProbation: e.target.checked })}
                      className="accent-[#8442FA] mt-1"
                    />
                    <span className="font-sans font-light text-[rgba(245,242,233,0.7)] text-sm md:text-base leading-relaxed">
                      I understand this is an unpaid volunteer role with a six-month probation and a review.
                    </span>
                  </label>

                  <label className="flex items-start gap-4 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.agreedWeeklyHours}
                      onChange={(e) => setFormData({ ...formData, agreedWeeklyHours: e.target.checked })}
                      className="accent-[#8442FA] mt-1"
                    />
                    <span className="font-sans font-light text-[rgba(245,242,233,0.7)] text-sm md:text-base leading-relaxed">
                      I can give the weekly hours I have stated.
                    </span>
                  </label>

                  <label className="flex items-start gap-4 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.agreedRefereesContacted}
                      onChange={(e) => setFormData({ ...formData, agreedRefereesContacted: e.target.checked })}
                      className="accent-[#8442FA] mt-1"
                    />
                    <span className="font-sans font-light text-[rgba(245,242,233,0.7)] text-sm md:text-base leading-relaxed">
                      My referees have agreed to be contacted if I am shortlisted.
                    </span>
                  </label>

                  <label className="flex items-start gap-4 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.agreedDataStorage}
                      onChange={(e) => setFormData({ ...formData, agreedDataStorage: e.target.checked })}
                      className="accent-[#8442FA] mt-1"
                    />
                    <span className="font-sans font-light text-[rgba(245,242,233,0.7)] text-sm md:text-base leading-relaxed">
                      I agree to PAMHO storing and using my information for this selection process.
                    </span>
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-[rgba(245,242,233,0.1)]">
                  <Link
                    to="/volunteer"
                    className="label-tracking text-[rgba(245,242,233,0.5)] hover:text-[#F5F2E9] transition-colors"
                  >
                    &larr; Return to overview
                  </Link>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-cinematic w-full sm:w-auto"
                  >
                    {status === 'submitting' ? 'Submitting Application...' : 'Submit application'}
                  </button>
                </div>
              </div>

            </form>

            <div className="mt-16 text-center">
              <p className="label-tracking !text-[10px] text-[rgba(245,242,233,0.3)]">
                Pan-African Mental Health Organization &middot; Healthy Minds, Healthy Lives.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
