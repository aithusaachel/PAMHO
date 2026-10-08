import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function AdminCourseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // States for modules and lessons
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [moduleFormData, setModuleFormData] = useState({ title: '', description: '', ordering: 0 });
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  const [lessonFormData, setLessonFormData] = useState({ title: '', slug: '', description: '', lesson_type: 'text', content: '', video_url: '', ordering: 0, status: 'published' });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCourseData, setEditCourseData] = useState({ title: '', short_description: '' });

  const fetchCourse = async () => {
    const token = localStorage.getItem('pamho_access');
    try {
      const res = await fetch(`/api/v1/courses/${slug}/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setCourse(await res.json());
      } else {
        alert("Course not found");
        navigate('/admin/courses');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [slug]);

  const handleUpdateCourseStatus = async (status: string) => {
    const token = localStorage.getItem('pamho_access');
    await fetch(`/api/v1/courses/${slug}/`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchCourse();
  };

  const handleUpdateCourseInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('pamho_access');
    const res = await fetch(`/api/v1/courses/${slug}/`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(editCourseData)
    });
    if (res.ok) {
      setIsEditModalOpen(false);
      fetchCourse();
    } else {
      alert("Failed to update course.");
    }
  };

  const handleCreateModule = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('pamho_access');
    const res = await fetch(`/api/v1/modules/`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...moduleFormData, course: course.id })
    });
    if (res.ok) {
      setIsModuleModalOpen(false);
      setModuleFormData({ title: '', description: '', ordering: course.modules.length });
      fetchCourse();
    } else {
      alert("Error creating module");
    }
  };

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('pamho_access');
    const res = await fetch(`/api/v1/lessons/`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...lessonFormData, module: selectedModuleId })
    });
    if (res.ok) {
      setIsLessonModalOpen(false);
      setLessonFormData({ title: '', slug: '', description: '', lesson_type: 'text', content: '', video_url: '', ordering: 0, status: 'published' });
      fetchCourse();
    } else {
      alert("Error creating lesson. Please check slug is unique per module.");
    }
  };
  
  const handleDeleteModule = async (id: number) => {
    if(!confirm("Delete module?")) return;
    const token = localStorage.getItem('pamho_access');
    await fetch(`/api/v1/modules/${id}/`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchCourse();
  };

  const handleDeleteLesson = async (id: number) => {
    if(!confirm("Delete lesson?")) return;
    const token = localStorage.getItem('pamho_access');
    await fetch(`/api/v1/lessons/${id}/`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchCourse();
  };

  if (loading) return <div className="p-8 text-neutral-500">Loading course...</div>;
  if (!course) return null;

  return (
    <div className="p-8 pb-32">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{course.title}</h1>
          <p className="text-neutral-400 max-w-3xl mb-4">{course.short_description}</p>
          <div className="flex gap-4 items-center">
            <span className="text-xs font-mono px-2 py-1 bg-neutral-800 text-neutral-300 rounded-sm">
              Status: {course.status}
            </span>
            <button onClick={() => { setEditCourseData({ title: course.title, short_description: course.short_description }); setIsEditModalOpen(true); }} className="text-xs text-[#b48aff] hover:underline">Edit Info</button>
            {course.status !== 'published' && (
              <button onClick={() => handleUpdateCourseStatus('published')} className="text-xs text-[#8442fa] hover:underline">Publish Course</button>
            )}
            {course.status === 'published' && (
              <button onClick={() => handleUpdateCourseStatus('draft')} className="text-xs text-yellow-500 hover:underline">Revert to Draft</button>
            )}
            <button onClick={async () => {
              if(!confirm('Are you sure you want to delete this course entirely?')) return;
              const token = localStorage.getItem('pamho_access');
              await fetch(`/api/v1/courses/${slug}/`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }});
              navigate('/admin/courses');
            }} className="text-xs text-red-500 hover:underline ml-4">Delete Course</button>
          </div>
        </div>
        <button 
          onClick={() => setIsModuleModalOpen(true)}
          className="bg-[#8442fa] hover:bg-[#7232e8] text-white px-4 py-2 rounded-sm text-sm font-medium transition-colors"
        >
          + Add Module
        </button>
      </div>

      <div className="space-y-6">
        {course.modules.length === 0 ? (
          <div className="bg-[#121216] border border-neutral-800 p-12 text-center rounded-sm">
            <p className="text-neutral-500 mb-4">No modules have been added yet.</p>
          </div>
        ) : (
          course.modules.map((module: any) => (
            <div key={module.id} className="bg-[#121216] border border-neutral-800 rounded-sm overflow-hidden">
              <div className="bg-neutral-900 px-6 py-4 border-b border-neutral-800 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-white">{module.ordering + 1}. {module.title}</h3>
                  {module.description && <p className="text-sm text-neutral-400 mt-1">{module.description}</p>}
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => {
                      setSelectedModuleId(module.id);
                      setLessonFormData(prev => ({ ...prev, ordering: module.lessons.length }));
                      setIsLessonModalOpen(true);
                    }}
                    className="text-sm text-[#b48aff] hover:text-white"
                  >
                    + Add Lesson
                  </button>
                  <button onClick={() => handleDeleteModule(module.id)} className="text-sm text-red-500 hover:text-red-400">Delete</button>
                </div>
              </div>
              
              <div className="p-6">
                {module.lessons.length === 0 ? (
                  <p className="text-sm text-neutral-500 italic">No lessons in this module.</p>
                ) : (
                  <div className="space-y-2">
                    {module.lessons.map((lesson: any) => (
                      <div key={lesson.id} className="flex justify-between items-center bg-[#0a0a0c] border border-neutral-800 p-4 rounded-sm">
                        <div className="flex items-center gap-4">
                          <span className="text-xs bg-neutral-800 text-neutral-400 px-2 py-1 rounded-sm uppercase">{lesson.lesson_type}</span>
                          <span className="text-sm font-medium text-neutral-200">{lesson.ordering + 1}. {lesson.title}</span>
                        </div>
                        <button onClick={() => handleDeleteLesson(lesson.id)} className="text-xs text-neutral-500 hover:text-red-400">Remove</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Course Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#121216] border border-neutral-800 rounded-sm w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-white mb-4">Edit Course Info</h2>
            <form onSubmit={handleUpdateCourseInfo}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Title</label>
                  <input required type="text" className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white outline-none focus:border-[#8442fa]" value={editCourseData.title} onChange={e => setEditCourseData({...editCourseData, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Short Description</label>
                  <textarea className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white outline-none focus:border-[#8442fa]" rows={3} value={editCourseData.short_description} onChange={e => setEditCourseData({...editCourseData, short_description: e.target.value})} />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="bg-[#8442fa] text-white px-4 py-2 rounded-sm text-sm font-medium">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Module Modal */}
      {isModuleModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#121216] border border-neutral-800 rounded-sm w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-white mb-4">Add Module</h2>
            <form onSubmit={handleCreateModule}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Title</label>
                  <input required type="text" className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white outline-none focus:border-[#8442fa]" value={moduleFormData.title} onChange={e => setModuleFormData({...moduleFormData, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Description</label>
                  <textarea className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white outline-none focus:border-[#8442fa]" rows={3} value={moduleFormData.description} onChange={e => setModuleFormData({...moduleFormData, description: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Ordering Index</label>
                  <input required type="number" className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white outline-none focus:border-[#8442fa]" value={moduleFormData.ordering} onChange={e => setModuleFormData({...moduleFormData, ordering: parseInt(e.target.value)})} />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModuleModalOpen(false)} className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="bg-[#8442fa] text-white px-4 py-2 rounded-sm text-sm font-medium">Save Module</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lesson Modal */}
      {isLessonModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#121216] border border-neutral-800 rounded-sm w-full max-w-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Add Lesson</h2>
            <form onSubmit={handleCreateLesson}>
              <div className="space-y-4 grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm text-neutral-400 mb-1">Title</label>
                  <input required type="text" className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white outline-none focus:border-[#8442fa]" value={lessonFormData.title} onChange={e => setLessonFormData({...lessonFormData, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Slug (URL friendly)</label>
                  <input required type="text" className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white outline-none focus:border-[#8442fa]" value={lessonFormData.slug} onChange={e => setLessonFormData({...lessonFormData, slug: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Type</label>
                  <select className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white outline-none focus:border-[#8442fa]" value={lessonFormData.lesson_type} onChange={e => setLessonFormData({...lessonFormData, lesson_type: e.target.value})}>
                    <option value="text">Text Content</option>
                    <option value="video">Video</option>
                  </select>
                </div>
                
                {lessonFormData.lesson_type === 'video' && (
                  <div className="col-span-2">
                    <label className="block text-sm text-neutral-400 mb-1">Video URL (YouTube/Vimeo embed URL)</label>
                    <input type="url" className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white outline-none focus:border-[#8442fa]" value={lessonFormData.video_url} onChange={e => setLessonFormData({...lessonFormData, video_url: e.target.value})} />
                  </div>
                )}
                
                <div className="col-span-2">
                  <label className="block text-sm text-neutral-400 mb-1">Content / Reading Material</label>
                  <textarea className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white outline-none focus:border-[#8442fa] font-mono text-xs" rows={8} value={lessonFormData.content} onChange={e => setLessonFormData({...lessonFormData, content: e.target.value})} placeholder="Markdown or HTML supported..."></textarea>
                </div>
                
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Ordering Index</label>
                  <input required type="number" className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white outline-none focus:border-[#8442fa]" value={lessonFormData.ordering} onChange={e => setLessonFormData({...lessonFormData, ordering: parseInt(e.target.value)})} />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setIsLessonModalOpen(false)} className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="bg-[#8442fa] text-white px-4 py-2 rounded-sm text-sm font-medium">Save Lesson</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
