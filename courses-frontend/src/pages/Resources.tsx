import { useEffect, useState } from 'react';
import SEO from '../components/SEO';

export default function Resources() {
  const container = 'w-full max-w-[1536px] mx-auto px-6 sm:px-12 lg:px-20'
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch('/api/v1/resources/');
        if (!res.ok) throw new Error('Failed to fetch resources');
        const data = await res.json();
        setResources(data.results || data || []);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  return (
    <div className="flex flex-col bg-[#0a0a0c]">
      <SEO title="PAMHO | Resources & News" description="Explore PAMHO's knowledge repository of articles, reports, and institutional updates." />
      {/* ============================================================ */}
      {/* EDITORIAL HERO                                               */}
      {/* ============================================================ */}
      <section className={`pt-48 pb-32 ${container} relative`}>
        {/* Abstract Editorial Motif */}
        <div className="absolute top-1/4 right-0 md:right-1/4 w-[400px] h-[400px] bg-[#140b1e] blur-[150px] rounded-full pointer-events-none -z-10"></div>
        
        <div className="max-w-4xl relative z-10">
          <div className="tag-outline self-start mb-8 text-[#b48aff] border-[#8442fa]/30 uppercase tracking-widest inline-block">
            Resources & News
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#f4f2ee] tracking-tight leading-[1.05] mb-10">
            Knowledge that moves <br className="hidden md:block"/> the conversation forward.
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-3xl mb-12">
            PAMHO does not only act; we synthesize, document, and share insights. This is the public knowledge layer for evidence-based research, community stories, and institutional updates.
          </p>
        </div>
        
        {/* Subtle scroll indicator */}
        <div className="mt-16 w-px h-16 bg-gradient-to-b from-[#8442fa]/40 to-transparent"></div>
      </section>

      {/* ============================================================ */}
      {/* THE LIBRARY (Dynamic Content)                                */}
      {/* ============================================================ */}
      <section className={`py-40 ${container} bg-[#111115] border-y border-[#8442fa]/10`}>
        <div className="text-center mb-16">
          <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-4">Featured Collection</h2>
          <h3 className="text-3xl font-bold text-[#f4f2ee]">The Library</h3>
        </div>

        {loading ? (
          <div className="text-center text-neutral-500 py-12">Loading resources...</div>
        ) : error ? (
          <div className="text-center text-[#ef4444] py-12">Failed to load resources. Please try again later.</div>
        ) : resources.length === 0 ? (
          <div className="w-full max-w-5xl mx-auto border border-[#8442fa]/20 bg-[#140b1e] rounded-sm flex flex-col md:flex-row relative overflow-hidden shadow-[0_0_50px_rgba(132,66,250,0.05)]">
             <div className="w-full md:w-2/5 border-b md:border-b-0 md:border-r border-[#8442fa]/20 bg-[#1a1025] flex items-center justify-center p-16 relative">
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#8442fa 1px, transparent 1px), linear-gradient(90deg, #8442fa 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                <div className="w-24 h-32 border border-[#8442fa]/30 bg-[#111115] flex flex-col justify-between p-3 relative z-10 shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-700">
                   <div className="w-full h-1 bg-[#8442fa]/20 mb-2"></div>
                   <div className="w-3/4 h-1 bg-[#8442fa]/20 mb-auto"></div>
                   <div className="w-1/2 h-1 bg-[#8442fa]/40"></div>
                </div>
             </div>
             <div className="w-full md:w-3/5 p-12 md:p-16 flex flex-col justify-center">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#8442fa]/70 mb-6">Editorial Notice</div>
                <h4 className="text-2xl md:text-3xl font-bold text-[#f4f2ee] mb-6 leading-tight">A growing collection of institutional knowledge.</h4>
                <p className="text-gray-400 text-lg leading-relaxed font-light">PAMHO's public knowledge repository will grow here as verified articles, reports, and institutional news are officially published.</p>
             </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((res: any) => {
              const isExternal = !!res.external_url;
              const linkProps = isExternal 
                ? { href: res.external_url, target: "_blank", rel: "noopener noreferrer" }
                : { href: `/resources/${res.slug}` };

              return (
                <a key={res.id} {...linkProps} className="group block border border-[#8442fa]/20 bg-[#140b1e] hover:bg-[#1a1025] rounded-sm relative overflow-hidden transition-colors flex flex-col min-h-[300px]">
                  <div className="p-8 flex flex-col h-full">
                    <div className="text-[11px] font-mono uppercase tracking-widest text-[#8442fa]/70 mb-4">
                      {res.resource_type.replace('_', ' ')}
                    </div>
                    <h4 className="text-xl font-bold text-[#f4f2ee] mb-4 group-hover:text-[#b48aff] transition-colors">{res.title}</h4>
                    <p className="text-gray-400 font-light leading-relaxed mb-8 flex-grow">{res.excerpt}</p>
                    
                    <div className="flex items-center text-[#b48aff] font-mono text-xs uppercase tracking-widest mt-auto">
                      <span>{isExternal ? 'Visit Link' : 'Read More'}</span>
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </section>

      {/* ============================================================ */}
      {/* CONTENT TAXONOMY                                             */}
      {/* ============================================================ */}
      <section className={`py-40 ${container} bg-[#0a0a0c]`}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-[#8442fa]/10 pb-12 lg:pb-0 lg:pr-12 flex flex-col justify-between">
              <h3 className="text-2xl font-bold text-[#f4f2ee] mb-6">Knowledge Architecture</h3>
              <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
                 The structure of our upcoming publications.
              </p>
           </div>
           
           <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-12 lg:pl-12 pt-8 lg:pt-0">
              <div className="rule-top pt-6 border-[#8442fa]/10">
                 <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#b48aff] mb-3">01</h4>
                 <h5 className="text-xl font-bold text-[#f4f2ee] mb-3">Articles & Perspectives</h5>
                 <p className="text-gray-400 font-light leading-relaxed">
                   Insights from professionals and advocates on the ground, connecting clinical evidence with lived experience.
                 </p>
              </div>
              <div className="rule-top pt-6 border-[#8442fa]/10">
                 <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#b48aff] mb-3">02</h4>
                 <h5 className="text-xl font-bold text-[#f4f2ee] mb-3">Reports & Publications</h5>
                 <p className="text-gray-400 font-light leading-relaxed">
                   Structured institutional documents, research syntheses, and strategic frameworks for mental health development.
                 </p>
              </div>
              <div className="rule-top pt-6 border-[#8442fa]/10">
                 <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#b48aff] mb-3">03</h4>
                 <h5 className="text-xl font-bold text-[#f4f2ee] mb-3">Public Resources</h5>
                 <p className="text-gray-400 font-light leading-relaxed">
                   Accessible tools, educational materials, and advocacy kits designed to be utilized directly by communities.
                 </p>
              </div>
              <div className="rule-top pt-6 border-[#8442fa]/10">
                 <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#b48aff] mb-3">04</h4>
                 <h5 className="text-xl font-bold text-[#f4f2ee] mb-3">Institutional News</h5>
                 <p className="text-gray-400 font-light leading-relaxed">
                   Official updates on PAMHO programs, partnerships, events, and organizational milestones across the continent.
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CONTEXT PHILOSOPHY                                           */}
      {/* ============================================================ */}
      <section className={`py-40 ${container} bg-[#111115] border-t border-[#8442fa]/20 text-center relative overflow-hidden`}>
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#f4f2ee 1px, transparent 1px), linear-gradient(90deg, #f4f2ee 1px, transparent 1px)', backgroundSize: '64px 64px' }}></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
           <div className="w-12 h-12 mx-auto rounded-sm border border-[#8442fa]/30 bg-[#140b1e] flex items-center justify-center mb-8">
              <svg className="w-5 h-5 text-[#b48aff]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
           </div>
           
           <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-6">The Importance of Context</h2>
           <h3 className="text-3xl md:text-4xl font-bold text-[#f4f2ee] leading-tight mb-8">
             Knowledge cannot be separated from its cultural reality.
           </h3>
           <p className="text-gray-400 text-lg leading-relaxed font-light mx-auto max-w-2xl">
             Our editorial focus ensures that global evidence is continually interpreted through the lens of local social and economic context. Solutions must be rooted in the realities of the communities they serve.
           </p>
        </div>
      </section>

    </div>
  )
}
