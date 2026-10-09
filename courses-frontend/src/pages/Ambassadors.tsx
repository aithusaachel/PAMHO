import { useState } from 'react'
import SEO from '../components/SEO'
import { Reveal } from '../components/Reveal'

export default function Ambassadors() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', email: '', country: '', city: '', whatsapp: '', 
    socials: '', occupation: '', why: '', promote: '', meaning: '', 
    reach: 'Under 500' 
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formattedMessage = `
Country: ${formData.country}
City: ${formData.city}
WhatsApp: ${formData.whatsapp}
Social Media/LinkedIn: ${formData.socials}
Occupation: ${formData.occupation}
Estimated Reach: ${formData.reach}

Why do you want to become an Ambassador?
${formData.why}

How will you promote the conversation?
${formData.promote}

What does mental health mean to you?
${formData.meaning}
    `.trim();

    try {
      const res = await fetch('/api/v1/enquiries/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: formData.name,
          email: formData.email,
          organization: formData.occupation,
          message: formattedMessage,
          enquiry_type: 'Ambassador Application' 
        })
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-[#030303]">
      <SEO title="Ambassadors | PAMHO" />
      <div className="grain-overlay"></div>

      <section className="pt-48 pb-16 md:pt-64 md:pb-32">
        <div className="canvas-container max-w-5xl text-center flex flex-col items-center">
          <Reveal>
            <span className="label-tracking text-[#D1893D] mb-8 block">Ambassador Program</span>
            <h1 className="title-hero mb-8">
              Voices for systemic <span className="italic text-[rgba(245,242,233,0.7)]">change.</span>
            </h1>
            <p className="text-body-large text-[rgba(245,242,233,0.6)] font-light leading-relaxed">
              PAMHO Ambassadors are dedicated professionals, advocates, and grassroots leaders committed to breaking psychological stigma and advancing mental health discourse across Africa.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#110E0C]">
        <div className="canvas-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
            
            <Reveal>
              <div className="border-t border-[rgba(245,242,233,0.1)] pt-12">
                <span className="font-serif text-[#D1893D] text-6xl mb-8 block opacity-40">01</span>
                <h3 className="font-serif text-4xl mb-6">Community Leadership</h3>
                <p className="font-sans font-light text-[rgba(245,242,233,0.5)] leading-relaxed text-lg">
                  Ambassadors facilitate localized conversations, distribute validated educational resources, and bridge the gap between their communities and professional mental health support.
                </p>
              </div>
            </Reveal>
            
            <Reveal delay={200}>
              <div className="border-t border-[rgba(245,242,233,0.1)] pt-12">
                <span className="font-serif text-[#D1893D] text-6xl mb-8 block opacity-40">02</span>
                <h3 className="font-serif text-4xl mb-6">Public Advocacy</h3>
                <p className="font-sans font-light text-[rgba(245,242,233,0.5)] leading-relaxed text-lg">
                  By utilizing their public platforms, ambassadors champion the integration of mental health priorities into national frameworks, helping to shape policy and societal attitudes.
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      <section className="py-32 md:py-48 bg-[#030303] text-center border-t border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container flex flex-col items-center max-w-4xl mx-auto">
          <Reveal>
            <h2 className="title-section mb-12">Join the movement.</h2>
            
            {status === 'success' ? (
              <div className="p-8 border border-[#D1893D] bg-[#D1893D]/5">
                <h3 className="font-serif text-3xl text-[#F5F2E9] mb-4">Application Received</h3>
                <p className="font-sans font-light text-[rgba(245,242,233,0.6)]">
                  Thank you for your application. Our team will review your details and contact you shortly regarding the Ambassador program.
                </p>
              </div>
            ) : !isFormOpen ? (
              <>
                <p className="text-body-large text-[rgba(245,242,233,0.5)] font-light mb-16">
                  We are looking for passionate individuals ready to make a difference. If you have a platform, community presence, and the drive to effect meaningful change, we invite you to apply.
                </p>
                <button onClick={() => setIsFormOpen(true)} className="btn-cinematic">
                  Submit Application
                </button>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="w-full text-left flex flex-col gap-8 animate-fade-in border border-[rgba(245,242,233,0.1)] p-8 md:p-12 bg-[#110E0C]">
                {status === 'error' && (
                  <div className="text-red-400 border border-red-900/50 bg-red-900/10 p-4 font-sans font-light text-sm">
                    Submission failed. Please try again or check your network connection.
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#D1893D] transition-colors pb-2">
                    <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">Full Name</label>
                    <input required type="text" className="w-full bg-transparent font-serif text-xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]" placeholder="Your name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#D1893D] transition-colors pb-2">
                    <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">Email Address</label>
                    <input required type="email" className="w-full bg-transparent font-serif text-xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]" placeholder="Your email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#D1893D] transition-colors pb-2">
                    <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">Country</label>
                    <input required type="text" className="w-full bg-transparent font-serif text-xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]" placeholder="Country of residence" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} />
                  </div>
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#D1893D] transition-colors pb-2">
                    <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">City</label>
                    <input required type="text" className="w-full bg-transparent font-serif text-xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]" placeholder="City" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                  </div>
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#D1893D] transition-colors pb-2">
                    <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">WhatsApp</label>
                    <input required type="text" className="w-full bg-transparent font-serif text-xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]" placeholder="Phone number" value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#D1893D] transition-colors pb-2">
                    <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">Occupation / Student Status</label>
                    <input required type="text" className="w-full bg-transparent font-serif text-xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]" placeholder="Current role" value={formData.occupation} onChange={e => setFormData({...formData, occupation: e.target.value})} />
                  </div>
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#D1893D] transition-colors pb-2">
                    <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">Social / LinkedIn</label>
                    <input type="text" className="w-full bg-transparent font-serif text-xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]" placeholder="Primary social handle" value={formData.socials} onChange={e => setFormData({...formData, socials: e.target.value})} />
                  </div>
                </div>

                <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#D1893D] transition-colors pb-2">
                  <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">Why do you want to become a PAMHO Ambassador?</label>
                  <textarea required rows={3} className="w-full bg-transparent font-sans font-light text-lg text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)] resize-none" placeholder="Your motivation..." value={formData.why} onChange={e => setFormData({...formData, why: e.target.value})}></textarea>
                </div>

                <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#D1893D] transition-colors pb-2">
                  <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">How will you promote the conversation?</label>
                  <textarea required rows={3} className="w-full bg-transparent font-sans font-light text-lg text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)] resize-none" placeholder="Your outreach strategy..." value={formData.promote} onChange={e => setFormData({...formData, promote: e.target.value})}></textarea>
                </div>

                <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#D1893D] transition-colors pb-2">
                  <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">What does mental health mean to you and why does it matter for Africa?</label>
                  <textarea required rows={3} className="w-full bg-transparent font-sans font-light text-lg text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)] resize-none" placeholder="Your perspective..." value={formData.meaning} onChange={e => setFormData({...formData, meaning: e.target.value})}></textarea>
                </div>

                <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#D1893D] transition-colors pb-2">
                  <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">Estimated Reach</label>
                  <select required className="w-full bg-transparent font-serif text-xl text-[#F5F2E9] focus:outline-none appearance-none" value={formData.reach} onChange={e => setFormData({...formData, reach: e.target.value})}>
                    <option value="Under 500" className="bg-[#110E0C]">Under 500</option>
                    <option value="500 to 2000" className="bg-[#110E0C]">500 to 2,000</option>
                    <option value="2000 to 10000" className="bg-[#110E0C]">2,000 to 10,000</option>
                    <option value="Over 10000" className="bg-[#110E0C]">Over 10,000</option>
                  </select>
                </div>

                <div className="flex gap-6 mt-4">
                  <button type="submit" disabled={status === 'submitting'} className="btn-cinematic flex-1 disabled:opacity-50 text-center justify-center">
                    {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
                  </button>
                  <button type="button" onClick={() => setIsFormOpen(false)} className="px-8 border border-[rgba(245,242,233,0.2)] text-[rgba(245,242,233,0.6)] hover:text-[#F5F2E9] hover:border-[#F5F2E9] font-sans font-medium text-[11px] uppercase tracking-[0.2em] transition-all">
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  )
}
