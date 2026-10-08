import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
        // Refresh course to show "Continue Learning"
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
    return <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center text-neutral-500">Loading course...</div>;
  }

  if (!course) {
    return <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center text-neutral-500">Course not found.</div>;
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-12">
      {/* Course Header */}
      <div className="bg-[#1A1A1A] text-white py-16 px-6 sm:px-12 lg:px-20 border-b border-neutral-800">
        <div className="max-w-[1536px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-2">
            <div className="flex gap-3 mb-6">
               {course.difficulty && <div className="tag-outline text-[#b48aff] border-[#8442fa]/30">{course.difficulty}</div>}
               {course.estimated_duration && <div className="tag-outline text-gray-400 border-white/10">{course.estimated_duration}</div>}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-[#f4f2ee]">{course.title}</h1>
            <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
              {course.description || "No detailed description available."}
            </p>
          </div>
          
          <div className="bg-[#242424] p-8 border border-[#333] rounded-sm text-center shadow-2xl">
             {course.is_enrolled ? (
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">You are enrolled</h3>
                  <p className="text-sm text-gray-400 mb-6">Pick up where you left off in this course.</p>
                  <Link to={`/institute/learn/${course.slug}`} className="btn-primary w-full block py-3 rounded-sm font-bold text-sm">
                    Continue Learning
                  </Link>
                </div>
             ) : (
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Ready to start?</h3>
                  <p className="text-sm text-gray-400 mb-6">Enroll now to access the full curriculum and track your progress.</p>
                  <button 
                    onClick={handleEnroll} 
                    disabled={enrolling}
                    className="btn-primary w-full block py-3 rounded-sm font-bold text-sm disabled:opacity-50"
                  >
                    {enrolling ? 'Enrolling...' : 'Enroll Now'}
                  </button>
                </div>
             )}
          </div>
        </div>
      </div>

      {/* Curriculum */}
      <div className="max-w-[1536px] mx-auto px-6 sm:px-12 lg:px-20 py-16">
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-8">Course Curriculum</h2>
        
        <div className="space-y-6 max-w-4xl">
          {course.modules.length === 0 ? (
            <p className="text-neutral-500">Modules have not been published yet.</p>
          ) : (
            course.modules.map((module, mIdx) => (
              <div key={module.id} className="bg-white border border-neutral-200 rounded-sm shadow-sm overflow-hidden">
                <div className="p-6 bg-[#FAFAFA] border-b border-neutral-200">
                  <h3 className="text-lg font-bold text-[#1A1A1A]">Module {mIdx + 1}: {module.title}</h3>
                  {module.description && <p className="text-sm text-neutral-600 mt-2">{module.description}</p>}
                </div>
                <div className="divide-y divide-neutral-100">
                  {module.lessons.map((lesson, lIdx) => (
                    <div key={lesson.id} className="p-4 px-6 flex justify-between items-center hover:bg-neutral-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-mono text-neutral-400 w-6">{lIdx + 1}.</span>
                        <span className="text-sm font-medium text-neutral-800">{lesson.title}</span>
                      </div>
                      <div className="flex gap-4 items-center">
                        <span className="text-xs uppercase tracking-wider text-[#b48aff] bg-[#8442fa]/5 px-2 py-1 rounded-sm font-mono">
                          {lesson.lesson_type}
                        </span>
                        {lesson.duration && <span className="text-xs text-neutral-400 font-mono">{lesson.duration}m</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
