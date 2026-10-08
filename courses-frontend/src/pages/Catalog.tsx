import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
  const container = 'w-full max-w-[1536px] mx-auto px-6 sm:px-12 lg:px-20'
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
    <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-12">
      <div className={container}>
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Course Catalog</h1>
          <p className="text-neutral-500 mt-2">Browse and enroll in available learning paths.</p>
        </header>

        {loading ? (
          <div className="text-center py-12 text-neutral-500">Loading catalog...</div>
        ) : courses.length === 0 ? (
          <div className="bg-white border border-neutral-100 p-12 text-center rounded-sm shadow-sm">
            <h3 className="text-lg font-medium text-neutral-800 mb-2">No courses available</h3>
            <p className="text-neutral-500">Check back later for new learning opportunities.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <Link 
                key={course.id} 
                to={`/institute/courses/${course.slug}`}
                className="group flex flex-col bg-white border border-neutral-200 rounded-sm overflow-hidden hover:border-[#4A3B69] transition-colors shadow-sm"
              >
                {course.thumbnail ? (
                  <div className="h-48 bg-neutral-100 relative overflow-hidden">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                  </div>
                ) : (
                  <div className="h-48 bg-[#4A3B69]/5 border-b border-neutral-100 flex items-center justify-center">
                    <svg className="w-10 h-10 text-[#4A3B69]/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex gap-2 mb-3">
                    {course.difficulty && (
                      <span className="text-[10px] font-mono text-[#4A3B69] bg-[#4A3B69]/10 px-2 py-1 rounded-sm uppercase tracking-wider">
                        {course.difficulty}
                      </span>
                    )}
                    {course.estimated_duration && (
                      <span className="text-[10px] font-mono text-neutral-500 bg-neutral-100 px-2 py-1 rounded-sm uppercase tracking-wider">
                        {course.estimated_duration}
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg font-bold text-[#1A1A1A] mb-2 group-hover:text-[#4A3B69] transition-colors leading-snug">{course.title}</h4>
                  <p className="text-sm text-neutral-500 line-clamp-2 mb-6 flex-1">
                    {course.short_description || "No description provided."}
                  </p>
                  <div className="mt-auto pt-4 border-t border-neutral-100 text-sm font-medium text-[#4A3B69] flex items-center justify-between">
                    <span>View Details</span>
                    <span>&rarr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
