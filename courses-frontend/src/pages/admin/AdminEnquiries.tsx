import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface WaitlistEntry {
  id: number;
  full_name: string;
  email: string;
  country: string;
  role: string;
  whatsapp?: string;
  organisation?: string;
  motivation?: string;
  heard_about?: string;
  interested_future: boolean;
  agreed_to_contact: boolean;
  created_at: string;
}

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedWaitlistEntry, setSelectedWaitlistEntry] = useState<WaitlistEntry | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem('pamho_access');
    const headers: Record<string, string> = token ? { 'Authorization': `Bearer ${token}` } : {};

    try {
      const [enqRes, waitRes] = await Promise.all([
        fetch('/api/v1/enquiries/', { headers }).catch(() => null),
        fetch('/api/v1/waitlist/', { headers }).catch(() => null),
      ]);

      if (enqRes && enqRes.ok) {
        const enqData = await enqRes.json();
        setEnquiries(Array.isArray(enqData) ? enqData : (enqData.results || []));
      }

      if (waitRes && waitRes.ok) {
        const waitData = await waitRes.json();
        setWaitlistEntries(Array.isArray(waitData) ? waitData : (waitData.results || []));
      }
    } catch (err) {
      console.error('Error fetching submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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

  const handleDeleteEnquiry = async (id: number) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    const token = localStorage.getItem('pamho_access');
    try {
      const res = await fetch(`/api/v1/enquiries/${id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setEnquiries(enquiries.filter(e => e.id !== id));
      } else {
        alert("Failed to delete enquiry");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  const handleDeleteWaitlist = async (id: number) => {
    if (!confirm("Are you sure you want to remove this course waitlist applicant?")) return;
    const token = localStorage.getItem('pamho_access');
    try {
      const res = await fetch(`/api/v1/waitlist/${id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setWaitlistEntries(waitlistEntries.filter(w => w.id !== id));
        if (selectedWaitlistEntry?.id === id) setSelectedWaitlistEntry(null);
      } else {
        alert("Failed to delete waitlist entry");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  // Convert waitlist entries into a unified submission format for the "All" view
  const formattedWaitlistSubmissions = waitlistEntries.map(w => ({
    id: `waitlist-${w.id}`,
    rawId: w.id,
    isWaitlist: true,
    name: w.full_name,
    email: w.email,
    enquiry_type: 'Course Waitlist (CMHA)',
    organization: w.organisation || `${w.role} · ${w.country}`,
    country: w.country,
    role: w.role,
    whatsapp: w.whatsapp,
    message: `Role: ${w.role.toUpperCase()} | Country: ${w.country}${w.whatsapp ? ` | WhatsApp: ${w.whatsapp}` : ''}\n${w.organisation ? `Organization: ${w.organisation}\n` : ''}\nMotivation / Goals:\n${w.motivation || 'N/A'}\n\nHeard via: ${w.heard_about || 'Website'}${w.interested_future ? ' | [Interested in future cohorts: Yes]' : ''}`,
    status: 'waitlisted',
    created_at: w.created_at,
    rawEntry: w,
  }));

  const allSubmissions = [...enquiries, ...formattedWaitlistSubmissions].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const filteredSubmissions = () => {
    if (activeTab === 'All') return allSubmissions;
    if (activeTab === 'Course Waitlist') return formattedWaitlistSubmissions;
    if (activeTab === 'Ambassadors') return enquiries.filter(e => e.enquiry_type?.toLowerCase().includes('ambassador'));
    if (activeTab === 'Memberships') return enquiries.filter(e => e.enquiry_type?.toLowerCase().includes('member'));
    if (activeTab === 'Registrations') return enquiries.filter(e => e.enquiry_type?.toLowerCase().includes('registration'));
    // General Contact
    return enquiries.filter(e => 
      !e.enquiry_type?.toLowerCase().includes('ambassador') && 
      !e.enquiry_type?.toLowerCase().includes('member') && 
      !e.enquiry_type?.toLowerCase().includes('registration')
    );
  };

  const tabs = [
    { name: 'All', count: allSubmissions.length },
    { name: 'Course Waitlist', count: waitlistEntries.length },
    { name: 'Ambassadors', count: enquiries.filter(e => e.enquiry_type?.toLowerCase().includes('ambassador')).length },
    { name: 'Memberships', count: enquiries.filter(e => e.enquiry_type?.toLowerCase().includes('member')).length },
    { name: 'Registrations', count: enquiries.filter(e => e.enquiry_type?.toLowerCase().includes('registration')).length },
    { name: 'General Contact', count: enquiries.filter(e => !e.enquiry_type?.toLowerCase().includes('ambassador') && !e.enquiry_type?.toLowerCase().includes('member') && !e.enquiry_type?.toLowerCase().includes('registration')).length },
  ];

  const displayedList = filteredSubmissions();

  return (
    <div className="p-8">
      {/* Top Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Form Submissions</h1>
          <p className="text-sm text-neutral-400">
            View and manage all responses from site forms, registrations, and course waitlists.
          </p>
        </div>

        {/* Dedicated Course Waitlist Hub Shortcut */}
        <div className="flex items-center gap-3">
          <Link
            to="/admin/waitlist"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#8442fa]/20 hover:bg-[#8442fa]/30 border border-[#8442fa]/40 text-[#b48aff] text-xs font-mono uppercase tracking-wider rounded-sm transition-colors"
          >
            <span>Course Waitlist Hub (Export CSV/PDF)</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 border-b border-neutral-800">
        {tabs.map(tab => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === tab.name
                ? 'bg-[#8442fa] text-white'
                : 'bg-[#121216] border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600'
            }`}
          >
            <span>{tab.name}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              activeTab === tab.name ? 'bg-white/20 text-white' : 'bg-neutral-800 text-neutral-400'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Course Waitlist Banner reminder if activeTab is Course Waitlist or All */}
      {waitlistEntries.length > 0 && (activeTab === 'All' || activeTab === 'Course Waitlist') && (
        <div className="mb-6 p-4 bg-[#8442fa]/10 border border-[#8442fa]/30 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8442fa] animate-pulse"></span>
            <div>
              <p className="text-sm font-medium text-white">
                <span className="text-[#b48aff] font-bold">{waitlistEntries.length}</span> candidate{waitlistEntries.length === 1 ? '' : 's'} registered for the <span className="text-white font-semibold">Certified Mental Health Advocate (CMHA)</span> programme.
              </p>
              <p className="text-xs text-neutral-400 mt-0.5">Founding Cohort I · Launching 23 January 2027</p>
            </div>
          </div>
          <Link
            to="/admin/waitlist"
            className="shrink-0 px-3 py-1.5 bg-[#8442fa] text-white hover:bg-[#7232e0] text-xs font-mono uppercase tracking-wider rounded-sm transition-colors text-center"
          >
            Open Dedicated Table &rarr;
          </Link>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="text-neutral-500 py-12 text-center">Loading submissions...</div>
      ) : displayedList.length === 0 ? (
        <div className="bg-[#121216] border border-neutral-800 p-12 text-center rounded-sm">
          <p className="text-neutral-400 mb-2">No submissions found in {activeTab}.</p>
          <p className="text-xs text-neutral-500">Submissions made across the PAMHO website will appear here automatically.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedList.map((item: any) => {
            const isWaitlist = Boolean(item.isWaitlist);

            return (
              <div 
                key={item.id} 
                className={`bg-[#121216] border rounded-sm p-6 flex flex-col md:flex-row gap-6 justify-between transition-colors ${
                  isWaitlist ? 'border-[#8442fa]/40 hover:border-[#8442fa]' : 'border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-lg font-medium text-white">{item.name}</h3>
                    
                    {isWaitlist ? (
                      <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-sm bg-[#8442fa]/20 text-[#b48aff] border border-[#8442fa]/30">
                        Course Waitlist: CMHA
                      </span>
                    ) : (
                      <span className="text-xs bg-neutral-800 text-neutral-400 px-2.5 py-1 rounded-sm">
                        {item.enquiry_type}
                      </span>
                    )}

                    {isWaitlist && item.role && (
                      <span className="text-xs uppercase font-mono px-2 py-0.5 rounded-sm bg-neutral-800 text-neutral-300">
                        {item.role}
                      </span>
                    )}

                    {isWaitlist && item.country && (
                      <span className="text-xs font-mono px-2 py-0.5 rounded-sm bg-neutral-900 border border-neutral-800 text-neutral-400">
                        📍 {item.country}
                      </span>
                    )}
                  </div>

                  <div className="text-sm text-neutral-400 mb-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <a href={`mailto:${item.email}`} className="text-[#b48aff] hover:underline font-mono">
                      {item.email}
                    </a>
                    
                    {isWaitlist && item.whatsapp && (
                      <a 
                        href={`https://wa.me/${item.whatsapp.replace(/[^0-9]/g, '')}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-emerald-400 hover:underline font-mono text-xs"
                      >
                        📱 {item.whatsapp}
                      </a>
                    )}

                    {item.organization && (
                      <span className="text-neutral-500">• {item.organization}</span>
                    )}

                    <span className="text-neutral-600 font-mono text-xs">
                      • {new Date(item.created_at).toLocaleString()}
                    </span>
                  </div>

                  <div className="bg-[#0a0a0c] border border-neutral-800/60 p-4 rounded-sm text-sm text-neutral-300 whitespace-pre-wrap font-sans leading-relaxed">
                    {item.message}
                  </div>
                </div>

                <div className="flex flex-col gap-3 min-w-[160px] justify-between border-t md:border-t-0 md:border-l border-neutral-800 pt-4 md:pt-0 md:pl-6">
                  {isWaitlist ? (
                    <div>
                      <label className="block text-xs font-mono text-neutral-500 mb-1 uppercase tracking-wider">
                        Applicant Status
                      </label>
                      <div className="px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono rounded-sm">
                        Waitlisted (Cohort I)
                      </div>
                      
                      <button
                        onClick={() => setSelectedWaitlistEntry(item.rawEntry)}
                        className="mt-2 w-full text-left px-2 py-1.5 text-xs text-[#b48aff] hover:underline block"
                      >
                        Inspect Application &rarr;
                      </button>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs text-neutral-500 mb-1">Status</label>
                      <select 
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white outline-none focus:border-[#8442fa] text-sm"
                      >
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  )}

                  <div className="pt-2">
                    {isWaitlist ? (
                      <button 
                        onClick={() => handleDeleteWaitlist(item.rawId)}
                        className="text-left text-xs font-mono text-neutral-500 hover:text-red-400 transition-colors"
                      >
                        Remove Applicant
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleDeleteEnquiry(item.id)}
                        className="text-left text-xs font-mono text-neutral-500 hover:text-red-400 transition-colors"
                      >
                        Delete Enquiry
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Inspect Modal for Waitlist Applicant */}
      {selectedWaitlistEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121216] border border-neutral-700 max-w-2xl w-full p-8 rounded-sm shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-start justify-between mb-6 pb-4 border-b border-neutral-800">
              <div>
                <span className="text-xs font-mono uppercase text-[#8442fa] tracking-widest">
                  Founding Cohort Applicant
                </span>
                <h2 className="text-2xl font-bold text-white mt-1">{selectedWaitlistEntry.full_name}</h2>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  Applied on {new Date(selectedWaitlistEntry.created_at).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedWaitlistEntry(null)}
                className="text-neutral-400 hover:text-white text-xl p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div className="bg-[#0a0a0c] p-3 rounded border border-neutral-800/60">
                <div className="text-xs text-neutral-500 font-mono">Email</div>
                <div className="text-white font-mono break-all mt-0.5">{selectedWaitlistEntry.email}</div>
              </div>
              <div className="bg-[#0a0a0c] p-3 rounded border border-neutral-800/60">
                <div className="text-xs text-neutral-500 font-mono">WhatsApp</div>
                <div className="text-white font-mono mt-0.5">{selectedWaitlistEntry.whatsapp || '—'}</div>
              </div>
              <div className="bg-[#0a0a0c] p-3 rounded border border-neutral-800/60">
                <div className="text-xs text-neutral-500 font-mono">Country</div>
                <div className="text-white mt-0.5">{selectedWaitlistEntry.country}</div>
              </div>
              <div className="bg-[#0a0a0c] p-3 rounded border border-neutral-800/60">
                <div className="text-xs text-neutral-500 font-mono">Role</div>
                <div className="text-white capitalize mt-0.5">{selectedWaitlistEntry.role}</div>
              </div>
              <div className="bg-[#0a0a0c] p-3 rounded border border-neutral-800/60 col-span-2">
                <div className="text-xs text-neutral-500 font-mono">Organisation / Institution</div>
                <div className="text-white mt-0.5">{selectedWaitlistEntry.organisation || 'Independent'}</div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-xs text-neutral-500 font-mono uppercase tracking-wider mb-2">
                Motivation / Intent for Enrolling
              </div>
              <div className="bg-[#0a0a0c] p-4 rounded border border-neutral-800 text-neutral-200 text-sm whitespace-pre-wrap leading-relaxed">
                {selectedWaitlistEntry.motivation || 'No motivation statement provided.'}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-neutral-800">
              <Link
                to="/admin/waitlist"
                className="text-xs text-[#b48aff] hover:underline font-mono"
              >
                Go to Full Waitlist Hub &rarr;
              </Link>
              <button
                onClick={() => setSelectedWaitlistEntry(null)}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono uppercase tracking-wider rounded-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
