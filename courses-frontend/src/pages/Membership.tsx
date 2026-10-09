import { useState } from 'react'
import SEO from '../components/SEO'
import { Reveal } from '../components/Reveal'

export default function Membership() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', email: '', country: '', city: '', whatsapp: '',
    institution: '', qualifications: '', specialty: 'Clinical Psychology', referral: '' 
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formattedMessage = `
Country: ${formData.country}
City: ${formData.city}
WhatsApp: ${formData.whatsapp}
Institution: ${formData.institution}
Specialty: ${formData.specialty}
Referral/Source: ${formData.referral}

Clinical Qualifications:
${formData.qualifications}
    `.trim();

    try {
      const res = await fetch('/api/v1/enquiries/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: formData.name,
          email: formData.email,
          organization: formData.institution,
          message: formattedMessage,
          enquiry_type: 'Membership Application' 
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
      <SEO title="Membership | PAMHO" />
      <div className="grain-overlay"></div>

      <section className="pt-48 pb-16 md:pt-64 md:pb-32">
        <div className="canvas-container max-w-5xl text-center flex flex-col items-center">
          <Reveal>
            <span className="label-tracking text-[#8442FA] mb-8 block">Clinical Membership</span>
            <h1 className="title-hero mb-8">
              A Network of <span className="italic text-[rgba(245,242,233,0.7)]">Professionals.</span>
            </h1>
            <p className="text-body-large text-[rgba(245,242,233,0.6)] font-light leading-relaxed">
              PAMHO membership brings together clinical psychologists, researchers, and healthcare professionals committed to defining the continental standard of care.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#110E0C]">
        <div className="canvas-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 border-t border-[rgba(245,242,233,0.1)] pt-16">
            
            <Reveal delay={0}>
              <div>
                <span className="font-serif text-[#8442FA] text-5xl mb-6 block opacity-40">I</span>
                <h3 className="font-serif text-3xl mb-4">Clinical Development</h3>
                <p className="font-sans font-light text-[rgba(245,242,233,0.5)] leading-relaxed">
                  Access to clinical frameworks, research data, and continuing educational programs developed specifically for the African socio-economic context.
                </p>
              </div>
            </Reveal>
            
            <Reveal delay={150}>
              <div>
                <span className="font-serif text-[#8442FA] text-5xl mb-6 block opacity-40">II</span>
                <h3 className="font-serif text-3xl mb-4">Professional Network</h3>
                <p className="font-sans font-light text-[rgba(245,242,233,0.5)] leading-relaxed">
                  Integration into a verified network of continental practitioners, enabling cross-border consultation, referrals, and peer review.
                </p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div>
                <span className="font-serif text-[#8442FA] text-5xl mb-6 block opacity-40">III</span>
                <h3 className="font-serif text-3xl mb-4">Policy Influence</h3>
                <p className="font-sans font-light text-[rgba(245,242,233,0.5)] leading-relaxed">
                  Direct input into PAMHO's legislative advocacy and institutional guidelines, helping to shape the future of continental healthcare policy.
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      <section className="py-32 md:py-48 bg-[#030303] text-center border-t border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container flex flex-col items-center max-w-4xl mx-auto">
          <Reveal>
            <h2 className="title-section mb-12">Apply for membership.</h2>
            
            {status === 'success' ? (
              <div className="p-8 border border-[#8442FA] bg-[#8442FA]/5">
                <h3 className="font-serif text-3xl text-[#F5F2E9] mb-4">Application Received</h3>
                <p className="font-sans font-light text-[rgba(245,242,233,0.6)]">
                  Your application has been submitted. Our team will review your qualifications and contact you regarding your membership status.
                </p>
              </div>
            ) : !isFormOpen ? (
              <>
                <p className="text-body-large text-[rgba(245,242,233,0.5)] font-light mb-16">
                  Membership requires verification of clinical credentials or equivalent institutional standing. Please fill out the application below to begin the process.
                </p>
                <button onClick={() => setIsFormOpen(true)} className="btn-cinematic">
                  Apply for Membership
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
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#8442FA] transition-colors pb-2">
                    <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">Full Name</label>
                    <input required type="text" className="w-full bg-transparent font-serif text-xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]" placeholder="Your name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#8442FA] transition-colors pb-2">
                    <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">Email Address</label>
                    <input required type="email" className="w-full bg-transparent font-serif text-xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]" placeholder="Your email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#8442FA] transition-colors pb-2">
                    <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">Country</label>
                    <input required type="text" className="w-full bg-transparent font-serif text-xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]" placeholder="Country" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} />
                  </div>
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#8442FA] transition-colors pb-2">
                    <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">City</label>
                    <input required type="text" className="w-full bg-transparent font-serif text-xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]" placeholder="City" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                  </div>
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#8442FA] transition-colors pb-2">
                    <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">WhatsApp</label>
                    <input required type="text" className="w-full bg-transparent font-serif text-xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]" placeholder="Phone number" value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#8442FA] transition-colors pb-2">
                    <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">Clinical / Academic Institution</label>
                    <input required type="text" className="w-full bg-transparent font-serif text-xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]" placeholder="Hospital, university, or clinic" value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} />
                  </div>
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#8442FA] transition-colors pb-2">
                    <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">Primary Specialty</label>
                    <select required className="w-full bg-transparent font-serif text-xl text-[#F5F2E9] focus:outline-none appearance-none" value={formData.specialty} onChange={e => setFormData({...formData, specialty: e.target.value})}>
                      <option value="Clinical Psychology" className="bg-[#110E0C]">Clinical Psychology</option>
                      <option value="Psychiatry" className="bg-[#110E0C]">Psychiatry</option>
                      <option value="Social Work" className="bg-[#110E0C]">Social Work</option>
                      <option value="Research/Academia" className="bg-[#110E0C]">Research / Academia</option>
                      <option value="Public Health" className="bg-[#110E0C]">Public Health</option>
                      <option value="Other" className="bg-[#110E0C]">Other</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#8442FA] transition-colors pb-2">
                  <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">Clinical Qualifications</label>
                  <textarea required rows={3} className="w-full bg-transparent font-sans font-light text-lg text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)] resize-none" placeholder="Provide your licensing, degree, or credential details..." value={formData.qualifications} onChange={e => setFormData({...formData, qualifications: e.target.value})}></textarea>
                </div>

                <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#8442FA] transition-colors pb-2">
                  <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">How did you hear about PAMHO?</label>
                  <input type="text" className="w-full bg-transparent font-serif text-xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]" placeholder="Referral, social media, etc." value={formData.referral} onChange={e => setFormData({...formData, referral: e.target.value})} />
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
