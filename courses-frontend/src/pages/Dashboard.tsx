import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import { Reveal } from '../components/Reveal';

interface ProgressSummary {
  total_lessons: number;
  completed_lessons: number;
  percent_complete: number;
}

interface Enrollment {
  id: number;
  course_slug: string;
  course_identifier: string;
  course_title: string;
  status: string;
  enrolled_at: string;
  progress_summary: ProgressSummary;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      const token = localStorage.getItem('pamho_access');
      if (!token) return;

      try {
        const response = await fetch('/api/v1/enrollments/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setEnrollments(data);
          } else if (data.results) {
            setEnrollments(data.results);
          }
        }
      } catch (err) {
        console.error("Failed to fetch enrollments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <span className="font-serif text-2xl text-[rgba(245,242,233,0.4)] italic">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen relative bg-[#030303]">
      <SEO title="Dashboard | PAMHO" />
      <div className="grain-overlay"></div>

      {/* ============================================================ */}
      {/* 1. THE OPENING                                               */}
      {/* ============================================================ */}
      <section className="pt-48 pb-16 md:pt-64 md:pb-24 border-b border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container max-w-5xl">
          <Reveal>
            <span className="label-tracking text-[#8442FA] mb-8 block">Account Overview</span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-none text-[#F5F2E9] mb-8 tracking-[-0.02em]">
              Welcome back,<br />
              <span className="italic text-[rgba(245,242,233,0.7)]">{user?.first_name || user?.username}.</span>
            </h1>
            <p className="text-body-large text-[rgba(245,242,233,0.6)] font-light leading-relaxed max-w-2xl">
              Access your curriculum and track your educational progress through the PAMHO Institute.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. ENROLLMENTS                                               */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 bg-[#110E0C]">
        <div className="canvas-container">
          
          <Reveal>
            <div className="flex justify-between items-end border-b border-[rgba(245,242,233,0.15)] pb-8 mb-16">
              <h2 className="title-section">Your Courses</h2>
              {enrollments.length > 0 && (
                <Link to="/institute/catalog" className="label-tracking text-[#8442FA] hover:text-[#F5F2E9] transition-colors flex items-center gap-4">
                  Browse Catalog <span className="font-serif text-xl leading-none">&rarr;</span>
                </Link>
              )}
            </div>
          </Reveal>

          {enrollments.length === 0 ? (
            <Reveal>
              <div className="py-24 text-center border border-[rgba(245,242,233,0.05)] bg-[#030303]">
                <h3 className="font-serif text-3xl text-[#F5F2E9] mb-6">No Active Courses</h3>
                <p className="text-[rgba(245,242,233,0.5)] font-sans font-light mb-12">You have not enrolled in any courses yet.</p>
                <Link to="/institute/catalog" className="btn-cinematic inline-flex">
                  Explore Courses
                </Link>
              </div>
            </Reveal>
          ) : (
            <div className="flex flex-col">
              {enrollments.map((enrollment, idx) => (
                <Reveal key={enrollment.id} delay={idx * 100} className="grid grid-cols-1 md:grid-cols-12 gap-8 py-16 border-b border-[rgba(245,242,233,0.05)] group hover:bg-[rgba(245,242,233,0.02)] transition-colors">
                  
                  <div className="md:col-span-3 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span className={`w-1.5 h-1.5 rounded-full ${enrollment.status === 'completed' ? 'bg-[#8442FA]' : 'bg-[rgba(245,242,233,0.4)] animate-pulse'}`}></span>
                      <span className="label-tracking !text-[#8442FA]">
                        {enrollment.status}
                      </span>
                    </div>
                    <span className="font-serif text-lg text-[rgba(245,242,233,0.3)]">
                      {new Date(enrollment.enrolled_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>

                  <div className="md:col-span-6 flex flex-col">
                    <h3 className="font-serif text-3xl md:text-4xl mb-6 text-[rgba(245,242,233,0.9)] group-hover:text-[#F5F2E9] transition-colors leading-tight">
                      {enrollment.course_title}
                    </h3>
                    
                    <div className="mt-4 max-w-md">
                      <div className="flex justify-between text-[11px] uppercase tracking-widest text-[rgba(245,242,233,0.4)] mb-3 font-medium">
                        <span>{enrollment.progress_summary.completed_lessons} / {enrollment.progress_summary.total_lessons} Lessons Completed</span>
                        <span className="text-[#8442FA]">{enrollment.progress_summary.percent_complete}%</span>
                      </div>
                      <div className="w-full bg-[rgba(245,242,233,0.05)] h-1 rounded-none overflow-hidden">
                        <div 
                          className="bg-[#8442FA] h-full transition-all duration-1000 ease-out" 
                          style={{ width: `${enrollment.progress_summary.percent_complete}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-3 flex md:justify-end items-start pt-2">
                    <Link 
                      to={`/institute/courses/${enrollment.course_identifier}`}
                      className="label-tracking text-[#8442FA] hover:text-[#F5F2E9] flex items-center gap-4 transition-colors"
                    >
                      {enrollment.status === 'completed' ? 'Review Course' : 'Resume Course'} 
                      <span className="w-8 h-[1px] bg-current block"></span>
                    </Link>
                  </div>

                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
