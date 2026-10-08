import { Link } from 'react-router-dom'

export default function Membership() {
  const container = 'w-full max-w-[1536px] mx-auto px-6 sm:px-12 lg:px-20'

  return (
    <div className="flex flex-col bg-[#0a0a0c]">
      {/* ============================================================ */}
      {/* INSTITUTIONAL HERO                                           */}
      {/* ============================================================ */}
      <section className={`pt-48 pb-32 ${container} relative`}>
        {/* Abstract Structural Motif */}
        <div className="absolute top-0 right-0 w-full h-[600px] pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-1/4 right-[10%] w-[500px] h-px bg-gradient-to-r from-transparent via-[#8442fa]/20 to-transparent transform rotate-45"></div>
          <div className="absolute top-1/3 right-[20%] w-[400px] h-px bg-gradient-to-r from-transparent via-[#8442fa]/30 to-transparent transform -rotate-12"></div>
          <div className="absolute top-1/2 right-[5%] w-[600px] h-px bg-gradient-to-r from-transparent via-[#8442fa]/10 to-transparent transform rotate-90"></div>
          <div className="absolute top-1/4 right-[15%] w-[300px] h-[300px] bg-[#140b1e] blur-[120px] rounded-full"></div>
        </div>
        
        <div className="max-w-4xl relative z-10">
          <div className="tag-outline self-start mb-8 text-[#b48aff] border-[#8442fa]/30 uppercase tracking-widest inline-block">
            Membership & Partners
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#f4f2ee] tracking-tight leading-[1.05] mb-10">
            Building stronger <br className="hidden md:block"/> systems together.
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-3xl mb-12">
            Systemic change in African mental health cannot be achieved in isolation. PAMHO serves as a collaborative platform, uniting individuals and institutions to scale evidence-based care and advocacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <a href="#collaboration" className="btn-primary text-sm font-bold px-8 py-4 rounded-sm shadow-[0_4px_20px_-5px_rgba(132,66,250,0.4)]">
              Explore Collaboration
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* WHY PARTICIPATION MATTERS                                    */}
      {/* ============================================================ */}
      <section className={`py-32 ${container} bg-[#111115] border-y border-[#8442fa]/10`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-6">The Collaborative Model</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-[#f4f2ee] mb-6 leading-tight">
              Alignment across all levels of society.
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed font-light mb-6">
              To elevate mental health as a public-health priority across the continent, interventions must be culturally sensitive, structurally sound, and locally sustainable. This requires a coordinated approach.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed font-light">
              By connecting grassroots realities with clinical expertise and institutional resources, PAMHO creates the infrastructure for lasting systemic change.
            </p>
          </div>
          <div className="relative aspect-square sm:aspect-[4/3] md:aspect-square flex items-center justify-center bg-[#140b1e] border border-[#8442fa]/20 rounded-sm p-12">
             {/* Abstract Alignment Graphic */}
             <div className="w-full h-full relative flex flex-col justify-between">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#8442fa]/40 to-transparent"></div>
                <div className="w-[80%] mx-auto h-px bg-gradient-to-r from-transparent via-[#b48aff]/60 to-transparent"></div>
                <div className="w-[60%] mx-auto h-[2px] bg-gradient-to-r from-transparent via-[#f4f2ee]/80 to-transparent shadow-[0_0_10px_rgba(244,242,238,0.5)]"></div>
                <div className="w-[80%] mx-auto h-px bg-gradient-to-r from-transparent via-[#b48aff]/60 to-transparent"></div>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#8442fa]/40 to-transparent"></div>
                
                {/* Vertical Connector */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-[#8442fa]/50 to-transparent"></div>
             </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* INSTITUTIONAL COLLABORATION VISUALIZATION                    */}
      {/* ============================================================ */}
      <section id="collaboration" className={`py-40 ${container} bg-[#0a0a0c]`}>
        <div className="text-center max-w-3xl mx-auto mb-24">
           <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-4">Structural Architecture</h2>
           <h3 className="text-3xl md:text-4xl font-bold text-[#f4f2ee]">A platform for connection.</h3>
        </div>

        <div className="relative w-full max-w-6xl mx-auto h-[500px] md:h-[600px] border border-[#8442fa]/10 bg-[#111115] rounded-sm flex items-center justify-center overflow-hidden">
           {/* Grid Background */}
           <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#8442fa 1px, transparent 1px), linear-gradient(90deg, #8442fa 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
           
           {/* Center Node: PAMHO */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
              <div className="w-32 h-32 md:w-40 md:h-40 border border-[#8442fa] bg-[#1a1025] flex items-center justify-center mb-4 relative shadow-[0_0_50px_rgba(132,66,250,0.15)]">
                 <div className="absolute inset-4 border border-[#8442fa]/40"></div>
                 <span className="text-lg md:text-xl font-bold text-[#f4f2ee] tracking-widest">PAMHO</span>
              </div>
           </div>

           {/* Top Left: Organizations */}
           <div className="absolute top-[15%] left-[10%] md:left-[20%] flex flex-col items-center">
              <div className="w-20 h-20 border border-[#8442fa]/30 bg-[#140b1e] flex items-center justify-center mb-3">
                 <div className="w-2 h-2 bg-gray-400"></div>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 bg-[#111115] px-2">Organizations</span>
           </div>

           {/* Top Right: Professionals */}
           <div className="absolute top-[15%] right-[10%] md:right-[20%] flex flex-col items-center">
              <div className="w-20 h-20 border border-[#8442fa]/30 bg-[#140b1e] flex items-center justify-center mb-3">
                 <div className="w-2 h-2 bg-gray-400"></div>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 bg-[#111115] px-2">Professionals</span>
           </div>

           {/* Bottom Left: Communities */}
           <div className="absolute bottom-[15%] left-[10%] md:left-[20%] flex flex-col items-center">
              <div className="w-20 h-20 border border-[#8442fa]/30 bg-[#140b1e] flex items-center justify-center mb-3">
                 <div className="w-2 h-2 bg-[#b48aff]"></div>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#b48aff] bg-[#111115] px-2">Communities</span>
           </div>

           {/* Bottom Right: Advocates */}
           <div className="absolute bottom-[15%] right-[10%] md:right-[20%] flex flex-col items-center">
              <div className="w-20 h-20 border border-[#8442fa]/30 bg-[#140b1e] flex items-center justify-center mb-3">
                 <div className="w-2 h-2 bg-[#b48aff]"></div>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#b48aff] bg-[#111115] px-2">Advocates</span>
           </div>

           {/* Connecting SVG Lines */}
           <svg className="absolute inset-0 w-full h-full text-[#8442fa]/20 pointer-events-none" style={{ zIndex: 10 }}>
              {/* Org to Center */}
              <line x1="20%" y1="15%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" />
              {/* Prof to Center */}
              <line x1="80%" y1="15%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" />
              {/* Comm to Center */}
              <line x1="20%" y1="85%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" />
              {/* Adv to Center */}
              <line x1="80%" y1="85%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" />
           </svg>
        </div>
      </section>

      {/* ============================================================ */}
      {/* DISTINGUISHING INDIVIDUALS VS ORGANIZATIONS                  */}
      {/* ============================================================ */}
      <section className={`py-32 ${container} bg-[#111115] border-y border-[#8442fa]/10`}>
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-4">Modes of Engagement</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-[#f4f2ee]">Two paths, one mission.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
           {/* Individuals */}
           <div className="bg-[#140b1e] border border-[#8442fa]/20 p-12 flex flex-col h-full rounded-sm">
              <div className="w-12 h-12 rounded-sm border border-[#8442fa]/30 bg-[#111115] flex items-center justify-center mb-8">
                 <svg className="w-5 h-5 text-[#b48aff]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <h4 className="text-2xl font-bold text-[#f4f2ee] mb-4">Individuals</h4>
              <p className="text-gray-400 font-light leading-relaxed mb-8 flex-grow">
                 People who contribute knowledge, advocacy, or community participation. Whether you are a mental health professional, an educator, or a local advocate, your individual expertise forms the foundation of our network.
              </p>
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#8442fa]/70 pt-8 border-t border-[#8442fa]/10">
                 Knowledge • Advocacy • Community
              </div>
           </div>

           {/* Organizations */}
           <div className="bg-[#140b1e] border border-[#8442fa]/20 p-12 flex flex-col h-full rounded-sm">
              <div className="w-12 h-12 rounded-sm border border-[#8442fa]/30 bg-[#111115] flex items-center justify-center mb-8">
                 <svg className="w-5 h-5 text-[#b48aff]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <h4 className="text-2xl font-bold text-[#f4f2ee] mb-4">Organizations</h4>
              <p className="text-gray-400 font-light leading-relaxed mb-8 flex-grow">
                 Institutions that collaborate, support, or work alongside PAMHO to scale impact. Partnerships are evaluated based on mission alignment, regional presence, and shared public-health goals.
              </p>
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#8442fa]/70 pt-8 border-t border-[#8442fa]/10">
                 Institutions • Resources • Scale
              </div>
           </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* WAYS TO ENGAGE                                               */}
      {/* ============================================================ */}
      <section className={`py-40 ${container} bg-[#0a0a0c]`}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-[#8442fa]/10 pb-12 lg:pb-0 lg:pr-12 flex flex-col justify-between">
              <h3 className="text-2xl font-bold text-[#f4f2ee] mb-6">Ways to Engage</h3>
              <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
                 Explore the avenues for formal participation.
              </p>
           </div>
           
           <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-12 lg:pl-12 pt-8 lg:pt-0">
              <div>
                 <h4 className="text-xl font-bold text-[#f4f2ee] mb-3 flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-[#8442fa]"></div>
                   Learn
                 </h4>
                 <p className="text-gray-400 font-light leading-relaxed">
                   Engage with PAMHO's educational work, access evidence-based resources, and utilize our institutional training platforms to improve local capacity.
                 </p>
              </div>
              <div>
                 <h4 className="text-xl font-bold text-[#f4f2ee] mb-3 flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-[#8442fa]"></div>
                   Contribute
                 </h4>
                 <p className="text-gray-400 font-light leading-relaxed">
                   Bring your clinical expertise, advocacy experience, or grassroots community knowledge to help refine and inform our continental programs.
                 </p>
              </div>
              <div>
                 <h4 className="text-xl font-bold text-[#f4f2ee] mb-3 flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-[#8442fa]"></div>
                   Collaborate
                 </h4>
                 <p className="text-gray-400 font-light leading-relaxed">
                   Explore formal institutional or organizational collaboration to align resources, cross-pollinate research, and implement larger-scale public health initiatives.
                 </p>
              </div>
              <div>
                 <h4 className="text-xl font-bold text-[#f4f2ee] mb-3 flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-[#8442fa]"></div>
                   Connect
                 </h4>
                 <p className="text-gray-400 font-light leading-relaxed">
                   Reach PAMHO directly to discuss specific intersections between your work and our mission, establishing an ongoing dialogue for future alignment.
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PARTNER LOGOS (Intentional Empty State)                      */}
      {/* ============================================================ */}
      <section className={`py-40 ${container} bg-[#111115] border-y border-[#8442fa]/10`}>
        <div className="text-center mb-16">
          <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-4">Our Partnerships</h2>
          <h3 className="text-3xl font-bold text-[#f4f2ee]">Institutional Collaborations</h3>
        </div>

        <div className="w-full max-w-5xl mx-auto border border-[#8442fa]/10 bg-[#140b1e] rounded-sm p-16 md:p-24 flex flex-col items-center justify-center text-center relative">
           <div className="w-16 h-16 border border-[#8442fa]/30 bg-[#111115] flex items-center justify-center mb-8 transform rotate-45 relative z-10">
              <div className="w-6 h-6 border border-[#8442fa]/40 bg-[#140b1e] flex items-center justify-center">
                 <div className="w-1 h-1 bg-[#b48aff]"></div>
              </div>
           </div>
           
           <h4 className="text-xl font-bold text-[#f4f2ee] mb-4 relative z-10">Collaboration portfolio updating</h4>
           <p className="text-gray-400 text-lg leading-relaxed max-w-2xl relative z-10 font-light">
             Verified institutional partnerships, academic collaborations, and organizational affiliations will be presented here as formal agreements are finalized and documented.
           </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FINAL INSTITUTIONAL CTA                                      */}
      {/* ============================================================ */}
      <section className={`py-40 ${container} relative overflow-hidden bg-[#0a0a0c]`}>
        <div className="max-w-4xl mx-auto text-center relative z-10 bg-[#140b1e] border border-[#8442fa]/20 rounded-sm p-16 md:p-24 shadow-[0_0_50px_rgba(132,66,250,0.05)] flex flex-col items-center justify-center">
          <div className="w-16 h-16 border border-[#8442fa]/30 bg-[#111115] flex items-center justify-center mb-8 relative z-10">
              <div className="w-3 h-3 bg-[#b48aff] shadow-[0_0_15px_#b48aff]"></div>
          </div>
          <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-6">Build With PAMHO</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-[#f4f2ee] tracking-tight mb-8">
            Start the conversation.
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto mb-12">
            Whether you are an individual bringing expertise or an organization seeking alignment, we invite you to connect with PAMHO and explore how we can build better mental health systems across Africa together.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full">
            <Link to="/contact?type=membership" className="btn-primary text-sm font-bold px-10 py-4 rounded-sm shadow-[0_4px_24px_-4px_rgba(132,66,250,0.4)] hover:shadow-[0_4px_30px_-5px_rgba(132,66,250,0.6)] transition-shadow">
              Get Involved
            </Link>
            <Link to="/contact?type=partnership" className="text-sm font-medium text-gray-400 hover:text-[#b48aff] transition-colors border border-gray-800 hover:border-[#8442fa]/30 bg-[#111115] px-10 py-4 rounded-sm">
              Contact PAMHO
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
