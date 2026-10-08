import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function Donate() {
  const container = 'w-full max-w-[1536px] mx-auto px-6 sm:px-12 lg:px-20'

  return (
    <div className="flex flex-col bg-[#0a0a0c]">
      <SEO title="PAMHO | Support & Donate" description="Support the work of the Pan-African Mental Health Organization." />
      {/* ============================================================ */}
      {/* SUPPORT HERO                                                 */}
      {/* ============================================================ */}
      <section className={`pt-48 pb-32 ${container} relative`}>
        {/* Abstract Structural Motif */}
        <div className="absolute top-0 right-0 w-full h-[600px] pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-1/4 right-[5%] w-[600px] h-px bg-gradient-to-r from-transparent via-[#8442fa]/20 to-transparent transform -rotate-12"></div>
          <div className="absolute top-[40%] right-[10%] w-[500px] h-px bg-gradient-to-r from-transparent via-[#8442fa]/30 to-transparent transform -rotate-12"></div>
          <div className="absolute top-1/4 right-[15%] w-[400px] h-[400px] bg-[#140b1e] blur-[150px] rounded-full"></div>
        </div>
        
        <div className="max-w-4xl relative z-10">
          <div className="tag-outline self-start mb-8 text-[#b48aff] border-[#8442fa]/30 uppercase tracking-widest inline-block">
            Support PAMHO
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#f4f2ee] tracking-tight leading-[1.05] mb-10">
            Support the work behind <br className="hidden md:block"/> lasting systemic change.
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-3xl mb-12">
            Advancing mental health awareness, education, and advocacy across Africa requires sustained resources. Your support enables the infrastructure that connects clinical knowledge with community action.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link to="/contact?type=general" className="btn-primary text-sm font-bold px-8 py-4 rounded-sm shadow-[0_4px_20px_-5px_rgba(132,66,250,0.4)]">
              Express Interest in Supporting
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* WHY SUPPORT MATTERS                                          */}
      {/* ============================================================ */}
      <section className={`py-32 ${container} bg-[#111115] border-y border-[#8442fa]/10`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-6">The Case for Support</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-[#f4f2ee] mb-6 leading-tight">
              Resources scale impact.
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed font-light mb-6">
              Financial support provides organizations like PAMHO the ability to sustain critical long-term work: reducing stigma, providing culturally relevant education, and empowering local advocates.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed font-light">
              We focus on building resilient networks and institutional knowledge. Support ensures that these foundational efforts continue to reach professionals and communities without interruption.
            </p>
          </div>
          <div className="relative aspect-square sm:aspect-[4/3] md:aspect-square flex flex-col items-center justify-center bg-[#140b1e] border border-[#8442fa]/20 rounded-sm p-12">
             {/* Abstract Core Visual */}
             <div className="w-full h-full relative flex items-center justify-center">
                 <div className="absolute inset-0 border border-[#8442fa]/10 rounded-full scale-[0.6]"></div>
                 <div className="absolute inset-0 border border-[#8442fa]/20 rounded-full scale-[0.8]"></div>
                 <div className="absolute inset-0 border border-[#8442fa]/30 rounded-full scale-100 opacity-50"></div>
                 <div className="w-3 h-3 bg-[#b48aff] rounded-full shadow-[0_0_20px_#b48aff] relative z-10"></div>
             </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* THE ENABLER VISUAL                                           */}
      {/* ============================================================ */}
      <section className={`py-40 ${container} bg-[#0a0a0c]`}>
        <div className="text-center max-w-3xl mx-auto mb-24">
           <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-4">Resource Allocation Model</h2>
           <h3 className="text-3xl md:text-4xl font-bold text-[#f4f2ee]">Support as an enabler.</h3>
        </div>

        <div className="relative w-full max-w-5xl mx-auto border border-[#8442fa]/10 bg-[#111115] rounded-sm p-12 md:p-20 overflow-hidden shadow-[0_0_40px_rgba(132,66,250,0.05)]">
           {/* Grid Background */}
           <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#8442fa 1px, transparent 1px), linear-gradient(90deg, #8442fa 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
           
           <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
              
              {/* Left Side: Support Node */}
              <div className="flex flex-col items-center md:w-1/4 mb-16 md:mb-0">
                 <div className="w-24 h-24 border border-[#b48aff]/40 bg-[#140b1e] flex flex-col items-center justify-center mb-6 relative">
                    <div className="w-8 h-8 border border-[#b48aff] transform rotate-45 flex items-center justify-center shadow-[0_0_15px_rgba(180,138,255,0.3)]">
                       <div className="w-1 h-1 bg-[#f4f2ee]"></div>
                    </div>
                 </div>
                 <span className="text-sm font-bold tracking-widest text-[#f4f2ee] uppercase">Support</span>
              </div>

              {/* Center: Flow Lines (Desktop Only) */}
              <div className="hidden md:flex flex-col justify-center items-center h-full w-1/4 relative">
                 <div className="w-full h-px bg-gradient-to-r from-[#b48aff]/40 to-[#8442fa]/20 absolute top-1/4"></div>
                 <div className="w-full h-px bg-gradient-to-r from-[#b48aff]/40 to-[#8442fa]/20 absolute top-1/2"></div>
                 <div className="w-full h-px bg-gradient-to-r from-[#b48aff]/40 to-[#8442fa]/20 absolute top-3/4"></div>
                 
                 <div className="w-px h-[50%] bg-[#b48aff]/40 absolute left-0 top-1/4"></div>
              </div>

              {/* Right Side: Impact Areas */}
              <div className="flex flex-col gap-8 md:w-2/5 w-full">
                 
                 <div className="flex items-center gap-6 border-b border-[#8442fa]/10 pb-6">
                    <div className="w-10 h-10 border border-[#8442fa]/30 bg-[#0a0a0c] flex items-center justify-center shrink-0">
                       <div className="w-1.5 h-1.5 bg-gray-400"></div>
                    </div>
                    <div>
                       <h4 className="text-lg font-bold text-[#f4f2ee] mb-1">Education & Institute</h4>
                       <p className="text-gray-400 text-sm font-light">Expanding structured learning and professional development.</p>
                    </div>
                 </div>

                 <div className="flex items-center gap-6 border-b border-[#8442fa]/10 pb-6">
                    <div className="w-10 h-10 border border-[#8442fa]/30 bg-[#0a0a0c] flex items-center justify-center shrink-0">
                       <div className="w-1.5 h-1.5 bg-gray-400"></div>
                    </div>
                    <div>
                       <h4 className="text-lg font-bold text-[#f4f2ee] mb-1">Advocacy & Awareness</h4>
                       <p className="text-gray-400 text-sm font-light">Funding public information campaigns to reduce regional stigma.</p>
                    </div>
                 </div>

                 <div className="flex items-center gap-6">
                    <div className="w-10 h-10 border border-[#8442fa]/30 bg-[#0a0a0c] flex items-center justify-center shrink-0">
                       <div className="w-1.5 h-1.5 bg-gray-400"></div>
                    </div>
                    <div>
                       <h4 className="text-lg font-bold text-[#f4f2ee] mb-1">Community Networks</h4>
                       <p className="text-gray-400 text-sm font-light">Supporting local advocates who translate knowledge into action.</p>
                    </div>
                 </div>

              </div>
           </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* TRUST AND STEWARDSHIP                                        */}
      {/* ============================================================ */}
      <section className={`py-32 ${container} bg-[#111115] border-y border-[#8442fa]/10`}>
        <div className="max-w-4xl mx-auto text-center">
           <div className="w-12 h-12 mx-auto rounded-sm border border-[#8442fa]/30 bg-[#140b1e] flex items-center justify-center mb-8">
              <svg className="w-5 h-5 text-[#b48aff]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
           </div>
           
           <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-6">Stewardship</h2>
           <h3 className="text-3xl md:text-4xl font-bold text-[#f4f2ee] leading-tight mb-8">
             Support with confidence.
           </h3>
           <p className="text-gray-400 text-lg leading-relaxed font-light mb-8">
             We understand that supporting a pan-African organization requires trust. PAMHO is committed to strict mission alignment, ensuring that resources are utilized to sustain our core priorities: mental health education, structural advocacy, and community integration.
           </p>
           <p className="text-gray-400 text-lg leading-relaxed font-light">
             We maintain transparent dialogue with our institutional partners and supporters regarding our strategic direction and the implementation of our programs.
           </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* OTHER WAYS TO SUPPORT                                        */}
      {/* ============================================================ */}
      <section className={`py-40 ${container} bg-[#0a0a0c]`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="md:col-span-3 mb-12">
              <h3 className="text-2xl font-bold text-[#f4f2ee] mb-4">Other Ways to Contribute</h3>
              <p className="text-gray-400 text-sm uppercase tracking-widest font-mono">Engagement beyond financial support</p>
           </div>
           
           {/* Contribute */}
           <div className="bg-[#140b1e] border border-[#8442fa]/20 p-10">
              <h4 className="text-xl font-bold text-[#f4f2ee] mb-4 border-b border-[#8442fa]/20 pb-4">Contribute Expertise</h4>
              <p className="text-gray-400 font-light leading-relaxed">
                 Are you a professional or advocate? Connect with PAMHO to see how your clinical knowledge or community experience can inform our work.
              </p>
           </div>

           {/* Partner */}
           <div className="bg-[#140b1e] border border-[#8442fa]/20 p-10">
              <h4 className="text-xl font-bold text-[#f4f2ee] mb-4 border-b border-[#8442fa]/20 pb-4">Institutional Partnership</h4>
              <p className="text-gray-400 font-light leading-relaxed">
                 Organizations aligned with public health can explore formal collaborations, resource sharing, or joint advocacy efforts.
              </p>
           </div>

           {/* Amplify */}
           <div className="bg-[#140b1e] border border-[#8442fa]/20 p-10">
              <h4 className="text-xl font-bold text-[#f4f2ee] mb-4 border-b border-[#8442fa]/20 pb-4">Amplify the Mission</h4>
              <p className="text-gray-400 font-light leading-relaxed">
                 Help reduce stigma by sharing PAMHO's educational resources and bringing the conversation about mental health to your own community.
              </p>
           </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FINAL SUPPORT CTA                                            */}
      {/* ============================================================ */}
      <section className={`py-40 ${container} relative overflow-hidden bg-[#111115] border-t border-[#8442fa]/20`}>
        <div className="max-w-4xl mx-auto text-center relative z-10 bg-[#140b1e] border border-[#8442fa]/20 rounded-sm p-16 md:p-24 shadow-[0_0_50px_rgba(132,66,250,0.05)]">
          <div className="w-16 h-16 mx-auto border border-[#8442fa]/30 bg-[#111115] flex items-center justify-center mb-8 relative z-10">
              <div className="w-3 h-3 bg-[#b48aff] shadow-[0_0_15px_#b48aff]"></div>
          </div>
          <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-6">Take Action</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-[#f4f2ee] tracking-tight mb-8">
            Talk to PAMHO about supporting the work.
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto mb-12 font-light">
            We are actively establishing relationships with individuals and organizations committed to resourcing mental health progress in Africa. Express your interest to begin the conversation.
          </p>
          <div className="flex flex-col items-center justify-center">
            <Link to="/contact?type=general" className="btn-primary text-base font-bold px-12 py-5 rounded-sm shadow-[0_4px_30px_-5px_rgba(132,66,250,0.5)] hover:shadow-[0_4px_40px_-5px_rgba(132,66,250,0.7)] transition-shadow">
              Contact PAMHO
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
