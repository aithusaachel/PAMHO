import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Field, TextareaField, SelectField, RadioField } from "@/components/site/FormFields";
import { Reveal } from "@/components/site/Reveal";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import pattern from "@/assets/pattern.svg";
import partnersBanner from "@/assets/partners-banner.jpg";
import partnersCollab from "@/assets/partners-collab.jpg";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partner With the Pan-African Mental Health Conversation" },
      {
        name: "description",
        content:
          "Join Africa's inaugural continental mental health dialogue as an official organizational partner.",
      },
      { property: "og:title", content: "Partner With PAMHO — The Pan-African Mental Health Conversation" },
      { property: "og:description", content: "Apply to become an official organizational partner." },
    ],
  }),
  component: PartnersPage,
});

const contribute = [
  "Promoting the conversation through their networks, platforms, and communities.",
  "Supporting planning and coordination where relevant.",
  "Mobilizing their members to apply as speakers, panelists, or ambassadors.",
  "Amplifying the conversation's reach across their regions.",
  "Contributing financially if they choose to do so — this is entirely optional and not a requirement of partnership.",
];

const receive = [
  "Official recognition as a Pan-African Mental Health Conversation Partner.",
  "Logo placement on the PAMHO website and conversation materials.",
  "Co-branding opportunities on promotional content.",
  "Access to the conversation's network of speakers, advocates, and institutions.",
  "Early institutional relationship with PAMHO as a growing continental organization.",
  "Opportunity for a representative to speak or participate in the conversation subject to application.",
];

const whoShouldApply = [
  "Mental health NGOs and advocacy organizations",
  "Universities and academic institutions",
  "Research centers and think tanks",
  "Professional associations",
  "Youth organizations",
  "Community health organizations",
  "Pan-African and continental civil society bodies",
  "International organizations with African programs",
];

function PartnersPage() {
  const [speak, setSpeak] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
    try {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      const res = await fetch("/api/submissions", {
        method: "POST",
        body: JSON.stringify({ formType: "partners", data }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
      form.reset();
      setSpeak("");
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
            Institutional Partnership
          </span>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight text-primary sm:text-5xl lg:text-[3.4rem]">
            Partner With the Pan-African Mental Health{" "}
            <span className="italic text-[oklch(0.45_0.16_305)]">Conversation</span>.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Join Africa's inaugural continental mental health dialogue as an official organizational
            partner.
          </p>
        </div>
      </section>

      <Reveal className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
        <div className="overflow-hidden rounded-3xl border border-primary/15 shadow-xl">
          <img
            src={partnersBanner}
            alt="African institutional leaders in a formal boardroom discussion"
            width={1920}
            height={1088}
            loading="lazy"
            className="h-[240px] w-full object-cover sm:h-[360px] lg:h-[460px]"
          />
        </div>
      </Reveal>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <h2 className="font-display text-3xl font-semibold text-primary sm:text-4xl">About the Partnership</h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground/85">
            The Pan-African Mental Health Conversation is bringing together voices, organizations,
            and institutions from across Africa and the diaspora to advance the continent's mental
            health agenda. We are inviting NGOs, civil society organizations, universities, research
            institutions, advocacy groups, professional associations, and aligned institutions to
            join us as official organizational partners. This is not a financial partnership. It is
            a collaborative institutional relationship built on shared purpose and mutual benefit.
          </p>
        </div>
      </section>

      <section className="bg-[oklch(0.96_0.018_82)] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 md:grid-cols-2">
          <Reveal className="lift-card rounded-2xl border border-primary/15 bg-card p-8">
            <h3 className="font-display text-2xl font-semibold text-primary">What Partners Contribute</h3>
            <ul className="mt-6 space-y-4">
              {contribute.map((c) => (
                <li key={c} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" /><span className="text-base text-foreground/85">{c}</span></li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal className="mx-auto mt-16 max-w-5xl px-5 sm:px-8">
          <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
            <img
              src={partnersCollab}
              alt="African organizational team collaborating in a planning session"
              width={1600}
              height={1104}
              loading="lazy"
              className="h-[260px] w-full object-cover sm:h-[400px]"
            />
          </div>
        </Reveal>
        <div className="mx-auto mt-16 grid max-w-7xl gap-10 px-5 sm:px-8">
          <Reveal delay={100} className="lift-card rounded-2xl border border-primary/15 bg-card p-8">
            <h3 className="font-display text-2xl font-semibold text-primary">What Partners Receive</h3>
            <ul className="mt-6 space-y-4">
              {receive.map((r) => (
                <li key={r} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" /><span className="text-base text-foreground/85">{r}</span></li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">Who Should Apply</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">Institutions aligned with Africa's mental health future.</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {whoShouldApply.map((w, i) => (
              <Reveal key={w} delay={i * 40} className="lift-card flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm text-foreground/85">{w}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="relative pb-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-card p-7 shadow-xl sm:p-12">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
            <div className="relative">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">Partner Application</span>
              <h2 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">Apply to become an official partner.</h2>
              {submitted ? (
                <p className="mt-10 rounded-2xl border border-accent/40 bg-accent/10 p-6 text-base leading-relaxed text-primary">
                  Thank you for your submission. The PAMHO team will be in touch with you shortly.
                </p>
              ) : (
              <form onSubmit={onSubmit} className="mt-10 grid gap-6 sm:grid-cols-2">
                <Field label="Organization Name" name="orgName" required wide />
                <SelectField label="Organization Type" name="orgType" required options={["NGO","University","Research Institution","Professional Association","Youth Organization","Community Organization","International Organization","Other"]} />
                <Field label="Country of Registration" name="countryReg" required />
                <Field label="Countries or Regions of Operation" name="regions" required wide />
                <Field label="Contact Person Full Name" name="contactName" required />
                <Field label="Contact Person Role or Title" name="contactRole" required />
                <Field label="Contact Email Address" name="contactEmail" type="email" required />
                <Field label="Contact WhatsApp Number" name="contactWhatsapp" required />
                <Field label="Organization Website" name="website" type="url" wide />
                <Field label="Instagram Handle" name="instagram" />
                <Field label="Twitter / X Handle" name="twitter" />
                <Field label="LinkedIn Page URL" name="linkedin" type="url" wide />
                <TextareaField label="Brief Description of Organization" name="description" required rows={4} hint="200 word limit" />
                <Field label="How did you hear about the Pan-African Mental Health Conversation?" name="heardAbout" wide />
                <TextareaField label="How would your organization like to contribute?" name="contribution" required rows={5} hint="250 word limit" />
                <RadioField label="Would your organization like to be considered for a speaking or panel opportunity?" name="speaking" options={["Yes","No"]} required value={speak} onChange={setSpeak} />
                <TextareaField label="Any additional information (optional)" name="additional" rows={4} />
                <div className="sm:col-span-2">
                  <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60 sm:w-auto">
                    {submitting ? "Submitting…" : "Submit Application"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
              )}
              <p className="mt-8 border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
                All partnership applications will be reviewed by the PAMHO organizing committee.
                Successful partners will be contacted within two weeks of submission. PAMHO reserves
                the right to decline applications that are not aligned with our values and mission.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}