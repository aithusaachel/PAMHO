import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function Ambassadors() {
  const container = 'w-full max-w-[1536px] mx-auto px-6 sm:px-12 lg:px-20'

  return (
    <div className="flex flex-col bg-[#0a0a0c]">
      <SEO title="PAMHO | Ambassadors & Mobilizers" description="Join the continental network of PAMHO ambassadors driving change." />
      {/* ============================================================ */}
      {/* HUMAN-CENTERED HERO                                          */}
      {/* ============================================================ */}
      <section className={`pt-48 pb-32 ${container} relative`}>
        {/* Abstract Network Ambient Effect */}
        <div className="absolute top-1/4 right-0 md:right-1/4 w-[400px] h-[400px] bg-[#140b1e] blur-[150px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute top-1/3 right-1/4 w-[200px] h-[200px] bg-[#8442fa]/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
        
        <div className="max-w-4xl relative z-10">
          <div className="tag-outline self-start mb-8 text-[#b48aff] border-[#8442fa]/30 uppercase tracking-widest inline-block">
            Ambassadors & Community Mobilizers
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#f4f2ee] tracking-tight leading-[1.05] mb-10">
            A continental network, <br className="hidden md:block"/> grounded in community.
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-3xl mb-12">
            Change cannot be exported. It must be cultivated locally. PAMHO is driven by the people who connect clinical knowledge, advocacy, and local context to build sustainable mental health care.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <a href="#join-network" className="btn-primary text-sm font-bold px-8 py-4 rounded-sm shadow-[0_4px_20px_-5px_rgba(132,66,250,0.4)]">
              Join the Network
            </a>
            <a href="#perspectives" className="text-sm font-medium text-gray-400 hover:text-[#b48aff] transition-colors flex items-center">
              Learn About the Network &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CONCEPTUAL NETWORK VISUALIZATION                             */}
      {/* ============================================================ */}
      <section className={`py-40 ${container} bg-[#111115] overflow-hidden`}>
        <div className="text-center max-w-3xl mx-auto mb-20">
           <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-4">Structure</h2>
           <h3 className="text-3xl md:text-4xl font-bold text-[#f4f2ee]">People connected by purpose.</h3>
        </div>

        <div className="relative w-full max-w-5xl mx-auto h-[600px] flex items-center justify-center">
           {/* Abstract Depth/Lines */}
           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(132,66,250,0.3) 0%, transparent 70%)' }}></div>
           
           {/* Connecting Lines (SVG) */}
           <svg className="absolute inset-0 w-full h-full text-[#8442fa]/10" style={{ strokeDasharray: '4 4' }}>
             <path d="M 50% 20% L 20% 50% L 50% 80% L 80% 50% Z" fill="none" stroke="currentColor" strokeWidth="1" />
             <path d="M 50% 20% L 50% 50% L 50% 80%" fill="none" stroke="currentColor" strokeWidth="1" />
             <path d="M 20% 50% L 50% 50% L 80% 50%" fill="none" stroke="currentColor" strokeWidth="1" />
           </svg>

           {/* Core Nodes */}
           {/* Top Node */}
           <div className="absolute top-[15%] left-1/2 -translate-x-1/2 flex flex-col items-center">
             <div className="w-12 h-12 rounded-full border border-[#8442fa]/30 bg-[#140b1e] flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(132,66,250,0.15)] z-10">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
             </div>
             <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 bg-[#111115] px-2">Knowledge</span>
           </div>

           {/* Left Node */}
           <div className="absolute top-1/2 left-[15%] -translate-y-1/2 flex flex-col items-center">
             <div className="w-16 h-16 rounded-full border border-[#8442fa]/40 bg-[#140b1e] flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(132,66,250,0.2)] z-10">
                <div className="w-3 h-3 bg-[#b48aff] rounded-full"></div>
             </div>
             <span className="text-[10px] font-mono uppercase tracking-widest text-[#b48aff] bg-[#111115] px-2">Advocates</span>
           </div>

           {/* Right Node */}
           <div className="absolute top-1/2 right-[15%] -translate-y-1/2 flex flex-col items-center">
             <div className="w-16 h-16 rounded-full border border-[#8442fa]/40 bg-[#140b1e] flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(132,66,250,0.2)] z-10">
                <div className="w-3 h-3 bg-[#b48aff] rounded-full"></div>
             </div>
             <span className="text-[10px] font-mono uppercase tracking-widest text-[#b48aff] bg-[#111115] px-2">Professionals</span>
           </div>

           {/* Center Node (Communities) */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
             <div className="w-24 h-24 rounded-full border border-[#8442fa] bg-[#1a1025] flex items-center justify-center mb-4 shadow-[0_0_40px_rgba(132,66,250,0.3)] z-10 relative">
                <div className="absolute inset-2 border border-[#8442fa]/30 rounded-full"></div>
                <div className="w-4 h-4 bg-[#b48aff] rounded-full shadow-[0_0_15px_#b48aff]"></div>
             </div>
             <span className="text-[11px] font-mono uppercase tracking-widest text-[#f4f2ee] bg-[#111115] px-3 py-1 border border-[#8442fa]/20 rounded-sm">Communities</span>
           </div>

           {/* Bottom Node */}
           <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 flex flex-col items-center">
             <div className="w-12 h-12 rounded-full border border-[#8442fa]/30 bg-[#140b1e] flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(132,66,250,0.15)] z-10">
                <div className="w-2 h-2 bg-[#8442fa] rounded-full"></div>
             </div>
             <span className="text-[10px] font-mono uppercase tracking-widest text-[#8442fa] bg-[#111115] px-2">Action</span>
           </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* THE THREE HUMAN PERSPECTIVES                                 */}
      {/* ============================================================ */}
      <section id="perspectives" className={`py-40 ${container} bg-[#0a0a0c]`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          <div className="lg:col-span-4 flex flex-col justify-center">
             <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-4">Ecosystem</h2>
             <h3 className="text-3xl md:text-4xl font-bold text-[#f4f2ee] leading-tight mb-6">
               Different perspectives, shared ambition.
             </h3>
             <p className="text-gray-400 leading-relaxed font-light">
               PAMHO's model relies on the active participation of three core groups. No single group holds all the answers; the network thrives on the intersection of their knowledge.
             </p>
          </div>
          
          <div className="lg:col-span-8 flex flex-col gap-8 md:gap-0">
            {/* 01 Professionals */}
            <div className="rule-top pt-12 pb-12 md:pb-20 border-[#8442fa]/10 grid grid-cols-1 md:grid-cols-12 gap-6">
               <div className="md:col-span-3 text-[#8442fa]/30 font-mono text-xl">01</div>
               <div className="md:col-span-9">
                 <h4 className="text-2xl font-bold text-[#f4f2ee] mb-4">Professionals</h4>
                 <p className="text-lg text-gray-400 leading-relaxed font-light">
                   Knowledge, expertise, and clinical perspective. Psychologists, researchers, and mental health practitioners who provide the evidence-based foundation for our continental programs.
                 </p>
               </div>
            </div>

            {/* 02 Communities (Visually Elevated) */}
            <div className="rule-top pt-12 pb-12 md:pb-20 border-[#8442fa]/30 bg-[#111115] -mx-6 px-6 sm:-mx-12 sm:px-12 lg:-mx-20 lg:px-20 grid grid-cols-1 md:grid-cols-12 gap-6 relative">
               <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#8442fa]"></div>
               <div className="md:col-span-3 text-[#b48aff] font-mono text-xl">02</div>
               <div className="md:col-span-9">
                 <h4 className="text-3xl font-bold text-[#f4f2ee] mb-4">Communities</h4>
                 <p className="text-xl text-[#f4f2ee] leading-relaxed font-light">
                   Local context, lived experience, and grassroots knowledge. The people who understand their social and economic realities better than anyone else, ensuring that care is culturally relevant and sustainable.
                 </p>
               </div>
            </div>

            {/* 03 Advocates */}
            <div className="rule-top pt-12 pb-12 border-[#8442fa]/10 grid grid-cols-1 md:grid-cols-12 gap-6">
               <div className="md:col-span-3 text-[#8442fa]/30 font-mono text-xl">03</div>
               <div className="md:col-span-9">
                 <h4 className="text-2xl font-bold text-[#f4f2ee] mb-4">Advocates</h4>
                 <p className="text-lg text-gray-400 leading-relaxed font-light">
                   People who challenge stigma, mobilize resources, and elevate mental health discussions. The amplifiers who carry knowledge out of the clinic and into the public square.
                 </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* COMMUNITY-CENTERED PHILOSOPHY                                */}
      {/* ============================================================ */}
      <section className={`py-40 ${container} bg-[#111115] border-y border-[#8442fa]/10 text-center`}>
         <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-16">The Collaborative Process</h2>
         
         <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-0 font-mono text-sm uppercase tracking-widest">
            <div className="text-[#f4f2ee] px-6 py-3 border border-[#8442fa]/20 rounded-sm">Listen</div>
            <div className="hidden md:block w-8 h-px bg-[#8442fa]/30"></div>
            <svg className="md:hidden w-6 h-6 text-[#8442fa]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            
            <div className="text-[#f4f2ee] px-6 py-3 border border-[#8442fa]/20 rounded-sm">Learn</div>
            <div className="hidden md:block w-8 h-px bg-[#8442fa]/30"></div>
            <svg className="md:hidden w-6 h-6 text-[#8442fa]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            
            <div className="text-[#b48aff] px-6 py-3 border border-[#8442fa] bg-[#140b1e] rounded-sm shadow-[0_0_15px_rgba(132,66,250,0.2)]">Connect</div>
            <div className="hidden md:block w-8 h-px bg-[#8442fa]/30"></div>
            <svg className="md:hidden w-6 h-6 text-[#8442fa]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            
            <div className="text-[#f4f2ee] px-6 py-3 border border-[#8442fa]/20 rounded-sm">Mobilize</div>
            <div className="hidden md:block w-8 h-px bg-[#8442fa]/30"></div>
            <svg className="md:hidden w-6 h-6 text-[#8442fa]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            
            <div className="text-[#f4f2ee] px-6 py-3 border border-[#8442fa]/20 rounded-sm">Act</div>
         </div>
      </section>

      {/* ============================================================ */}
      {/* VOICES / STORIES (Intentional Placeholder)                   */}
      {/* ============================================================ */}
      <section className={`py-40 ${container} bg-[#0a0a0c]`}>
        <div className="mb-20 text-center">
          <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-4">Perspectives</h2>
          <h3 className="text-4xl font-bold text-[#f4f2ee]">Voices from the network.</h3>
        </div>

        <div className="w-full max-w-4xl mx-auto bg-[#140b1e] border border-[#8442fa]/10 rounded-sm p-16 md:p-24 flex flex-col items-center justify-center text-center relative overflow-hidden">
           {/* Abstract Quote Mark Graphic */}
           <div className="absolute top-10 left-10 text-[120px] font-serif text-[#8442fa]/5 leading-none select-none">"</div>
           
           <div className="w-16 h-16 rounded-full border border-[#8442fa]/20 bg-[#111115] flex items-center justify-center mb-8 relative z-10">
              <svg className="w-6 h-6 text-[#8442fa]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
           </div>
           
           <h4 className="text-2xl font-bold text-[#f4f2ee] mb-4 relative z-10">Community stories pending</h4>
           <p className="text-gray-400 text-lg leading-relaxed max-w-2xl relative z-10">
             As the PAMHO network grows across the continent, this space will highlight the real perspectives, challenges, and successes of the professionals and advocates doing the work on the ground.
           </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PREMIUM CONVERSION CTA                                       */}
      {/* ============================================================ */}
      <section id="join-network" className={`py-40 ${container} relative overflow-hidden bg-[#111115] border-t border-[#8442fa]/20`}>
        {/* Subtle Network Motif */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(rgba(132, 66, 250, 0.4) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#8442fa]/10 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#8442fa]/10 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 bg-[#140b1e] border border-[#8442fa]/20 rounded-sm p-16 md:p-24 shadow-[0_0_50px_rgba(132,66,250,0.05)] flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full border border-[#8442fa]/30 bg-[#111115] flex items-center justify-center mb-8 relative z-10">
              <div className="w-3 h-3 bg-[#b48aff] rounded-full shadow-[0_0_15px_#b48aff]"></div>
          </div>
          <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-6">Expression of Interest</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-[#f4f2ee] tracking-tight mb-8">
            Help connect knowledge, advocacy, and community.
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto mb-12">
            Interested in contributing to PAMHO's work? We are continually evaluating how to connect committed professionals, advocates, and community voices to our continental network.
          </p>
          <div className="flex flex-col items-center justify-center w-full sm:w-auto">
            <Link to="/contact?type=ambassador" className="btn-primary text-base font-bold px-12 py-5 rounded-sm shadow-[0_4px_30px_-5px_rgba(132,66,250,0.5)] hover:shadow-[0_4px_40px_-5px_rgba(132,66,250,0.7)] transition-shadow w-full sm:w-auto text-center">
              Join the Network
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
