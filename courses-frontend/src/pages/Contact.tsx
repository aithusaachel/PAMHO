import { Link, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Contact() {
  const container = 'w-full max-w-[1536px] mx-auto px-6 sm:px-12 lg:px-20'
  const [searchParams] = useSearchParams()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'General Enquiry',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const typeParam = searchParams.get('type')
    if (typeParam) {
      // Map URL parameters to actual option values
      const typeMap: Record<string, string> = {
        'membership': 'Become a Member',
        'partnership': 'Partnership',
        'volunteer': 'Volunteer / Get Involved',
        'ambassador': 'Ambassador / Community Mobilizer',
        'programs': 'Programs & Events',
        'institute': 'PAMHO Institute',
        'general': 'General Enquiry'
      }
      if (typeMap[typeParam]) {
        setFormData(prev => ({ ...prev, type: typeMap[typeParam] }))
      }
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/v1/enquiries/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          enquiry_type: formData.type,
          organization: formData.type === 'Become a Member' ? (document.querySelector('input[placeholder="e.g. University, Hospital, NGO"]') as HTMLInputElement)?.value || '' : '',
          message: formData.message
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', type: formData.type, message: '' });
      } else {
        alert("There was an error submitting your form. Please try again.");
      }
    } catch (err) {
      alert("A network error occurred.");
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col bg-[#0a0a0c]">
      {/* ============================================================ */}
      {/* HERO SECTION                                                 */}
      {/* ============================================================ */}
      <section className={`pt-48 pb-32 ${container} relative`}>
        {/* Subtle Ambient Light */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#140b1e] blur-[150px] rounded-full pointer-events-none -z-10"></div>
        
        <div className="max-w-4xl relative z-10">
          <div className="tag-outline self-start mb-8 text-[#b48aff] border-[#8442fa]/30 uppercase tracking-widest inline-block">
            Contact & Get Involved
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#f4f2ee] tracking-tight leading-[1.05] mb-10">
            Start the <br className="hidden md:block"/> conversation.
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-3xl mb-12">
            Whether you are seeking structured learning, community participation, institutional collaboration, or ways to support the mission, there is a clear place to begin.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <a href="#contact-form" className="btn-primary text-sm font-bold px-8 py-4 rounded-sm shadow-[0_4px_20px_-5px_rgba(132,66,250,0.4)]">
              Send an Enquiry
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CONNECTION FIELD VISUALIZATION                               */}
      {/* ============================================================ */}
      <section className={`py-40 ${container} bg-[#111115] border-y border-[#8442fa]/10`}>
        <div className="text-center max-w-3xl mx-auto mb-24">
           <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-4">Engagement Model</h2>
           <h3 className="text-3xl md:text-4xl font-bold text-[#f4f2ee]">Multiple paths, one focus.</h3>
        </div>

        <div className="relative w-full max-w-5xl mx-auto h-[400px] md:h-[500px] border border-[#8442fa]/10 bg-[#140b1e] rounded-sm flex items-center justify-center overflow-hidden">
           {/* Abstract grid */}
           <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(rgba(132,66,250,0.8) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
           
           <div className="relative w-full h-full flex items-center justify-center">
              {/* Center: PAMHO */}
              <div className="absolute z-20 flex items-center justify-center w-24 h-24 border border-[#8442fa] bg-[#1a1025] shadow-[0_0_40px_rgba(132,66,250,0.2)]">
                 <span className="text-sm font-bold text-[#f4f2ee] tracking-widest">PAMHO</span>
              </div>

              {/* Connecting Lines Desktop */}
              <div className="hidden md:block absolute w-full h-full pointer-events-none">
                 <div className="absolute top-1/2 left-[15%] right-[50%] h-px bg-gradient-to-r from-[#b48aff]/40 to-[#8442fa] transform -translate-y-12"></div>
                 <div className="absolute top-1/2 left-[15%] right-[50%] h-px bg-gradient-to-r from-[#b48aff]/40 to-[#8442fa] transform translate-y-12"></div>
                 <div className="absolute top-1/2 left-[50%] right-[15%] h-px bg-gradient-to-l from-[#b48aff]/40 to-[#8442fa] transform -translate-y-12"></div>
                 <div className="absolute top-1/2 left-[50%] right-[15%] h-px bg-gradient-to-l from-[#b48aff]/40 to-[#8442fa] transform translate-y-12"></div>
                 
                 {/* Diagonal connectors */}
                 <svg className="absolute inset-0 w-full h-full text-[#8442fa]/40" style={{ zIndex: 10 }}>
                    <line x1="25%" y1="20%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" />
                    <line x1="25%" y1="80%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" />
                    <line x1="75%" y1="20%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" />
                    <line x1="75%" y1="80%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" />
                 </svg>
              </div>

              {/* Nodes Desktop */}
              <div className="hidden md:flex absolute top-[20%] left-[25%] -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-[#111115] border border-[#8442fa]/20 px-6 py-2">
                 <span className="text-[10px] font-mono uppercase tracking-widest text-[#b48aff]">Learn</span>
              </div>
              <div className="hidden md:flex absolute bottom-[20%] left-[25%] -translate-x-1/2 translate-y-1/2 items-center justify-center bg-[#111115] border border-[#8442fa]/20 px-6 py-2">
                 <span className="text-[10px] font-mono uppercase tracking-widest text-[#b48aff]">Participate</span>
              </div>
              <div className="hidden md:flex absolute top-[20%] right-[25%] translate-x-1/2 -translate-y-1/2 items-center justify-center bg-[#111115] border border-[#8442fa]/20 px-6 py-2">
                 <span className="text-[10px] font-mono uppercase tracking-widest text-[#b48aff]">Collaborate</span>
              </div>
              <div className="hidden md:flex absolute bottom-[20%] right-[25%] translate-x-1/2 translate-y-1/2 items-center justify-center bg-[#111115] border border-[#8442fa]/20 px-6 py-2">
                 <span className="text-[10px] font-mono uppercase tracking-widest text-[#b48aff]">Support</span>
              </div>
           </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* ENGAGEMENT PATHWAYS                                          */}
      {/* ============================================================ */}
      <section id="pathways" className={`py-40 ${container} bg-[#0a0a0c]`}>
        <div className="max-w-6xl mx-auto flex flex-col gap-16 lg:gap-24">
           
           {/* 01 COMMUNITY */}
           <div className="flex flex-col md:flex-row items-start justify-between border-t border-[#8442fa]/20 pt-16 group">
              <div className="md:w-1/3 mb-8 md:mb-0">
                 <h2 className="text-[11px] font-mono uppercase tracking-widest text-[#b48aff] mb-4">01 — Community</h2>
                 <h3 className="text-3xl font-bold text-[#f4f2ee]">Participate</h3>
              </div>
              <div className="md:w-1/2">
                 <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
                   Interested in contributing to PAMHO's human network? We connect advocates, professionals, and communities to mobilize local mental health action.
                 </p>
                 <Link to="/ambassadors" className="inline-flex items-center text-[#b48aff] font-bold text-sm tracking-wide group-hover:text-[#f4f2ee] transition-colors">
                   Join the Network
                   <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                 </Link>
              </div>
           </div>

           {/* 02 COLLABORATION */}
           <div className="flex flex-col md:flex-row items-start justify-between border-t border-[#8442fa]/20 pt-16 group">
              <div className="md:w-1/3 mb-8 md:mb-0">
                 <h2 className="text-[11px] font-mono uppercase tracking-widest text-[#b48aff] mb-4">02 — Collaboration</h2>
                 <h3 className="text-3xl font-bold text-[#f4f2ee]">Membership</h3>
              </div>
              <div className="md:w-1/2">
                 <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
                   Interested in formal institutional partnership? We work with organizations aligned with public health to explore joint advocacy and resource sharing.
                 </p>
                 <Link to="/membership" className="inline-flex items-center text-[#b48aff] font-bold text-sm tracking-wide group-hover:text-[#f4f2ee] transition-colors">
                   Explore Membership
                   <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                 </Link>
              </div>
           </div>

           {/* 03 SUPPORT */}
           <div className="flex flex-col md:flex-row items-start justify-between border-t border-[#8442fa]/20 pt-16 group">
              <div className="md:w-1/3 mb-8 md:mb-0">
                 <h2 className="text-[11px] font-mono uppercase tracking-widest text-[#b48aff] mb-4">03 — Support</h2>
                 <h3 className="text-3xl font-bold text-[#f4f2ee]">Sustain the Mission</h3>
              </div>
              <div className="md:w-1/2">
                 <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
                   Want to help sustain PAMHO's mission? Your support enables the infrastructure that connects clinical knowledge with systemic change.
                 </p>
                 <Link to="/donate" className="inline-flex items-center text-[#b48aff] font-bold text-sm tracking-wide group-hover:text-[#f4f2ee] transition-colors">
                   Support PAMHO
                   <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                 </Link>
              </div>
           </div>

           {/* 04 LEARNING */}
           <div className="flex flex-col md:flex-row items-start justify-between border-t border-[#8442fa]/20 pt-16 group">
              <div className="md:w-1/3 mb-8 md:mb-0">
                 <h2 className="text-[11px] font-mono uppercase tracking-widest text-[#b48aff] mb-4">04 — Learning</h2>
                 <h3 className="text-3xl font-bold text-[#f4f2ee]">Institute</h3>
              </div>
              <div className="md:w-1/2">
                 <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
                   Looking for structured education and professional development? Access continuous learning through our academic and institutional platform.
                 </p>
                 <Link to="/institute" className="inline-flex items-center text-[#b48aff] font-bold text-sm tracking-wide group-hover:text-[#f4f2ee] transition-colors">
                   Explore the Institute
                   <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                 </Link>
              </div>
           </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* DIRECT CONTACT FORM                                          */}
      {/* ============================================================ */}
      <section id="contact-form" className={`py-40 ${container} bg-[#111115] border-t border-[#8442fa]/20`}>
        <div className="text-center mb-16">
          <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-4">Direct Communication</h2>
          <h3 className="text-3xl font-bold text-[#f4f2ee]">Talk to PAMHO.</h3>
        </div>

        <div className="w-full max-w-3xl mx-auto border border-[#8442fa]/10 bg-[#140b1e] rounded-sm p-10 md:p-16 shadow-[0_0_50px_rgba(132,66,250,0.05)]">
          {submitted ? (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto border border-[#8442fa]/30 bg-[#111115] flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#b48aff]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h4 className="text-2xl font-bold text-[#f4f2ee] mb-4">Message Received</h4>
              <p className="text-gray-400 leading-relaxed mb-8">
                Thank you for reaching out to PAMHO. Your enquiry has been routed to the appropriate department. We will respond as soon as possible.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn-secondary px-8 py-3 rounded-sm border border-[#8442fa]/30 text-sm font-bold text-white">
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input required type="text" className="w-full bg-[#111115] border border-gray-800 rounded-sm px-4 py-3 text-white focus:border-[#8442fa] outline-none transition-colors" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <input required type="email" className="w-full bg-[#111115] border border-gray-800 rounded-sm px-4 py-3 text-white focus:border-[#8442fa] outline-none transition-colors" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Enquiry Type</label>
                <select className="w-full bg-[#111115] border border-gray-800 rounded-sm px-4 py-3 text-white focus:border-[#8442fa] outline-none transition-colors" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                  <option value="Become a Member">Become a Member</option>
                  <option value="General Enquiry">General Enquiry</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Volunteer / Get Involved">Volunteer / Get Involved</option>
                  <option value="Ambassador / Community Mobilizer">Ambassador / Community Mobilizer</option>
                  <option value="Programs & Events">Programs & Events</option>
                  <option value="PAMHO Institute">PAMHO Institute</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {formData.type === 'Become a Member' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Organization/Affiliation (Optional)</label>
                  <input type="text" className="w-full bg-[#111115] border border-gray-800 rounded-sm px-4 py-3 text-white focus:border-[#8442fa] outline-none transition-colors" placeholder="e.g. University, Hospital, NGO" />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea required rows={5} className="w-full bg-[#111115] border border-gray-800 rounded-sm px-4 py-3 text-white focus:border-[#8442fa] outline-none transition-colors resize-none" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
              </div>

              <div className="pt-4">
                <button type="submit" disabled={isSubmitting} className="w-full btn-primary text-white font-bold px-8 py-4 rounded-sm shadow-[0_4px_20px_-5px_rgba(132,66,250,0.4)] disabled:opacity-50">
                  {isSubmitting ? 'Sending...' : 'Submit Enquiry'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

    </div>
  )
}
