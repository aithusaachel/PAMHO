import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Reveal } from '../components/Reveal';

export default function ResourceDetail() {
  const { slug } = useParams();
  const [resource, setResource] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  if (loading) return (
    <div className="min-h-screen bg-[#030303] pt-48 text-center">
      <span className="font-serif text-2xl text-[rgba(245,242,233,0.4)] italic">Retrieving document...</span>
    </div>
  );
  if (error || !resource) return (
    <div className="min-h-screen bg-[#030303] pt-48 text-center">
      <span className="font-serif text-2xl text-[#8442FA] italic">Document not found or access restricted.</span>
    </div>
  );

  return (
    <div className="flex flex-col bg-[#030303] min-h-screen relative">
      <SEO title={`${resource.title} | PAMHO`} />
      <div className="grain-overlay"></div>

      <section className="pt-48 pb-16 md:pt-64 md:pb-32 border-b border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container max-w-4xl">
          <Reveal>
            <Link to="/resources" className="label-tracking text-[rgba(245,242,233,0.4)] hover:text-[#F5F2E9] mb-12 inline-block transition-colors border-b border-transparent hover:border-[#F5F2E9] pb-1">
              &larr; Back to Index
            </Link>
            
            <span className="label-tracking text-[#8442FA] mb-6 block">
              {resource.resource_type?.replace('_', ' ') || 'Article'}
            </span>
            
            <h1 className="title-hero mb-8 text-left">
              {resource.title}
            </h1>
            
            <div className="flex flex-col gap-2 mb-12">
              {resource.author_name && (
                <p className="label-tracking text-[rgba(245,242,233,0.6)]">
                  Primary Investigator: <span className="text-[#F5F2E9]">{resource.author_name}</span>
                </p>
              )}
              {resource.created_at && (
                <p className="label-tracking text-[rgba(245,242,233,0.4)]">
                  Declassified: {new Date(resource.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              )}
            </div>
            
            <p className="text-body-large text-[rgba(245,242,233,0.8)] font-light leading-relaxed">
              {resource.excerpt || resource.summary}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#110E0C]">
        <div className="canvas-container max-w-4xl">
          <Reveal>
            <div 
              className="prose prose-invert prose-lg md:prose-xl prose-p:text-[rgba(245,242,233,0.6)] prose-headings:font-serif prose-headings:text-[#F5F2E9] prose-headings:font-light prose-a:text-[#8442FA] prose-a:no-underline hover:prose-a:text-[#F5F2E9] prose-strong:text-[#F5F2E9] max-w-none leading-relaxed font-sans font-light"
              dangerouslySetInnerHTML={{ __html: resource.content || 'No detailed content available.' }}
            />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
