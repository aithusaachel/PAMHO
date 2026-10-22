import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { Reveal } from '../components/Reveal'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative bg-[#030303] text-[#F5F2E9]">
      <SEO 
        title="Pan-African Mental Health Organization — PAMHO" 
        description="Convening Africa's mental health leadership, empowering community advocates, and transforming systems across 54 African nations."
      />
      <div className="grain-overlay"></div>

      {/* ============================================================ */}
      {/* 1. THE HERO - Flagship Certified Mental Health Advocate      */}
      {/* ============================================================ */}
      <section className="relative min-h-screen w-full flex flex-col justify-end pb-12 lg:pb-24 pt-36">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/home_hero.jpg" 
            alt="PAMHO Community Engagement" 
            className="w-full h-full object-cover filter brightness-[0.32] contrast-[1.1] saturate-[0.8]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent"></div>
        </div>

        <div className="canvas-container relative z-10">
          <Reveal delay={200}>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="label-tracking text-[#8442FA]">PAMHO Institute</span>
              <span className="text-[rgba(245,242,233,0.3)]">/</span>
              <span className="label-tracking text-[rgba(245,242,233,0.6)]">In Collaboration with ACI Africa</span>
            </div>
            <h1 className="title-hero max-w-5xl">
              Certified Mental Health <span className="italic text-[rgba(245,242,233,0.7)]">Advocate.</span>
            </h1>
            <p className="font-serif text-2xl md:text-3xl text-[#8442FA] italic mt-4 block">
              Cohort I · January 2027 · Registration Opens 1 November 2026
            </p>
          </Reveal>
          
          <Reveal delay={500} className="mt-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-t border-[rgba(245,242,233,0.15)] pt-8">
            <p className="text-body-large text-[rgba(245,242,233,0.8)] max-w-2xl font-sans text-lg md:text-xl font-light leading-relaxed">
              A five-week foundational programme equipping emerging leaders and community members across Africa with the knowledge, ethical grounding, and practical skills to advance mental health awareness, reduce stigma, and connect communities to appropriate support.
            </p>
            <div className="shrink-0 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link 
                to="/institute/courses/certified-mental-health-advocate#waitlist" 
                className="btn-cinematic !border-[#8442FA] !text-[#8442FA] hover:!text-[#030303] w-full sm:w-auto text-center justify-center"
              >
                Join the Waitlist <span className="ml-4 font-serif text-xl leading-none">↓</span>
              </Link>
              <Link 
                to="/institute/courses/certified-mental-health-advocate" 
                className="btn-cinematic !border-[rgba(245,242,233,0.2)] !text-[#F5F2E9] hover:!border-[#8442FA] hover:!text-[#8442FA] w-full sm:w-auto text-center justify-center"
              >
                Read More <span className="ml-4 font-serif text-xl leading-none">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. THE UNDERSTANDING - The Core Statement                    */}
      {/* ============================================================ */}
      <section className="py-20 md:py-48 bg-[#030303] overflow-hidden">
        <div className="canvas-container flex justify-center">
          <Reveal className="max-w-4xl text-center relative px-4">
            <span className="font-serif text-[#8442FA] text-7xl sm:text-8xl md:text-[10rem] leading-none opacity-20 absolute -top-8 sm:-top-12 md:-top-16 left-1/2 -translate-x-1/2 select-none pointer-events-none">“</span>
            <h2 className="title-section relative z-10 leading-[1.3]">
              Mental health is not a luxury. It is a foundation. Africa cannot rise without the wellbeing of its <span className="italic text-[#8442FA]">people.</span>
            </h2>
            <span className="label-tracking mt-8 md:mt-12 block">PAMHO Manifesto</span>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. HUMAN CONNECTION - Documentary Grid & Concluded Dialogue  */}
      {/* ============================================================ */}
      <section className="py-24 bg-[#110E0C]">
        <div className="canvas-container">
          <Reveal>
            <span className="label-tracking mb-8 block">The Architecture of Change</span>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            
            <div className="md:col-span-5 order-2 md:order-1">
              <Reveal delay={200} className="flex flex-col gap-12">
                <div>
                  <h3 className="font-serif text-3xl mb-4">Contextual Intervention</h3>
                  <p className="text-lg text-[rgba(245,242,233,0.6)] font-light leading-relaxed">
                    We reject imported, top-down psychiatric solutions. Care must be culturally grounded and locally led. PAMHO bridges the gap between clinical professionals and grassroots reality.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-3xl mb-4">Systemic Reform</h3>
                  <p className="text-lg text-[rgba(245,242,233,0.6)] font-light leading-relaxed">
                    Awareness is meaningless without infrastructure. We mobilize communities to demand policy changes, securing funding and legislative backing for mental health resources across the continent.
                  </p>
                </div>
                <div className="pt-8">
                  <Link to="/about" className="label-tracking text-[#8442FA] hover:text-[#F5F2E9] flex items-center gap-4 transition-colors w-fit">
                    Read the Full Manifesto <span className="w-12 h-[1px] bg-current block"></span>
                  </Link>
                </div>
              </Reveal>
            </div>
            
            <div className="md:col-span-7 order-1 md:order-2">
              <Reveal delay={400}>
                <div className="aspect-[4/5] md:aspect-[3/4] w-full overflow-hidden relative border border-[rgba(245,242,233,0.08)]">
                  <img 
                    src="/images/home_institute.jpg" 
                    alt="Clinical and Community Education in Africa" 
                    className="img-cinematic"
                  />
                  <div className="absolute inset-0 border border-[rgba(245,242,233,0.1)] m-4 pointer-events-none"></div>
                </div>
              </Reveal>
            </div>
            
          </div>

          {/* Landmark Concluded Dialogue Highlight */}
          <Reveal delay={200} className="mt-16 md:mt-20">
            <div className="border border-[rgba(245,242,233,0.1)] p-6 sm:p-8 md:p-12 bg-[#030303]">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#8442FA]/60 shrink-0"></span>
                    <span className="label-tracking text-[#8442FA]">Landmark Milestone · 10 October 2026</span>
                  </div>
                  <h4 className="font-serif text-2xl md:text-3xl text-[#F5F2E9] mb-3">
                    The Pan-African Mental Health Conversation
                  </h4>
                  <p className="font-sans font-light text-base text-[rgba(245,242,233,0.6)] leading-relaxed">
                    Successfully convened on World Mental Health Day, bringing together professionals, advocates, researchers, youth, and communities across 54 African nations.
                  </p>
                </div>
                <Link to="/programs" className="btn-cinematic w-full sm:w-auto text-center justify-center shrink-0">
                  View Initiative Archive <span className="ml-3 font-serif text-xl leading-none">→</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. PURPOSE - The Pillars                                     */}
      {/* ============================================================ */}
      <section className="py-32 md:py-48 bg-[#030303]">
        <div className="canvas-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32">
            
            <div className="flex flex-col justify-center">
              <Reveal>
                <span className="label-tracking text-[#8442FA] mb-6 block">Structural Pillars</span>
                <h2 className="title-section mb-8">Six pathways. One movement.</h2>
                <p className="text-body-large text-[rgba(245,242,233,0.7)]">
                  Our operational framework is designed to dismantle stigma and build capacity simultaneously.
                </p>
              </Reveal>
            </div>

            <div className="flex flex-col gap-0 border-t border-[rgba(245,242,233,0.1)]">
              {[
                { n: "01", t: "Advocacy", d: "Championing mental health policy reform across Africa." },
                { n: "02", t: "Research", d: "Generating evidence that drives better continental outcomes." },
                { n: "03", t: "Education", d: "Building literacy and certified capacity through the PAMHO Institute." },
                { n: "04", t: "Youth Empowerment", d: "Positioning young Africans as transformative changemakers." },
                { n: "05", t: "Partnerships", d: "Connecting governments, continental non-profits, and communities." },
                { n: "06", t: "Community Interventions", d: "Bringing evidence-based resources closer to the people." }
              ].map((item, idx) => (
                <Reveal key={item.n} delay={idx * 100} className="border-b border-[rgba(245,242,233,0.1)] py-8 group">
                  <div className="grid grid-cols-12 items-baseline">
                    <span className="col-span-2 md:col-span-3 font-serif text-xl md:text-2xl text-[rgba(245,242,233,0.3)] group-hover:text-[#8442FA] transition-colors">{item.n}</span>
                    <div className="col-span-10 md:col-span-9">
                      <h4 className="font-serif text-2xl md:text-3xl mb-2">{item.t}</h4>
                      <p className="text-sm md:text-base font-sans font-light text-[rgba(245,242,233,0.5)]">{item.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. PARTICIPATION - The Final Frame                           */}
      {/* ============================================================ */}
      <section className="relative min-h-[500px] md:h-[70vh] md:min-h-[600px] flex items-center justify-center py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/home_advocacy.jpg" 
            alt="Ambassador Network" 
            className="w-full h-full object-cover filter brightness-[0.25] saturate-0"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303]"></div>
        </div>
        
        <Reveal className="relative z-10 text-center flex flex-col items-center max-w-4xl mx-auto w-full px-4">
          <h2 className="title-section mb-8 md:mb-12">The work is structural.<br/>The time is now.</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full sm:w-auto">
            <Link to="/ambassadors" className="btn-cinematic !border-[#8442FA] !text-[#8442FA] hover:!text-[#030303] w-full sm:w-auto text-center justify-center">
              Become an Ambassador
            </Link>
            <Link to="/donate" className="btn-cinematic w-full sm:w-auto text-center justify-center">
              Fund the Mission
            </Link>
          </div>
        </Reveal>
      </section>

    </div>
  )
}
