import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { Reveal } from '../components/Reveal'

export default function Donate() {
  const [amount, setAmount] = useState<number | null>(100)
  const [customAmount, setCustomAmount] = useState('')

  return (
    <div className="flex flex-col min-h-screen relative bg-[#030303]">
      <SEO title="Donate | PAMHO" />
      <div className="grain-overlay"></div>

      {/* ============================================================ */}
      {/* 1. THE OPENING                                               */}
      {/* ============================================================ */}
      <section className="pt-48 pb-16 md:pt-64 md:pb-24 border-b border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container max-w-5xl">
          <Reveal>
            <span className="label-tracking text-[#D1893D] mb-8 block">Philanthropy & Funding</span>
            <h1 className="title-hero mb-8">
              Fund systemic <span className="italic text-[rgba(245,242,233,0.7)]">reform.</span>
            </h1>
            <p className="text-body-large text-[rgba(245,242,233,0.6)] font-light leading-relaxed">
              Financial contributions directly scale digital infrastructure, empower grassroots advocates, and build sustainable healthcare structures across the continent.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. THE ALLOCATION INTERFACE                                  */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 bg-[#110E0C]">
        <div className="canvas-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Form */}
            <div className="lg:col-span-7">
              <Reveal>
                <h3 className="font-serif text-3xl mb-12">Make a Donation</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                  {[25, 50, 100, 250].map((val, idx) => (
                    <button
                      key={val}
                      onClick={() => { setAmount(val); setCustomAmount(''); }}
                      style={{ transitionDelay: `${idx * 50}ms` }}
                      className={`py-8 text-3xl font-serif border transition-all duration-500 ${
                        amount === val 
                          ? 'border-[rgba(245,242,233,0.8)] text-[#F5F2E9] bg-[rgba(245,242,233,0.05)]' 
                          : 'border-[rgba(245,242,233,0.1)] text-[rgba(245,242,233,0.3)] hover:border-[rgba(245,242,233,0.4)] hover:text-[#F5F2E9]'
                      }`}
                    >
                      ${val}
                    </button>
                  ))}
                </div>
                
                <div className="mb-16 border-b border-[rgba(245,242,233,0.15)] pb-4 focus-within:border-[rgba(245,242,233,0.6)] transition-colors">
                  <label htmlFor="custom-amount" className="label-tracking mb-6 block">Custom Amount (USD)</label>
                  <div className="flex items-center">
                    <span className="text-4xl font-serif text-[rgba(245,242,233,0.3)] mr-4">$</span>
                    <input 
                      type="number"
                      id="custom-amount"
                      placeholder="0.00"
                      className="w-full bg-transparent text-5xl font-serif text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.1)]"
                      value={customAmount}
                      onChange={e => {
                        setCustomAmount(e.target.value);
                        setAmount(null);
                      }}
                    />
                  </div>
                </div>

                <div className="p-8 border border-[rgba(209,137,61,0.3)] bg-[rgba(209,137,61,0.05)] mb-12 flex gap-6 items-start">
                  <p className="font-sans font-light text-[rgba(245,242,233,0.7)] text-sm leading-relaxed">
                    Online processing gateways are currently suspended pending the finalization of our organizational banking compliance structure. Please refer to the direct transfer instructions.
                  </p>
                </div>

                <button disabled className="btn-cinematic w-full justify-center opacity-30 cursor-not-allowed border-[rgba(245,242,233,0.1)]">
                  Proceed to Donate
                </button>
              </Reveal>
            </div>

            {/* Logistics */}
            <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[rgba(245,242,233,0.05)] pt-16 lg:pt-0 lg:pl-16 flex flex-col gap-16">
              
              <Reveal delay={200}>
                <div>
                  <span className="label-tracking mb-4 block">Bank Transfers</span>
                  <h4 className="font-serif text-3xl mb-4">Wire Transfers</h4>
                  <p className="font-sans font-light text-[rgba(245,242,233,0.5)] text-sm leading-relaxed mb-8">
                    For large-scale or organizational donations, please contact us for bank transfer details and SWIFT information.
                  </p>
                  <Link to="/contact?type=donation" className="label-tracking text-[#D1893D] hover:text-[#F5F2E9] transition-colors">
                    Request Bank Details
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <div>
                  <span className="label-tracking mb-4 block">Partnerships</span>
                  <h4 className="font-serif text-3xl mb-4">Development Office</h4>
                  <p className="font-sans font-light text-[rgba(245,242,233,0.5)] text-sm leading-relaxed mb-8">
                    For corporate partnerships and grant opportunities, please reach out to our development office.
                  </p>
                  <Link to="/contact?type=partnership" className="label-tracking text-[#D1893D] hover:text-[#F5F2E9] transition-colors">
                    Contact Partnerships
                  </Link>
                </div>
              </Reveal>

            </div>
            
          </div>
        </div>
      </section>
    </div>
  )
}
