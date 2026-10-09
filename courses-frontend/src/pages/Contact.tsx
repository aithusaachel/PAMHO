import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SEO from '../components/SEO'
import { Reveal } from '../components/Reveal'

export default function Contact() {
  const [searchParams] = useSearchParams()
  const initialType = searchParams.get('type') || 'general'
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: initialType,
    message: ''
  })
  
  const [status, setStatus] = useState<'idle'|'submitting'|'success'|'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        enquiry_type: formData.type,
        message: formData.message
      }

      const res = await fetch('/api/v1/enquiries/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      
      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', type: 'general', message: '' })
      } else {
        setStatus('error')
      }
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <div className="flex flex-col min-h-screen relative bg-[#030303]">
      <SEO title="Contact | PAMHO" />
      <div className="grain-overlay"></div>

      {/* ============================================================ */}
      {/* 1. THE OPENING                                               */}
      {/* ============================================================ */}
      <section className="pt-48 pb-16 md:pt-64 md:pb-24 border-b border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container flex flex-col items-start max-w-5xl">
          <Reveal>
            <span className="label-tracking text-[#8442FA] mb-8 block">Communications</span>
            <h1 className="title-hero mb-8">
              Get in <span className="italic text-[rgba(245,242,233,0.7)]">Touch.</span>
            </h1>
            <p className="text-body-large text-[rgba(245,242,233,0.6)] font-light leading-relaxed">
              Whether inquiring about organizational partnerships, professional membership, or general advocacy, the first step is direct communication.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. INTAKE FORM & LOGISTICS                                   */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 bg-[#110E0C]">
        <div className="canvas-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Logistics */}
            <div className="lg:col-span-4 order-2 lg:order-1 flex flex-col gap-16 border-t lg:border-t-0 lg:border-r border-[rgba(245,242,233,0.05)] pt-16 lg:pt-0 lg:pr-16">
              
              <Reveal delay={200}>
                <div>
                  <span className="label-tracking mb-4 block">General Operations</span>
                  <h3 className="font-serif text-3xl mb-4">Inquiries</h3>
                  <p className="font-sans font-light text-[rgba(245,242,233,0.5)] text-sm leading-relaxed mb-6">
                    For operational questions regarding programs, institute enrollment, or public events. We aim for a 48-hour response time.
                  </p>
                  <a href="mailto:info@pamho.org" className="label-tracking text-[#8442FA] hover:text-[#F5F2E9] transition-colors">info@pamho.org</a>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <div>
                  <span className="label-tracking mb-4 block">Development Office</span>
                  <h3 className="font-serif text-3xl mb-4">Partnerships</h3>
                  <p className="font-sans font-light text-[rgba(245,242,233,0.5)] text-sm leading-relaxed mb-6">
                    For institutional funding, strategic alliances, and speaking engagements requiring direct development office coordination.
                  </p>
                  <a href="mailto:partners@pamho.org" className="label-tracking text-[#8442FA] hover:text-[#F5F2E9] transition-colors">partners@pamho.org</a>
                </div>
              </Reveal>

            </div>

            {/* Form */}
            <div className="lg:col-span-8 order-1 lg:order-2">
              <Reveal>
                {status === 'success' ? (
                  <div className="py-16 md:py-24 max-w-2xl">
                    <span className="font-serif text-[#8442FA] text-6xl mb-8 block opacity-50">✓</span>
                    <h3 className="font-serif text-5xl mb-6">Message Sent.</h3>
                    <p className="font-sans font-light text-[rgba(245,242,233,0.6)] text-lg mb-12 leading-relaxed">
                      Your inquiry has been received. Our team will review your submission and respond through the provided email address.
                    </p>
                    <button onClick={() => setStatus('idle')} className="btn-cinematic">
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-12 max-w-3xl">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="border-b border-[rgba(245,242,233,0.15)] pb-4 focus-within:border-[rgba(245,242,233,0.6)] transition-colors">
                        <label htmlFor="name" className="label-tracking block mb-4">Full Name</label>
                        <input 
                          type="text" 
                          id="name"
                          required
                          className="w-full bg-transparent text-2xl font-serif text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      
                      <div className="border-b border-[rgba(245,242,233,0.15)] pb-4 focus-within:border-[rgba(245,242,233,0.6)] transition-colors">
                        <label htmlFor="email" className="label-tracking block mb-4">Email Address</label>
                        <input 
                          type="email" 
                          id="email"
                          required
                          className="w-full bg-transparent text-2xl font-serif text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]"
                          placeholder="Your email address"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="border-b border-[rgba(245,242,233,0.15)] pb-4 focus-within:border-[rgba(245,242,233,0.6)] transition-colors">
                      <label htmlFor="type" className="label-tracking block mb-4">Inquiry Category</label>
                      <select 
                        id="type"
                        className="w-full bg-transparent text-2xl font-serif text-[#F5F2E9] focus:outline-none appearance-none cursor-pointer"
                        value={formData.type}
                        onChange={e => setFormData({...formData, type: e.target.value})}
                      >
                        <option value="general" className="bg-[#110E0C]">General Inquiry</option>
                        <option value="partnership" className="bg-[#110E0C]">Strategic Partnership</option>
                        <option value="ambassador" className="bg-[#110E0C]">Ambassador Application</option>
                        <option value="membership" className="bg-[#110E0C]">Professional Membership</option>
                        <option value="donation" className="bg-[#110E0C]">Funding / Philanthropy</option>
                      </select>
                    </div>

                    <div className="border-b border-[rgba(245,242,233,0.15)] pb-4 focus-within:border-[rgba(245,242,233,0.6)] transition-colors">
                      <label htmlFor="message" className="label-tracking block mb-4">Message</label>
                      <textarea 
                        id="message"
                        required
                        rows={5}
                        className="w-full bg-transparent text-2xl font-serif text-[#F5F2E9] focus:outline-none resize-none placeholder:text-[rgba(245,242,233,0.15)] leading-relaxed"
                        placeholder="How can we help?"
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                      ></textarea>
                    </div>

                    {status === 'error' && (
                      <div className="p-6 border border-[#9B3E25] bg-[rgba(155,62,37,0.1)] text-[#F5F2E9]">
                        <p className="font-sans text-sm font-light">An error occurred during submission. Please attempt to resubmit or utilize the direct email.</p>
                      </div>
                    )}

                    <div className="pt-8">
                      <button 
                        type="submit" 
                        disabled={status === 'submitting'}
                        className="btn-cinematic"
                      >
                        {status === 'submitting' ? 'Submitting...' : 'Submit Inquiry'}
                      </button>
                    </div>
                  </form>
                )}
              </Reveal>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
