import { useEffect, useState } from 'react';

export default function AdminResources() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', slug: '', excerpt: '', status: 'draft', resource_type: 'article', content: '', external_url: '' });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({ slug: '', title: '', excerpt: '', resource_type: 'article', content: '', external_url: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchResources = async () => {
      const token = localStorage.getItem('pamho_access');
      try {
        const res = await fetch('/api/v1/resources/', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setResources(data.results || data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem('pamho_access');
    try {
      const res = await fetch('/api/v1/resources/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const newResource = await res.json();
        setResources([newResource, ...resources]);
        setIsModalOpen(false);
        setFormData({ title: '', slug: '', excerpt: '', status: 'draft', resource_type: 'article', content: '', external_url: '' });
      } else {
        const errorData = await res.json();
        alert(`Failed to create resource.\nErrors: ${JSON.stringify(errorData)}`);
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
          <h1 className="text-2xl font-bold text-white mb-2">Manage Resources</h1>
          <p className="text-sm text-neutral-400">View and manage knowledge base resources.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#8442fa] hover:bg-[#7232e8] text-white px-4 py-2 rounded-sm text-sm font-medium transition-colors"
        >
          + Create Resource
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#121216] border border-neutral-800 rounded-sm w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-white mb-4">Create New Resource</h2>
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
                  <label className="block text-sm text-neutral-400 mb-1">Type</label>
                  <select className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white outline-none focus:border-[#8442fa]" value={formData.resource_type} onChange={e => setFormData({...formData, resource_type: e.target.value})}>
                    <option value="article">Article & Perspectives</option>
                    <option value="report">Reports & Publications</option>
                    <option value="public_resource">Public Resources</option>
                    <option value="institutional_news">Institutional News</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">External URL (optional)</label>
                  <input type="url" className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white outline-none focus:border-[#8442fa]" value={formData.external_url} onChange={e => setFormData({...formData, external_url: e.target.value})} placeholder="https://..." />
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
                  <label className="block text-sm text-neutral-400 mb-1">Excerpt</label>
                  <textarea required className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white outline-none focus:border-[#8442fa]" rows={3} value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Content / Article Body (HTML/Markdown)</label>
                  <textarea className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white outline-none focus:border-[#8442fa] font-mono text-xs" rows={6} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="bg-[#8442fa] text-white px-4 py-2 rounded-sm text-sm font-medium disabled:opacity-50">
                  {isSubmitting ? 'Creating...' : 'Create Resource'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Resource Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#121216] border border-neutral-800 rounded-sm w-full max-w-md p-6 overflow-y-auto max-h-screen">
            <h2 className="text-xl font-bold text-white mb-4">Edit Resource Info</h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              setIsSubmitting(true);
              const token = localStorage.getItem('pamho_access');
              try {
                const res = await fetch(`/api/v1/resources/${editFormData.slug}/`, {
                  method: 'PATCH',
                  headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                  body: JSON.stringify(editFormData)
                });
                if (res.ok) {
                  const updated = await res.json();
                  setResources(resources.map(r => r.id === updated.id ? updated : r));
                  setIsEditModalOpen(false);
                } else {
                  alert("Failed to update resource.");
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
                  <label className="block text-sm text-neutral-400 mb-1">Type</label>
                  <select className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white outline-none focus:border-[#8442fa]" value={editFormData.resource_type} onChange={e => setEditFormData({...editFormData, resource_type: e.target.value})}>
                    <option value="article">Article & Perspectives</option>
                    <option value="report">Reports & Publications</option>
                    <option value="public_resource">Public Resources</option>
                    <option value="institutional_news">Institutional News</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">External URL (optional)</label>
                  <input type="url" className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white outline-none focus:border-[#8442fa]" value={editFormData.external_url} onChange={e => setEditFormData({...editFormData, external_url: e.target.value})} placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Excerpt</label>
                  <textarea required className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white outline-none focus:border-[#8442fa]" rows={3} value={editFormData.excerpt} onChange={e => setEditFormData({...editFormData, excerpt: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Content / Article Body (HTML/Markdown)</label>
                  <textarea className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white outline-none focus:border-[#8442fa] font-mono text-xs" rows={6} value={editFormData.content} onChange={e => setEditFormData({...editFormData, content: e.target.value})} />
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
        <div className="text-neutral-500">Loading resources...</div>
      ) : resources.length === 0 ? (
        <div className="bg-[#121216] border border-neutral-800 p-12 text-center rounded-sm">
          <p className="text-neutral-500 mb-4">No resources exist yet.</p>
        </div>
      ) : (
        <div className="bg-[#121216] border border-neutral-800 rounded-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-900 border-b border-neutral-800">
                <th className="px-6 py-4 text-xs font-medium text-neutral-400 uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-xs font-medium text-neutral-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-medium text-neutral-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-medium text-neutral-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {resources.map((resource: any) => (
                <tr key={resource.id} className="hover:bg-neutral-900/50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-white">{resource.title}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-400">
                    {resource.resource_type}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono px-2 py-1 bg-neutral-800 text-neutral-300 rounded-sm">
                      {resource.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={async () => {
                        const token = localStorage.getItem('pamho_access');
                        const newStatus = resource.status === 'published' ? 'draft' : 'published';
                        await fetch(`/api/v1/resources/${resource.slug}/`, {
                          method: 'PATCH',
                          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                          body: JSON.stringify({ status: newStatus })
                        });
                        setResources(resources.map(r => r.id === resource.id ? { ...r, status: newStatus } : r));
                      }}
                      className="text-sm text-[#b48aff] hover:text-white transition-colors mr-4"
                    >
                      {resource.status === 'published' ? 'Unpublish' : 'Publish'}
                    </button>
                    <button 
                      onClick={() => {
                        setEditFormData({ slug: resource.slug, title: resource.title, excerpt: resource.excerpt, resource_type: resource.resource_type, content: resource.content || '', external_url: resource.external_url || '' });
                        setIsEditModalOpen(true);
                      }}
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors mr-4"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={async () => {
                        if(!confirm('Are you sure you want to delete this resource?')) return;
                        const token = localStorage.getItem('pamho_access');
                        await fetch(`/api/v1/resources/${resource.slug}/`, {
                          method: 'DELETE',
                          headers: { 'Authorization': `Bearer ${token}` }
                        });
                        setResources(resources.filter(r => r.id !== resource.id));
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
