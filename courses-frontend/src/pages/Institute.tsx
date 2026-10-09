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
      <section className="pt-48 pb-16 md:pt-64 md:pb-24 border-b border-[rgba(245,242,233,0.05)]">
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
                  <img src="/institute_learning.png" alt="Clinical Education in Africa" className="img-cinematic absolute inset-0 filter brightness-[0.6] saturate-[0.8]" />
                  <div className="absolute inset-0 border border-[rgba(245,242,233,0.1)] m-4 pointer-events-none"></div>
                </div>
              </Reveal>
            </div>
            
          </div>
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
