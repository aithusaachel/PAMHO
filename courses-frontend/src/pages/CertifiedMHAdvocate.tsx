import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const MODULES = [
  {
    num: '01',
    title: 'Foundations of Mental Health in the African Context',
    description: 'Understand core concepts, the human rights and development case for mental health, the realities of the African context, and the scope and limits of an advocate\'s role.',
  },
  {
    num: '02',
    title: 'Stigma, Culture and Community Engagement',
    description: 'Learn how culture, belief, and social norms shape attitudes, and how to engage families, schools, workplaces, and faith communities respectfully and effectively.',
  },
  {
    num: '03',
    title: 'Evidence-Based and Safe Communication',
    description: 'Use credible evidence and safe-messaging principles to communicate about mental health accurately, responsibly, and persuasively.',
  },
  {
    num: '04',
    title: 'Designing Community Advocacy Initiatives',
    description: 'Plan a realistic, ethical initiative, identify partners, and use verified referral pathways when someone needs professional support.',
  },
  {
    num: '05',
    title: 'Applied Advocacy Practicum',
    description: 'Practise your skills in a supervised, scenario-based session — from delivering an advocacy message to responding safely to stigma and disclosures.',
  },
]

const FAQS = [
  {
    q: 'Is this a clinical qualification?',
    a: 'No. The programme prepares you for advocacy, awareness, and safe referral. It does not train you to diagnose, counsel, or treat.',
  },
  {
    q: 'Do I need a background in psychology?',
    a: 'No. The programme is open to anyone committed to responsible advocacy.',
  },
  {
    q: 'How much time will I need?',
    a: 'About 20 hours over five weeks: five live sessions of three hours each, plus about one hour of self-paced work per module.',
  },
  {
    q: 'How much does it cost?',
    a: 'The founding-cohort fee is subsidised by ACI Africa. Exact fees will be confirmed when registration opens on 1 November 2026, and the fee increases from 1 January 2027.',
  },
  {
    q: 'Which language is the programme taught in?',
    a: 'English.',
  },
  {
    q: 'Can I join from anywhere?',
    a: 'Yes. Sessions are online and open to participants across Africa and the diaspora.',
  },
  {
    q: 'What happens after I join the waitlist?',
    a: 'We will email you when registration opens on 1 November 2026, with a direct link and the confirmed fee.',
  },
  {
    q: 'Is joining the waitlist a commitment to enrol?',
    a: 'No. Joining the waitlist is free and carries no obligation.',
  },
]

const KEY_FACTS = [
  { label: 'Start Date', value: '23 January 2027' },
  { label: 'Duration', value: '5 weeks' },
  { label: 'Format', value: 'Live Saturday sessions (Online)' },
  { label: 'Award', value: 'PAMHO Certificate: Certified Mental Health Advocate' },
  { label: 'Registration Opens', value: '1 November 2026' },
]

const WHO_FOR = [
  'University and postgraduate students',
  'Youth leaders and community volunteers',
  'Teachers and education staff',
  'Faith and community leaders',
  'Professionals from any field who want to champion mental health in their workplace',
  'Anyone aged 18 and above committed to responsible mental health advocacy',
]

interface FormData {
  full_name: string
  email: string
  country: string
  role: string
  agreed_to_contact: boolean
  whatsapp: string
  organisation: string
  motivation: string
  heard_about: string
  interested_future: boolean
}

const EMPTY_FORM: FormData = {
  full_name: '',
  email: '',
  country: '',
  role: '',
  agreed_to_contact: false,
  whatsapp: '',
  organisation: '',
  motivation: '',
  heard_about: '',
  interested_future: false,
}

export default function CertifiedMHAdvocate() {
  const [form, setForm] = useState<FormData>(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const set = (field: keyof FormData, value: string | boolean) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.agreed_to_contact) {
      setError('Please tick the consent checkbox to continue.')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/v1/waitlist/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.detail || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('A network error occurred. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputCls =
    'w-full bg-[#0d0d10] border border-[#8442fa]/20 rounded-sm px-4 py-3 text-[#f4f2ee] placeholder-gray-600 focus:border-[#8442fa] outline-none transition-colors text-sm'
  const labelCls = 'block text-xs font-mono uppercase tracking-widest text-gray-400 mb-2'
  const container = 'w-full max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-20'

  return (
    <div className="flex flex-col bg-[#0a0a0c] min-h-screen">
      <SEO
        title="Certified Mental Health Advocate | PAMHO Institute in collaboration with ACI Africa"
        description="A five-week programme equipping emerging leaders across Africa to advance mental health awareness, reduce stigma, and connect communities to support. Founding cohort begins 23 January 2027."
      />

      <section className={`pt-48 pb-32 ${container} relative`}>
        <div className="absolute top-0 left-1/4 w-1/2 h-[600px] bg-[#140b1e] blur-[160px] rounded-full pointer-events-none -z-10 opacity-60" />
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="tag-outline text-[#b48aff] border-[#8442fa]/30 uppercase tracking-widest text-[10px]">PAMHO Institute</span>
            <span className="tag-outline text-gray-500 border-gray-700 uppercase tracking-widest text-[10px]">In collaboration with ACI Africa</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#f4f2ee] tracking-tight leading-[1.05] mb-6">
            Certified Mental<br className="hidden md:block" /> Health Advocate
          </h1>
          <p className="text-lg font-mono text-[#b48aff] mb-10 tracking-wide">Cohort I · January 2027</p>
          <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-3xl mb-14">
            A five-week programme equipping emerging leaders and community members across Africa with the knowledge, ethical grounding, and practical skills to advance mental health awareness, reduce stigma, and connect communities to appropriate support.
          </p>
          <a href="#waitlist" className="inline-flex btn-primary text-sm font-bold px-10 py-4 rounded-sm shadow-[0_4px_24px_-4px_rgba(132,66,250,0.5)]">
            Join the Founding Cohort Waitlist
          </a>
        </div>
      </section>

      <section className="border-y border-[#8442fa]/10 bg-[#111115]">
        <div className={`${container} py-12`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#8442fa]/10">
            {KEY_FACTS.map((fact) => (
              <div key={fact.label} className="px-0 sm:px-8 first:pl-0 last:pr-0 py-6 sm:py-0">
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#b48aff] mb-2">{fact.label}</p>
                <p className="text-sm text-[#f4f2ee] font-medium leading-snug">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-32 ${container} border-b border-[#8442fa]/10`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
            <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-4">About this Programme</h2>
            <h3 className="text-3xl font-bold text-[#f4f2ee] leading-tight">Mental health is a community issue.</h3>
          </div>
          <div className="lg:col-span-7 flex flex-col gap-10">
            <p className="text-xl text-gray-400 font-light leading-relaxed">
              Mental health cannot be addressed only inside hospitals. It is a human rights, development, and community issue — and it needs informed, responsible advocates in every school, workplace, faith community, and institution.
            </p>
            <p className="text-gray-500 leading-relaxed">
              The Certified Mental Health Advocate programme is the first stage of the PAMHO Institute pathway. It is designed for people who want to lead conversations on mental health with evidence, cultural sensitivity, and clear professional boundaries.
            </p>
            <div className="border border-[#8442fa]/20 bg-[#140b1e] rounded-sm p-8 mt-4">
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#b48aff] mb-4">In Collaboration with ACI Africa</p>
              <p className="text-gray-400 leading-relaxed mb-4">
                The PAMHO Institute delivers this programme in collaboration with <strong className="text-[#f4f2ee] font-medium">AbelCares Initiatives Africa (ACI Africa)</strong>, a continental non-profit working on youth mental health, education access, and social impact.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Through ACI Africa's support, the founding cohort is offered at a subsidised fee, making high-quality mental health training more accessible to emerging leaders across the continent.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-32 ${container} border-b border-[#8442fa]/10`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5">
            <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-4">Who This Programme Is For</h2>
            <h3 className="text-3xl font-bold text-[#f4f2ee] leading-tight">No prior training required.</h3>
            <p className="text-gray-500 mt-6 leading-relaxed text-sm">No prior training in psychology or health is required.</p>
          </div>
          <div className="lg:col-span-7">
            <ul className="flex flex-col gap-0">
              {WHO_FOR.map((item, i) => (
                <li key={i} className="flex items-start gap-5 py-6 border-b border-[#8442fa]/10 last:border-0">
                  <span className="text-[#8442fa] font-mono text-xs mt-1 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-gray-400 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#111115] border-b border-[#8442fa]/10">
        <div className={container}>
          <div className="mb-20">
            <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-4">What You Will Learn</h2>
            <h3 className="text-4xl font-bold text-[#f4f2ee]">Five modules. Five weeks.</h3>
          </div>
          <div className="flex flex-col gap-0">
            {MODULES.map((mod) => (
              <div key={mod.num} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 py-10 border-t border-[#8442fa]/10 group hover:bg-[#140b1e] px-6 -mx-6 transition-colors">
                <div className="md:col-span-1"><span className="font-mono text-[#8442fa]/40 text-sm">{mod.num}</span></div>
                <div className="md:col-span-4"><h4 className="text-lg font-bold text-[#f4f2ee] leading-snug">{mod.title}</h4></div>
                <div className="md:col-span-7"><p className="text-gray-400 leading-relaxed text-sm">{mod.description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-32 ${container} border-b border-[#8442fa]/10`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5">
            <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-4">How the Programme Works</h2>
            <h3 className="text-3xl font-bold text-[#f4f2ee] leading-tight">Live. Structured. Practical.</h3>
          </div>
          <div className="lg:col-span-7 flex flex-col gap-8">
            {[
              { n: '01', heading: 'Five live sessions', body: 'One 3-hour session each Saturday, from 23 January to 20 February 2027.' },
              { n: '02', heading: 'Self-paced work', body: 'About one hour of reading or reflection per module — on your schedule.' },
              { n: '03', heading: 'Assessment', body: 'Short module quizzes and the practical assessment in Module 5.' },
              { n: '04', heading: 'Certification requirement', body: 'Attendance at 3 live sessions, plus successful completion of assessments.' },
            ].map(item => (
              <div key={item.n} className="flex gap-6 items-start border-t border-[#8442fa]/10 pt-8">
                <span className="font-mono text-[#8442fa]/30 text-xs shrink-0 mt-1">{item.n}</span>
                <div>
                  <h4 className="text-[#f4f2ee] font-semibold mb-2">{item.heading}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#111115] border-b border-[#8442fa]/10">
        <div className={container}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 border border-[#8442fa]/30 mb-10">
              <svg className="w-7 h-7 text-[#8442fa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-4">Certification</h2>
            <h3 className="text-3xl font-bold text-[#f4f2ee] mb-8">PAMHO Certificate:<br/>Certified Mental Health Advocate</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Participants who meet the attendance and assessment requirements receive a PAMHO Certificate designating them a <strong className="text-[#f4f2ee] font-medium">Certified Mental Health Advocate</strong>.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed border border-[#8442fa]/10 bg-[#140b1e] rounded-sm px-8 py-6 text-left">
              This certificate recognises training in mental health advocacy and awareness. It is not a clinical, counselling, or professional licensing qualification, and it does not authorise the holder to diagnose or treat.
            </p>
          </div>
        </div>
      </section>

      <section className={`py-32 ${container} border-b border-[#8442fa]/10`}>
        <div className="max-w-3xl">
          <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-4">The PAMHO Institute Pathway</h2>
          <h3 className="text-3xl font-bold text-[#f4f2ee] mb-8">The first step on a structured learning ladder.</h3>
          <p className="text-gray-400 leading-relaxed">
            The Certified Mental Health Advocate programme is the first stage of the PAMHO Institute pathway — designed to grow with you as your skills and responsibilities develop. Further programmes will be announced by the PAMHO Institute.
          </p>
        </div>
      </section>

      <section className="py-32 bg-[#111115] border-b border-[#8442fa]/10">
        <div className={container}>
          <div className="mb-16">
            <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-4">Frequently Asked Questions</h2>
            <h3 className="text-3xl font-bold text-[#f4f2ee]">Common questions.</h3>
          </div>
          <div className="max-w-3xl flex flex-col gap-0">
            {FAQS.map((faq, i) => (
              <div key={i} className="border-t border-[#8442fa]/10">
                <button
                  className="w-full flex justify-between items-start gap-6 py-7 text-left group"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="text-[#f4f2ee] font-semibold group-hover:text-[#b48aff] transition-colors">{faq.q}</span>
                  <span className={`text-[#8442fa] shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                {openFaq === i && (
                  <p className="text-gray-400 text-sm leading-relaxed pb-7 pr-10">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="waitlist" className={`py-32 ${container}`}>
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <div className="text-center py-24">
              <div className="inline-flex items-center justify-center w-16 h-16 border border-[#8442fa]/30 bg-[#140b1e] mb-8">
                <svg className="w-6 h-6 text-[#b48aff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-[#f4f2ee] mb-4">You're on the list.</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Thank you for joining the waitlist for the <strong className="text-[#f4f2ee] font-medium">Certified Mental Health Advocate</strong> founding cohort.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Registration opens on <strong className="text-gray-400">1 November 2026</strong>, and we will email you as soon as it does. Founding-cohort pricing applies until 31 December 2026.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-16">
                <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-4">Waitlist</h2>
                <h3 className="text-3xl font-bold text-[#f4f2ee] mb-4">Join the Founding Cohort Waitlist</h3>
                <p className="text-gray-400">Be first to know when registration opens on 1 November 2026.</p>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label htmlFor="full_name" className={labelCls}>Full Name <span className="text-[#8442fa]">*</span></label>
                  <input id="full_name" required type="text" className={inputCls} value={form.full_name} onChange={e => set('full_name', e.target.value)} />
                </div>
                <div>
                  <label htmlFor="email" className={labelCls}>Email Address <span className="text-[#8442fa]">*</span></label>
                  <input id="email" required type="email" className={inputCls} value={form.email} onChange={e => set('email', e.target.value)} />
                </div>
                <div>
                  <label htmlFor="country" className={labelCls}>Country of Residence <span className="text-[#8442fa]">*</span></label>
                  <input id="country" required type="text" className={inputCls} value={form.country} onChange={e => set('country', e.target.value)} />
                </div>
                <div>
                  <label htmlFor="role" className={labelCls}>I am a <span className="text-[#8442fa]">*</span></label>
                  <select id="role" required className={inputCls} value={form.role} onChange={e => set('role', e.target.value)}>
                    <option value="">Select...</option>
                    <option value="student">Student</option>
                    <option value="professional">Professional</option>
                    <option value="educator">Educator</option>
                    <option value="community_faith_leader">Community or faith leader</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="flex items-start gap-3 border border-[#8442fa]/20 bg-[#140b1e] rounded-sm px-5 py-4">
                  <input id="agreed_to_contact" type="checkbox" className="mt-1 accent-[#8442fa] shrink-0" checked={form.agreed_to_contact} onChange={e => set('agreed_to_contact', e.target.checked)} />
                  <label htmlFor="agreed_to_contact" className="text-sm text-gray-400 leading-relaxed cursor-pointer">
                    I agree to be contacted by PAMHO and ACI Africa about this programme. <span className="text-[#8442fa]">*</span>
                  </label>
                </div>
                <div className="flex items-center gap-4 my-2">
                  <div className="flex-1 h-px bg-[#8442fa]/10" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gray-600">Optional</span>
                  <div className="flex-1 h-px bg-[#8442fa]/10" />
                </div>
                <div>
                  <label htmlFor="whatsapp" className={labelCls}>WhatsApp Number</label>
                  <input id="whatsapp" type="tel" className={inputCls} placeholder="+234..." value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)} />
                </div>
                <div>
                  <label htmlFor="organisation" className={labelCls}>Organisation or Institution</label>
                  <input id="organisation" type="text" className={inputCls} value={form.organisation} onChange={e => set('organisation', e.target.value)} />
                </div>
                <div>
                  <label htmlFor="motivation" className={labelCls}>What draws you to mental health advocacy? (1-2 sentences)</label>
                  <textarea id="motivation" rows={3} className={`${inputCls} resize-none`} value={form.motivation} onChange={e => set('motivation', e.target.value)} />
                </div>
                <div>
                  <label htmlFor="heard_about" className={labelCls}>How did you hear about us?</label>
                  <select id="heard_about" className={inputCls} value={form.heard_about} onChange={e => set('heard_about', e.target.value)}>
                    <option value="">Select...</option>
                    <option value="pamhc">Pan-African Mental Health Conversation</option>
                    <option value="social_media">Social media</option>
                    <option value="friend_colleague">Friend or colleague</option>
                    <option value="ambassador">Ambassador or Community Mobilizer</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="flex items-start gap-3">
                  <input id="interested_future" type="checkbox" className="mt-1 accent-[#8442fa] shrink-0" checked={form.interested_future} onChange={e => set('interested_future', e.target.checked)} />
                  <label htmlFor="interested_future" className="text-sm text-gray-400 leading-relaxed cursor-pointer">
                    I am also interested in future PAMHO Institute programmes
                  </label>
                </div>
                {error && (
                  <p className="text-red-400 text-sm border border-red-500/20 bg-red-500/5 rounded-sm px-4 py-3">{error}</p>
                )}
                <div className="pt-2">
                  <button type="submit" disabled={submitting} className="w-full btn-primary text-sm font-bold px-8 py-4 rounded-sm shadow-[0_4px_20px_-5px_rgba(132,66,250,0.4)] disabled:opacity-50 disabled:cursor-not-allowed">
                    {submitting ? 'Joining...' : 'Join the Waitlist'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </section>

      <section className="border-t border-[#8442fa]/10 bg-[#111115]">
        <div className={`${container} py-10`}>
          <p className="text-xs text-gray-600 leading-relaxed max-w-3xl">
            The PAMHO Institute is a programme of the Pan-African Mental Health Organization (PAMHO), delivered in collaboration with AbelCares Initiatives Africa (ACI Africa). Certificates recognise training in advocacy and awareness and are not clinical or professional qualifications.
          </p>
          <div className="flex gap-6 mt-4 text-xs text-gray-600">
            <Link to="/contact" className="hover:text-[#b48aff] transition-colors">Contact</Link>
            <Link to="/about" className="hover:text-[#b48aff] transition-colors">About PAMHO</Link>
            <Link to="/institute" className="hover:text-[#b48aff] transition-colors">PAMHO Institute</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

