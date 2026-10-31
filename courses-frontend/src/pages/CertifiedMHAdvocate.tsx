import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { Reveal } from '../components/Reveal'

interface ModuleItem {
  num: string
  title: string
  description: string
}

const MODULES: ModuleItem[] = [
  {
    num: '01',
    title: 'Foundations of Mental Health & Wellbeing',
    description: 'Understanding distress vs. illness; the biopsychosocial model; mental health across the African life course; and the clear scope and boundaries of the advocacy role.',
  },
  {
    num: '02',
    title: 'Stigma, Culture & Context',
    description: 'How stigma operates in African communities; cultural conceptions of distress; and framing conversations that bridge cultural perspectives and evidence-based science.',
  },
  {
    num: '03',
    title: 'Communication, Boundaries & Safe Support',
    description: 'Active listening and psychological first aid principles; what advocates do vs. what clinicians do; and safe boundaries, ethical duty of care, and advocate self-care.',
  },
  {
    num: '04',
    title: 'Systems, Resources & Referral Pathways',
    description: 'Mapping local mental health and social support resources; knowing when, where, and how to safely refer; and advocating for mental health resources in communities and workplaces.',
  },
  {
    num: '05',
    title: 'Applied Advocacy Practicum',
    description: 'Supervised, scenario-based practicum — from delivering persuasive advocacy messages to responding safely to community stigma, crises, and personal disclosures.',
  },
]

interface FaqItem {
  q: string
  a: string
}

const FAQS: FaqItem[] = [
  {
    q: 'Is this a clinical qualification?',
    a: 'No. This programme trains community advocates in awareness, safe dialogue, and ethical referral. It does not qualify you to practice as a psychologist, psychiatrist, therapist, or counsellor, nor does it authorise clinical diagnosis or treatment.',
  },
  {
    q: 'What is the time commitment?',
    a: 'Approximately 20 total hours over five weeks: five live 3-hour sessions on consecutive Saturdays, plus about one hour per module of self-paced reading and reflection on your own schedule.',
  },
  {
    q: 'What if I miss a live session?',
    a: 'To receive certification, participants must attend at least 3 of the 5 live sessions and complete all module assessments. Recordings of live sessions are made available for review, but live attendance is essential for the practical and collaborative exercises.',
  },
  {
    q: 'Is this open to participants outside Africa?',
    a: 'Yes. While the curriculum is deeply rooted in African realities, systems, and community contexts, the programme is conducted fully online and welcomes participants from across Africa and the global African diaspora.',
  },
  {
    q: 'In what language will the programme be delivered?',
    a: 'Cohort I will be delivered in English. Participants should have working proficiency in English to engage with lectures, group discussions, and module assessments.',
  },
  {
    q: 'Will I receive a certificate upon completion?',
    a: 'Yes. Participants who satisfy the attendance requirements and complete the module assessments will receive a verified digital Certificate of Completion issued jointly by the PAMHO Institute and ACI Africa.',
  },
]

const KEY_FACTS = [
  { label: 'Duration', value: '5 Weeks' },
  { label: 'Format', value: 'Live Online (Zoom)' },
  { label: 'Schedule', value: 'Saturdays, 09:00 – 12:00 UTC' },
  { label: 'Dates', value: '23 Jan – 20 Feb 2027' },
  { label: 'Cohort Size', value: 'Limited to 40' },
]

const WHO_FOR = [
  {
    num: 'I',
    title: 'Community Organizers & Youth Leaders',
    desc: 'Grassroots champions leading youth groups, civil society organizations, and local community initiatives.',
  },
  {
    num: 'II',
    title: 'Workplace Wellbeing & HR Leaders',
    desc: 'Professionals seeking to establish culturally sensitive mental health support and wellbeing policies within African organizations.',
  },
  {
    num: 'III',
    title: 'Educators & Pastoral Leaders',
    desc: 'Teachers, lecturers, school counsellors, and faith-based community leaders who regularly support distressed individuals.',
  },
  {
    num: 'IV',
    title: 'Healthcare Workers & Allied Professionals',
    desc: 'Nurses, public health officers, and social workers looking to broaden their advocacy, stigma-reduction, and referral skills.',
  },
  {
    num: 'V',
    title: 'Passionate Community Advocates',
    desc: 'Anyone aged 18 and above committed to advancing mental health literacy, empathy, and evidence-based support in their sphere.',
  },
]

const BENEFITS = [
  {
    title: 'Joint Verified Credential',
    desc: 'A verified digital Certificate of Completion issued jointly by the PAMHO Institute and AbelCares Initiatives Africa (ACI Africa).',
  },
  {
    title: 'PAMHO Advocate Directory',
    desc: 'Official inclusion in the public directory of certified advocates across 54 African nations and the diaspora.',
  },
  {
    title: 'Advocate Peer Community',
    desc: 'Ongoing access to the continental PAMHO Advocate network, quarterly continuing education webinars, and collaborative initiatives.',
  },
  {
    title: 'Institutional Pathway Eligibility',
    desc: 'Priority eligibility and academic progression toward forthcoming advanced and practitioner-level PAMHO Institute programmes.',
  },
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
  interested_future: true,
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
      setError('Please confirm consent to be contacted about this programme.')
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
        let msg = data.detail || data.error
        if (!msg && typeof data === 'object' && Object.keys(data).length > 0) {
          msg = Object.entries(data)
            .map(([field, errs]) => {
              const fieldName = field.replace(/_/g, ' ')
              const errStr = Array.isArray(errs) ? errs.join(' ') : String(errs)
              return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}: ${errStr}`
            })
            .join(' | ')
        }
        setError(msg || 'Unable to submit your application. Please check your information and try again.')
      }
    } catch {
      setError('A network error occurred. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen relative bg-[#030303] text-[#F5F2E9]">
      <SEO
        title="Certified Mental Health Advocate | PAMHO Institute in collaboration with ACI Africa"
        description="A five-week programme equipping emerging leaders across Africa to advance mental health awareness, reduce stigma, and connect communities to support. Founding cohort begins 23 January 2027."
      />
      <div className="grain-overlay" />

      {/* ============================================================ */}
      {/* 1. HERO - Cinematic & Institutional                           */}
      {/* ============================================================ */}
      <section className="relative pt-28 pb-16 md:pt-40 md:pb-28 border-b border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container max-w-5xl">
          <Reveal>
            <h1 className="title-hero mb-6">
              Certified Mental Health <span className="italic text-[rgba(245,242,233,0.7)]">Advocate.</span>
            </h1>

            <p className="font-serif text-2xl md:text-3xl text-[#8442FA] italic mb-10 block">
              Cohort I · January 2027
            </p>

            <p className="text-body-large text-[rgba(245,242,233,0.75)] font-light leading-relaxed max-w-3xl mb-12">
              A five-week programme equipping emerging leaders and community members across Africa with the knowledge, ethical grounding, and practical skills to advance mental health awareness, reduce stigma, and connect communities to appropriate support.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <a href="#waitlist" className="btn-cinematic !border-[#8442FA] !text-[#8442FA] hover:!text-[#030303]">
                Join the Founding Cohort Waitlist <span className="ml-3 font-serif text-xl leading-none">↓</span>
              </a>
              <a href="#curriculum" className="btn-cinematic">
                Explore Curriculum <span className="ml-3 font-serif text-xl leading-none">→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. KEY FACTS BANNER                                          */}
      {/* ============================================================ */}
      <section className="py-14 bg-[#110E0C] border-b border-[rgba(245,242,233,0.08)]">
        <div className="canvas-container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 divide-y md:divide-y-0 divide-[rgba(245,242,233,0.08)]">
            {KEY_FACTS.map((fact) => (
              <div key={fact.label} className="pt-6 md:pt-0 first:pt-0">
                <span className="label-tracking text-[#8442FA] mb-2 block">{fact.label}</span>
                <span className="font-serif text-xl md:text-2xl text-[#F5F2E9] leading-snug block">{fact.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. ABOUT THE PROGRAMME                                       */}
      {/* ============================================================ */}
      <section className="py-24 md:py-36 bg-[#030303] border-b border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
            <div className="md:col-span-5 relative">
              <Reveal className="md:sticky md:top-32">
                <span className="label-tracking text-[rgba(245,242,233,0.4)] mb-4 block">01 — The Context</span>
                <h2 className="title-section leading-[1.2] mb-8">
                  Mental health is a <span className="italic text-[#8442FA]">community</span> issue.
                </h2>

                {/* Authentic African Learner Frame */}
                <div className="aspect-[4/3] w-full overflow-hidden relative border border-[rgba(245,242,233,0.1)]">
                  <img 
                    src="/images/student_learning.jpg" 
                    alt="African student and community advocate learning online" 
                    className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8442FA]"></span>
                    <span className="label-tracking text-[#F5F2E9] text-[10px]">
                      Digital Learning Across Africa
                    </span>
                  </div>
                  <div className="absolute inset-0 border border-[rgba(245,242,233,0.08)] m-3 pointer-events-none"></div>
                </div>
              </Reveal>
            </div>

            <div className="md:col-span-7 flex flex-col justify-center">
              <Reveal delay={200}>
                <p className="text-body-large text-[rgba(245,242,233,0.8)] mb-8">
                  Mental health cannot be addressed only inside hospitals. It is a human rights, development, and community issue — and it demands informed, responsible advocates in every school, workplace, faith community, and civic institution.
                </p>
                <p className="font-sans font-light text-lg text-[rgba(245,242,233,0.6)] leading-relaxed mb-12">
                  The Certified Mental Health Advocate programme is the foundational stage of the PAMHO Institute pathway. Developed for individuals who seek to lead conversations on mental health with evidence, deep cultural empathy, and unambiguous ethical boundaries.
                </p>

                <div className="border-t border-[rgba(245,242,233,0.1)] pt-10">
                  <h4 className="font-serif text-2xl text-[#F5F2E9] mb-4">
                    AbelCares Initiatives Africa
                  </h4>
                  <p className="font-sans font-light text-base text-[rgba(245,242,233,0.6)] leading-relaxed mb-4">
                    The PAMHO Institute delivers this programme in partnership with AbelCares Initiatives Africa (ACI Africa), a continental organization championing youth mental health literacy, educational equity, and community wellbeing across East and West Africa.
                  </p>
                  <p className="font-sans font-light text-sm text-[rgba(245,242,233,0.45)] leading-relaxed">
                    Through ACI Africa’s partnership support, the Founding Cohort receives subsidised placement, making rigorous institutional training accessible to emerging leaders across the continent.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. WHO THIS PROGRAMME IS FOR                                  */}
      {/* ============================================================ */}
      <section className="py-24 md:py-36 bg-[#110E0C] border-b border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
            <div className="md:col-span-5">
              <Reveal>
                <h2 className="title-section mb-6">Designed for community leaders.</h2>
                <p className="font-sans font-light text-lg text-[rgba(245,242,233,0.6)] leading-relaxed mb-8">
                  No prior clinical training in psychology or psychiatric medicine is required. We prepare champions who work on the front lines of African society.
                </p>
                <div className="border-t border-[rgba(245,242,233,0.1)] pt-6">
                  <span className="label-tracking text-[rgba(245,242,233,0.4)] mb-3 block">Prerequisites</span>
                  <p className="font-sans font-light text-sm text-[rgba(245,242,233,0.55)] leading-relaxed">
                    Working proficiency in English, reliable internet access for live Zoom sessions, and minimum age 18.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="md:col-span-7">
              <div className="flex flex-col border-t border-[rgba(245,242,233,0.1)]">
                {WHO_FOR.map((item, idx) => (
                  <Reveal key={item.num} delay={idx * 80} className="py-8 border-b border-[rgba(245,242,233,0.1)] group">
                    <div className="grid grid-cols-12 items-baseline gap-4">
                      <span className="col-span-2 md:col-span-1 font-serif text-2xl text-[rgba(245,242,233,0.3)] group-hover:text-[#8442FA] transition-colors">
                        {item.num}
                      </span>
                      <div className="col-span-10 md:col-span-11">
                        <h3 className="font-serif text-2xl md:text-3xl text-[#F5F2E9] mb-2">{item.title}</h3>
                        <p className="font-sans font-light text-base text-[rgba(245,242,233,0.55)] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. CURRICULUM OVERVIEW                                        */}
      {/* ============================================================ */}
      <section id="curriculum" className="py-24 md:py-36 bg-[#030303] border-b border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container">
          <Reveal className="mb-20">
            <h2 className="title-section mb-6">
              Five modules. <span className="italic text-[rgba(245,242,233,0.7)]">Five weeks.</span>
            </h2>
            <p className="text-body-large text-[rgba(245,242,233,0.6)] font-light max-w-3xl">
              A carefully sequenced educational progression designed to move advocates from foundational concepts to supervised practical scenario execution.
            </p>
          </Reveal>

          <div className="flex flex-col border-t border-[rgba(245,242,233,0.1)]">
            {MODULES.map((mod, idx) => (
              <Reveal key={mod.num} delay={idx * 100} className="py-12 border-b border-[rgba(245,242,233,0.1)] group">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
                  <span className="md:col-span-2 font-serif text-3xl md:text-4xl text-[rgba(245,242,233,0.25)] group-hover:text-[#8442FA] transition-colors">
                    {mod.num}
                  </span>
                  <div className="md:col-span-4">
                    <h3 className="font-serif text-2xl md:text-3xl text-[#F5F2E9] leading-snug">
                      {mod.title}
                    </h3>
                  </div>
                  <div className="md:col-span-6">
                    <p className="font-sans font-light text-base md:text-lg text-[rgba(245,242,233,0.6)] leading-relaxed">
                      {mod.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. HOW THE PROGRAMME WORKS                                   */}
      {/* ============================================================ */}
      <section className="py-24 md:py-36 bg-[#110E0C] border-b border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
            <div className="md:col-span-5">
              <Reveal>
                <h2 className="title-section mb-6">
                  Live. Structured. <span className="italic text-[rgba(245,242,233,0.7)]">Practical.</span>
                </h2>
                <p className="font-sans font-light text-lg text-[rgba(245,242,233,0.6)] leading-relaxed">
                  Combining synchronous continental dialogue with self-paced reflection, scenario practice, and verified assessment.
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-7">
              <div className="flex flex-col border-t border-[rgba(245,242,233,0.1)]">
                {[
                  { n: '01', h: 'Five Live Virtual Sessions', b: 'One 3-hour interactive masterclass each Saturday, from 23 January to 20 February 2027 (09:00 – 12:00 UTC).' },
                  { n: '02', h: 'Self-Paced Guided Study', b: 'Approximately one hour of reading, reflection, and local resource mapping per module, completed on your own schedule.' },
                  { n: '03', h: 'Modular Knowledge Checks', b: 'Short reflective module quizzes alongside the supervised Module 5 practical advocacy evaluation.' },
                  { n: '04', h: 'Certification Requirements', b: 'Attendance at a minimum of 3 live sessions and successful completion of all module assessments.' },
                ].map((item, idx) => (
                  <Reveal key={item.n} delay={idx * 80} className="py-8 border-b border-[rgba(245,242,233,0.1)]">
                    <div className="grid grid-cols-12 items-baseline gap-4">
                      <span className="col-span-2 md:col-span-1 font-serif text-2xl text-[rgba(245,242,233,0.3)] text-[#8442FA]">
                        {item.n}
                      </span>
                      <div className="col-span-10 md:col-span-11">
                        <h4 className="font-serif text-2xl text-[#F5F2E9] mb-2">{item.h}</h4>
                        <p className="font-sans font-light text-base text-[rgba(245,242,233,0.55)] leading-relaxed">{item.b}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. CERTIFICATION & BENEFITS                                  */}
      {/* ============================================================ */}
      <section className="py-24 md:py-36 bg-[#030303] border-b border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container">
          <Reveal className="max-w-4xl mb-20">
            <h2 className="title-section mb-6">
              What certification <span className="italic text-[rgba(245,242,233,0.7)]">confers.</span>
            </h2>
            <p className="text-body-large text-[rgba(245,242,233,0.6)] font-light">
              Upon successful completion, participants receive credentialed recognition and permanent integration into the PAMHO advocacy ecosystem.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {BENEFITS.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 100}>
                <div className="border-t border-[rgba(245,242,233,0.1)] pt-8">
                  <span className="label-tracking text-[rgba(245,242,233,0.4)] mb-4 block">0{idx + 1}</span>
                  <h4 className="font-serif text-2xl md:text-3xl text-[#F5F2E9] mb-4">{item.title}</h4>
                  <p className="font-sans font-light text-base text-[rgba(245,242,233,0.6)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300} className="mt-20">
            <div className="border border-[rgba(245,242,233,0.1)] p-8 md:p-12 bg-[#110E0C]">
              <h3 className="font-serif text-2xl md:text-3xl text-[#F5F2E9] mb-4">
                Important Scope Notice
              </h3>
              <p className="font-sans font-light text-base md:text-lg text-[rgba(245,242,233,0.7)] leading-relaxed">
                This programme prepares community advocates. It does not qualify participants to practice as clinical psychologists, psychiatrists, therapists, or professional counsellors. Advocates operate within clear referral boundaries and do not provide clinical diagnosis or medical treatment.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. FACULTY & LEARNING PATHWAY                                 */}
      {/* ============================================================ */}
      <section className="py-24 md:py-36 bg-[#110E0C] border-b border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <Reveal>
              <h3 className="font-serif text-3xl md:text-4xl mb-6">Expert African Faculty</h3>
              <p className="font-sans font-light text-lg text-[rgba(245,242,233,0.6)] leading-relaxed mb-6">
                Courses are taught by seasoned African mental health clinicians, community researchers, and advocacy leaders drawn from PAMHO and ACI Africa networks.
              </p>
              <p className="font-sans font-light text-sm text-[rgba(245,242,233,0.4)] leading-relaxed">
                Full faculty biographies and guest lecturer announcements will be published ahead of official registration opening on 1 November 2026.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <span className="label-tracking text-[rgba(245,242,233,0.4)] mb-4 block">Institutional Progression</span>
              <h3 className="font-serif text-3xl md:text-4xl mb-6">The PAMHO Institute Pathway</h3>
              <p className="font-sans font-light text-lg text-[rgba(245,242,233,0.6)] leading-relaxed mb-6">
                The Certified Mental Health Advocate programme serves as the foundational stage of a comprehensive learning ladder designed to deepen your advocacy and institutional leadership.
              </p>
              <p className="font-sans font-light text-sm text-[rgba(245,242,233,0.4)] leading-relaxed">
                Future stages including practitioner-level qualifications and specialized community tracks will be announced by the PAMHO Institute.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. KEY DATES TIMELINE                                        */}
      {/* ============================================================ */}
      <section className="py-20 bg-[#030303] border-b border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container">
          <Reveal>
            <span className="label-tracking text-[#8442FA] mb-8 block">Cohort Timeline</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 border-t border-[rgba(245,242,233,0.1)] pt-8">
              {[
                { date: '1 Nov 2026', title: 'Registration Opens', desc: '48-hour priority access for waitlist' },
                { date: '10 Jan 2027', title: 'Registration Closes', desc: 'Or once 40 participants are reached' },
                { date: '23 Jan 2027', title: 'Cohort I Begins', desc: 'Live Session 1: Foundations' },
                { date: '20 Feb 2027', title: 'Practicum & Finish', desc: 'Live Session 5: Applied Practicum' },
                { date: 'March 2027', title: 'Certificates Issued', desc: 'Verified digital credentials delivered' },
              ].map((d) => (
                <div key={d.title} className="flex flex-col">
                  <span className="font-serif text-xl text-[#8442FA] mb-2">{d.date}</span>
                  <h4 className="font-serif text-lg text-[#F5F2E9] mb-1">{d.title}</h4>
                  <p className="font-sans font-light text-xs text-[rgba(245,242,233,0.45)] leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. FREQUENTLY ASKED QUESTIONS                                */}
      {/* ============================================================ */}
      <section className="py-24 md:py-36 bg-[#110E0C] border-b border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container max-w-5xl">
          <Reveal className="mb-16">
            <h2 className="title-section">Frequently Asked Questions</h2>
          </Reveal>

          <div className="flex flex-col border-t border-[rgba(245,242,233,0.1)]">
            {FAQS.map((faq, i) => (
              <div key={i} className="border-b border-[rgba(245,242,233,0.1)]">
                <button
                  type="button"
                  className="w-full flex justify-between items-baseline gap-6 py-8 text-left group"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <h4 className="font-serif text-2xl md:text-3xl text-[#F5F2E9] group-hover:text-[#8442FA] transition-colors">
                    {faq.q}
                  </h4>
                  <span className="font-serif text-2xl text-[rgba(245,242,233,0.4)] group-hover:text-[#8442FA] transition-colors shrink-0">
                    {openFaq === i ? '−' : '+'}
                  </span>
                </button>
                {openFaq === i && (
                  <Reveal>
                    <p className="font-sans font-light text-lg text-[rgba(245,242,233,0.65)] leading-relaxed pb-8 max-w-3xl">
                      {faq.a}
                    </p>
                  </Reveal>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 11. WAITLIST FORM SECTION                                     */}
      {/* ============================================================ */}
      <section id="waitlist" className="py-28 md:py-44 bg-[#030303] relative">
        <div className="canvas-container max-w-4xl">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="title-hero mb-6">
                Join the <span className="italic text-[rgba(245,242,233,0.7)]">Waitlist.</span>
              </h2>
              <p className="text-body-large text-[rgba(245,242,233,0.7)] max-w-2xl mx-auto font-light">
                Registration opens 1 November 2026. Waitlist members receive 48-hour priority access before public enrollment opens. Cohort I is strictly capped at 40 participants.
              </p>
            </div>

            {submitted ? (
              <div className="border border-[rgba(245,242,233,0.15)] p-12 md:p-20 bg-[#110E0C] text-center">
                <h3 className="title-section mb-6">You are on the waitlist for Cohort I.</h3>
                <p className="text-body-large text-[rgba(245,242,233,0.75)] max-w-2xl mx-auto mb-8 font-light leading-relaxed">
                  Thank you for applying to join the founding cohort. We will email you with your priority access link ahead of 1 November 2026.
                </p>
                <div className="flex flex-wrap justify-center gap-6 pt-4">
                  <Link to="/institute" className="btn-cinematic">
                    Explore PAMHO Institute <span className="ml-3 font-serif text-xl leading-none">→</span>
                  </Link>
                  <Link to="/about" className="btn-cinematic !border-[rgba(245,242,233,0.2)]">
                    About PAMHO
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="border border-[rgba(245,242,233,0.1)] p-8 md:p-16 bg-[#030303] flex flex-col gap-10">
                {error && (
                  <div className="border border-red-900/50 bg-red-950/20 text-red-300 p-4 font-sans font-light text-sm">
                    {error}
                  </div>
                )}

                <div className="border-b border-[rgba(245,242,233,0.1)] pb-4">
                  <span className="label-tracking text-[#8442FA]">Candidate Registration</span>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#8442FA] transition-colors pb-2">
                    <label htmlFor="full_name" className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">
                      Full Name *
                    </label>
                    <input
                      id="full_name"
                      required
                      type="text"
                      className="w-full bg-transparent font-serif text-xl md:text-2xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.2)]"
                      placeholder="e.g. Amara Okafor"
                      value={form.full_name}
                      onChange={e => set('full_name', e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#8442FA] transition-colors pb-2">
                    <label htmlFor="email" className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      required
                      type="email"
                      className="w-full bg-transparent font-serif text-xl md:text-2xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.2)]"
                      placeholder="name@organization.org"
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                    />
                  </div>
                </div>

                {/* Country & Role */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#8442FA] transition-colors pb-2">
                    <label htmlFor="country" className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">
                      Country of Residence *
                    </label>
                    <input
                      id="country"
                      required
                      type="text"
                      className="w-full bg-transparent font-serif text-xl md:text-2xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.2)]"
                      placeholder="e.g. Kenya, Nigeria, Ghana"
                      value={form.country}
                      onChange={e => set('country', e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#8442FA] transition-colors pb-2">
                    <label htmlFor="role" className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">
                      Primary Background / Role *
                    </label>
                    <select
                      id="role"
                      required
                      className="w-full bg-transparent font-serif text-xl md:text-2xl text-[#F5F2E9] focus:outline-none cursor-pointer"
                      value={form.role}
                      onChange={e => set('role', e.target.value)}
                    >
                      <option value="" className="bg-[#030303] text-[#F5F2E9]">Select your primary role...</option>
                      <option value="student" className="bg-[#030303] text-[#F5F2E9]">Student / Postgraduate</option>
                      <option value="community_leader" className="bg-[#030303] text-[#F5F2E9]">Community Organizer / Activist</option>
                      <option value="healthcare" className="bg-[#030303] text-[#F5F2E9]">Healthcare / Public Health Worker</option>
                      <option value="educator" className="bg-[#030303] text-[#F5F2E9]">Educator / Academic / Counsellor</option>
                      <option value="faith_leader" className="bg-[#030303] text-[#F5F2E9]">Faith / Pastoral Leader</option>
                      <option value="corporate_hr" className="bg-[#030303] text-[#F5F2E9]">Workplace Wellbeing / HR Professional</option>
                      <option value="other" className="bg-[#030303] text-[#F5F2E9]">Other Community Champion</option>
                    </select>
                  </div>
                </div>

                {/* WhatsApp & Organisation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#8442FA] transition-colors pb-2">
                    <label htmlFor="whatsapp" className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">
                      WhatsApp Number (Optional)
                    </label>
                    <input
                      id="whatsapp"
                      type="tel"
                      className="w-full bg-transparent font-serif text-xl md:text-2xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.2)]"
                      placeholder="+254 700 000 000"
                      value={form.whatsapp}
                      onChange={e => set('whatsapp', e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#8442FA] transition-colors pb-2">
                    <label htmlFor="organisation" className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">
                      Organization / Affiliation (Optional)
                    </label>
                    <input
                      id="organisation"
                      type="text"
                      className="w-full bg-transparent font-serif text-xl md:text-2xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.2)]"
                      placeholder="University, NGO, Company, etc."
                      value={form.organisation}
                      onChange={e => set('organisation', e.target.value)}
                    />
                  </div>
                </div>

                {/* Motivation textarea */}
                <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#8442FA] transition-colors pb-2">
                  <label htmlFor="motivation" className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">
                    Why are you interested in mental health advocacy? (Optional)
                  </label>
                  <textarea
                    id="motivation"
                    rows={2}
                    className="w-full bg-transparent font-sans font-light text-base md:text-lg text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.2)] resize-none"
                    placeholder="Briefly describe what you hope to achieve through this programme..."
                    value={form.motivation}
                    onChange={e => set('motivation', e.target.value)}
                  />
                </div>

                {/* How did you hear */}
                <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#8442FA] transition-colors pb-2">
                  <label htmlFor="heard_about" className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">
                    How did you hear about this programme? (Optional)
                  </label>
                  <select
                    id="heard_about"
                    className="w-full bg-transparent font-serif text-xl md:text-2xl text-[#F5F2E9] focus:outline-none cursor-pointer"
                    value={form.heard_about}
                    onChange={e => set('heard_about', e.target.value)}
                  >
                    <option value="" className="bg-[#030303] text-[#F5F2E9]">Select source...</option>
                    <option value="pamhc" className="bg-[#030303] text-[#F5F2E9]">Pan-African Mental Health Conversation</option>
                    <option value="social_media" className="bg-[#030303] text-[#F5F2E9]">Social Media / LinkedIn</option>
                    <option value="colleague" className="bg-[#030303] text-[#F5F2E9]">Colleague or Peer Referral</option>
                    <option value="ambassador" className="bg-[#030303] text-[#F5F2E9]">PAMHO Ambassador</option>
                    <option value="other" className="bg-[#030303] text-[#F5F2E9]">Other Channel</option>
                  </select>
                </div>

                {/* Consent & future cohorts */}
                <div className="flex flex-col gap-4 pt-2">
                  <label className="flex items-start gap-4 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 accent-[#8442FA] shrink-0"
                      checked={form.agreed_to_contact}
                      onChange={e => set('agreed_to_contact', e.target.checked)}
                    />
                    <span className="font-sans font-light text-sm text-[rgba(245,242,233,0.7)] leading-relaxed">
                      I agree to receive programme updates, registration access, and schedule communications from the PAMHO Institute and ACI Africa. *
                    </span>
                  </label>

                  <label className="flex items-start gap-4 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 accent-[#8442FA] shrink-0"
                      checked={form.interested_future}
                      onChange={e => set('interested_future', e.target.checked)}
                    />
                    <span className="font-sans font-light text-sm text-[rgba(245,242,233,0.7)] leading-relaxed">
                      Keep me informed about future cohorts and subsequent PAMHO Institute programmes.
                    </span>
                  </label>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-cinematic w-full justify-center !border-[#8442FA] !text-[#8442FA] hover:!text-[#030303]"
                  >
                    {submitting ? 'Submitting Application...' : 'Join Founding Cohort Waitlist'}
                    <span className="ml-3 font-serif text-xl leading-none">→</span>
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 12. INSTITUTIONAL CITATION & FOOTER NOTES                    */}
      {/* ============================================================ */}
      <section className="py-16 bg-[#030303] border-t border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-[rgba(245,242,233,0.05)] pb-12">
            <div>
              <span className="label-tracking text-[#8442FA] mb-2 block">Institutional Attribution</span>
              <p className="font-sans font-light text-sm text-[rgba(245,242,233,0.5)] max-w-2xl leading-relaxed">
                Offered by the Pan-African Mental Health Organization (PAMHO) Institute in academic collaboration with AbelCares Initiatives Africa (ACI Africa).
              </p>
            </div>
            <div className="flex flex-wrap gap-8 text-xs font-sans">
              <Link to="/about" className="label-tracking text-[rgba(245,242,233,0.5)] hover:text-[#F5F2E9] transition-colors">
                About PAMHO
              </Link>
              <Link to="/institute" className="label-tracking text-[rgba(245,242,233,0.5)] hover:text-[#F5F2E9] transition-colors">
                PAMHO Institute
              </Link>
              <Link to="/contact" className="label-tracking text-[rgba(245,242,233,0.5)] hover:text-[#F5F2E9] transition-colors">
                Contact & Support
              </Link>
            </div>
          </div>
          <div className="pt-8">
            <p className="font-sans font-light text-xs text-[rgba(245,242,233,0.3)]">
              &copy; {new Date().getFullYear()} Pan-African Mental Health Organization. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
