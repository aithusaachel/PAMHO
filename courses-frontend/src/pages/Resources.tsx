import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { Reveal } from '../components/Reveal'

export default function Resources() {
  const [resources, setResources] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch('/api/v1/resources/')
        if (res.ok) {
          const data = await res.json()
          setResources(data.results || data || [])
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchResources()
  }, [])

  return (
    <div className="flex flex-col min-h-screen relative bg-[#030303]">
      <SEO title="Resources & News | PAMHO" />
      <div className="grain-overlay"></div>

      {/* ============================================================ */}
      {/* 1. THE OPENING                                               */}
      {/* ============================================================ */}
      <section className="pt-48 pb-16 md:pt-64 md:pb-32 border-b border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container max-w-5xl text-center flex flex-col items-center">
          <Reveal>
            <span className="label-tracking text-[#D1893D] mb-8 block">Editorial Archive</span>
            <h1 className="title-hero mb-8">
              Insights and <span className="italic text-[rgba(245,242,233,0.7)]">publications.</span>
            </h1>
            <p className="text-body-large text-[rgba(245,242,233,0.6)] font-light leading-relaxed max-w-2xl mx-auto">
              An editorial collection of mental health research, organizational updates, and strategic resources designed for the African context.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. THE PUBLICATIONS LIST                                     */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 bg-[#110E0C]">
        <div className="canvas-container">
          
          <Reveal>
            <div className="flex justify-between items-end border-b border-[rgba(245,242,233,0.15)] pb-8 mb-16">
              <h2 className="title-section">The Index</h2>
              <span className="label-tracking hidden md:block">Current Publications</span>
            </div>
          </Reveal>

          {loading ? (
            <div className="py-24 text-center">
              <span className="font-serif text-2xl text-[rgba(245,242,233,0.4)] italic">Retrieving documents...</span>
            </div>
          ) : resources.length > 0 ? (
            <div className="flex flex-col">
              {resources.map((resource, idx) => (
                <Reveal key={resource.id} delay={idx * 100} className="grid grid-cols-1 md:grid-cols-12 gap-8 py-16 border-b border-[rgba(245,242,233,0.05)] group hover:bg-[rgba(245,242,233,0.02)] transition-colors">
                  
                  <div className="md:col-span-3 flex flex-col gap-4">
                    <span className="label-tracking text-[#D1893D]">
                      {resource.category || 'Article'}
                    </span>
                    <span className="font-serif text-lg text-[rgba(245,242,233,0.3)]">
                      {resource.created_at ? new Date(resource.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long' }) : 'Archive'}
                    </span>
                  </div>

                  <div className="md:col-span-7">
                    <Link to={`/resources/${resource.slug}`} className="block">
                      <h3 className="font-serif text-3xl md:text-4xl mb-6 text-[rgba(245,242,233,0.9)] group-hover:text-[#F5F2E9] transition-colors leading-tight">
                        {resource.title}
                      </h3>
                      <p className="font-sans font-light text-[rgba(245,242,233,0.5)] leading-relaxed text-lg max-w-3xl line-clamp-3">
                        {resource.summary || 'Open document to read the full resource and learn more about this topic.'}
                      </p>
                    </Link>
                  </div>

                  <div className="md:col-span-2 flex md:justify-end items-start pt-2">
                    <Link to={`/resources/${resource.slug}`} className="label-tracking text-[#D1893D] hover:text-[#F5F2E9] flex items-center gap-4 transition-colors">
                      Read <span className="w-8 h-[1px] bg-current block"></span>
                    </Link>
                  </div>

                </Reveal>
              ))}
            </div>
          ) : (
             <Reveal>
              <div className="py-24 text-center border border-[rgba(245,242,233,0.05)] bg-[#030303]">
                <h3 className="font-serif text-3xl mb-4">The library is undergoing maintenance.</h3>
                <p className="font-serif text-xl text-[rgba(245,242,233,0.4)] italic">Check back shortly for newly declassified publications.</p>
              </div>
            </Reveal>
          )}

        </div>
      </section>

    </div>
  )
}
