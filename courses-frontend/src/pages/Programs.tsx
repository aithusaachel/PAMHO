import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { Reveal } from '../components/Reveal'

export default function Programs() {
  const [programs, setPrograms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch('/api/v1/programs/')
        if (res.ok) {
          const data = await res.json()
          const fetchedPrograms = data.results || data || []
          
          const adjustedPrograms = fetchedPrograms.map((p: any) => {
            if (p.title && p.title.toLowerCase().includes('conversation')) {
              return { ...p, event_state: 'live', is_zoom_event: true }
            }
            return p
          })

          setPrograms(adjustedPrograms)
        }
      } catch (err) {
        console.error(err)
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
  const pastPrograms = programs.filter(p => p.event_state === 'past')

  return (
    <div className="flex flex-col min-h-screen relative bg-[#030303]">
      <SEO title="Programs & Initiatives | PAMHO" />
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
              From targeted grassroots advocacy to our flagship Pan-African Mental Health Conversation, our programming is designed to create measurable, localized progress across the continent.
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
              <h2 className="title-section">The Current Slate</h2>
              <span className="label-tracking hidden md:block">Active & Upcoming</span>
            </div>
          </Reveal>

          {loading ? (
            <div className="py-24 text-center">
              <span className="font-serif text-2xl text-[rgba(245,242,233,0.4)] italic">Loading programs...</span>
            </div>
          ) : activePrograms.length > 0 ? (
            <div className="flex flex-col">
              {activePrograms.map((program, idx) => (
                <Reveal key={program.id} delay={idx * 150} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 py-16 border-b border-[rgba(245,242,233,0.08)] group hover:bg-[rgba(245,242,233,0.02)] transition-colors">
                  
                  <div className="md:col-span-3 flex flex-col gap-4">
                    {program.event_state === 'live' ? (
                      <div className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-[#8442FA] rounded-full animate-pulse"></span>
                        <span className="label-tracking !text-[#8442FA]">Live Session</span>
                      </div>
                    ) : (
                      <span className="label-tracking">Upcoming</span>
                    )}
                    <span className="font-serif text-xl text-[rgba(245,242,233,0.4)]">
                      {formatDate(program.start_time)}
                    </span>
                  </div>

                  <div className="md:col-span-6">
                    <h3 className="font-serif text-4xl md:text-5xl mb-6 group-hover:text-[#8442FA] transition-colors">
                      {program.title}
                    </h3>
                    <p className="font-sans font-light text-[rgba(245,242,233,0.6)] leading-relaxed text-lg">
                      {program.description}
                    </p>
                  </div>

                  <div className="md:col-span-3 flex md:justify-end items-start pt-2">
                    {program.event_state === 'live' && program.is_zoom_event ? (
                      <Link to="/programs/live" className="btn-cinematic !border-[#8442FA] !text-[#8442FA] hover:!text-[#030303]">
                        Join Live
                      </Link>
                    ) : (
                      <span className="label-tracking text-[rgba(245,242,233,0.3)]">
                        Registration Pending
                      </span>
                    )}
                  </div>

                </Reveal>
              ))}
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
      {/* 3. THE ARCHIVE                                               */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 bg-[#030303]">
        <div className="canvas-container">
          <Reveal>
            <div className="flex justify-between items-end border-b border-[rgba(245,242,233,0.15)] pb-8 mb-16">
              <h2 className="title-section">The Archive</h2>
              <span className="label-tracking hidden md:block">Historical Initiatives</span>
            </div>
          </Reveal>
          
          {loading ? (
            null
          ) : pastPrograms.length > 0 ? (
            <div className="flex flex-col">
              {pastPrograms.map((program, idx) => (
                <Reveal key={program.id} delay={idx * 100} className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-[rgba(245,242,233,0.05)] group">
                  <div className="md:col-span-3">
                    <span className="label-tracking text-[rgba(245,242,233,0.3)]">
                      {formatMonthYear(program.start_time)}
                    </span>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="font-serif text-3xl mb-4 text-[rgba(245,242,233,0.8)] group-hover:text-[#F5F2E9] transition-colors">{program.title}</h3>
                    <p className="font-sans font-light text-[rgba(245,242,233,0.5)] leading-relaxed text-base max-w-3xl">
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
