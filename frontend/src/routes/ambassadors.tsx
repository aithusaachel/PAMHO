import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Field, TextareaField, SelectField, RadioField } from "@/components/site/FormFields";
import { Reveal } from "@/components/site/Reveal";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import pattern from "@/assets/pattern.svg";
import ambBanner from "@/assets/ambassadors-banner.jpg";
import ambNetwork from "@/assets/ambassadors-network.jpg";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/ambassadors")({
  head: () => ({
    meta: [
      { title: "Become a PAMHO Ambassador" },
      {
        name: "description",
        content:
          "Apply to become a Pan-African Mental Health Conversation Ambassador. Represent. Amplify. Lead.",
      },
      { property: "og:title", content: "Become a PAMHO Ambassador" },
      { property: "og:description", content: "Represent. Amplify. Lead. Join Africa's continental mental health movement." },
    ],
  }),
  component: AmbassadorsPage,
});

const doList = [
  "Promote the Pan-African Mental Health Conversation within their networks and communities.",
  "Share official PAMHO content across their social media platforms.",
  "Encourage speakers, partners, and participants to apply and engage.",
  "Represent PAMHO's values and mission in their regions.",
  "Participate in Ambassador briefings and coordination sessions.",
  "Provide feedback and on-the-ground insights to the PAMHO team.",
  "Attend and actively participate in the conversation itself.",
];

const receiveList = [
  "Official title: Pan-African Mental Health Conversation Ambassador.",
  "Official digital certificate from PAMHO.",
  "Featured recognition on the PAMHO website.",
  "Access to exclusive Ambassador briefings and networks.",
  "Direct connection to PAMHO's growing continental network.",
  "Priority consideration for PAMHO's permanent Ambassador Program.",
  "Reference letter from PAMHO upon successful completion available on request.",
];

function AmbassadorsPage() {
  const [prior, setPrior] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
    try {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      const res = await fetch(`${API_URL}/api/submissions`, {
        method: "POST",
        body: JSON.stringify({ formType: "ambassadors", data }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
      form.reset();
      setPrior("");
    } catch {
      toast.error("Submission failed", { description: "Please try again in a moment." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <Nav />

      <section className="relative overflow-hidden border-b border-border/60">
        <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse at 50% 0%, oklch(0.32 0.13 305 / 0.16), transparent 60%), var(--background)" }} />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]" style={{ backgroundImage: `url(${pattern})`, backgroundSize: "320px" }} />
        <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            Ambassador Program
          </span>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight text-primary sm:text-5xl lg:text-[3.4rem]">
            Become a Pan-African Mental Health Conversation{" "}
            <span className="italic text-[oklch(0.45_0.16_305)]">Ambassador</span>.
          </h1>
          <p className="mt-5 font-display text-xl italic text-[oklch(0.45_0.16_305)]">Represent. Amplify. Lead.</p>
        </div>
      </section>

      <Reveal className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
        <div className="overflow-hidden rounded-3xl border border-primary/15 shadow-xl">
          <img
            src={ambBanner}
            alt="Young African advocate speaking to a community audience with a microphone"
            width={1920}
            height={1088}
            loading="lazy"
            className="h-[240px] w-full object-cover sm:h-[360px] lg:h-[460px]"
          />
        </div>
      </Reveal>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <h2 className="font-display text-3xl font-semibold text-primary sm:text-4xl">About the Program</h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground/85">
            The Pan-African Mental Health Conversation Ambassador Program is recruiting passionate
            individuals from across Africa and the diaspora to serve as the official representatives
            and publicity team for PAMHO's inaugural continental mental health dialogue. Ambassadors
            are not passive supporters. They are active advocates — spreading the conversation,
            mobilizing their communities, representing PAMHO in their regions, and helping build
            the continental mental health movement Africa needs. Outstanding ambassadors from this
            program will be considered for PAMHO's inaugural permanent Pan-African Mental Health
            Ambassador cohort launching later this year.
          </p>
        </div>
      </section>

      <section className="bg-[oklch(0.96_0.018_82)] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 md:grid-cols-2">
          <Reveal className="lift-card rounded-2xl border border-primary/15 bg-card p-8">
            <h3 className="font-display text-2xl font-semibold text-primary">What Ambassadors Do</h3>
            <ul className="mt-6 space-y-4">
              {doList.map((c) => (
                <li key={c} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" /><span className="text-base text-foreground/85">{c}</span></li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal className="mx-auto mt-16 max-w-5xl px-5 sm:px-8">
          <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
            <img
              src={ambNetwork}
              alt="Young African advocates connecting across a community — a continental network"
              width={1600}
              height={1104}
              loading="lazy"
              className="h-[260px] w-full object-cover sm:h-[400px]"
            />
          </div>
        </Reveal>
        <div className="mx-auto mt-16 grid max-w-7xl gap-10 px-5 sm:px-8">
          <Reveal delay={100} className="lift-card rounded-2xl border border-primary/15 bg-card p-8">
            <h3 className="font-display text-2xl font-semibold text-primary">What Ambassadors Receive</h3>
            <ul className="mt-6 space-y-4">
              {receiveList.map((r) => (
                <li key={r} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" /><span className="text-base text-foreground/85">{r}</span></li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">Who Should Apply</span>
          <p className="mt-4 text-lg leading-relaxed text-foreground/85">
            We are looking for individuals who are passionate about mental health and African
            development, active on social media or within their communities, able to communicate
            clearly and professionally, committed to representing PAMHO with integrity, and based
            anywhere in Africa or the diaspora. Students, professionals, advocates, creatives, and
            community leaders are all welcome.
          </p>
        </div>
      </section>

      <section id="apply" className="relative pb-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-card p-7 shadow-xl sm:p-12">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
            <div className="relative">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">Ambassador Application</span>
              <h2 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">Apply to become an Ambassador.</h2>
              {submitted ? (
                <p className="mt-10 rounded-2xl border border-accent/40 bg-accent/10 p-6 text-base leading-relaxed text-primary">
                  Thank you for your submission. The PAMHO team will be in touch with you shortly.
                </p>
              ) : (
              <form onSubmit={onSubmit} className="mt-10 grid gap-6 sm:grid-cols-2">
                <Field label="Full Name" name="fullName" required />
                <Field label="Country of Residence" name="country" required />
                <Field label="City" name="city" required />
                <Field label="Email Address" name="email" type="email" required />
                <Field label="WhatsApp Number" name="whatsapp" required />
                <Field label="Instagram Handle" name="instagram" />
                <Field label="Twitter / X Handle" name="twitter" />
                <Field label="LinkedIn Profile URL" name="linkedin" type="url" wide />
                <Field label="Current Occupation or Student Status" name="occupation" required wide />
                <TextareaField label="Why do you want to become a Pan-African Mental Health Conversation Ambassador?" name="why" required rows={5} hint="250 word limit" />
                <TextareaField label="How will you promote the conversation within your network and community?" name="promote" required rows={4} hint="200 word limit" />
                <TextareaField label="What does mental health mean to you and why does it matter for Africa?" name="meaning" required rows={4} hint="200 word limit" />
                <SelectField label="Estimated reach" name="reach" required options={["Under 500","500 to 2000","2000 to 10000","Over 10000"]} />
                <RadioField label="Have you been involved in mental health advocacy or related work before?" name="prior" options={["Yes","No"]} required value={prior} onChange={setPrior} />
                {prior === "Yes" && (
                  <TextareaField label="Please describe your previous mental health advocacy or related work" name="priorDetails" rows={4} />
                )}
                <div className="sm:col-span-2">
                  <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60 sm:w-auto">
                    {submitting ? "Submitting…" : "Submit Application"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
              )}
              <p className="mt-8 border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
                The Pan-African Mental Health Conversation Ambassador Program is a voluntary unpaid
                program. Ambassadors serve for the duration of the Pan-African Mental Health
                Conversation. Outstanding ambassadors will be considered for PAMHO's permanent
                Ambassador Program launching later this year.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}