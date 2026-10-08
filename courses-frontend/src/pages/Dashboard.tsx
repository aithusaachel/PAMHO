import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
    return <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center text-neutral-500">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-12 px-6 sm:px-12 lg:px-20">
      <div className="max-w-[1536px] mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Welcome back, {user?.first_name || user?.username}</h1>
          <p className="text-neutral-500 mt-2">Here is your learning progress.</p>
        </header>

        <section>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-xl font-bold text-[#1A1A1A]">Your Courses</h2>
            {enrollments.length > 0 && (
              <Link to="/institute/catalog" className="text-sm font-medium text-[#4A3B69] hover:underline">
                Browse More Courses &rarr;
              </Link>
            )}
          </div>
          
          {enrollments.length === 0 ? (
            <div className="bg-white border border-neutral-100 p-8 text-center rounded-sm shadow-sm">
              <h3 className="text-lg font-medium text-neutral-800 mb-2">No active enrollments</h3>
              <p className="text-neutral-500 mb-6">You haven't enrolled in any courses yet.</p>
              <Link to="/institute/catalog" className="btn-primary px-6 py-2 rounded-sm text-sm font-medium">
                Browse Catalog
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map(enrollment => (
                <div key={enrollment.id} className="bg-white border border-neutral-200 rounded-sm overflow-hidden flex flex-col shadow-sm">
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-mono text-[#b48aff] bg-[#8442fa]/10 px-2 py-1 rounded-sm uppercase tracking-wider">
                        {enrollment.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1A1A1A] mb-4 leading-snug">
                      {enrollment.course_title}
                    </h3>
                    
                    <div className="mt-auto">
                      <div className="flex justify-between text-xs text-neutral-500 mb-2 font-mono">
                        <span>{enrollment.progress_summary.completed_lessons} / {enrollment.progress_summary.total_lessons} Lessons</span>
                        <span>{enrollment.progress_summary.percent_complete}%</span>
                      </div>
                      <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden mb-6">
                        <div 
                          className="bg-[#4A3B69] h-full transition-all duration-500" 
                          style={{ width: `${enrollment.progress_summary.percent_complete}%` }}
                        ></div>
                      </div>
                      
                      <Link 
                        to={`/institute/courses/${enrollment.course_identifier}`}
                        className="block w-full text-center bg-[#FDFBF7] border border-neutral-200 hover:border-[#4A3B69] text-[#4A3B69] font-medium py-2 rounded-sm transition-colors text-sm"
                      >
                        Continue Learning
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
