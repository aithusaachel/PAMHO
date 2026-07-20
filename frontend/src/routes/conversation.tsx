import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Field, TextareaField, SelectField } from "@/components/site/FormFields";
import { Reveal } from "@/components/site/Reveal";
import pattern from "@/assets/pattern.svg";
import conversationImg from "@/assets/conversation.jpg";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Mic, Video, MessagesSquare, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/conversation")({
  head: () => ({
    meta: [
      { title: "The Pan-African Mental Health Conversation — PAMHO" },
      {
        name: "description",
        content:
          "PAMHO's inaugural continental online dialogue on mental health in Africa. Apply to speak, present, or join a panel.",
      },
      { property: "og:title", content: "The Pan-African Mental Health Conversation — PAMHO" },
      {
        property: "og:description",
        content:
          "An online continental dialogue on mental health in Africa. Eight themes, three formats.",
      },
    ],
  }),
  component: ConversationPage,
});

const themes = [
  { n: 1, title: "Mental Health and African Identity", desc: "Exploring how culture, tradition, spirituality, and identity shape mental health experiences and help-seeking behavior across Africa." },
  { n: 2, title: "Youth Mental Health", desc: "Addressing the psychological challenges facing young Africans in education, employment, relationships, and digital life." },
  { n: 3, title: "Mental Health Policy and Systems", desc: "Examining gaps in mental health legislation, funding, workforce, and service delivery across African nations." },
  { n: 4, title: "Community and Family-Based Approaches", desc: "Highlighting grassroots, community-led, and family-centered models of mental health support." },
  { n: 5, title: "Mental Health in Education", desc: "Exploring the role of schools and universities in promoting psychological wellbeing and early intervention." },
  { n: 6, title: "Trauma, Conflict, and Resilience", desc: "Addressing mental health in the context of displacement, conflict, poverty, and historical trauma across the continent." },
  { n: 7, title: "Innovation and Technology in Mental Health", desc: "Examining digital tools, platforms, and innovations expanding mental health access in African contexts." },
  { n: 8, title: "Lived Experience and Storytelling", desc: "Centering the voices of those with personal mental health journeys as a form of advocacy and education." },
];

const formats = [
  { icon: Mic, title: "Live Presentation", desc: "A structured presentation delivered live during the conversation followed by audience engagement.", duration: "20 to 30 minutes" },
  { icon: Video, title: "Recorded Presentation", desc: "A professionally prepared recorded presentation submitted in advance for screening during the conversation.", duration: "15 to 20 minutes" },
  { icon: MessagesSquare, title: "Panel Discussion", desc: "A moderated group discussion bringing together three to five voices around a shared theme. Panelists engage with each other and with audience questions in real time.", duration: "45 to 60 minutes" },
];

function ConversationPage() {
  const [format, setFormat] = useState("");
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
        body: JSON.stringify({ formType: "conversation", data }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
      form.reset();
      setFormat("");
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
        <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse at 50% 0%, oklch(0.32 0.13 305 / 0.18), transparent 60%), var(--background)" }} />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]" style={{ backgroundImage: `url(${pattern})`, backgroundSize: "320px" }} />
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:py-28">
          <div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
              Call for Contributions
            </span>
            <h1 className="mt-6 font-display text-[2.4rem] font-semibold leading-[1.05] text-primary sm:text-5xl lg:text-[3.5rem]">
              The Pan-African Mental Health{" "}
              <span className="italic text-[oklch(0.45_0.16_305)]">Conversation</span>
            </h1>
            <p className="mt-5 font-display text-xl italic text-[oklch(0.45_0.16_305)]">
              An Online Continental Dialogue on Mental Health in Africa
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              The Pan-African Mental Health Conversation is PAMHO's inaugural continental forum
              bringing together professionals, advocates, researchers, policymakers, students, and
              community voices to advance mental health across Africa. This is an open, inclusive,
              solutions-driven dialogue. We want Africa's best minds in the room.
            </p>
            <a href="#apply" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
              Apply to Speak <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="relative">
            <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/40 to-primary/30 blur-2xl" />
            <div className="overflow-hidden rounded-[1.5rem] border border-primary/15 shadow-xl">
              <img src={conversationImg} alt="African woman speaking at conference podium" width={1400} height={1000} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">Eight Themes</span>
            <h2 className="mt-3 font-display text-4xl font-semibold text-primary sm:text-5xl">The conversations shaping Africa's mental health.</h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {themes.map((t) => (
              <Reveal as="article" delay={t.n * 40} key={t.n} className="lift-card group relative overflow-hidden rounded-2xl border border-border bg-card p-6">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent-foreground/60">Theme 0{t.n}</span>
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-primary">{t.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[oklch(0.96_0.018_82)] py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url(${pattern})`, backgroundSize: "260px" }} />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">Participation Formats</span>
            <h2 className="mt-3 font-display text-4xl font-semibold text-primary sm:text-5xl">Three ways to take part.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {formats.map(({ icon: Icon, title, desc, duration }, i) => (
              <Reveal as="article" delay={i * 80} key={title} className="lift-card relative overflow-hidden rounded-2xl border border-primary/15 bg-card p-8 shadow-sm">
                <span className="inline-grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold text-primary">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                <span className="mt-6 inline-block rounded-full bg-accent/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                  Duration: {duration}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="relative pb-28 pt-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-card p-7 shadow-xl sm:p-12">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
            <div className="relative">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">Submit Your Application</span>
              <h2 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">Apply to speak, present, or join a panel.</h2>

              {submitted ? (
                <p className="mt-10 rounded-2xl border border-accent/40 bg-accent/10 p-6 text-base leading-relaxed text-primary">
                  Thank you for your submission. The PAMHO team will be in touch with you shortly.
                </p>
              ) : (
              <form onSubmit={onSubmit} className="mt-10 grid gap-6 sm:grid-cols-2">
                <Field label="Full Name" name="fullName" required />
                <Field label="Country of Residence" name="country" required />
                <Field label="WhatsApp Number" name="whatsapp" required />
                <Field label="Email Address" name="email" type="email" required />
                <TextareaField label="Professional or Personal Background" name="background" required rows={4} hint="200 word limit" />
                <Field label="Proposed Presentation or Panel Title" name="title" required wide />
                <SelectField label="Select Theme" name="theme" required options={themes.map((t) => t.title)} />
                <SelectField label="Select Format" name="format" required options={formats.map((f) => f.title)} value={format} onChange={setFormat} />
                <TextareaField label="Abstract" name="abstract" required rows={6} hint="350 word limit" />
                {format === "Panel Discussion" && (
                  <TextareaField label="Panel Co-panelist Suggestions" name="panelSuggestions" rows={4} />
                )}
                <TextareaField label="Why This Topic Matters to Africa" name="why" required rows={4} hint="150 word limit" />
                <Field label="Instagram Handle" name="instagram" />
                <Field label="Twitter / X Handle" name="twitter" />
                <Field label="LinkedIn Profile URL" name="linkedin" type="url" wide />
                <div className="sm:col-span-2">
                  <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60 sm:w-auto">
                    {submitting ? "Submitting…" : "Submit Application"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}