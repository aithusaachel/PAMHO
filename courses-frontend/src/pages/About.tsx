import SEO from '../components/SEO'
import { Reveal } from '../components/Reveal'

export default function About() {
  return (
    <div className="flex flex-col min-h-screen relative bg-[#030303]">
      <SEO title="About PAMHO — Building Africa's Mental Health Future" />
      <div className="grain-overlay"></div>

      {/* ============================================================ */}
      {/* 1. THE OPENING                                               */}
      {/* ============================================================ */}
      <section className="pt-48 pb-24 md:pt-64 md:pb-48">
        <div className="canvas-container text-center flex flex-col items-center">
          <Reveal>
            <span className="label-tracking text-[#8442FA] mb-8 block">About the Organization</span>
            <h1 className="title-hero max-w-5xl mx-auto">
              Convening Africa's <span className="italic text-[rgba(245,242,233,0.7)]">Mental Health Future.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. THE VISUAL ANCHOR                                         */}
      {/* ============================================================ */}
      <section className="pb-32">
        <div className="canvas-container">
          <Reveal delay={200}>
            <div className="w-full aspect-[21/9] md:aspect-[2.35/1] overflow-hidden relative">
              <img 
                src="/hero_community.png" 
                alt="African community gathered in conversation" 
                className="img-cinematic absolute inset-0 filter brightness-[0.5] saturate-[0.6]" 
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. THE MANIFESTO                                             */}
      {/* ============================================================ */}
      <section className="py-24 bg-[#110E0C]">
        <div className="canvas-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
            
            <div className="md:col-span-5 relative">
              <Reveal className="sticky top-48">
                <span className="label-tracking text-[rgba(245,242,233,0.4)] block mb-4">01 &mdash; Why It Matters</span>
                <h3 className="font-serif text-4xl md:text-5xl font-light leading-[1.2]">
                  Mental health is not a luxury. It is a <span className="italic text-[#8442FA]">foundation.</span>
                </h3>
              </Reveal>
            </div>

            <div className="md:col-span-7 flex flex-col justify-center">
              <Reveal delay={200}>
                <p className="text-body-large text-[rgba(245,242,233,0.7)] mb-12">
                  Across Africa, millions of people live with unaddressed psychological challenges that affect their education, their work, their families, and their communities. 
                </p>
                <p className="text-body-large text-[rgba(245,242,233,0.7)] mb-12">
                  PAMHO exists because Africa's development depends on the wellbeing of its people — and because Africans deserve institutions that take their mental health seriously.
                </p>
                <p className="text-body-large text-[rgba(245,242,233,0.7)]">
                  The Pan-African Mental Health Organization (PAMHO) is a continental institution committed to transforming mental health outcomes across Africa through advocacy, research, education, policy influence, and community empowerment.
                </p>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. VISION & MISSION                                          */}
      {/* ============================================================ */}
      <section className="py-32 md:py-48 bg-[#030303] border-t border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 lg:gap-32">
            
            <Reveal>
              <div className="border-t border-[rgba(245,242,233,0.1)] pt-8">
                <span className="label-tracking text-[#8442FA] mb-6 block">Our Vision</span>
                <h4 className="font-serif text-3xl md:text-4xl leading-snug mb-8">
                  To become a world-class Pan-African institution dedicated to improving mental health.
                </h4>
                <p className="font-sans font-light text-[rgba(245,242,233,0.6)] leading-relaxed text-lg">
                  Empowering young people, and advancing the psychological wellbeing of communities across Africa and the diaspora. Africa deserves world-class mental health systems — built by Africans, for Africans, and sustained for generations to come.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="border-t border-[rgba(245,242,233,0.1)] pt-8">
                <span className="label-tracking text-[#8442FA] mb-6 block">Our Mission</span>
                <h4 className="font-serif text-3xl md:text-4xl leading-snug mb-8">
                  To promote awareness, strengthen systems, and influence continental policy.
                </h4>
                <p className="font-sans font-light text-[rgba(245,242,233,0.6)] leading-relaxed text-lg">
                  To conduct research, empower young people, and build the partnerships and institutions that Africa's mental health future demands.
                </p>
              </div>
            </Reveal>

          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. CINEMATIC PULL QUOTE                                      */}
      {/* ============================================================ */}
      <section className="relative py-48 bg-[#110E0C] overflow-hidden flex items-center justify-center">
        <Reveal className="relative z-10 text-center max-w-5xl px-4">
          <span className="font-serif text-[#8442FA] text-[10rem] leading-none absolute -top-24 left-1/2 -translate-x-1/2 opacity-20">“</span>
          <p className="font-serif text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] relative z-10">
            Africa cannot rise without the wellbeing of its <span className="italic text-[#8442FA]">people.</span>
          </p>
          <span className="label-tracking text-[rgba(245,242,233,0.3)] block mt-16">PAMHO Governing Principle</span>
        </Reveal>
      </section>

    </div>
  )
}
