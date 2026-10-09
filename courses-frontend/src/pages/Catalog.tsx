import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Reveal } from '../components/Reveal';

interface Course {
  id: number;
  slug: string;
  title: string;
  short_description: string;
  thumbnail: string;
  estimated_duration: string;
  difficulty: string;
}

export default function Catalog() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/v1/courses/')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCourses(data);
        } else if (data.results) {
          setCourses(data.results);
        }
      })
      .catch(err => console.error("Failed to load courses", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative bg-[#030303]">
      <SEO title="Course Catalog | PAMHO Institute" />
      <div className="grain-overlay"></div>

      {/* ============================================================ */}
      {/* 1. THE OPENING                                               */}
      {/* ============================================================ */}
      <section className="pt-48 pb-16 md:pt-64 md:pb-24 border-b border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container max-w-5xl text-center flex flex-col items-center">
          <Reveal>
            <span className="label-tracking text-[#D1893D] mb-8 block">The PAMHO Institute</span>
            <h1 className="title-hero mb-8">
              Curriculum <span className="italic text-[rgba(245,242,233,0.7)]">Index.</span>
            </h1>
            <p className="text-body-large text-[rgba(245,242,233,0.6)] font-light leading-relaxed max-w-2xl mx-auto">
              Browse the official curriculum of culturally contextualized learning pathways designed for grassroots and clinical application.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. THE CATALOG GRID                                          */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 bg-[#110E0C]">
        <div className="canvas-container">
          
          <Reveal>
            <div className="flex justify-between items-end border-b border-[rgba(245,242,233,0.15)] pb-8 mb-16">
              <h2 className="title-section">Available Pathways</h2>
              <span className="label-tracking hidden md:block">Certified Modules</span>
            </div>
          </Reveal>

          {loading ? (
            <div className="py-24 text-center">
              <span className="font-serif text-2xl text-[rgba(245,242,233,0.4)] italic">Retrieving curriculum data...</span>
            </div>
          ) : courses.length === 0 ? (
            <Reveal>
              <div className="py-24 text-center border border-[rgba(245,242,233,0.05)] bg-[#030303]">
                <h3 className="font-serif text-3xl mb-4">No active courses.</h3>
                <p className="font-serif text-xl text-[rgba(245,242,233,0.4)] italic">Check back shortly for new learning opportunities.</p>
              </div>
            </Reveal>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {courses.map((course, idx) => (
                <Reveal key={course.id} delay={idx * 100}>
                  <Link 
                    to={`/institute/courses/${course.slug}`}
                    className="group flex flex-col h-full border-b border-[rgba(245,242,233,0.1)] pb-8 hover:border-[rgba(245,242,233,0.4)] transition-colors"
                  >
                    {course.thumbnail ? (
                      <div className="aspect-[4/3] w-full bg-[#030303] mb-8 overflow-hidden relative">
                        <img 
                          src={course.thumbnail} 
                          alt={course.title} 
                          className="img-cinematic absolute inset-0 filter brightness-[0.7] saturate-[0.8] group-hover:scale-105 group-hover:brightness-[0.9]" 
                        />
                      </div>
                    ) : (
                      <div className="aspect-[4/3] w-full bg-[#030303] mb-8 flex flex-col justify-center items-center border border-[rgba(245,242,233,0.05)] relative overflow-hidden">
                        <span className="font-serif text-[10rem] text-[#D1893D] opacity-10 absolute -right-10 -bottom-10">P</span>
                      </div>
                    )}
                    
                    <div className="flex flex-col flex-1">
                      <div className="flex gap-4 mb-6">
                        {course.difficulty && (
                          <span className="label-tracking !text-[#D1893D]">
                            {course.difficulty}
                          </span>
                        )}
                        {course.estimated_duration && (
                          <span className="label-tracking text-[rgba(245,242,233,0.4)]">
                            {course.estimated_duration}
                          </span>
                        )}
                      </div>
                      
                      <h4 className="font-serif text-2xl md:text-3xl text-[rgba(245,242,233,0.9)] mb-4 group-hover:text-[#F5F2E9] transition-colors leading-snug">
                        {course.title}
                      </h4>
                      
                      <p className="font-sans font-light text-[rgba(245,242,233,0.5)] text-base leading-relaxed line-clamp-3 mb-8 flex-1">
                        {course.short_description || "Detailed parameters for this module are not currently available."}
                      </p>
                      
                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-[rgba(245,242,233,0.05)] group-hover:border-[rgba(245,242,233,0.2)] transition-colors">
                        <span className="label-tracking text-[rgba(245,242,233,0.5)] group-hover:text-[#F5F2E9] transition-colors">Review Syllabus</span>
                        <span className="font-serif text-xl text-[#D1893D] group-hover:translate-x-2 transition-transform">&rarr;</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
