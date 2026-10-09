import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import { Reveal } from '../components/Reveal';

interface Lesson {
  id: number;
  title: string;
  slug: string;
  lesson_type: string;
  duration: number | null;
}

interface Module {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
}

interface Course {
  id: number;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  estimated_duration: string;
  difficulty: string;
  modules: Module[];
  is_enrolled: boolean;
}

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      const token = localStorage.getItem('pamho_access');
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      try {
        const response = await fetch(`/api/v1/courses/${slug}/`, { headers });
        if (response.ok) {
          const data = await response.json();
          setCourse(data);
        } else {
          // Handle 404
        }
      } catch (err) {
        console.error("Failed to load course details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: `/institute/courses/${slug}` } } });
      return;
    }

    setEnrolling(true);
    const token = localStorage.getItem('pamho_access');
    try {
      const response = await fetch('/api/v1/enrollments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ course_slug: slug })
      });

      if (response.ok) {
        const updatedCourseRes = await fetch(`/api/v1/courses/${slug}/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (updatedCourseRes.ok) {
          setCourse(await updatedCourseRes.json());
        }
      } else {
        const errData = await response.json();
        alert(errData.error || errData.detail || "Failed to enroll in course.");
      }
    } catch (err) {
      console.error("Enrollment failed", err);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <span className="font-serif text-2xl text-[rgba(245,242,233,0.4)] italic">Loading course details...</span>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <span className="font-serif text-2xl text-[rgba(245,242,233,0.4)] italic">Course not found.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen relative bg-[#030303]">
      <SEO title={`${course.title} | PAMHO Institute`} />
      <div className="grain-overlay"></div>

      {/* ============================================================ */}
      {/* 1. THE OPENING                                               */}
      {/* ============================================================ */}
      <section className="pt-48 pb-16 md:pt-64 md:pb-24 border-b border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          <div className="lg:col-span-7 flex flex-col">
            <Reveal>
              <Link to="/institute/catalog" className="label-tracking text-[rgba(245,242,233,0.4)] hover:text-[#F5F2E9] mb-12 inline-block transition-colors border-b border-transparent hover:border-[#F5F2E9] pb-1">
                &larr; Back to Catalog
              </Link>
              
              <div className="flex gap-4 mb-8">
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
              
              <h1 className="title-hero mb-8 text-left">
                {course.title}
              </h1>
              
              <p className="text-body-large text-[rgba(245,242,233,0.6)] font-light leading-relaxed mb-12">
                {course.description || "Detailed description for this course is not currently available."}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={200}>
              <div className="p-8 border border-[rgba(245,242,233,0.1)] bg-[rgba(245,242,233,0.02)] backdrop-blur-sm flex flex-col text-center">
                {course.is_enrolled ? (
                  <>
                    <h3 className="font-serif text-3xl text-[#F5F2E9] mb-4">Access Granted</h3>
                    <p className="font-sans font-light text-[rgba(245,242,233,0.5)] mb-8">
                      You are enrolled in this course. Proceed to the learning environment.
                    </p>
                    <Link to={`/institute/learn/${course.slug}`} className="btn-cinematic !border-[#8442FA] !text-[#8442FA] hover:!text-[#030303]">
                      Start Course
                    </Link>
                  </>
                ) : (
                  <>
                    <h3 className="font-serif text-3xl text-[#F5F2E9] mb-4">Enroll</h3>
                    <p className="font-sans font-light text-[rgba(245,242,233,0.5)] mb-8">
                      Sign in or create an account to enroll and access the course materials.
                    </p>
                    <button 
                      onClick={handleEnroll} 
                      disabled={enrolling}
                      className="btn-cinematic w-full disabled:opacity-50"
                    >
                      {enrolling ? 'Enrolling...' : 'Enroll in Course'}
                    </button>
                  </>
                )}
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. THE SYLLABUS                                              */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 bg-[#110E0C]">
        <div className="canvas-container max-w-4xl">
          <Reveal>
            <div className="flex justify-between items-end border-b border-[rgba(245,242,233,0.15)] pb-8 mb-16">
              <h2 className="title-section">The Syllabus</h2>
              <span className="label-tracking hidden md:block">Course Outline</span>
            </div>
          </Reveal>

          <div className="flex flex-col gap-12">
            {course.modules.length === 0 ? (
              <Reveal>
                <p className="font-serif text-xl text-[rgba(245,242,233,0.4)] italic">
                  Syllabus is currently unavailable or undergoing revision.
                </p>
              </Reveal>
            ) : (
              course.modules.map((module, mIdx) => (
                <Reveal key={module.id} delay={mIdx * 100} className="border border-[rgba(245,242,233,0.05)] bg-[#030303]">
                  <div className="p-8 border-b border-[rgba(245,242,233,0.05)]">
                    <span className="label-tracking text-[rgba(245,242,233,0.4)] mb-4 block">Module {mIdx + 1}</span>
                    <h3 className="font-serif text-3xl text-[#F5F2E9] mb-4">{module.title}</h3>
                    {module.description && (
                      <p className="font-sans font-light text-[rgba(245,242,233,0.6)] leading-relaxed">
                        {module.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex flex-col">
                    {module.lessons.map((lesson, lIdx) => (
                      <div key={lesson.id} className="p-6 md:p-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-[rgba(245,242,233,0.02)] hover:bg-[rgba(245,242,233,0.02)] transition-colors last:border-0">
                        <div className="flex items-center gap-6">
                          <span className="font-serif text-xl text-[rgba(245,242,233,0.2)]">0{lIdx + 1}</span>
                          <span className="font-serif text-xl md:text-2xl text-[rgba(245,242,233,0.8)]">{lesson.title}</span>
                        </div>
                        <div className="flex items-center gap-6 pl-10 md:pl-0">
                          <span className="label-tracking text-[#8442FA]">
                            {lesson.lesson_type}
                          </span>
                          {lesson.duration && (
                            <span className="label-tracking text-[rgba(245,242,233,0.3)]">
                              {lesson.duration}m
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              ))
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
