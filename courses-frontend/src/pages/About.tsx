import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function About() {
  const container = 'w-full max-w-[1536px] mx-auto px-6 sm:px-12 lg:px-20'

  return (
    <div className="flex flex-col bg-[#0a0a0c]">
      <SEO title="PAMHO | About the Organization" description="Learn about the mission, vision, and framework of the Pan-African Mental Health Organization." />
      {/* ============================================================ */}
      {/* INSTITUTIONAL HERO                                           */}
      {/* ============================================================ */}
      <section className={`pt-48 pb-32 ${container} relative`}>
        {/* Subtle ambient glow */}
        <div className="absolute top-0 right-1/4 w-1/3 h-[500px] bg-[#140b1e] blur-[150px] rounded-full pointer-events-none -z-10"></div>
        
        <div className="max-w-4xl">
          <div className="tag-outline self-start mb-8 text-[#b48aff] border-[#8442fa]/30 uppercase tracking-widest inline-block">
            About PAMHO
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#f4f2ee] tracking-tight leading-[1.05] mb-10">
            Building a healthier future for Africa.
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-3xl">
            We operate at the intersection of grassroots advocacy and institutional reform, treating mental health not as a secondary concern, but as a fundamental public-health priority.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* MISSION, VISION, COMMITMENT (Editorial Composition)          */}
      {/* ============================================================ */}
      <section className={`py-32 ${container} border-t border-[#8442fa]/10`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
             <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-4">Institutional Foundation</h2>
             <h3 className="text-3xl font-bold text-[#f4f2ee] leading-tight">
               Our framework for continental change.
             </h3>
          </div>
          
          <div className="lg:col-span-8 flex flex-col gap-24">
            {/* MISSION */}
            <div className="relative">
              <div className="absolute -left-6 md:-left-12 top-2 text-[#8442fa]/30 font-mono text-sm hidden sm:block">01</div>
              <h4 className="text-2xl font-bold text-[#f4f2ee] mb-6">Mission</h4>
              <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light">
                PAMHO seeks to improve access to mental health support, services, and resources across Africa while reducing stigma, improving access to care, and creating long-lasting systemic change.
              </p>
            </div>

            {/* VISION */}
            <div className="relative rule-top pt-16 border-[#8442fa]/10">
              <div className="absolute -left-6 md:-left-12 top-18 text-[#8442fa]/30 font-mono text-sm hidden sm:block">02</div>
              <h4 className="text-2xl font-bold text-[#f4f2ee] mb-6">Vision</h4>
              <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light">
                A continent where mental health receives the same urgency and importance as physical health, with accessible services from urban centers to remote communities, and people able to seek help without discrimination or judgment.
              </p>
            </div>

            {/* COMMITMENT */}
            <div className="relative rule-top pt-16 border-[#8442fa]/10">
              <div className="absolute -left-6 md:-left-12 top-18 text-[#8442fa]/30 font-mono text-sm hidden sm:block">03</div>
              <h4 className="text-2xl font-bold text-[#f4f2ee] mb-6">Commitment</h4>
              <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light">
                PAMHO recognizes that mental-health challenges differ across communities. We emphasize cultural, social, and economic context, prioritizing local solutions and long-term systemic change over temporary interventions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CONTINENTAL PERSPECTIVE (Abstract Geographic Visual)         */}
      {/* ============================================================ */}
      <section className={`py-40 ${container} bg-[#111115]`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative aspect-[4/3] bg-[#140b1e] border border-[#8442fa]/20 flex items-center justify-center overflow-hidden rounded-sm">
             {/* Continental Data Abstraction */}
             <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(rgba(132, 66, 250, 0.4) 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
             
             {/* Geographic coordinate lines */}
             <div className="absolute top-1/3 left-0 w-full h-px bg-[#8442fa]/20"></div>
             <div className="absolute top-2/3 left-0 w-full h-px bg-[#8442fa]/20"></div>
             <div className="absolute left-1/3 top-0 w-px h-full bg-[#8442fa]/20"></div>
             <div className="absolute left-2/3 top-0 w-px h-full bg-[#8442fa]/20"></div>
             
             {/* Connection Nodes */}
             <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-[#8442fa] rounded-full shadow-[0_0_15px_rgba(132,66,250,0.8)]"></div>
             <div className="absolute top-2/3 left-2/3 w-2 h-2 bg-[#b48aff] rounded-full shadow-[0_0_15px_rgba(180,138,255,0.8)]"></div>
             <div className="absolute top-2/3 left-1/3 w-2 h-2 bg-[#8442fa]/50 rounded-full"></div>
             
             <div className="absolute bottom-6 left-6 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
               Continental Reach
             </div>
          </div>
          
          <div className="order-1 md:order-2 md:pl-12">
            <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-4">Pan-African by Design</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-[#f4f2ee] tracking-tight mb-8">
              We think beyond <br/>one community.
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Mental health infrastructure in Africa requires a continental perspective rooted in local realities. PAMHO serves as the connective tissue—a pan-African organization that scales knowledge, resources, and advocacy across borders.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              By working regionally, we ensure that successful models in one context can inform and elevate practices across the entire continent, accelerating progress without losing cultural relevance.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* COLLABORATIVE ACTION & CULTURAL APPROACH                     */}
      {/* ============================================================ */}
      <section className={`py-40 ${container} bg-[#0a0a0c] border-y border-[#8442fa]/10`}>
        <div className="text-center max-w-4xl mx-auto mb-24">
           <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-4">Methodology</h2>
           <h3 className="text-3xl md:text-5xl font-bold text-[#f4f2ee] tracking-tight mb-8">
             The context dictates the care.
           </h3>
           <p className="text-gray-400 text-lg leading-relaxed">
             We do not believe in top-down, imported solutions. We partner with the people who understand the social and economic contexts of their communities best, fostering a collaborative ecosystem of care.
           </p>
        </div>

        {/* Network Relationship Diagram */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 relative max-w-5xl mx-auto">
           {/* Connection Line (Desktop) */}
           <div className="hidden md:block absolute top-1/2 left-12 right-12 h-px bg-gradient-to-r from-transparent via-[#8442fa]/30 to-transparent -translate-y-1/2"></div>
           
           {/* Node 1 */}
           <div className="bg-[#111115] border border-[#8442fa]/20 rounded-sm p-8 w-full md:w-1/3 relative z-10 flex flex-col items-center text-center">
             <div className="w-12 h-12 rounded-full border border-[#8442fa]/40 bg-[#140b1e] flex items-center justify-center mb-6">
                <div className="w-2 h-2 bg-[#8442fa] rounded-full"></div>
             </div>
             <h4 className="text-lg font-bold text-[#f4f2ee] mb-3">Professionals</h4>
             <p className="text-sm text-gray-500 leading-relaxed">Clinical psychologists and researchers providing evidence-based expertise.</p>
           </div>
           
           {/* Node 2 */}
           <div className="bg-[#140b1e] border border-[#8442fa]/40 rounded-sm p-10 w-full md:w-1/3 relative z-10 flex flex-col items-center text-center shadow-[0_0_30px_rgba(132,66,250,0.1)]">
             <div className="w-14 h-14 rounded-full border border-[#8442fa] bg-[#1a1025] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(132,66,250,0.2)]">
                <div className="w-3 h-3 bg-[#b48aff] rounded-full"></div>
             </div>
             <h4 className="text-xl font-bold text-[#f4f2ee] mb-3">Communities</h4>
             <p className="text-sm text-gray-400 leading-relaxed">The grassroots foundation where cultural context and local solutions are formed.</p>
           </div>

           {/* Node 3 */}
           <div className="bg-[#111115] border border-[#8442fa]/20 rounded-sm p-8 w-full md:w-1/3 relative z-10 flex flex-col items-center text-center">
             <div className="w-12 h-12 rounded-full border border-[#8442fa]/40 bg-[#140b1e] flex items-center justify-center mb-6">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
             </div>
             <h4 className="text-lg font-bold text-[#f4f2ee] mb-3">Advocates</h4>
             <p className="text-sm text-gray-500 leading-relaxed">Local mobilizers pushing for awareness and systemic policy change.</p>
           </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* LEADERSHIP (Institutional Presentation - Temporarily Hidden)   */}
      {/* ============================================================ */}
      {/* 
      <section className={`py-40 ${container} bg-[#111115]`}>
        <div className="mb-20">
          <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-4">Organization</h2>
          <h3 className="text-4xl font-bold text-[#f4f2ee]">Institutional Leadership</h3>
        </div>

        <div className="bg-[#140b1e] border border-[#8442fa]/20 rounded-sm p-16 md:p-24 text-center max-w-4xl mx-auto flex flex-col items-center">
           <div className="w-16 h-16 rounded-full border border-[#8442fa]/20 bg-[#111115] flex items-center justify-center mb-8">
              <svg className="w-6 h-6 text-[#8442fa]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
           </div>
           <h4 className="text-2xl font-bold text-[#f4f2ee] mb-4">Leadership profiles pending</h4>
           <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
             PAMHO is guided by a network of mental health professionals, advocates, and organizational leaders spanning the African continent. Verified leadership profiles will be introduced here as organizational documentation becomes available.
           </p>
        </div>
      </section>
      */}

      {/* ============================================================ */}
      {/* FINAL CLOSING STATEMENT / CTA                                */}
      {/* ============================================================ */}
      <section className={`py-40 ${container} text-center relative overflow-hidden bg-[#1a1025] border-t border-[#8442fa]/30`}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-[#f4f2ee] tracking-tight mb-8 relative z-10">Join our network.</h2>
        <p className="text-[#b48aff] text-lg max-w-xl mx-auto mb-12 relative z-10 font-medium">
          Whether through advocacy, professional expertise, or financial support, systemic change requires collective action.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
          <Link to="/membership" className="btn-primary text-sm font-bold px-10 py-4 rounded-sm shadow-[0_4px_24px_-4px_rgba(132,66,250,0.5)]">Become a Member</Link>
          <Link to="/contact?type=volunteer" className="btn-secondary text-sm font-bold px-10 py-4 rounded-sm bg-[#111115]/50">Get Involved</Link>
        </div>
      </section>

    </div>
  )
}
