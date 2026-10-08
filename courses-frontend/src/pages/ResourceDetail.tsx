import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ResourceDetail() {
  const { slug } = useParams();
  const [resource, setResource] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const container = 'w-full max-w-[1536px] mx-auto px-6 sm:px-12 lg:px-20';

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const res = await fetch(`/api/v1/resources/${slug}/`);
        if (!res.ok) throw new Error('Resource not found');
        const data = await res.json();
        setResource(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchResource();
  }, [slug]);

  if (loading) return <div className="min-h-screen bg-[#0a0a0c] pt-48 text-center text-neutral-500">Loading resource...</div>;
  if (error || !resource) return <div className="min-h-screen bg-[#0a0a0c] pt-48 text-center text-red-500">Resource not found.</div>;

  return (
    <div className="flex flex-col bg-[#0a0a0c] min-h-screen">
      <section className={`pt-48 pb-20 ${container} relative`}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#140b1e] blur-[150px] rounded-full pointer-events-none -z-10"></div>
        
        <div className="max-w-4xl relative z-10">
          <Link to="/resources" className="text-[#b48aff] hover:text-white transition-colors text-sm mb-8 inline-block font-mono uppercase tracking-widest">&larr; Back to Library</Link>
          <div className="tag-outline self-start mb-6 text-[#b48aff] border-[#8442fa]/30 uppercase tracking-widest inline-block text-xs">
            {resource.resource_type.replace('_', ' ')}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#f4f2ee] tracking-tight leading-tight mb-8">
            {resource.title}
          </h1>
          {resource.author_name && (
            <p className="text-gray-400 font-mono text-sm mb-6">By {resource.author_name}</p>
          )}
          <p className="text-xl text-gray-400 font-light leading-relaxed max-w-3xl mb-12">
            {resource.excerpt}
          </p>
        </div>
      </section>

      <section className={`py-20 ${container}`}>
        <div className="max-w-3xl border-t border-[#8442fa]/20 pt-16">
          <div 
            className="prose prose-invert prose-lg prose-p:text-gray-400 prose-headings:text-[#f4f2ee] prose-a:text-[#b48aff]"
            dangerouslySetInnerHTML={{ __html: resource.content || 'No detailed content available.' }}
          />
        </div>
      </section>
    </div>
  );
}
