import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

interface Lesson {
  id: number;
  title: string;
  slug: string;
  lesson_type: string;
  duration: number | null;
  content: string;
  video_url: string;
  description: string;
}

interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface Course {
  id: number;
  slug: string;
  title: string;
  modules: Module[];
  is_enrolled: boolean;
}

interface ProgressRecord {
  id: number;
  lesson_id: number;
  status: string;
}

export default function CourseLearning() {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [progressRecords, setProgressRecords] = useState<ProgressRecord[]>([]);
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('pamho_access');
      if (!token) return;

      try {
        const [courseRes, progressRes] = await Promise.all([
          fetch(`/api/v1/courses/${slug}/`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch('/api/v1/progress/', { headers: { 'Authorization': `Bearer ${token}` } })
        ]);

        if (courseRes.ok && progressRes.ok) {
          const courseData = await courseRes.json();
          let progressData = await progressRes.json();
          
          if (progressData.results) progressData = progressData.results;

          if (!courseData.is_enrolled) {
            navigate(`/institute/courses/${slug}`);
            return;
          }

          setCourse(courseData);
          setProgressRecords(progressData);

          // Determine initial active lesson
          if (courseData.modules.length > 0 && courseData.modules[0].lessons.length > 0) {
            setActiveLessonId(courseData.modules[0].lessons[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to load learning data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, navigate]);

  const markComplete = async (lessonId: number) => {
    const token = localStorage.getItem('pamho_access');
    const existing = progressRecords.find(p => p.lesson_id === lessonId);
    
    try {
      if (existing) {
        const response = await fetch(`/api/v1/progress/${existing.id}/complete/`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setProgressRecords(prev => prev.map(p => p.id === data.id ? data : p));
        }
      } else {
        const createRes = await fetch('/api/v1/progress/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ lesson_id: lessonId })
        });
        if (createRes.ok) {
          const createData = await createRes.json();
          const completeRes = await fetch(`/api/v1/progress/${createData.id}/complete/`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (completeRes.ok) {
             const completeData = await completeRes.json();
             setProgressRecords(prev => [...prev, completeData]);
          }
        }
      }
    } catch (err: any) {
      console.error("Failed to mark complete", err);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center">
      <span className="font-serif text-2xl text-[rgba(245,242,233,0.4)] italic">Loading course content...</span>
    </div>
  );
  if (!course) return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center">
      <span className="font-serif text-2xl text-[#D1893D] italic">Access Denied.</span>
    </div>
  );

  const allLessons = course.modules.flatMap(m => m.lessons);
  const currentIndex = allLessons.findIndex(l => l.id === activeLessonId);
  const currentLesson = allLessons[currentIndex];
  const nextLesson = allLessons[currentIndex + 1];
  
  const isCompleted = (lessonId: number) => {
    return progressRecords.some(p => p.lesson_id === lessonId && p.status === 'completed');
  };

  const getEmbedUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
        let videoId = urlObj.searchParams.get('v');
        if (!videoId && urlObj.hostname.includes('youtu.be')) {
          videoId = urlObj.pathname.slice(1);
        }
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
      } else if (urlObj.hostname.includes('vimeo.com')) {
        const videoId = urlObj.pathname.split('/').pop();
        return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
      }
    } catch (e) {}
    return url;
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#030303] pt-16 relative">
      <div className="grain-overlay pointer-events-none z-0"></div>

      {/* Sidebar Navigation */}
      <div className="w-full md:w-96 bg-[#030303] border-r border-[rgba(245,242,233,0.05)] flex flex-col h-[calc(100vh-64px)] md:sticky md:top-16 shrink-0 overflow-y-auto relative z-10 custom-scrollbar">
        <div className="p-8 md:p-12 border-b border-[rgba(245,242,233,0.05)] bg-[#110E0C]">
          <Link to="/institute/dashboard" className="label-tracking text-[rgba(245,242,233,0.4)] hover:text-[#F5F2E9] mb-8 inline-block transition-colors">&larr; Return to Dashboard</Link>
          <h2 className="font-serif text-3xl text-[#F5F2E9] leading-tight">{course.title}</h2>
        </div>
        
        <div className="flex-1 py-8 px-6 md:px-8">
          {course.modules.map((module, mIdx) => (
            <div key={module.id} className="mb-12">
              <h3 className="label-tracking text-[rgba(245,242,233,0.3)] mb-6">Module {mIdx + 1}: {module.title}</h3>
              <div className="flex flex-col gap-2">
                {module.lessons.map((lesson, lIdx) => {
                  const active = lesson.id === activeLessonId;
                  const completed = isCompleted(lesson.id);
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLessonId(lesson.id)}
                      className={`w-full text-left p-4 flex gap-4 transition-all duration-300 ${
                        active 
                          ? 'bg-[rgba(245,242,233,0.05)] border-l-2 border-[#D1893D]' 
                          : 'border-l-2 border-transparent hover:bg-[rgba(245,242,233,0.02)]'
                      }`}
                    >
                      <div className={`shrink-0 w-6 h-6 flex items-center justify-center border transition-colors ${
                        completed 
                          ? 'bg-[#D1893D] border-[#D1893D] text-[#030303]' 
                          : active 
                            ? 'border-[#D1893D] text-[#D1893D]' 
                            : 'border-[rgba(245,242,233,0.2)] text-[rgba(245,242,233,0.4)]'
                      }`}>
                        {completed ? (
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        ) : (
                           <span className="font-serif text-[12px] leading-none">{lIdx + 1}</span>
                        )}
                      </div>
                      <span className={`font-serif text-lg leading-tight line-clamp-2 ${
                        active ? 'text-[#F5F2E9]' : 'text-[rgba(245,242,233,0.6)]'
                      }`}>{lesson.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#110E0C] p-6 md:p-16 lg:p-24 overflow-y-auto h-[calc(100vh-64px)] relative z-10 custom-scrollbar">
        {currentLesson ? (
          <div className="max-w-4xl mx-auto">
             <div className="mb-16">
                <div className="flex justify-between items-center mb-8">
                  <span className="label-tracking !text-[#D1893D]">
                    {currentLesson.lesson_type}
                  </span>
                </div>
                <h1 className="font-serif text-5xl md:text-6xl text-[#F5F2E9] mb-8 leading-tight">{currentLesson.title}</h1>
                <p className="font-sans font-light text-[rgba(245,242,233,0.6)] text-xl leading-relaxed">{currentLesson.description}</p>
             </div>

             <div className="mb-16">
               {currentLesson.lesson_type === 'video' && currentLesson.video_url && (
                 <div className="aspect-video bg-[#030303] border border-[rgba(245,242,233,0.05)] overflow-hidden mb-12 w-full relative">
                    <iframe 
                       src={getEmbedUrl(currentLesson.video_url)} 
                       className="absolute inset-0 w-full h-full" 
                       frameBorder="0" 
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                       allowFullScreen
                    ></iframe>
                 </div>
               )}
               
               {currentLesson.content ? (
                 <div 
                   className="prose prose-invert prose-lg md:prose-xl prose-p:text-[rgba(245,242,233,0.7)] prose-headings:font-serif prose-headings:text-[#F5F2E9] prose-headings:font-light prose-a:text-[#D1893D] hover:prose-a:text-[#F5F2E9] prose-strong:text-[#F5F2E9] max-w-none leading-relaxed font-sans font-light" 
                   dangerouslySetInnerHTML={{ __html: currentLesson.content.replace(/\n/g, '<br/>') }} 
                 />
               ) : (
                 <p className="font-serif text-xl text-[rgba(245,242,233,0.4)] italic">No textual data provided for this lesson.</p>
               )}
             </div>

             <div className="flex flex-col sm:flex-row justify-between items-center border-t border-[rgba(245,242,233,0.1)] pt-12 gap-8">
               <div>
                  {!isCompleted(currentLesson.id) ? (
                    <button 
                      onClick={() => markComplete(currentLesson.id)}
                      className="btn-cinematic"
                    >
                      Complete Lesson
                    </button>
                  ) : (
                    <div className="label-tracking text-[#D1893D] flex items-center gap-3">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                       Completed
                    </div>
                  )}
               </div>
               
               {nextLesson && (
                 <button 
                   onClick={() => setActiveLessonId(nextLesson.id)}
                   className="label-tracking text-[rgba(245,242,233,0.6)] hover:text-[#F5F2E9] transition-colors flex items-center gap-4"
                 >
                   Next Lesson <span className="text-[#D1893D] font-serif text-xl leading-none">&rarr;</span>
                 </button>
               )}
             </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-[rgba(245,242,233,0.3)] font-serif text-2xl italic">
            Select a lesson to begin learning.
          </div>
        )}
      </div>
    </div>
  );
}
