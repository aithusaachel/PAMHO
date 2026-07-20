import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Field, TextareaField } from "@/components/site/FormFields";
import { Reveal } from "@/components/site/Reveal";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Mail, MessageCircle, Instagram, Twitter, Linkedin, ArrowRight } from "lucide-react";
import pattern from "@/assets/pattern.svg";
import contactCollab from "@/assets/contact-collab.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact PAMHO — Get in Touch" },
      { name: "description", content: "Get in touch with the Pan-African Mental Health Organization." },
      { property: "og:title", content: "Contact PAMHO — Get in Touch" },
      { property: "og:description", content: "We would love to hear from you." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
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
        body: JSON.stringify({ formType: "contact", data }),
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

  const contacts = [
    { icon: Mail, label: "Email", value: "hello@pamhoafrica.org" },
    { icon: MessageCircle, label: "WhatsApp", value: "+000 000 0000" },
    { icon: Instagram, label: "Instagram", value: "@pamho_africa" },
    { icon: Twitter, label: "Twitter / X", value: "@pamho_africa" },
    { icon: Linkedin, label: "LinkedIn", value: "@pamho_africa" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <Nav />

      <section className="relative overflow-hidden border-b border-border/60">
        <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse at 50% 0%, oklch(0.32 0.13 305 / 0.16), transparent 60%), var(--background)" }} />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]" style={{ backgroundImage: `url(${pattern})`, backgroundSize: "320px" }} />
        <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 lg:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            Contact
          </span>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-tight text-primary sm:text-6xl">
            Get In <span className="italic text-[oklch(0.45_0.16_305)]">Touch</span>.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">We would love to hear from you.</p>
        </div>
      </section>

      <section className="relative py-20">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full opacity-[0.04]" style={{ backgroundImage: `url(${pattern})`, backgroundSize: "300px" }} />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-primary/15 bg-card p-6 shadow-lg sm:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.09]"
                style={{ backgroundImage: `url(${pattern})`, backgroundSize: "260px" }}
              />
              <div className="relative">
                <div className="overflow-hidden rounded-2xl border border-border shadow-md">
                  <img
                    src={contactCollab}
                    alt="Diverse African people collaborating warmly around a table"
                    width={1408}
                    height={1008}
                    loading="lazy"
                    className="h-[220px] w-full object-cover sm:h-[260px]"
                  />
                </div>
                <h2 className="mt-6 font-display text-2xl font-semibold text-primary">Reach the team</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Whether you're a partner, a young leader, a researcher, or simply curious — we'd
                  love to hear from you. Send us a note and a real person from the PAMHO team will
                  respond.
                </p>
                <ul className="mt-6 space-y-4">
              {contacts.map(({ icon: Icon, label, value }) => (
                <li key={label} className="lift-card flex items-start gap-3 rounded-xl border border-border bg-card/90 p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/8 text-primary ring-1 ring-primary/15">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/70">{label}</p>
                    <p className="mt-0.5 text-base text-foreground/85">{value}</p>
                  </div>
                </li>
              ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="rounded-3xl border border-primary/20 bg-card p-7 shadow-xl sm:p-10">
            {submitted ? (
              <p className="rounded-2xl border border-accent/40 bg-accent/10 p-6 text-base leading-relaxed text-primary">
                Thank you for your submission. The PAMHO team will be in touch with you shortly.
              </p>
            ) : (
            <form onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
              <Field label="Full Name" name="fullName" required />
              <Field label="Email Address" name="email" type="email" required />
              <Field label="WhatsApp Number" name="whatsapp" />
              <Field label="Subject" name="subject" required />
              <TextareaField label="Message" name="message" required rows={6} />
              <div className="sm:col-span-2">
                <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60 sm:w-auto">
                  {submitting ? "Sending…" : "Submit"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
            )}
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}