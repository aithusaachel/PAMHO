import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

export default function AdminWaitlist() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedEntry, setSelectedEntry] = useState<WaitlistEntry | null>(null);

  const fetchWaitlist = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('pamho_access');
    try {
      const res = await fetch('/api/v1/waitlist/', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.results || []);
        setEntries(list);
      } else if (res.status === 401 || res.status === 403) {
        setError('Authentication or permission required. Please log in with an administrator account.');
      } else {
        setError(`Failed to load waitlist entries (Error ${res.status}).`);
      }
    } catch (err) {
      console.error('Failed to load waitlist submissions', err);
      setError('Network error while connecting to PAMHO backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWaitlist();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this waitlist entry?')) return;
    const token = localStorage.getItem('pamho_access');
    try {
      const res = await fetch(`/api/v1/waitlist/${id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setEntries(entries.filter(e => e.id !== id));
        if (selectedEntry?.id === id) setSelectedEntry(null);
      } else {
        alert('Failed to delete waitlist entry.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while deleting.');
    }
  };

  const filteredEntries = entries.filter(e => {
    const q = search.toLowerCase();
    const matchesSearch = 
      e.full_name?.toLowerCase().includes(q) ||
      e.email?.toLowerCase().includes(q) ||
      e.country?.toLowerCase().includes(q) ||
      e.organisation?.toLowerCase().includes(q);
    
    const matchesRole = roleFilter === 'all' || e.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const exportToCSV = () => {
    if (!filteredEntries.length) return alert('No waitlist data to export');
    
    const headers = ['ID', 'Full Name', 'Email', 'Country', 'Role', 'WhatsApp', 'Organisation', 'Motivation', 'Heard About', 'Future Interest', 'Agreed To Contact', 'Submitted At'];
    const rows = [headers.join(',')];

    filteredEntries.forEach(item => {
      const row = [
        item.id,
        `"${(item.full_name || '').replace(/"/g, '""')}"`,
        `"${(item.email || '').replace(/"/g, '""')}"`,
        `"${(item.country || '').replace(/"/g, '""')}"`,
        `"${(item.role || '').replace(/"/g, '""')}"`,
        `"${(item.whatsapp || '').replace(/"/g, '""')}"`,
        `"${(item.organisation || '').replace(/"/g, '""')}"`,
        `"${(item.motivation || '').replace(/"/g, '""')}"`,
        `"${(item.heard_about || '').replace(/"/g, '""')}"`,
        item.interested_future ? 'Yes' : 'No',
        item.agreed_to_contact ? 'Yes' : 'No',
        item.created_at ? new Date(item.created_at).toISOString() : ''
      ];
      rows.push(row.join(','));
    });

    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `pamho_course_waitlist_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    if (!filteredEntries.length) return alert('No waitlist data to export');
    const doc = new jsPDF({ orientation: 'landscape' });

    doc.setFontSize(14);
    doc.text('PAMHO INSTITUTE — CERTIFIED MENTAL HEALTH ADVOCATE WAITLIST', 14, 15);
    doc.setFontSize(10);
    doc.text(`Total Applicants: ${filteredEntries.length} | Export Date: ${new Date().toLocaleDateString()}`, 14, 22);

    const head = [['#', 'NAME', 'EMAIL', 'COUNTRY', 'ROLE', 'ORGANISATION', 'WHATSAPP', 'FUTURE INTEREST', 'SUBMITTED']];
    const body = filteredEntries.map((item, idx) => [
      idx + 1,
      item.full_name || '—',
      item.email || '—',
      item.country || '—',
      item.role ? item.role.replace('_', ' ').toUpperCase() : '—',
      item.organisation || '—',
      item.whatsapp || '—',
      item.interested_future ? 'YES' : 'NO',
      item.created_at ? new Date(item.created_at).toLocaleDateString() : '—'
    ]);

    autoTable(doc, {
      head,
      body,
      startY: 28,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [132, 66, 250] }
    });

    doc.save(`pamho_course_waitlist_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const getRoleBadge = (role: string) => {
    const formatted = (role || 'other').replace('_', ' ');
    return (
      <span className="px-2.5 py-1 text-xs rounded-sm uppercase tracking-wider font-mono font-medium bg-[#8442fa]/10 text-[#b48aff] border border-[#8442fa]/20">
        {formatted}
      </span>
    );
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase font-mono tracking-widest text-[#8442fa]">PAMHO Institute</span>
            <span className="text-neutral-600">/</span>
            <span className="text-xs uppercase font-mono tracking-widest text-neutral-400">Cohort I</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Course Waitlist Submissions</h1>
          <p className="text-sm text-neutral-400">
            Review candidate applications and priority waitlist entries for the Certified Mental Health Advocate programme.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={exportToCSV}
            className="px-4 py-2.5 bg-[#121216] border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 text-xs uppercase font-mono tracking-wider rounded-sm transition-colors"
          >
            Export CSV
          </button>
          <button
            onClick={exportToPDF}
            className="px-4 py-2.5 bg-[#8442fa] text-white hover:bg-[#7232e0] text-xs uppercase font-mono tracking-wider rounded-sm transition-colors font-medium"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#121216] border border-neutral-800 p-6 rounded-sm">
          <div className="text-neutral-500 text-xs font-mono uppercase tracking-wider mb-2">Total Applicants</div>
          <div className="text-3xl font-bold text-white">{entries.length}</div>
          <div className="text-xs text-neutral-500 mt-2">Waitlist capacity: 40 seats for Cohort I</div>
        </div>

        <div className="bg-[#121216] border border-neutral-800 p-6 rounded-sm">
          <div className="text-neutral-500 text-xs font-mono uppercase tracking-wider mb-2">Countries Represented</div>
          <div className="text-3xl font-bold text-white">
            {new Set(entries.map(e => e.country?.toLowerCase().trim()).filter(Boolean)).size}
          </div>
          <div className="text-xs text-neutral-500 mt-2">Pan-African geographic reach</div>
        </div>

        <div className="bg-[#121216] border border-neutral-800 p-6 rounded-sm">
          <div className="text-neutral-500 text-xs font-mono uppercase tracking-wider mb-2">Future Cohort Interest</div>
          <div className="text-3xl font-bold text-white">
            {entries.filter(e => e.interested_future).length}
          </div>
          <div className="text-xs text-neutral-500 mt-2">
            {entries.length ? `${Math.round((entries.filter(e => e.interested_future).length / entries.length) * 100)}% opt-in rate` : '0%'}
          </div>
        </div>

        <div className="bg-[#121216] border border-neutral-800 p-6 rounded-sm">
          <div className="text-neutral-500 text-xs font-mono uppercase tracking-wider mb-2">Target Launch Date</div>
          <div className="text-2xl font-bold text-[#b48aff]">1 Nov 2026</div>
          <div className="text-xs text-neutral-500 mt-2">Enrolment opens (48-hr advance notice)</div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-[#121216] border border-neutral-800 p-4 rounded-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-96">
          <input
            type="text"
            placeholder="Search by name, email, country, or organization..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#0a0a0c] border border-neutral-800 rounded-sm px-4 py-2.5 text-sm text-[#f4f2ee] placeholder-neutral-500 focus:border-[#8442fa] outline-none"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <label className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Role:</label>
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="bg-[#0a0a0c] border border-neutral-800 rounded-sm px-3 py-2 text-sm text-[#f4f2ee] focus:border-[#8442fa] outline-none"
          >
            <option value="all">All Roles</option>
            <option value="student">Student / Postgraduate</option>
            <option value="community_leader">Community Leader / Activist</option>
            <option value="healthcare">Healthcare / Public Health Worker</option>
            <option value="educator">Educator / Academic</option>
            <option value="faith_leader">Faith / Pastoral Leader</option>
            <option value="corporate_hr">Workplace Wellbeing / HR</option>
            <option value="other">Other Champions</option>
          </select>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-950/40 border border-red-800/60 rounded-sm flex items-center justify-between text-sm text-red-200">
          <div className="flex items-center gap-2">
            <span className="text-red-400 font-bold">⚠️</span>
            <span>{error}</span>
          </div>
          <button
            onClick={fetchWaitlist}
            className="px-3 py-1 bg-red-900/60 hover:bg-red-800 text-white text-xs uppercase font-mono tracking-wider rounded-sm transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="py-24 text-center text-neutral-500">Loading waitlist submissions...</div>
      ) : filteredEntries.length === 0 ? (
        <div className="py-24 text-center bg-[#121216] border border-neutral-800 rounded-sm">
          <p className="text-lg text-neutral-400 mb-2">No waitlist submissions found.</p>
          <p className="text-sm text-neutral-600">
            {search || roleFilter !== 'all' ? 'Try adjusting your search filters.' : 'New applications will appear here as soon as candidates submit the waitlist form.'}
          </p>
        </div>
      ) : (
        <div className="bg-[#121216] border border-neutral-800 rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 font-mono text-xs uppercase tracking-wider bg-[#0d0d10]">
                  <th className="py-4 px-6">Applicant</th>
                  <th className="py-4 px-6">Location</th>
                  <th className="py-4 px-6">Primary Role</th>
                  <th className="py-4 px-6">Organization</th>
                  <th className="py-4 px-6">Future Interest</th>
                  <th className="py-4 px-6">Submitted</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {filteredEntries.map(entry => (
                  <tr key={entry.id} className="hover:bg-neutral-900/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-semibold text-white">{entry.full_name}</div>
                      <a href={`mailto:${entry.email}`} className="text-xs text-[#b48aff] hover:underline">
                        {entry.email}
                      </a>
                      {entry.whatsapp && (
                        <div className="text-xs text-neutral-500 mt-0.5">
                          WA: {entry.whatsapp}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6 text-neutral-300">
                      {entry.country}
                    </td>
                    <td className="py-4 px-6">
                      {getRoleBadge(entry.role)}
                    </td>
                    <td className="py-4 px-6 text-neutral-400">
                      {entry.organisation || '—'}
                    </td>
                    <td className="py-4 px-6">
                      {entry.interested_future ? (
                        <span className="text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-2 py-0.5 rounded-sm">
                          Yes
                        </span>
                      ) : (
                        <span className="text-xs text-neutral-600">No</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-neutral-500 font-mono text-xs">
                      {entry.created_at ? new Date(entry.created_at).toLocaleDateString() : '—'}
                    </td>
                    <td className="py-4 px-6 text-right space-x-3">
                      <button
                        onClick={() => setSelectedEntry(entry)}
                        className="text-xs text-[#b48aff] hover:text-white uppercase font-mono tracking-wider transition-colors"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="text-xs text-neutral-600 hover:text-red-400 uppercase font-mono tracking-wider transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#121216] border border-neutral-800 rounded-sm max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-neutral-800 pb-4 mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#8442fa] mb-1 block">Application Details</span>
                <h3 className="text-2xl font-bold text-white">{selectedEntry.full_name}</h3>
              </div>
              <button
                onClick={() => setSelectedEntry(null)}
                className="text-neutral-500 hover:text-white p-2 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-1">Email Address</span>
                <a href={`mailto:${selectedEntry.email}`} className="text-white hover:text-[#b48aff]">
                  {selectedEntry.email}
                </a>
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-1">Country</span>
                <span className="text-white">{selectedEntry.country}</span>
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-1">Role / Background</span>
                <div>{getRoleBadge(selectedEntry.role)}</div>
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-1">WhatsApp</span>
                <span className="text-white">{selectedEntry.whatsapp || '—'}</span>
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-1">Organization</span>
                <span className="text-white">{selectedEntry.organisation || '—'}</span>
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-1">Heard About Us</span>
                <span className="text-white capitalize">{(selectedEntry.heard_about || '—').replace('_', ' ')}</span>
              </div>
            </div>

            {selectedEntry.motivation && (
              <div className="border-t border-neutral-800 pt-6 mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-2">
                  What draws candidate to advocacy?
                </span>
                <div className="p-4 bg-[#0a0a0c] border border-neutral-800/80 rounded-sm text-neutral-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedEntry.motivation}
                </div>
              </div>
            )}

            <div className="border-t border-neutral-800 pt-6 flex flex-wrap justify-between items-center text-xs text-neutral-500">
              <div>Submitted on: {new Date(selectedEntry.created_at).toLocaleString()}</div>
              <button
                onClick={() => setSelectedEntry(null)}
                className="px-6 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-sm text-xs uppercase font-mono tracking-wider"
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
