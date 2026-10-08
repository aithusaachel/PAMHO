import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', slug: '', short_description: '', status: 'draft' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem('pamho_access');
      try {
        const res = await fetch('/api/v1/courses/', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setCourses(data.results || data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem('pamho_access');
    try {
      const res = await fetch('/api/v1/courses/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const newCourse = await res.json();
        setCourses([newCourse, ...courses]);
        setIsModalOpen(false);
        setFormData({ title: '', slug: '', short_description: '', status: 'draft' });
      } else if (res.status === 401) {
        alert("Your session has expired. Please refresh the page and log in again.");
      } else {
        const errorData = await res.json();
        alert(`Failed to create course. Errors: ${JSON.stringify(errorData)}`);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Manage Courses</h1>
          <p className="text-sm text-neutral-400">View and manage learning courses.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#8442fa] hover:bg-[#7232e8] text-white px-4 py-2 rounded-sm text-sm font-medium transition-colors"
        >
          + Create Course
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#121216] border border-neutral-800 rounded-sm w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-white mb-4">Create New Course</h2>
            <form onSubmit={handleCreate}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Title</label>
                  <input required type="text" className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white outline-none focus:border-[#8442fa]" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Slug (URL friendly)</label>
                  <input required type="text" className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white outline-none focus:border-[#8442fa]" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Status</label>
                  <select className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white outline-none focus:border-[#8442fa]" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Short Description</label>
                  <textarea required className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white outline-none focus:border-[#8442fa]" rows={3} value={formData.short_description} onChange={e => setFormData({...formData, short_description: e.target.value})} />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="bg-[#8442fa] text-white px-4 py-2 rounded-sm text-sm font-medium disabled:opacity-50">
                  {isSubmitting ? 'Creating...' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-neutral-500">Loading courses...</div>
      ) : courses.length === 0 ? (
        <div className="bg-[#121216] border border-neutral-800 p-12 text-center rounded-sm">
          <p className="text-neutral-500 mb-4">No courses exist yet.</p>
        </div>
      ) : (
        <div className="bg-[#121216] border border-neutral-800 rounded-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-900 border-b border-neutral-800">
                <th className="px-6 py-4 text-xs font-medium text-neutral-400 uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-xs font-medium text-neutral-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-medium text-neutral-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {courses.map((course: any) => (
                <tr key={course.id} className="hover:bg-neutral-900/50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-white">{course.title}</div>
                    <div className="text-xs text-neutral-500">{course.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono px-2 py-1 bg-neutral-800 text-neutral-300 rounded-sm">
                      {course.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/admin/courses/${course.slug}`} className="text-sm text-[#b48aff] hover:text-white transition-colors mr-4">Manage</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
