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
    
    // Check if there is an existing progress record
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
        } else {
          alert("Error: " + JSON.stringify(await response.json()));
        }
      } else {
        // Create it first, then it might default to IN_PROGRESS. We can complete it immediately.
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
          } else {
             alert("Error completing: " + JSON.stringify(await completeRes.json()));
          }
        } else {
          alert("Error creating progress: " + JSON.stringify(await createRes.json()));
        }
      }
    } catch (err: any) {
      console.error("Failed to mark complete", err);
      alert("Error: " + err.message);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center text-neutral-500">Loading learning environment...</div>;
  if (!course) return <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center text-neutral-500">Course not found.</div>;

  // Flatten lessons to find current/prev/next
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
    } catch (e) {
      // Invalid URL
    }
    return url;
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FDFBF7] pt-16">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-80 bg-white border-r border-neutral-200 flex flex-col h-[calc(100vh-64px)] md:sticky md:top-16 shrink-0 overflow-y-auto">
        <div className="p-6 border-b border-neutral-200">
          <Link to="/institute/dashboard" className="text-xs font-medium text-neutral-500 hover:text-[#4A3B69] mb-4 inline-block">&larr; Back to Dashboard</Link>
          <h2 className="text-lg font-bold text-[#1A1A1A] leading-snug">{course.title}</h2>
        </div>
        
        <div className="flex-1 py-4">
          {course.modules.map((module, mIdx) => (
            <div key={module.id} className="mb-6">
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest px-6 mb-2">Module {mIdx + 1}: {module.title}</h3>
              <div className="space-y-1">
                {module.lessons.map((lesson, lIdx) => {
                  const active = lesson.id === activeLessonId;
                  const completed = isCompleted(lesson.id);
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLessonId(lesson.id)}
                      className={`w-full text-left px-6 py-3 text-sm flex gap-3 transition-colors ${active ? 'bg-[#4A3B69]/5 border-r-2 border-[#4A3B69] text-[#4A3B69]' : 'text-neutral-600 hover:bg-neutral-50'}`}
                    >
                      <div className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center border ${completed ? 'bg-[#4A3B69] border-[#4A3B69] text-white' : 'border-neutral-300'}`}>
                        {completed ? (
                           <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        ) : (
                           <span className="text-[10px] font-mono">{lIdx + 1}</span>
                        )}
                      </div>
                      <span className="font-medium line-clamp-2">{lesson.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#FDFBF7] p-6 md:p-12 overflow-y-auto h-[calc(100vh-64px)]">
        {currentLesson ? (
          <div className="max-w-5xl mx-auto">
             <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono text-[#b48aff] bg-[#8442fa]/10 px-3 py-1 rounded-sm uppercase tracking-wider">
                    {currentLesson.lesson_type}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4">{currentLesson.title}</h1>
                <p className="text-lg text-neutral-600 leading-relaxed">{currentLesson.description}</p>
             </div>

             <div className="bg-white border border-neutral-200 rounded-sm p-8 shadow-sm mb-12">
               {currentLesson.lesson_type === 'video' && currentLesson.video_url && (
                 <div className="aspect-video bg-neutral-900 rounded-sm overflow-hidden mb-6 w-full">
                    <iframe 
                       src={getEmbedUrl(currentLesson.video_url)} 
                       className="w-full h-full" 
                       frameBorder="0" 
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                       allowFullScreen
                    ></iframe>
                 </div>
               )}
               
               {currentLesson.content ? (
                 <div className="prose prose-neutral max-w-none text-neutral-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: currentLesson.content.replace(/\n/g, '<br/>') }} />
               ) : (
                 <p className="text-neutral-500 italic">No text content provided for this lesson.</p>
               )}
             </div>

             <div className="flex flex-col sm:flex-row justify-between items-center border-t border-neutral-200 pt-8 gap-4">
               <div>
                  {!isCompleted(currentLesson.id) ? (
                    <button 
                      onClick={() => markComplete(currentLesson.id)}
                      className="btn-primary px-8 py-3 rounded-sm font-bold shadow-sm"
                    >
                      Mark as Complete
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-green-700 font-bold px-8 py-3 bg-green-50 rounded-sm border border-green-200">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                       Completed
                    </div>
                  )}
               </div>
               
               {nextLesson && (
                 <button 
                   onClick={() => setActiveLessonId(nextLesson.id)}
                   className="text-sm font-medium text-[#4A3B69] hover:text-[#3A2D54] flex items-center gap-2"
                 >
                   Next Lesson <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                 </button>
               )}
             </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-neutral-500">
            Select a lesson to begin.
          </div>
        )}
      </div>
    </div>
  );
}
