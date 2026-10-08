import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FlagMarquee from '../components/FlagMarquee'

export default function Home() {
  const container = 'w-full max-w-[1536px] mx-auto px-6 sm:px-12 lg:px-20'
  
  const [featuredProgram, setFeaturedProgram] = useState<any>(null)

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch('/api/v1/programs/')
        if (res.ok) {
          const data = await res.json()
          const progs = data.results || data || []
          const active = progs.find((p: any) => p.event_state === 'live' || p.event_state === 'upcoming')
          if (active) setFeaturedProgram(active)
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchPrograms()
  }, [])

  return (
    <div className="flex flex-col">
      {/* ============================================================ */}
      {/* PROMOTIONAL BANNER                                           */}
      {/* ============================================================ */}
      {featuredProgram && (
        <section className={`pt-32 pb-4 ${container} bg-[#0a0a0c]`}>
          <div className="border border-[#8442fa]/20 bg-[#111115] p-6 md:p-8 rounded-sm shadow-[0_4px_30px_-5px_rgba(132,66,250,0.15)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
             {/* Subtle background nodes pattern */}
             <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(132, 66, 250, 0.4) 1px, transparent 1px)', backgroundSize: '24px 24px', maskImage: 'linear-gradient(to right, black, transparent)' }}></div>
             
             <div className="relative z-10 flex-1">
               <div className="text-[10px] uppercase tracking-widest text-[#b48aff] font-bold mb-3 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-[#8442fa] animate-pulse"></span>
                 {featuredProgram.event_state === 'live' ? 'Live Now' : 'Upcoming Event'}
               </div>
               <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#f4f2ee] tracking-tight mb-2">
                 {featuredProgram.title}
               </h2>
               <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                 <span className="text-gray-300">{featuredProgram.description.length > 80 ? featuredProgram.description.substring(0, 80) + '...' : featuredProgram.description}</span>
               </div>
             </div>
             
             <Link 
               to="/programs" 
               className="relative z-10 group flex items-center gap-3 border border-[#8442fa]/40 bg-[#140b1e] px-6 py-3 md:px-8 md:py-4 rounded-sm text-sm font-bold text-[#f4f2ee] hover:bg-[#8442fa]/20 hover:border-[#8442fa]/60 transition-all shrink-0 w-full md:w-auto justify-center"
             >
               View Details
               <svg className="w-4 h-4 text-[#b48aff] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
             </Link>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* HOME HERO (Editorial & Continental Scale)                    */}
      {/* ============================================================ */}
      <section className={`${featuredProgram ? 'pt-8' : 'pt-40'} pb-32 ${container} relative bg-[#0a0a0c] min-h-[90vh] flex items-center`}>
        {/* Subtle plum gradient for depth */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#140b1e] via-[#0a0a0c]/50 to-transparent pointer-events-none -z-10"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">
          <div className="lg:col-span-8 flex flex-col justify-center">
            <div className="tag-outline self-start mb-8 text-[#b48aff] border-[#8442fa]/30">Pan African Mental Health Organization</div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-bold text-[#f4f2ee] tracking-tight leading-[1.05]">
              Advancing mental<br/>health across the<br/>
              <span className="text-[#8442fa]">African continent.</span>
            </h1>
            <p className="mt-10 text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed font-light">
              We are dedicated to improving access to support, reducing stigma, and empowering communities through education, advocacy, and collaborative action.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link to="/about" className="btn-primary text-sm font-bold px-8 py-4 rounded-sm shadow-[0_4px_20px_-5px_rgba(132,66,250,0.4)]">
                Our Mission
              </Link>
              <Link to="/programs" className="text-sm font-medium text-gray-400 hover:text-[#b48aff] transition-colors">
                Explore our initiatives &rarr;
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-4 h-full hidden lg:flex items-center justify-end relative">
             {/* Continental Scale Visual / Abstract Map Node */}
             <div className="w-full aspect-square relative">
                {/* Abstract grid mapping */}
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(132, 66, 250, 0.15) 1px, transparent 1px)', backgroundSize: '32px 32px', maskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)' }}></div>
                
                {/* Pulse node representing continent focus */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <div className="w-4 h-4 bg-[#8442fa] rounded-full shadow-[0_0_40px_rgba(132,66,250,0.8)] relative z-10"></div>
                   <div className="w-4 h-4 bg-[#8442fa] rounded-full absolute inset-0 animate-ping opacity-75"></div>
                   <div className="w-32 h-32 border border-[#8442fa]/30 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                   <div className="w-64 h-64 border border-[#8442fa]/10 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FLAG MARQUEE (Continental Reach)                             */}
      {/* ============================================================ */}
      <FlagMarquee className="bg-[#111115]" />

      {/* ============================================================ */}
      {/* THE CHALLENGE & APPROACH (Large Typographic Split)           */}
      {/* ============================================================ */}
      <section className={`py-40 ${container} bg-[#0a0a0c]`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          <div>
            <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-6">The Context</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-[#f4f2ee] tracking-tight leading-tight">
              Mental health is a public health priority that requires culturally sensitive, local solutions.
            </h3>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xl text-gray-400 font-light leading-relaxed mb-8">
              Across Africa, mental health support is often hindered by stigma, lack of resources, and systemic gaps. 
            </p>
            <p className="text-gray-500 leading-relaxed mb-10">
              PAMHO operates at the intersection of grassroots advocacy and institutional reform. We collaborate with professionals, local advocates, and communities to build resilient support networks and advocate for systemic change.
            </p>
            <Link to="/about" className="inline-flex items-center text-[#8442fa] font-semibold hover:text-[#b48aff] transition-colors">
              Read our organizational philosophy
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* WHAT WE DO (Editorial Grid)                                  */}
      {/* ============================================================ */}
      <section className={`py-32 ${container} bg-[#111115] border-y border-[#8442fa]/10`}>
        <div className="mb-24 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div>
             <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-4">Our Work</h2>
             <h3 className="text-4xl md:text-5xl font-bold text-[#f4f2ee] tracking-tight">Ecosystem of Action</h3>
           </div>
           <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
             We do not rely on a single approach. True systemic change requires education, advocacy, and direct community empowerment working simultaneously.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <Link to="/institute" className="group block bg-[#140b1e] border border-[#8442fa]/20 rounded-sm p-10 hover:bg-[#1a1025] hover:border-[#8442fa]/40 transition-all duration-300">
             <div className="w-12 h-12 bg-[#8442fa]/10 rounded-sm flex items-center justify-center mb-10 border border-[#8442fa]/30 group-hover:bg-[#8442fa]/20 transition-colors">
                <svg className="w-6 h-6 text-[#b48aff]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
             </div>
             <h4 className="text-2xl font-bold text-[#f4f2ee] mb-4">PAMHO Institute</h4>
             <p className="text-gray-400 text-sm leading-relaxed mb-8">
               Our dedicated digital learning environment providing evidence-based curricula for professionals and advocates.
             </p>
             <span className="text-[#8442fa] font-mono text-xs uppercase tracking-widest group-hover:text-[#b48aff] transition-colors">Enter Platform &rarr;</span>
          </Link>

          {/* Pillar 2 */}
          <Link to="/programs" className="group block bg-[#140b1e] border border-[#8442fa]/20 rounded-sm p-10 hover:bg-[#1a1025] hover:border-[#8442fa]/40 transition-all duration-300">
             <div className="w-12 h-12 bg-[#8442fa]/10 rounded-sm flex items-center justify-center mb-10 border border-[#8442fa]/30 group-hover:bg-[#8442fa]/20 transition-colors">
                <svg className="w-6 h-6 text-[#b48aff]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
             </div>
             <h4 className="text-2xl font-bold text-[#f4f2ee] mb-4">Programs & Advocacy</h4>
             <p className="text-gray-400 text-sm leading-relaxed mb-8">
               On-the-ground initiatives, school programs, and policy advocacy campaigns designed for regional impact.
             </p>
             <span className="text-[#8442fa] font-mono text-xs uppercase tracking-widest group-hover:text-[#b48aff] transition-colors">View Programs &rarr;</span>
          </Link>

          {/* Pillar 3 */}
          <Link to="/ambassadors" className="group block bg-[#140b1e] border border-[#8442fa]/20 rounded-sm p-10 hover:bg-[#1a1025] hover:border-[#8442fa]/40 transition-all duration-300">
             <div className="w-12 h-12 bg-[#8442fa]/10 rounded-sm flex items-center justify-center mb-10 border border-[#8442fa]/30 group-hover:bg-[#8442fa]/20 transition-colors">
                <svg className="w-6 h-6 text-[#b48aff]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
             <h4 className="text-2xl font-bold text-[#f4f2ee] mb-4">Community Network</h4>
             <p className="text-gray-400 text-sm leading-relaxed mb-8">
               A growing continental network of ambassadors and mobilizers driving change within their local contexts.
             </p>
             <span className="text-[#8442fa] font-mono text-xs uppercase tracking-widest group-hover:text-[#b48aff] transition-colors">Meet the Network &rarr;</span>
          </Link>
        </div>
      </section>

      {/* ============================================================ */}
      {/* NETWORK / SCALE (Structural Viz)                             */}
      {/* ============================================================ */}
      <section className={`py-32 ${container} bg-[#0a0a0c]`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
           {/* Structural Community Network Visual */}
           <div className="aspect-square bg-[#111115] border border-[#8442fa]/20 rounded-sm p-8 relative flex flex-col justify-between overflow-hidden order-2 md:order-1">
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(132, 66, 250, 0.1) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
              
              <div className="relative z-10 text-[11px] font-mono text-gray-500 uppercase tracking-widest bg-[#111115] self-start px-2 -ml-2">Distributed Architecture</div>
              
              <div className="relative z-10 flex-1 flex flex-col justify-center space-y-8 max-w-sm mr-auto ml-4 mt-8">
                <div className="flex items-center gap-6 relative">
                  <div className="absolute left-full top-1/2 w-24 h-px bg-[#8442fa]/30 -translate-y-1/2 ml-6"></div>
                  <div className="text-sm font-semibold text-[#f4f2ee] w-32 text-right">Professionals</div>
                  <div className="h-px w-16 bg-gradient-to-l from-[#8442fa]/40 to-transparent"></div>
                  <div className="w-2.5 h-2.5 bg-[#8442fa] rounded-sm ring-4 ring-[#8442fa]/20"></div>
                </div>
                
                <div className="flex items-center gap-6 relative">
                  <div className="absolute left-full top-1/2 w-12 h-px bg-[#b48aff]/30 -translate-y-1/2 ml-6"></div>
                  <div className="absolute left-full top-1/2 h-20 w-px bg-[#8442fa]/30 -translate-y-full ml-[4.5rem]"></div>
                  <div className="text-sm font-semibold text-[#f4f2ee] w-32 text-right">Advocates</div>
                  <div className="h-px w-16 bg-gradient-to-l from-[#b48aff]/40 to-transparent"></div>
                  <div className="w-2.5 h-2.5 bg-[#b48aff] rounded-sm ring-4 ring-[#b48aff]/20"></div>
                </div>
                
                <div className="flex items-center gap-6 relative">
                  <div className="absolute left-full top-1/2 w-16 h-px bg-gray-500/30 -translate-y-1/2 ml-6"></div>
                  <div className="absolute left-full top-1/2 h-16 w-px bg-[#b48aff]/30 -translate-y-full ml-[3.5rem]"></div>
                  <div className="text-sm text-gray-400 w-32 text-right">Partners</div>
                  <div className="h-px w-16 bg-gradient-to-l from-gray-500/40 to-transparent"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-sm"></div>
                </div>
              </div>
           </div>

           <div className="order-1 md:order-2">
             <h2 className="text-4xl md:text-5xl font-bold text-[#f4f2ee] mb-8 leading-tight">Systemic reach.<br/>Local relevance.</h2>
             <p className="text-gray-400 text-lg leading-relaxed mb-10">
               We do not believe in top-down solutions. PAMHO acts as an infrastructure layer, connecting and equipping the people already doing the work on the ground.
             </p>
             <div className="grid grid-cols-2 gap-8">
               <div className="rule-top pt-4">
                 <div className="text-sm text-[#f4f2ee] font-semibold mb-2">Membership</div>
                 <div className="text-xs text-gray-500 leading-relaxed">Join a professional and advocacy network spanning the continent.</div>
                 <Link to="/membership" className="text-[10px] uppercase tracking-widest text-[#8442fa] font-bold mt-4 inline-block hover:text-[#b48aff]">Join &rarr;</Link>
               </div>
               <div className="rule-top pt-4">
                 <div className="text-sm text-[#f4f2ee] font-semibold mb-2">Partnerships</div>
                 <div className="text-xs text-gray-500 leading-relaxed">Collaborate with us to fund research and implement programs.</div>
                 <Link to="/membership" className="text-[10px] uppercase tracking-widest text-[#8442fa] font-bold mt-4 inline-block hover:text-[#b48aff]">Partner &rarr;</Link>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FINAL CTA (Institutional Action)                             */}
      {/* ============================================================ */}
      <section className={`py-40 ${container} text-center relative overflow-hidden bg-[#1a1025] border-t border-[#8442fa]/30`}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        
        <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-6 relative z-10">Get Involved</h2>
        <h3 className="text-4xl md:text-6xl font-bold text-[#f4f2ee] tracking-tight mb-8 relative z-10">Support the mission.</h3>
        <p className="text-[#b48aff] text-lg max-w-xl mx-auto mb-12 relative z-10 font-medium">
          Whether you are a professional, an advocate, or an organization, your contribution drives mental health progress in Africa.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
          <Link to="/donate" className="btn-primary text-sm font-bold px-10 py-4 rounded-sm shadow-[0_4px_24px_-4px_rgba(132,66,250,0.5)]">Make a Donation</Link>
          <Link to="/contact?type=general" className="btn-secondary text-sm font-bold px-10 py-4 rounded-sm bg-[#111115]/50">Contact Us</Link>
        </div>
      </section>
    </div>
  )
}
