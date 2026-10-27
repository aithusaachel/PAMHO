import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Reveal } from '../components/Reveal';

interface Course {
  id: number | string;
  slug: string;
  title: string;
  short_description: string;
  thumbnail?: string;
  estimated_duration?: string;
  difficulty?: string;
  is_flagship?: boolean;
  cohort?: string;
  partner?: string;
}

const FLAGSHIP_COURSE: Course = {
  id: 'cmha-flagship',
  slug: 'certified-mental-health-advocate',
  title: 'Certified Mental Health Advocate',
  short_description: 'A five-week programme equipping emerging leaders and community members across Africa with the knowledge, ethical grounding, and practical skills to advance mental health awareness, reduce stigma, and connect communities to appropriate support.',
  thumbnail: '/images/institute_hero.jpg',
  estimated_duration: '5 Weeks · Live Online',
  difficulty: 'Foundational',
  cohort: 'Cohort I · January 2027',
  partner: 'In collaboration with ACI Africa',
  is_flagship: true,
};

export default function Catalog() {
  const [courses, setCourses] = useState<Course[]>([FLAGSHIP_COURSE]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/courses/')
      .then(res => res.json())
      .then(data => {
        let apiCourses: Course[] = [];
        if (Array.isArray(data)) {
          apiCourses = data;
        } else if (data.results) {
          apiCourses = data.results;
        }

        // Filter out dummy/test artifacts and avoid duplicate of flagship course
        const filtered = apiCourses.filter(
          c => c.slug !== 'test-api-slug' && c.slug !== 'rtyg' && c.slug !== FLAGSHIP_COURSE.slug
        );

        setCourses([FLAGSHIP_COURSE, ...filtered]);
      })
      .catch(err => {
        console.error("Failed to load courses from API", err);
        setCourses([FLAGSHIP_COURSE]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative bg-[#030303] text-[#F5F2E9]">
      <SEO title="Course Catalog | PAMHO Institute" />
      <div className="grain-overlay"></div>

      {/* ============================================================ */}
      {/* 1. THE OPENING                                               */}
      {/* ============================================================ */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24 border-b border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container max-w-5xl text-center flex flex-col items-center">
          <Reveal>
            <h1 className="title-hero mb-8">
              Curriculum <span className="italic text-[rgba(245,242,233,0.7)]">Index.</span>
            </h1>
            <p className="text-body-large text-[rgba(245,242,233,0.6)] font-light leading-relaxed max-w-2xl mx-auto">
              Browse the official curriculum of culturally contextualized learning pathways designed for grassroots, organizational, and institutional application.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. FEATURED FLAGSHIP PROGRAMME                                */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-[#110E0C] border-b border-[rgba(245,242,233,0.08)]">
        <div className="canvas-container">
          <Reveal>
            <div className="border border-[rgba(245,242,233,0.1)] p-8 md:p-16 bg-[#030303] relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                
                <div className="lg:col-span-7 flex flex-col">
                  <h2 className="title-section mb-4 text-[#F5F2E9]">
                    Certified Mental Health <span className="italic text-[rgba(245,242,233,0.7)]">Advocate</span>
                  </h2>

                  <p className="font-serif text-xl text-[#8442FA] italic mb-6">
                    Cohort I · 23 January – 20 February 2027 · Registration Opens 1 Nov 2026
                  </p>

                  <p className="font-sans font-light text-base md:text-lg text-[rgba(245,242,233,0.7)] leading-relaxed mb-8">
                    A five-week programme equipping emerging leaders and community members across Africa with the knowledge, ethical grounding, and practical skills to advance mental health awareness, reduce stigma, and connect communities to appropriate support.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-y border-[rgba(245,242,233,0.08)] py-6 mb-8">
                    <div>
                      <span className="label-tracking text-[rgba(245,242,233,0.4)] mb-1 block">Duration</span>
                      <span className="font-serif text-lg text-[#F5F2E9]">5 Weeks</span>
                    </div>
                    <div>
                      <span className="label-tracking text-[rgba(245,242,233,0.4)] mb-1 block">Format</span>
                      <span className="font-serif text-lg text-[#F5F2E9]">Live Online (Zoom)</span>
                    </div>
                    <div>
                      <span className="label-tracking text-[rgba(245,242,233,0.4)] mb-1 block">Schedule</span>
                      <span className="font-serif text-lg text-[#F5F2E9]">Saturdays, 09:00 UTC</span>
                    </div>
                    <div>
                      <span className="label-tracking text-[rgba(245,242,233,0.4)] mb-1 block">Cohort Size</span>
                      <span className="font-serif text-lg text-[#F5F2E9]">Limited to 40</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    <Link
                      to="/institute/courses/certified-mental-health-advocate"
                      className="btn-cinematic !border-[#8442FA] !text-[#8442FA] hover:!text-[#030303]"
                    >
                      View Programme Details & Waitlist <span className="ml-3 font-serif text-xl leading-none">→</span>
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 order-first lg:order-last">
                  <div className="aspect-[4/3] w-full overflow-hidden relative border border-[rgba(245,242,233,0.1)]">
                    <img
                      src="/images/institute_hero.jpg"
                      alt="Certified Mental Health Advocate"
                      className="img-cinematic absolute inset-0 filter brightness-[0.7] saturate-[0.85]"
                    />
                    <div className="absolute top-4 right-4 bg-[#030303]/80 backdrop-blur-sm border border-[rgba(245,242,233,0.15)] px-4 py-2">
                      <span className="label-tracking text-[#8442FA] text-[10px]">Founding Cohort</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. THE CATALOG GRID                                          */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 bg-[#030303]">
        <div className="canvas-container">
          
          <Reveal>
            <div className="flex justify-between items-end border-b border-[rgba(245,242,233,0.15)] pb-8 mb-16">
              <div>
                <h2 className="title-section">Available Pathways</h2>
              </div>
              <span className="label-tracking hidden md:block">Certified Modules & Tracks</span>
            </div>
          </Reveal>

          {loading ? (
            <div className="py-24 text-center">
              <span className="font-serif text-2xl text-[rgba(245,242,233,0.4)] italic">Retrieving curriculum data...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {courses.map((course, idx) => (
                <Reveal key={course.id} delay={idx * 100}>
                  <Link 
                    to={`/institute/courses/${course.slug}`}
                    className="group flex flex-col h-full border-b border-[rgba(245,242,233,0.1)] pb-8 hover:border-[rgba(245,242,233,0.4)] transition-colors"
                  >
                    {course.thumbnail ? (
                      <div className="aspect-[4/3] w-full bg-[#110E0C] mb-8 overflow-hidden relative border border-[rgba(245,242,233,0.05)]">
                        <img 
                          src={course.thumbnail} 
                          alt={course.title} 
                          className="img-cinematic absolute inset-0 filter brightness-[0.7] saturate-[0.8] group-hover:scale-105 group-hover:brightness-[0.9]" 
                        />
                        {course.is_flagship && (
                          <div className="absolute top-3 right-3 bg-[#030303]/90 border border-[rgba(245,242,233,0.15)] px-3 py-1">
                            <span className="label-tracking text-[#8442FA] text-[9px]">Flagship</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="aspect-[4/3] w-full bg-[#110E0C] mb-8 flex flex-col justify-center items-center border border-[rgba(245,242,233,0.05)] relative overflow-hidden">
                        <span className="font-serif text-[10rem] text-[#8442FA] opacity-10 absolute -right-10 -bottom-10">P</span>
                      </div>
                    )}
                    
                    <div className="flex flex-col flex-1">
                      <div className="flex flex-wrap gap-3 mb-4">
                        {course.difficulty && (
                          <span className="label-tracking !text-[#8442FA]">
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
                      
                      <p className="font-sans font-light text-[rgba(245,242,233,0.55)] text-base leading-relaxed line-clamp-3 mb-8 flex-1">
                        {course.short_description || "Detailed parameters for this module are not currently available."}
                      </p>
                      
                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-[rgba(245,242,233,0.05)] group-hover:border-[rgba(245,242,233,0.2)] transition-colors">
                        <span className="label-tracking text-[rgba(245,242,233,0.5)] group-hover:text-[#F5F2E9] transition-colors">
                          {course.is_flagship ? 'View Programme & Waitlist' : 'Review Syllabus'}
                        </span>
                        <span className="font-serif text-xl text-[#8442FA] group-hover:translate-x-2 transition-transform">&rarr;</span>
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
