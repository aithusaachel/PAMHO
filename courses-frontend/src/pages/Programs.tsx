import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { Reveal } from '../components/Reveal'

interface ProgramItem {
  id: string | number
  title: string
  slug?: string
  description: string
  event_state: 'live' | 'upcoming' | 'completed' | 'past'
  scheduled_start?: string
  scheduled_end?: string
  start_time?: string
  is_zoom_event?: boolean
  badge?: string
  custom_link?: string
  custom_cta?: string
}

const ACTIVE_FEATURED_PROGRAM: ProgramItem = {
  id: 'cmha-active-programme',
  title: 'Certified Mental Health Advocate',
  slug: 'certified-mental-health-advocate',
  description: 'A five-week foundational programme equipping emerging leaders and community members across Africa with the knowledge, ethical grounding, and practical skills to advance mental health awareness, reduce stigma, and connect communities to appropriate support. Delivered by the PAMHO Institute in collaboration with ACI Africa.',
  event_state: 'upcoming',
  scheduled_start: '2027-01-23T09:00:00Z',
  scheduled_end: '2027-02-20T12:00:00Z',
  badge: 'Cohort I · Registration Opens 1 Nov 2026',
  custom_link: '/institute/courses/certified-mental-health-advocate',
  custom_cta: 'View Programme & Waitlist',
}

const INAUGURAL_CONVERSATION_ARCHIVE: ProgramItem = {
  id: 'pamhc-inaugural-concluded',
  title: 'The Pan-African Mental Health Conversation',
  slug: 'pan-african-mental-health-conversation',
  description: 'Successfully convened on 10 October 2026 (World Mental Health Day). A landmark inaugural continental dialogue uniting clinical professionals, grassroots advocates, researchers, youth champions, and policymakers across 54 African nations and the diaspora.',
  event_state: 'past',
  scheduled_start: '2026-10-10T16:00:00Z',
  scheduled_end: '2026-10-10T18:00:00Z',
  badge: 'Successfully Concluded · 10 October 2026',
}

export default function Programs() {
  const [programs, setPrograms] = useState<ProgramItem[]>([
    ACTIVE_FEATURED_PROGRAM,
    INAUGURAL_CONVERSATION_ARCHIVE
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch('/api/v1/programs/')
        if (res.ok) {
          const data = await res.json()
          const fetchedPrograms = data.results || data || []

          const normalized = fetchedPrograms.map((p: any) => {
            // The Pan-African Mental Health Conversation occurred on 10 October 2026 and is now completed
            if (p.title && p.title.toLowerCase().includes('conversation')) {
              return {
                ...p,
                event_state: 'past',
                is_zoom_event: false,
                badge: 'Successfully Concluded · 10 October 2026',
                description: p.description || INAUGURAL_CONVERSATION_ARCHIVE.description
              }
            }
            return p
          })

          // Merge active featured course if not already present
          const hasCourse = normalized.some((p: any) => p.slug === ACTIVE_FEATURED_PROGRAM.slug)
          const hasArchive = normalized.some((p: any) => p.title?.toLowerCase().includes('conversation'))

          let combined = normalized
          if (!hasCourse) {
            combined = [ACTIVE_FEATURED_PROGRAM, ...combined]
          }
          if (!hasArchive) {
            combined = [...combined, INAUGURAL_CONVERSATION_ARCHIVE]
          }

          setPrograms(combined)
        }
      } catch (err) {
        console.error('Failed to fetch programs from API', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPrograms()
  }, [])

  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return ''
    const d = new Date(dateString)
    if (isNaN(d.getTime())) return ''
    return d.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
  }

  const formatMonthYear = (dateString: string | undefined | null) => {
    if (!dateString) return ''
    const d = new Date(dateString)
    if (isNaN(d.getTime())) return ''
    return d.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
  }

  const activePrograms = programs.filter(p => p.event_state === 'live' || p.event_state === 'upcoming')
  const pastPrograms = programs.filter(p => p.event_state === 'past' || p.event_state === 'completed')

  return (
    <div className="flex flex-col min-h-screen relative bg-[#030303] text-[#F5F2E9]">
      <SEO
        title="Programs & Initiatives | PAMHO"
        description="Explore active continental programmes and historical initiatives by the Pan-African Mental Health Organization."
      />
      <div className="grain-overlay"></div>

      {/* ============================================================ */}
      {/* 1. THE OPENING                                               */}
      {/* ============================================================ */}
      <section className="pt-48 pb-24 md:pt-64 md:pb-32 border-b border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container text-center flex flex-col items-center">
          <Reveal>
            <span className="label-tracking text-[#8442FA] mb-8 block">Initiatives & Action</span>
            <h1 className="title-hero max-w-5xl mx-auto mb-12">
              Translating dialogue into <span className="italic text-[rgba(245,242,233,0.7)]">structural impact.</span>
            </h1>
            <p className="text-body-large text-[rgba(245,242,233,0.6)] max-w-3xl mx-auto">
              From our foundational Certified Mental Health Advocate curriculum to continental dialogues, our programming is designed to create measurable, localized progress across Africa.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. ACTIVE INITIATIVES                                        */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 bg-[#110E0C]">
        <div className="canvas-container">
          <Reveal>
            <div className="flex justify-between items-end border-b border-[rgba(245,242,233,0.15)] pb-8 mb-16">
              <div>
                <span className="label-tracking text-[#8442FA] mb-2 block">Current Slate</span>
                <h2 className="title-section">Active & Upcoming</h2>
              </div>
              <span className="label-tracking hidden md:block">Continental Delivery</span>
            </div>
          </Reveal>

          {loading ? (
            <div className="py-24 text-center">
              <span className="font-serif text-2xl text-[rgba(245,242,233,0.4)] italic">Loading programs...</span>
            </div>
          ) : activePrograms.length > 0 ? (
            <div className="flex flex-col">
              {activePrograms.map((program, idx) => {
                const dateDisplay = formatDate(program.scheduled_start || program.start_time)
                return (
                  <Reveal key={program.id} delay={idx * 150} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 py-16 border-b border-[rgba(245,242,233,0.08)] group hover:bg-[rgba(245,242,233,0.02)] transition-colors">

                    <div className="md:col-span-3 flex flex-col gap-4">
                      {program.event_state === 'live' ? (
                        <div className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 bg-[#8442FA] rounded-full animate-pulse"></span>
                          <span className="label-tracking !text-[#8442FA]">Live Session</span>
                        </div>
                      ) : (
                        <span className="label-tracking !text-[#8442FA]">
                          {program.badge || 'Upcoming Cohort'}
                        </span>
                      )}
                      <span className="font-serif text-xl text-[rgba(245,242,233,0.4)]">
                        {dateDisplay || 'Starts 23 January 2027'}
                      </span>
                    </div>

                    <div className="md:col-span-6">
                      <h3 className="font-serif text-3xl md:text-4xl mb-6 group-hover:text-[#8442FA] transition-colors">
                        {program.title}
                      </h3>
                      <p className="font-sans font-light text-[rgba(245,242,233,0.6)] leading-relaxed text-lg">
                        {program.description}
                      </p>
                    </div>

                    <div className="md:col-span-3 flex md:justify-end items-start pt-2">
                      {program.custom_link ? (
                        <Link
                          to={program.custom_link}
                          className="btn-cinematic !border-[#8442FA] !text-[#8442FA] hover:!text-[#030303]"
                        >
                          {program.custom_cta || 'View Details'} <span className="ml-3 font-serif text-xl leading-none">→</span>
                        </Link>
                      ) : program.event_state === 'live' && program.is_zoom_event ? (
                        <Link to="/programs/live" className="btn-cinematic !border-[#8442FA] !text-[#8442FA] hover:!text-[#030303]">
                          Join Live
                        </Link>
                      ) : (
                        <span className="label-tracking text-[rgba(245,242,233,0.4)]">
                          Registration Opens 1 Nov
                        </span>
                      )}
                    </div>

                  </Reveal>
                )
              })}
            </div>
          ) : (
            <Reveal>
              <div className="py-24 text-center border border-[rgba(245,242,233,0.05)] bg-[#030303]">
                <p className="font-serif text-2xl text-[rgba(245,242,233,0.4)] italic">No active or upcoming programs are currently scheduled. Please check the archive.</p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. THE ARCHIVE - Concluded Continental Initiatives          */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 bg-[#030303]">
        <div className="canvas-container">
          <Reveal>
            <div className="flex justify-between items-end border-b border-[rgba(245,242,233,0.15)] pb-8 mb-16">
              <div>
                <span className="label-tracking text-[#8442FA] mb-2 block">Heritage & Milestones</span>
                <h2 className="title-section">The Archive</h2>
              </div>
              <span className="label-tracking hidden md:block">Concluded Initiatives</span>
            </div>
          </Reveal>

          {loading ? null : pastPrograms.length > 0 ? (
            <div className="flex flex-col">
              {pastPrograms.map((program, idx) => (
                <Reveal key={program.id || idx} delay={idx * 100} className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-[rgba(245,242,233,0.05)] group">
                  <div className="md:col-span-3 flex flex-col gap-2">
                    <span className="label-tracking text-[rgba(245,242,233,0.3)]">
                      {formatMonthYear(program.scheduled_start || program.start_time) || 'October 2026'}
                    </span>
                    <span className="label-tracking text-[#8442FA] text-[10px]">
                      Concluded
                    </span>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="font-serif text-3xl mb-4 text-[rgba(245,242,233,0.9)] group-hover:text-[#F5F2E9] transition-colors">
                      {program.title}
                    </h3>
                    <p className="font-sans font-light text-[rgba(245,242,233,0.55)] leading-relaxed text-base max-w-3xl">
                      {program.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <p className="font-serif text-xl text-[rgba(245,242,233,0.3)] italic">The program archive is currently empty.</p>
            </Reveal>
          )}
        </div>
      </section>

    </div>
  )
}
