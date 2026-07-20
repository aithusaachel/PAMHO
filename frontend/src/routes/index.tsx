import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import hero from "@/assets/hero.jpg";
import community from "@/assets/community.jpg";
import pattern from "@/assets/pattern.svg";
import {
  Megaphone,
  FlaskConical,
  GraduationCap,
  Users,
  Handshake,
  HeartHandshake,
  ArrowRight,
  Eye,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PAMHO — Advancing Mental Health Across Africa" },
      {
        name: "description",
        content:
          "The Pan-African Mental Health Organization advances policy, research, education, and community care for mental wellbeing across Africa.",
      },
      { property: "og:title", content: "PAMHO — Advancing Mental Health Across Africa" },
      {
        property: "og:description",
        content:
          "Healthy Minds, Healthy Lives. Join Africa's leading conversation on mental health.",
      },
    ],
  }),
  component: Index,
});

const pillars = [
  { icon: Megaphone, title: "Advocacy", desc: "Championing mental health policy reform and systemic change across Africa." },
  { icon: FlaskConical, title: "Research", desc: "Generating evidence that drives better mental health outcomes and stronger systems." },
  { icon: GraduationCap, title: "Education", desc: "Building mental health awareness and literacy in communities, schools, and institutions." },
  { icon: Users, title: "Youth Empowerment", desc: "Positioning young Africans as leaders, advocates, and changemakers in mental health." },
  { icon: Handshake, title: "Partnerships", desc: "Connecting governments, universities, NGOs, professionals, and communities across the continent." },
  { icon: HeartHandshake, title: "Community Interventions", desc: "Bringing mental health support, resources, and conversations closer to the people who need them." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at 80% 10%, oklch(0.32 0.13 305 / 0.18), transparent 55%), radial-gradient(ellipse at 0% 90%, oklch(0.78 0.13 78 / 0.18), transparent 50%), var(--background)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
          style={{ backgroundImage: `url(${pattern})`, backgroundSize: "320px" }}
        />
        <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-24">
          <Reveal className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Pan-African Mental Health Organization
            </span>
            <h1 className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.05] text-primary sm:text-5xl lg:text-[3.75rem]">
              Advancing Mental Health{" "}
              <span className="italic text-[oklch(0.45_0.16_305)]">Across Africa</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              The Pan-African Mental Health Organization is building the systems, networks, and
              conversations that Africa's mental health future requires.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/conversation"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-12px_oklch(0.32_0.12_305_/_0.6)] transition hover:bg-primary/90"
              >
                Join the Pan-African Mental Health Conversation
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
              <a
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-primary/25 px-6 py-3.5 text-sm font-semibold text-primary hover:bg-primary/5"
              >
                Learn About PAMHO
              </a>
            </div>
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border/70 pt-6">
              {[
                ["54", "African nations"],
                ["6", "Pillars of work"],
                ["1", "Continental movement"],
              ].map(([k, v]) => (
                <div key={v}>
                  <dt className="font-display text-3xl font-semibold text-primary">{k}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/40 to-primary/30 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-primary/15 shadow-2xl">
              <img
                src={hero}
                alt="African mental health professionals in community conversation"
                width={1600}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section id="about" className="relative py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal className="relative">
            <div className="overflow-hidden rounded-2xl border border-border">
              <img
                src={community}
                alt="African community gathered in conversation"
                width={1400}
                height={1000}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
              Who We Are
            </span>
            <h2 className="mt-3 font-display text-4xl font-semibold text-primary sm:text-5xl">
              A continental institution for African mental health.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              The Pan-African Mental Health Organization (PAMHO) is a continental institution
              committed to transforming mental health outcomes across Africa through advocacy,
              research, education, policy influence, and community empowerment. We believe that
              healthy minds are the foundation of healthy societies. Africa deserves world-class
              mental health systems — built by Africans, for Africans, and sustained for
              generations to come.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="lift-card rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/[0.04] to-accent/10 p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Eye className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                    Our Vision
                  </span>
                </div>
                <p className="mt-4 text-base leading-relaxed text-foreground/85">
                  To become a world-class Pan-African institution dedicated to improving mental
                  health, empowering young people, and advancing the psychological wellbeing of
                  communities across Africa and the diaspora.
                </p>
              </div>
              <div className="lift-card rounded-2xl border border-primary/15 bg-gradient-to-br from-accent/10 to-primary/[0.04] p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-[oklch(0.22_0.09_305)]">
                    <Eye className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                    Our Mission
                  </span>
                </div>
                <p className="mt-4 text-base leading-relaxed text-foreground/85">
                  To promote mental health awareness, strengthen mental health systems, influence
                  policy, conduct research, empower young people, and build the partnerships and
                  institutions that Africa's mental health future demands.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section id="what-we-do" className="relative bg-[oklch(0.96_0.018_82)] py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: `url(${pattern})`, backgroundSize: "260px" }}
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
              What We Do
            </span>
            <h2 className="mt-3 font-display text-4xl font-semibold text-primary sm:text-5xl">
              Six pillars. One continental movement.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map(({ icon: Icon, title, desc }, i) => (
              <Reveal
                as="article"
                delay={i * 60}
                key={title}
                className="lift-card group relative overflow-hidden rounded-2xl border border-border bg-card p-7"
              >
                <span className="absolute right-4 top-3 font-display text-6xl font-semibold text-primary/5">
                  0{i + 1}
                </span>
                <span className="inline-grid h-12 w-12 place-items-center rounded-xl bg-primary/8 text-primary ring-1 ring-primary/15">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-primary">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-accent transition-all duration-500 group-hover:w-full"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED BANNER */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="relative overflow-hidden rounded-3xl border border-primary/20 bg-[oklch(0.22_0.09_305)] px-7 py-14 text-cream sm:px-14 sm:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{ backgroundImage: `url(${pattern})`, backgroundSize: "280px" }}
            />
            <div
              aria-hidden
              className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/25 blur-3xl"
            />
            <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                  Featured Initiative
                </span>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-cream sm:text-5xl">
                  Now Open: The Pan-African Mental Health{" "}
                  <span className="italic text-accent">Conversation</span>.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/80">
                  PAMHO's inaugural continental online dialogue on mental health in Africa. We are
                  calling for speakers, panelists, partners, and ambassadors from across the
                  continent and diaspora.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:items-stretch">
                <a
                  href="/conversation"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-[oklch(0.22_0.09_305)] transition hover:bg-accent/90"
                >
                  Apply to Speak <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/join"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm font-semibold text-[oklch(0.22_0.09_305)] transition hover:bg-cream/90"
                >
                  Register to Attend
                </a>
                <a
                  href="/partners"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 px-6 py-3.5 text-sm font-semibold text-cream hover:bg-cream/10"
                >
                  Become a Partner
                </a>
                <a
                  href="/ambassadors"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 px-6 py-3.5 text-sm font-semibold text-cream hover:bg-cream/10"
                >
                  Become an Ambassador
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}