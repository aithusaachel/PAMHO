import { useState } from 'react'
import SEO from '../components/SEO'
import { Reveal } from '../components/Reveal'

export default function RegisterConversation() {
  const [formData, setFormData] = useState({ 
    name: '', email: '', country: '', city: '', whatsapp: '', 
    organization: '', attendance_type: 'Online / Virtual', requirements: '' 
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formattedMessage = `
Country: ${formData.country}
City: ${formData.city}
WhatsApp: ${formData.whatsapp}
Attendance: ${formData.attendance_type}

Special Requirements / Comments:
${formData.requirements || 'None provided.'}
    `.trim();

    try {
      const res = await fetch('/api/v1/enquiries/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: formData.name,
          email: formData.email,
          organization: formData.organization,
          message: formattedMessage,
          enquiry_type: 'Conversation Registration' 
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
      <SEO title="Register | The Pan-African Mental Health Conversation" />
      <div className="grain-overlay"></div>

      <section className="pt-48 pb-16 md:pt-64 md:pb-24 border-b border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container max-w-5xl text-center flex flex-col items-center">
          <Reveal>
            <span className="label-tracking text-[#D1893D] mb-8 block">The Main Event</span>
            <h1 className="title-hero mb-8">
              Register for the <span className="italic text-[rgba(245,242,233,0.7)]">Conversation.</span>
            </h1>
            <p className="text-body-large text-[rgba(245,242,233,0.6)] font-light leading-relaxed">
              Join advocates, professionals, and policymakers across the continent in our flagship annual dialogue. Secure your place to participate online or in person.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#110E0C]">
        <div className="canvas-container flex justify-center">
          
          <Reveal className="w-full max-w-4xl">
            {status === 'success' ? (
              <div className="py-16 md:py-24 text-center">
                <span className="font-serif text-[#D1893D] text-6xl mb-8 block opacity-50">✓</span>
                <h3 className="font-serif text-5xl mb-6">Registration Confirmed.</h3>
                <p className="font-sans font-light text-[rgba(245,242,233,0.6)] text-lg mb-12 leading-relaxed max-w-2xl mx-auto">
                  Your registration has been logged in our system. You will receive an email shortly with your access credentials and event logistics.
                </p>
                <button onClick={() => setStatus('idle')} className="btn-cinematic">
                  Register Another Attendee
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full text-left flex flex-col gap-8 animate-fade-in border border-[rgba(245,242,233,0.1)] p-8 md:p-16 bg-[#030303]">
                {status === 'error' && (
                  <div className="text-red-400 border border-red-900/50 bg-red-900/10 p-4 font-sans font-light text-sm mb-4">
                    Registration failed. Please try again or check your network connection.
                  </div>
                )}
                
                <h3 className="font-serif text-3xl mb-8 border-b border-[rgba(245,242,233,0.1)] pb-4">Attendee Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#D1893D] transition-colors pb-2">
                    <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">Full Name</label>
                    <input required type="text" className="w-full bg-transparent font-serif text-2xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]" placeholder="Your name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#D1893D] transition-colors pb-2">
                    <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">Email Address</label>
                    <input required type="email" className="w-full bg-transparent font-serif text-2xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]" placeholder="Your email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-4">
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#D1893D] transition-colors pb-2">
                    <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">Country</label>
                    <input required type="text" className="w-full bg-transparent font-serif text-2xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]" placeholder="Country" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} />
                  </div>
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#D1893D] transition-colors pb-2">
                    <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">City</label>
                    <input required type="text" className="w-full bg-transparent font-serif text-2xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]" placeholder="City" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                  </div>
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#D1893D] transition-colors pb-2">
                    <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">WhatsApp</label>
                    <input required type="text" className="w-full bg-transparent font-serif text-2xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]" placeholder="Phone number" value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-4">
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#D1893D] transition-colors pb-2">
                    <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">Organization / Affiliation</label>
                    <input type="text" className="w-full bg-transparent font-serif text-2xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]" placeholder="Company or NGO" value={formData.organization} onChange={e => setFormData({...formData, organization: e.target.value})} />
                  </div>
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#D1893D] transition-colors pb-2">
                    <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">Attendance Format</label>
                    <input type="text" readOnly className="w-full bg-transparent font-serif text-2xl text-[rgba(245,242,233,0.5)] focus:outline-none cursor-not-allowed" value="Online / Virtual (Platform Only)" />
                  </div>
                </div>

                <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#D1893D] transition-colors pb-2 mt-4">
                  <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">Special Accommodations / Comments (Optional)</label>
                  <textarea rows={3} className="w-full bg-transparent font-sans font-light text-lg text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)] resize-none" placeholder="Let us know if you need any specific arrangements..." value={formData.requirements} onChange={e => setFormData({...formData, requirements: e.target.value})}></textarea>
                </div>

                <div className="flex gap-6 mt-8">
                  <button type="submit" disabled={status === 'submitting'} className="btn-cinematic w-full text-center justify-center">
                    {status === 'submitting' ? 'Processing...' : 'Complete Registration'}
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
