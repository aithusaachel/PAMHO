import { useEffect, useState } from 'react';

export default function AdminPrograms() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', slug: '', description: '', status: 'draft', zoom_enabled: false });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({ slug: '', title: '', description: '', zoom_enabled: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPrograms = async () => {
      const token = localStorage.getItem('pamho_access');
      try {
        const res = await fetch('/api/v1/programs/', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setPrograms(data.results || data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem('pamho_access');
    try {
      const res = await fetch('/api/v1/programs/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const newProgram = await res.json();
        setPrograms([newProgram, ...programs]);
        setIsModalOpen(false);
        setFormData({ title: '', slug: '', description: '', status: 'draft', zoom_enabled: false });
      } else {
        alert("Failed to create program. Please check slug is unique.");
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
          <h1 className="text-2xl font-bold text-white mb-2">Manage Programs</h1>
          <p className="text-sm text-neutral-400">View and manage PAMHO programs/events.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#8442fa] hover:bg-[#7232e8] text-white px-4 py-2 rounded-sm text-sm font-medium transition-colors"
        >
          + Create Program
        </button>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#121216] border border-neutral-800 rounded-sm w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-white mb-4">Create New Program</h2>
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
                  <label className="block text-sm text-neutral-400 mb-1">Description</label>
                  <textarea required className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white outline-none focus:border-[#8442fa]" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="zoomToggle" checked={formData.zoom_enabled} onChange={e => setFormData({...formData, zoom_enabled: e.target.checked})} />
                  <label htmlFor="zoomToggle" className="text-sm text-neutral-400">Enable Live Zoom Meeting Integration</label>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="bg-[#8442fa] text-white px-4 py-2 rounded-sm text-sm font-medium disabled:opacity-50">
                  {isSubmitting ? 'Creating...' : 'Create Program'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Program Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#121216] border border-neutral-800 rounded-sm w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-white mb-4">Edit Program Info</h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              setIsSubmitting(true);
              const token = localStorage.getItem('pamho_access');
              try {
                const res = await fetch(`/api/v1/programs/${editFormData.slug}/`, {
                  method: 'PATCH',
                  headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                  body: JSON.stringify(editFormData)
                });
                if (res.ok) {
                  const updated = await res.json();
                  setPrograms(programs.map(p => p.id === updated.id ? updated : p));
                  setIsEditModalOpen(false);
                } else {
                  alert("Failed to update program.");
                }
              } catch (err) {
                console.error(err);
              } finally {
                setIsSubmitting(false);
              }
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Title</label>
                  <input required type="text" className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white outline-none focus:border-[#8442fa]" value={editFormData.title} onChange={e => setEditFormData({...editFormData, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Description</label>
                  <textarea required className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white outline-none focus:border-[#8442fa]" rows={3} value={editFormData.description} onChange={e => setEditFormData({...editFormData, description: e.target.value})} />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="zoomToggleEdit" checked={editFormData.zoom_enabled} onChange={e => setEditFormData({...editFormData, zoom_enabled: e.target.checked})} />
                  <label htmlFor="zoomToggleEdit" className="text-sm text-neutral-400">Enable Live Zoom Meeting Integration</label>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="bg-[#8442fa] text-white px-4 py-2 rounded-sm text-sm font-medium disabled:opacity-50">
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {loading ? (
        <div className="text-neutral-500">Loading programs...</div>
      ) : programs.length === 0 ? (
        <div className="bg-[#121216] border border-neutral-800 p-12 text-center rounded-sm">
          <p className="text-neutral-500 mb-4">No programs exist yet.</p>
        </div>
      ) : (
        <div className="bg-[#121216] border border-neutral-800 rounded-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-900 border-b border-neutral-800">
                <th className="px-6 py-4 text-xs font-medium text-neutral-400 uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-xs font-medium text-neutral-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-medium text-neutral-400 uppercase tracking-wider">Zoom</th>
                <th className="px-6 py-4 text-xs font-medium text-neutral-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {programs.map((program: any) => (
                <tr key={program.id} className="hover:bg-neutral-900/50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-white">{program.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono px-2 py-1 bg-neutral-800 text-neutral-300 rounded-sm">
                      {program.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-400">
                    {program.zoom_enabled ? 'Enabled' : 'Disabled'}
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={async () => {
                        const token = localStorage.getItem('pamho_access');
                        const newStatus = program.status === 'published' ? 'draft' : 'published';
                        await fetch(`/api/v1/programs/${program.slug}/`, {
                          method: 'PATCH',
                          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                          body: JSON.stringify({ status: newStatus })
                        });
                        setPrograms(programs.map(p => p.id === program.id ? { ...p, status: newStatus } : p));
                      }}
                      className="text-sm text-[#b48aff] hover:text-white transition-colors mr-4"
                    >
                      {program.status === 'published' ? 'Unpublish' : 'Publish'}
                    </button>
                    <button 
                      onClick={() => {
                        setEditFormData({ slug: program.slug, title: program.title, description: program.description, zoom_enabled: program.zoom_enabled });
                        setIsEditModalOpen(true);
                      }}
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors mr-4"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={async () => {
                        if(!confirm('Are you sure you want to delete this program?')) return;
                        const token = localStorage.getItem('pamho_access');
                        await fetch(`/api/v1/programs/${program.slug}/`, {
                          method: 'DELETE',
                          headers: { 'Authorization': `Bearer ${token}` }
                        });
                        setPrograms(programs.filter(p => p.id !== program.id));
                      }}
                      className="text-sm text-red-500 hover:text-red-400 transition-colors"
                    >
                      Delete
                    </button>
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
