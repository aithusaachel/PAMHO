import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Field, TextareaField, SelectField } from "@/components/site/FormFields";
import { Reveal } from "@/components/site/Reveal";
import pattern from "@/assets/pattern.svg";
import joinBanner from "@/assets/join-banner.jpg";
import joinParticipant from "@/assets/join-participant.jpg";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join the Pan-African Mental Health Conversation — PAMHO" },
      {
        name: "description",
        content:
          "Register as a participant in Africa's inaugural continental mental health dialogue. Free, online, and open to all.",
      },
      { property: "og:title", content: "Register as a Participant — PAMHO" },
      {
        property: "og:description",
        content:
          "Register to join the Pan-African Mental Health Conversation. Free and open to all.",
      },
    ],
  }),
  component: JoinPage,
});

const themes = [
  "Mental Health and African Identity",
  "Youth Mental Health",
  "Mental Health Policy and Systems",
  "Community and Family-Based Approaches",
  "Mental Health in Education",
  "Trauma, Conflict, and Resilience",
  "Innovation and Technology in Mental Health",
  "Lived Experience and Storytelling",
  "All Themes",
];

const whoFor = [
  "Mental health professionals and clinicians",
  "Researchers and academics",
  "Students and young people",
  "Community members and advocates",
  "NGO and civil society workers",
  "Educators and school counselors",
  "Anyone passionate about mental health in Africa",
];

const expect = [
  "Access to live presentations and panel discussions",
  "Engagement with leading African mental health voices",
  "Connection with a continental network of advocates and professionals",
  "Opportunity to contribute to Africa's mental health conversation",
  "Certificate of participation from PAMHO",
];

function JoinPage() {
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
        body: JSON.stringify({ formType: "join", data }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
      form.reset();
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
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, oklch(0.32 0.13 305 / 0.18), transparent 60%), var(--background)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
          style={{ backgroundImage: `url(${pattern})`, backgroundSize: "320px" }}
        />
        <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8 lg:py-28">
          <Reveal>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
              Register as a Participant
            </span>
            <h1 className="mt-6 font-display text-[2.4rem] font-semibold leading-[1.05] text-primary sm:text-5xl lg:text-[3.5rem]">
              Join the Pan-African Mental Health{" "}
              <span className="italic text-[oklch(0.45_0.16_305)]">Conversation</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              The Pan-African Mental Health Conversation is open to everyone who believes Africa's
              mental health matters. Whether you are a professional, student, advocate, or
              community member — your presence in this conversation counts. Register below to
              secure your place as a participant in Africa's inaugural continental mental health
              dialogue.
            </p>
          </Reveal>
        </div>
      </section>

      <Reveal className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
        <div className="overflow-hidden rounded-3xl border border-primary/15 shadow-xl">
          <img
            src={joinBanner}
            alt="Diverse African audience engaged in a continental forum with a live presentation"
            width={1920}
            height={1088}
            loading="lazy"
            className="h-[240px] w-full object-cover sm:h-[360px] lg:h-[460px]"
          />
        </div>
      </Reveal>

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
              Who Is This For?
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">
              A conversation for all of Africa.
            </h2>
            <ul className="mt-8 space-y-3">
              {whoFor.map((item, i) => (
                <Reveal
                  as="li"
                  delay={i * 50}
                  key={item}
                  className="lift-card flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm leading-relaxed text-foreground/85">{item}</span>
                </Reveal>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-20 max-w-5xl px-5 sm:px-8">
          <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
            <img
              src={joinParticipant}
              alt="Young African woman attentively participating in an online event on her laptop"
              width={1600}
              height={1104}
              loading="lazy"
              className="h-[260px] w-full object-cover sm:h-[400px]"
            />
          </div>
        </Reveal>

        <div className="mx-auto mt-20 grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-1">
          <Reveal delay={120}>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
              What You Get as a Participant
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">
              Learn. Connect. Contribute.
            </h2>
            <ul className="mt-8 space-y-3">
              {expect.map((item, i) => (
                <Reveal
                  as="li"
                  delay={i * 50}
                  key={item}
                  className="lift-card flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-[oklch(0.22_0.09_305)]">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm leading-relaxed text-foreground/85">{item}</span>
                </Reveal>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section id="register" className="relative pb-28 pt-4">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-card p-7 shadow-xl sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
            />
            <div className="relative">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                Participant Registration
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">
                Secure your place in the conversation.
              </h2>

              {submitted ? (
                <p className="mt-10 rounded-2xl border border-accent/40 bg-accent/10 p-6 text-base leading-relaxed text-primary">
                  Thank you for registering. You are now part of the Pan-African Mental Health
                  Conversation. The PAMHO team will be in touch with further details. Healthy
                  Minds, Healthy Lives.
                </p>
              ) : (
                <form onSubmit={onSubmit} className="mt-10 grid gap-6 sm:grid-cols-2">
                  <Field label="Full Name" name="fullName" required />
                  <Field label="Country of Residence" name="country" required />
                  <Field label="Email Address" name="email" type="email" required />
                  <Field label="WhatsApp Number" name="whatsapp" required />
                  <Field
                    label="Current Occupation or Student Status"
                    name="occupation"
                    required
                    wide
                  />
                  <Field
                    label="How did you hear about the Pan-African Mental Health Conversation?"
                    name="referral"
                    required
                    wide
                  />
                  <SelectField
                    label="Is there a specific theme you are most interested in?"
                    name="theme"
                    required
                    wide
                    options={themes}
                  />
                  <TextareaField
                    label="Any additional message"
                    name="message"
                    rows={4}
                    hint="Optional"
                  />
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60 sm:w-auto"
                    >
                      {submitting ? "Submitting…" : "Register as Participant"}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <p className="mt-10 text-center text-sm italic leading-relaxed text-muted-foreground">
            Participation in the Pan-African Mental Health Conversation is free and open to all.
            This is an online event accessible from anywhere across Africa and the diaspora.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}