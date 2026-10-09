import { useEffect, useState } from 'react';

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    const token = localStorage.getItem('pamho_access');
    try {
      const res = await fetch('/api/v1/enquiries/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setEnquiries(data.results || data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const [activeTab, setActiveTab] = useState('All');

  const filteredEnquiries = activeTab === 'All' 
    ? enquiries 
    : enquiries.filter(e => {
        if (activeTab === 'Ambassadors') return e.enquiry_type?.toLowerCase().includes('ambassador');
        if (activeTab === 'Memberships') return e.enquiry_type?.toLowerCase().includes('member');
        if (activeTab === 'Registrations') return e.enquiry_type?.toLowerCase().includes('registration');
        return !e.enquiry_type?.toLowerCase().includes('ambassador') && !e.enquiry_type?.toLowerCase().includes('member') && !e.enquiry_type?.toLowerCase().includes('registration');
      });

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id: number, newStatus: string) => {
    const token = localStorage.getItem('pamho_access');
    try {
      const res = await fetch(`/api/v1/enquiries/${id}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setEnquiries(enquiries.map(e => e.id === id ? { ...e, status: newStatus } : e));
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    const token = localStorage.getItem('pamho_access');
    try {
      const res = await fetch(`/api/v1/enquiries/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        setEnquiries(enquiries.filter(e => e.id !== id));
      } else {
        alert("Failed to delete");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Form Submissions</h1>
          <p className="text-sm text-neutral-400">View and manage responses from all site forms.</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['All', 'Ambassadors', 'Memberships', 'Registrations', 'General Contact'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-[#8442fa] text-white'
                  : 'bg-[#121216] border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-neutral-500">Loading enquiries...</div>
      ) : enquiries.length === 0 ? (
        <div className="bg-[#121216] border border-neutral-800 p-12 text-center rounded-sm">
          <p className="text-neutral-500 mb-4">No enquiries exist yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEnquiries.map((enquiry: any) => (
            <div key={enquiry.id} className="bg-[#121216] border border-neutral-800 rounded-sm p-6 flex flex-col md:flex-row gap-6 justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-medium text-white">{enquiry.name}</h3>
                  <span className="text-xs bg-neutral-800 text-neutral-400 px-2 py-1 rounded-sm">{enquiry.enquiry_type}</span>
                </div>
                <div className="text-sm text-neutral-400 mb-4">
                  <a href={`mailto:${enquiry.email}`} className="text-[#b48aff] hover:underline">{enquiry.email}</a>
                  {enquiry.organization && ` • ${enquiry.organization}`}
                  <span className="ml-3 text-neutral-600">{new Date(enquiry.created_at).toLocaleString()}</span>
                </div>
                <div className="bg-[#0a0a0c] border border-neutral-800/50 p-4 rounded-sm text-sm text-neutral-300 whitespace-pre-wrap">
                  {enquiry.message}
                </div>
              </div>
              <div className="flex flex-col gap-3 min-w-[150px]">
                <div>
                  <label className="block text-xs text-neutral-500 mb-1">Status</label>
                  <select 
                    value={enquiry.status}
                    onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white outline-none focus:border-[#8442fa] text-sm"
                  >
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <button 
                  onClick={() => handleDelete(enquiry.id)}
                  className="text-left text-sm text-neutral-500 hover:text-red-400 transition-colors mt-auto"
                >
                  Delete Enquiry
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
