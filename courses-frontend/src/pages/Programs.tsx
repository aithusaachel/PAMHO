import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

// ============================================================================
// ZOOM / LIVE PROGRAM CONFIGURATION
//
// This data is fetched from the Django REST API via:
// GET /api/v1/programs/
// ============================================================================

export default function Programs() {
  const container = 'w-full max-w-[1536px] mx-auto px-6 sm:px-12 lg:px-20'
  
  const [programs, setPrograms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch('/api/v1/programs/')
        if (res.ok) {
          const data = await res.json()
          setPrograms(data.results || data || [])
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPrograms()
  }, [])

  // Helper to format date nicely
  const formatDate = (isoStr: string) => {
    if (!isoStr) return ''
    try {
      const d = new Date(isoStr)
      return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
    } catch {
      return isoStr
    }
  }

  const formatTime = (isoStr: string) => {
    if (!isoStr) return ''
    try {
      const d = new Date(isoStr)
      return d.getUTCHours().toString().padStart(2, '0') + ':' + d.getUTCMinutes().toString().padStart(2, '0')
    } catch {
      return ''
    }
  }

  const liveProgram = programs.find((p: any) => p.event_state === 'live')
  const upcomingPrograms = programs.filter((p: any) => p.event_state === 'upcoming')
  const upcomingProgram = upcomingPrograms.length > 0 ? upcomingPrograms[0] : null
  const pastPrograms = programs.filter((p: any) => ['completed', 'completed_with_recording', 'archived'].includes(p.event_state))

  if (loading) {
    return (
      <div className="flex flex-col bg-[#0a0a0c] min-h-screen items-center justify-center">
        <div className="text-gray-400">Loading programs...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-[#0a0a0c]">
      <SEO title="PAMHO | Programs & Events" description="Participate in the continental conversation through PAMHO's live discussions, workshops, and advocacy programs." />
      {/* ============================================================ */}
      {/* ACTIVE HERO                                                  */}
      {/* ============================================================ */}
      <section className={`pt-48 pb-32 ${container} relative`}>
        <div className="absolute top-0 right-0 w-2/3 h-[600px] bg-gradient-to-bl from-[#140b1e] via-[#0a0a0c] to-transparent pointer-events-none -z-10"></div>
        
        <div className="max-w-5xl relative z-10">
          <div className="tag-outline self-start mb-8 text-[#b48aff] border-[#8442fa]/30 uppercase tracking-widest inline-block">
            Programs & Events
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#f4f2ee] tracking-tight leading-[1.05] mb-10">
            Participate in the <br className="hidden md:block" /> continental conversation.
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-3xl mb-12">
            Join live discussions, attend workshops, and access previous event recordings. This is the public programming hub for PAMHO's ongoing initiatives across Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <a href="#upcoming" className="btn-primary text-sm font-bold px-8 py-4 rounded-sm shadow-[0_4px_20px_-5px_rgba(132,66,250,0.4)]">
              Discover Upcoming
            </a>
            <a href="#past" className="text-sm font-medium text-gray-400 hover:text-[#b48aff] transition-colors flex items-center">
              Watch Past Recordings &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* LIVE NOW SECTION                                             */}
      {/* ============================================================ */}
      <section className={`py-20 ${container} border-t border-[#8442fa]/10`}>
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h2 className="text-[11px] uppercase tracking-widest text-[#ef4444] font-bold mb-4 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full bg-[#ef4444] ${liveProgram ? 'animate-pulse' : ''}`}></span>
              Live Now
            </h2>
            <h3 className="text-3xl font-bold text-[#f4f2ee]">Current Broadcasts</h3>
          </div>
        </div>

        {liveProgram ? (
          // ACTIVE LIVE PROGRAM STATE
          // The SDK opens in a new tab for a fully immersive experience.
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[#8442fa]/40 rounded-sm overflow-hidden bg-[#140b1e] shadow-[0_0_80px_rgba(132,66,250,0.15)]">
            <div className="lg:col-span-7 p-10 md:p-16 flex flex-col justify-center">
              <div className="text-[11px] font-mono text-[#b48aff] uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] animate-pulse"></span>
                In Progress
              </div>
              <h4 className="text-3xl md:text-4xl font-bold text-[#f4f2ee] mb-6">
                {liveProgram.title}
              </h4>
              <p className="text-lg text-gray-300 leading-relaxed font-light mb-8">
                {liveProgram.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-8 mb-10 text-sm text-gray-400 font-mono">
                <div>
                  <div className="text-gray-500 mb-1 uppercase text-[10px]">Date</div>
                  <div className="text-[#f4f2ee]">{formatDate(liveProgram.scheduled_start)}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1 uppercase text-[10px]">Time</div>
                  <div className="text-[#f4f2ee]">{formatTime(liveProgram.scheduled_start)} — {formatTime(liveProgram.scheduled_end)} ({liveProgram.timezone})</div>
                </div>
              </div>

              <Link 
                to="/programs/live" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary self-start text-sm font-bold px-10 py-5 rounded-sm shadow-[0_4px_24px_-4px_rgba(132,66,250,0.6)] flex items-center gap-3"
              >
                Join Full-Screen Live Session
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </Link>
            </div>
            
            <div className="lg:col-span-5 bg-[#0a0a0c] border-l border-[#8442fa]/20 p-10 flex flex-col justify-center items-center relative min-h-[400px]">
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(rgba(132, 66, 250, 0.4) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
               
               <div className="w-full max-w-sm bg-[#111115] border border-[#8442fa]/30 rounded-sm p-8 shadow-2xl relative z-10 text-center">
                  <div className="w-16 h-16 mx-auto bg-[#140b1e] border border-[#8442fa]/40 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-[#b48aff]" fill="currentColor" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
                  </div>
                  
                  <h5 className="text-[#f4f2ee] font-bold text-lg mb-2">Immersive Viewer</h5>
                  <p className="text-[13px] text-gray-400 mt-4 leading-relaxed">
                    The live session will open in a dedicated tab to provide the best possible viewing experience without distractions.
                  </p>
                  
               </div>
            </div>
          </div>
        ) : (
          // EMPTY STATE (No active live programs)
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[#8442fa]/20 rounded-sm overflow-hidden bg-[#111115]">
            <div className="lg:col-span-12 p-10 md:p-16 flex flex-col justify-center items-center text-center relative overflow-hidden">
               <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#f4f2ee 1px, transparent 1px), linear-gradient(90deg, #f4f2ee 1px, transparent 1px)', backgroundSize: '64px 64px' }}></div>
               <div className="relative z-10 flex flex-col items-center">
                 <div className="w-16 h-16 rounded-full border border-[#8442fa]/20 bg-[#140b1e] flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-[#8442fa]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                 </div>
                 <h4 className="text-2xl font-bold text-[#f4f2ee] mb-4">No active live programs.</h4>
                 <p className="text-lg text-gray-400 leading-relaxed font-light max-w-2xl">
                   When a public workshop, live discussion, or webinar is currently streaming, you will be able to join directly from this page.
                 </p>
               </div>
            </div>
          </div>
        )}
      </section>

      {/* ============================================================ */}
      {/* UPCOMING PROGRAMS                                            */}
      {/* ============================================================ */}
      <section id="upcoming" className={`py-32 ${container} bg-[#111115]`}>
        <div className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-4">Schedule</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-[#f4f2ee] tracking-tight">Upcoming Programs</h3>
          </div>
          <div className="text-sm text-gray-500 font-mono uppercase tracking-widest">
            Discover
          </div>
        </div>

        {upcomingProgram ? (
          <div className="w-full bg-[#140b1e] border border-[#8442fa]/20 rounded-sm p-10 md:p-16 shadow-[0_0_40px_rgba(132,66,250,0.05)]">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-8">
              <div className="md:w-2/3">
                <div className="tag-outline text-[#b48aff] border-[#8442fa]/30 mb-4 inline-block">Scheduled</div>
                <h4 className="text-3xl font-bold text-[#f4f2ee] mb-4">{upcomingProgram.title}</h4>
                <p className="text-gray-400 text-lg leading-relaxed">{upcomingProgram.description}</p>
              </div>
              <div className="md:w-1/3 md:text-right border-t md:border-t-0 md:border-l border-[#8442fa]/20 pt-8 md:pt-0 md:pl-12">
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Date</div>
                <div className="text-xl font-bold text-[#f4f2ee] mb-4">{formatDate(upcomingProgram.scheduled_start)}</div>
                
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Time</div>
                <div className="text-[#f4f2ee] font-mono mb-6">{formatTime(upcomingProgram.scheduled_start)} — {formatTime(upcomingProgram.scheduled_end)} ({upcomingProgram.timezone})</div>
                
                <div className="text-sm text-[#b48aff] font-semibold flex items-center md:justify-end gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Join when live
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full bg-[#140b1e] border border-[#8442fa]/10 rounded-sm p-16 md:p-24 flex flex-col items-center justify-center text-center">
             <div className="w-16 h-16 rounded-full border border-[#8442fa]/20 bg-[#0a0a0c] flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#8442fa]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
             </div>
             <h4 className="text-2xl font-bold text-[#f4f2ee] mb-4">Programs will appear here as they are officially announced.</h4>
             <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
               Upcoming campaigns, regional workshops, and public conversations are currently being planned. Check back for registration details.
             </p>
          </div>
        )}
      </section>

      {/* ============================================================ */}
      {/* PAST PROGRAMS & RECORDINGS                                   */}
      {/* ============================================================ */}
      <section id="past" className={`py-32 ${container} bg-[#0a0a0c] border-t border-[#8442fa]/10`}>
        <div className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-4">Archive</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-[#f4f2ee] tracking-tight">Past Programs</h3>
          </div>
          <div className="text-sm text-gray-500 font-mono uppercase tracking-widest">
            Watch
          </div>
        </div>

        {pastPrograms.length > 0 ? (
          <div className="space-y-6">
            {pastPrograms.map((p: any) => (
              <div key={p.id} className="w-full bg-[#111115] border border-[#8442fa]/20 rounded-sm p-10 md:p-16">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-8">
                  <div className="md:w-2/3">
                    <div className="tag-outline text-gray-400 border-white/10 mb-4 inline-block">Completed</div>
                    <h4 className="text-3xl font-bold text-[#f4f2ee] mb-4">{p.title}</h4>
                    <p className="text-gray-400 text-lg leading-relaxed mb-6">{p.description}</p>
                    <div className="text-sm text-gray-500 font-mono">{formatDate(p.scheduled_start)}</div>
                  </div>
                  <div className="md:w-1/3 md:text-right flex flex-col items-start md:items-end">
                    {p.event_state === 'completed_with_recording' ? (
                      <a 
                        href="#" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-secondary px-8 py-4 text-sm font-bold rounded-sm flex items-center gap-3"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        Watch Recording
                      </a>
                    ) : (
                      <div className="px-6 py-3 border border-white/10 text-gray-500 text-sm font-mono rounded-sm bg-white/5">
                        No recording available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full bg-[#111115] border border-[#8442fa]/10 rounded-sm p-16 md:p-24 flex flex-col items-center justify-center text-center">
             <div className="w-16 h-16 rounded-full border border-[#8442fa]/20 bg-[#140b1e] flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#8442fa]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
             <h4 className="text-2xl font-bold text-[#f4f2ee] mb-4">The archive is being built.</h4>
             <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
               When recordings from completed programs are published, they will be accessible here for the public to watch and share.
             </p>
          </div>
        )}
      </section>

      {/* ============================================================ */}
      {/* CTA                                                          */}
      {/* ============================================================ */}
      <section className={`py-40 ${container} text-center relative overflow-hidden bg-[#1a1025] border-t border-[#8442fa]/30`}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        
        <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-6 relative z-10">Stay Informed</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-[#f4f2ee] tracking-tight mb-8 relative z-10">Join the network.</h3>
        <p className="text-[#b48aff] text-lg max-w-xl mx-auto mb-12 relative z-10 font-medium">
          Receive updates when new programs are scheduled, registrations open, or recordings are published.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
          <Link to="/membership" className="btn-primary text-sm font-bold px-10 py-4 rounded-sm shadow-[0_4px_24px_-4px_rgba(132,66,250,0.5)]">Become a Member</Link>
        </div>
      </section>

    </div>
  )
}
