import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Reveal } from '../components/Reveal';
import {
  VOLUNTEER_CONFIG,
  getReceiptFromStorage,
} from '../utils/volunteerData';
import type { SubmissionReceipt } from '../types/volunteer';

export default function VolunteerSuccess() {
  const [receipt, setReceipt] = useState<SubmissionReceipt | null>(null);

  useEffect(() => {
    const saved = getReceiptFromStorage();
    if (saved) {
      setReceipt(saved);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative bg-[#030303]">
      <SEO
        title="Application Received | PAMHO"
        description="Thank you. Your PAMHO volunteer application has been received."
      />
      <div className="grain-overlay"></div>

      {/* ============================================================ */}
      {/* 1. THE OPENING                                               */}
      {/* ============================================================ */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24 border-b border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container flex flex-col items-start max-w-5xl">
          <Reveal>
            <h1 className="title-hero mb-8">
              After you <span className="italic text-[rgba(245,242,233,0.7)]">submit.</span>
            </h1>
            <p className="text-body-large text-[rgba(245,242,233,0.6)] font-light leading-relaxed">
              Pan-African Mental Health Organization (PAMHO) &middot; Healthy Minds, Healthy Lives.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. CONFIRMATION CARD                                         */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 bg-[#110E0C]">
        <div className="canvas-container max-w-3xl mx-auto">
          <Reveal>
            <div className="border border-[rgba(245,242,233,0.1)] p-8 md:p-16 bg-[#110E0C]">
              <span className="font-serif text-[#8442FA] text-6xl mb-8 block opacity-50">✓</span>

              <h2 className="font-serif text-3xl md:text-5xl text-[#F5F2E9] mb-8 leading-tight font-light">
                Thank you. Your application has been received.
              </h2>

              <p className="font-sans font-light text-[rgba(245,242,233,0.75)] text-lg md:text-xl mb-4 leading-relaxed">
                Shortlisted applicants will be contacted by email for an interview.
              </p>

              <p className="font-sans font-light text-[rgba(245,242,233,0.75)] text-lg md:text-xl mb-12 leading-relaxed">
                We will respond to every applicant by{' '}
                <span className="text-[#F5F2E9] font-normal underline decoration-[#8442FA] underline-offset-4">
                  {receipt?.responseDate || VOLUNTEER_CONFIG.responseDate}
                </span>.
              </p>

              {/* Reference Details */}
              <div className="border-t border-[rgba(245,242,233,0.1)] pt-8 mb-12 flex flex-col gap-4 text-sm font-sans font-light text-[rgba(245,242,233,0.6)]">
                {receipt?.referenceId && (
                  <div className="flex justify-between items-center py-1 border-b border-[rgba(245,242,233,0.05)]">
                    <span className="label-tracking text-[rgba(245,242,233,0.4)]">Reference Code</span>
                    <span className="font-mono text-[#F5F2E9]">{receipt.referenceId}</span>
                  </div>
                )}
                {receipt?.team && (
                  <div className="flex justify-between items-center py-1 border-b border-[rgba(245,242,233,0.05)]">
                    <span className="label-tracking text-[rgba(245,242,233,0.4)]">Team</span>
                    <span className="font-serif text-lg text-[#F5F2E9]">{receipt.team}</span>
                  </div>
                )}
                {receipt?.fullName && (
                  <div className="flex justify-between items-center py-1 border-b border-[rgba(245,242,233,0.05)]">
                    <span className="label-tracking text-[rgba(245,242,233,0.4)]">Applicant</span>
                    <span className="text-[#F5F2E9]">{receipt.fullName}</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-1">
                  <span className="label-tracking text-[rgba(245,242,233,0.4)]">Mandate</span>
                  <span className="italic text-[rgba(245,242,233,0.8)]">Healthy Minds, Healthy Lives.</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/" className="btn-cinematic text-center justify-center">
                  Return to Home
                </Link>
                <Link to="/programs" className="px-8 border border-[rgba(245,242,233,0.2)] text-[rgba(245,242,233,0.6)] hover:text-[#F5F2E9] hover:border-[#F5F2E9] font-sans font-medium text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center">
                  Explore Programs
                </Link>
              </div>
            </div>

            <div className="mt-16 text-center">
              <p className="label-tracking !text-[10px] text-[rgba(245,242,233,0.3)]">
                Pan-African Mental Health Organization (PAMHO) &middot; Healthy Minds, Healthy Lives.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
