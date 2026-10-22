import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { Reveal } from '../components/Reveal'

export default function Institute() {
  return (
    <div className="flex flex-col min-h-screen relative bg-[#030303]">
      <SEO title="PAMHO Institute | PAMHO" />
      <div className="grain-overlay"></div>

      {/* ============================================================ */}
      {/* 1. THE OPENING                                               */}
      {/* ============================================================ */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24 border-b border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container max-w-5xl text-center flex flex-col items-center">
          <Reveal>
            <span className="label-tracking text-[#8442FA] mb-8 block">Education Platform</span>
            <h1 className="title-hero mb-8">
              Knowledge as a <span className="italic text-[rgba(245,242,233,0.7)]">tool for change.</span>
            </h1>
            <p className="text-body-large text-[rgba(245,242,233,0.6)] font-light leading-relaxed mb-12">
              The PAMHO Institute provides evidence-based, culturally contextualized curricula for professionals, advocates, and students across the continent.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/institute/catalog" className="btn-cinematic !border-[#8442FA] !text-[#8442FA] hover:!text-[#030303]">
                Browse Catalog
              </Link>
              <Link to="/login" className="btn-cinematic">
                Sign In
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. THE CURRICULUM OVERVIEW                                   */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 bg-[#110E0C]">
        <div className="canvas-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            <div className="md:col-span-6 order-2 md:order-1 flex flex-col gap-12 border-t md:border-t-0 md:border-r border-[rgba(245,242,233,0.05)] pt-12 md:pt-0 md:pr-16">
              <Reveal>
                <span className="label-tracking text-[#8442FA] mb-4 block">Academic Standard</span>
                <h3 className="font-serif text-4xl mb-6">Rigorous Curriculum</h3>
                <p className="font-sans font-light text-[rgba(245,242,233,0.6)] leading-relaxed text-lg mb-8">
                  Our courses are developed in collaboration with mental health professionals to ensure academic rigor while remaining deeply relevant to the African context.
                </p>
                
                <ul className="flex flex-col gap-6">
                  <li className="grid grid-cols-12 items-start group">
                    <span className="col-span-2 font-serif text-[#8442FA] opacity-50">I</span>
                    <span className="col-span-10 font-sans font-light text-[rgba(245,242,233,0.8)] group-hover:text-[#F5F2E9] transition-colors">Self-paced learning modules designed for active professionals.</span>
                  </li>
                  <li className="grid grid-cols-12 items-start group">
                    <span className="col-span-2 font-serif text-[#8442FA] opacity-50">II</span>
                    <span className="col-span-10 font-sans font-light text-[rgba(245,242,233,0.8)] group-hover:text-[#F5F2E9] transition-colors">Case studies rooted in practical, pan-African scenarios.</span>
                  </li>
                  <li className="grid grid-cols-12 items-start group">
                    <span className="col-span-2 font-serif text-[#8442FA] opacity-50">III</span>
                    <span className="col-span-10 font-sans font-light text-[rgba(245,242,233,0.8)] group-hover:text-[#F5F2E9] transition-colors">Verified certification upon completion of core tracks.</span>
                  </li>
                </ul>
              </Reveal>
            </div>

            <div className="md:col-span-6 order-1 md:order-2">
              <Reveal delay={200}>
                <div className="aspect-square w-full overflow-hidden relative">
                  <img src="/images/institute_hero.jpg" alt="Clinical Education in Africa" className="img-cinematic absolute inset-0 filter brightness-[0.6] saturate-[0.8]" />
                  <div className="absolute inset-0 border border-[rgba(245,242,233,0.1)] m-4 pointer-events-none"></div>
                </div>
              </Reveal>
            </div>
            
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2.5 FEATURED INAUGURAL COHORT                                */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 bg-[#030303] border-t border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container">
          <Reveal>
            <div className="border border-[rgba(245,242,233,0.1)] p-8 md:p-16 bg-[#110E0C]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-8 flex flex-col">
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="label-tracking text-[#8442FA]">Inaugural Programme</span>
                    <span className="text-[rgba(245,242,233,0.3)]">/</span>
                    <span className="label-tracking text-[rgba(245,242,233,0.6)]">In Collaboration with ACI Africa</span>
                  </div>
                  <h3 className="title-section mb-4 text-[#F5F2E9]">
                    Certified Mental Health Advocate
                  </h3>
                  <p className="font-serif text-lg text-[#8442FA] italic mb-6">
                    Cohort I · January 2027 · Registration Opens 1 November 2026
                  </p>
                  <p className="font-sans font-light text-base md:text-lg text-[rgba(245,242,233,0.7)] leading-relaxed mb-8 max-w-3xl">
                    A five-week programme equipping emerging leaders and community members across Africa with the knowledge, ethical grounding, and practical skills to advance mental health awareness, reduce stigma, and connect communities to appropriate support.
                  </p>
                  <div className="flex flex-wrap items-center gap-6">
                    <Link
                      to="/institute/courses/certified-mental-health-advocate"
                      className="btn-cinematic !border-[#8442FA] !text-[#8442FA] hover:!text-[#030303]"
                    >
                      View Programme & Waitlist <span className="ml-3 font-serif text-xl leading-none">→</span>
                    </Link>
                    <Link
                      to="/institute/catalog"
                      className="btn-cinematic"
                    >
                      Browse Full Catalog
                    </Link>
                  </div>
                </div>
                <div className="lg:col-span-4">
                  <div className="border-t lg:border-t-0 lg:border-l border-[rgba(245,242,233,0.1)] pt-8 lg:pt-0 lg:pl-10 flex flex-col gap-6">
                    <div>
                      <span className="label-tracking text-[#8442FA] mb-1 block">Duration</span>
                      <span className="font-serif text-xl text-[#F5F2E9]">5 Weeks · Live Online</span>
                    </div>
                    <div>
                      <span className="label-tracking text-[#8442FA] mb-1 block">Schedule</span>
                      <span className="font-serif text-xl text-[#F5F2E9]">Saturdays, 09:00 – 12:00 UTC</span>
                    </div>
                    <div>
                      <span className="label-tracking text-[#8442FA] mb-1 block">Credential</span>
                      <span className="font-serif text-xl text-[#F5F2E9]">Certificate of Completion</span>
                    </div>
                    <div>
                      <span className="label-tracking text-[#8442FA] mb-1 block">Cohort Capacity</span>
                      <span className="font-serif text-xl text-[#F5F2E9]">Limited to 40</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. CALL TO ACTION                                            */}
      {/* ============================================================ */}
      <section className="py-32 md:py-48 bg-[#030303] text-center border-t border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container flex flex-col items-center">
          <Reveal>
            <h2 className="title-section mb-12">Start learning today.</h2>
            <p className="text-body-large text-[rgba(245,242,233,0.5)] font-light mb-16 max-w-2xl mx-auto">
              Whether you are an aspiring ambassador, a community health worker, or a mental health professional, the PAMHO Institute provides the resources to deepen your impact.
            </p>
            <Link to="/register" className="btn-cinematic">
              Create Account
            </Link>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
