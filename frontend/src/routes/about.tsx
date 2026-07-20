import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import community from "@/assets/community.jpg";
import visionImg from "@/assets/about-vision.jpg";
import missionImg from "@/assets/about-mission.jpg";
import pattern from "@/assets/pattern.svg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About PAMHO — Building Africa's Mental Health Future" },
      {
        name: "description",
        content:
          "PAMHO is a continental institution committed to transforming mental health outcomes across Africa through advocacy, research, education and community empowerment.",
      },
      { property: "og:title", content: "About PAMHO — Building Africa's Mental Health Future" },
      {
        property: "og:description",
        content:
          "Learn about our vision, mission and why mental health matters for Africa.",
      },
    ],
  }),
  component: AboutPage,
});

const sections = [
  {
    label: "Our Vision",
    title: "Our Vision",
    body:
      "To become a world-class Pan-African institution dedicated to improving mental health, empowering young people, and advancing the psychological wellbeing of communities across Africa and the diaspora.",
  },
  {
    label: "Our Mission",
    title: "Our Mission",
    body:
      "To promote mental health awareness, strengthen mental health systems, influence policy, conduct research, empower young people, and build the partnerships and institutions that Africa's mental health future demands.",
  },
  {
    label: "Why It Matters",
    title: "Why Mental Health Matters for Africa",
    body:
      "Mental health is not a luxury. It is a foundation. Across Africa, millions of people live with unaddressed psychological challenges that affect their education, their work, their families, and their communities. PAMHO exists because Africa's development depends on the wellbeing of its people — and because Africans deserve institutions that take their mental health seriously.",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <section className="relative overflow-hidden border-b border-border/60">
        <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse at 50% 0%, oklch(0.32 0.13 305 / 0.16), transparent 60%), var(--background)" }} />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]" style={{ backgroundImage: `url(${pattern})`, backgroundSize: "320px" }} />
        <Reveal className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            About PAMHO
          </span>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-tight text-primary sm:text-6xl">
            Building Africa's <span className="italic text-[oklch(0.45_0.16_305)]">Mental Health Future</span>.
          </h1>
        </Reveal>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal className="relative">
            <div className="overflow-hidden rounded-2xl border border-border">
              <img src={community} alt="African community gathered in conversation" width={1600} height={1200} loading="lazy" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">Who We Are</span>
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
          </Reveal>
        </div>
      </section>

      {/* VISION */}
      <section className="relative bg-[oklch(0.96_0.018_82)] py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url(${pattern})`, backgroundSize: "260px" }} />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent-foreground/60">{sections[0].label}</span>
            <h2 className="mt-3 font-display text-4xl font-semibold text-primary sm:text-5xl">{sections[0].title}</h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">{sections[0].body}</p>
          </Reveal>
        </div>
      </section>

      {/* SUPPORTING IMAGE */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="overflow-hidden rounded-3xl border border-border shadow-xl">
            <img src={visionImg} alt="Young African woman looking over a city skyline at sunrise" width={1600} height={1008} loading="lazy" className="h-full w-full object-cover" />
          </Reveal>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent-foreground/60">{sections[1].label}</span>
            <h2 className="mt-3 font-display text-4xl font-semibold text-primary sm:text-5xl">{sections[1].title}</h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">{sections[1].body}</p>
          </Reveal>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="relative overflow-hidden bg-[oklch(0.22_0.09_305)] py-24 text-cream">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.10]" style={{ backgroundImage: `url(${pattern})`, backgroundSize: "300px" }} />
        <div aria-hidden className="absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-accent/25 blur-3xl" />
        <div aria-hidden className="absolute -bottom-40 -left-40 h-[24rem] w-[24rem] rounded-full bg-accent/10 blur-3xl" />
        <Reveal className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
          <span className="font-display text-[7rem] leading-none text-accent/70 sm:text-[10rem]">“</span>
          <p className="-mt-10 font-display text-3xl font-medium leading-[1.2] text-cream sm:text-5xl lg:text-[3.5rem]">
            Africa cannot rise without the wellbeing of its <span className="italic text-accent">people</span>.
          </p>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-accent">PAMHO</p>
        </Reveal>
      </section>

      {/* SUPPORTING IMAGE */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="overflow-hidden rounded-3xl border border-border shadow-xl">
            <img src={missionImg} alt="African mental health professionals in conversation with a community member" width={1600} height={1008} loading="lazy" className="h-full w-full object-cover" />
          </Reveal>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="bg-[oklch(0.96_0.018_82)] py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent-foreground/60">{sections[2].label}</span>
            <h2 className="mt-3 font-display text-4xl font-semibold text-primary sm:text-5xl">{sections[2].title}</h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">{sections[2].body}</p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}