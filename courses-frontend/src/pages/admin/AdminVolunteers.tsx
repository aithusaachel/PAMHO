import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface VolunteerApplication {
  id: number;
  reference_id: string;
  application_type: 'lead' | 'join';
  status: string;
  full_name: string;
  email: string;
  whatsapp: string;
  country: string;
  time_zone: string;
  highest_qualification: string;
  current_occupation: string;
  cv_file_name: string;
  cv_data: string;
  work_links: string;
  languages: string;
  reliable_internet_device: string;
  selected_team: string;
  hours_per_week: string;
  why_pamho: string;
  team_project_led: string;
  first_30_days_plan: string;
  pamho_most_needs: string;
  skills: string;
  work_samples: string;
  weekly_deliverables: string;
  referee_1_name: string;
  referee_1_relationship: string;
  referee_1_organization: string;
  referee_1_email: string;
  referee_1_phone: string;
  referee_2_name: string;
  referee_2_relationship: string;
  referee_2_organization: string;
  referee_2_email: string;
  referee_2_phone: string;
  agreed_unpaid_probation: boolean;
  agreed_weekly_hours: boolean;
  agreed_referees_contacted: boolean;
  agreed_data_storage: boolean;
  created_at: string;
}

const STATUSES = [
  { value: 'new', label: 'New' },
  { value: 'reviewed', label: 'Reviewed' },
  { value: 'shortlisted', label: 'Shortlisted' },
  { value: 'interviewed', label: 'Interviewed' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'declined', label: 'Declined' },
];

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-[#8442fa]/10 text-[#b48aff] border-[#8442fa]/20',
  reviewed: 'bg-sky-950/40 text-sky-300 border-sky-900/50',
  shortlisted: 'bg-amber-950/40 text-amber-300 border-amber-900/50',
  interviewed: 'bg-indigo-950/40 text-indigo-300 border-indigo-900/50',
  accepted: 'bg-emerald-950/40 text-emerald-400 border-emerald-900/50',
  declined: 'bg-red-950/40 text-red-300 border-red-900/50',
};

const typeLabel = (t: string) => (t === 'lead' ? 'Lead a Team' : 'Join a Team');
const csvCell = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;

export default function AdminVolunteers() {
  const [entries, setEntries] = useState<VolunteerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'lead' | 'join'>('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [teamFilter, setTeamFilter] = useState('all');
  const [selected, setSelected] = useState<VolunteerApplication | null>(null);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('pamho_access');
    try {
      const res = await fetch('/api/v1/volunteers/', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setEntries(Array.isArray(data) ? data : data.results || []);
      } else if (res.status === 401 || res.status === 403) {
        setError('Authentication or permission required. Please log in with an administrator account.');
      } else {
        setError(`Failed to load volunteer applications (Error ${res.status}).`);
      }
    } catch (err) {
      console.error('Failed to load volunteer applications', err);
      setError('Network error while connecting to PAMHO backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id: number, status: string) => {
    const token = localStorage.getItem('pamho_access');
    try {
      const res = await fetch(`/api/v1/volunteers/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setEntries(prev => prev.map(e => (e.id === id ? { ...e, status } : e)));
        setSelected(prev => (prev && prev.id === id ? { ...prev, status } : prev));
      } else {
        alert('Failed to update status.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while updating status.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this volunteer application?')) return;
    const token = localStorage.getItem('pamho_access');
    try {
      const res = await fetch(`/api/v1/volunteers/${id}/`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setEntries(prev => prev.filter(e => e.id !== id));
        if (selected?.id === id) setSelected(null);
      } else {
        alert('Failed to delete application.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while deleting.');
    }
  };

  const teams = Array.from(new Set(entries.map(e => e.selected_team).filter(Boolean))).sort();

  const filtered = entries.filter(e => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      [e.full_name, e.email, e.country, e.selected_team, e.reference_id, e.current_occupation]
        .some(v => v?.toLowerCase().includes(q));
    return (
      matchesSearch &&
      (typeFilter === 'all' || e.application_type === typeFilter) &&
      (statusFilter === 'all' || e.status === statusFilter) &&
      (teamFilter === 'all' || e.selected_team === teamFilter)
    );
  });

  const exportToCSV = () => {
    if (!filtered.length) return alert('No volunteer data to export');
    const cols: [string, (e: VolunteerApplication) => unknown][] = [
      ['Reference', e => e.reference_id],
      ['Type', e => typeLabel(e.application_type)],
      ['Status', e => e.status],
      ['Full Name', e => e.full_name],
      ['Email', e => e.email],
      ['WhatsApp', e => e.whatsapp],
      ['Country', e => e.country],
      ['Time Zone', e => e.time_zone],
      ['Highest Qualification', e => e.highest_qualification],
      ['Current Occupation', e => e.current_occupation],
      ['Languages', e => e.languages],
      ['Reliable Internet/Device', e => e.reliable_internet_device],
      ['Team', e => e.selected_team],
      ['Hours / Week', e => e.hours_per_week],
      ['Work Links', e => e.work_links],
      ['CV File', e => e.cv_file_name],
      ['Why PAMHO', e => e.why_pamho],
      ['Team/Project Led', e => e.team_project_led],
      ['First 30 Days Plan', e => e.first_30_days_plan],
      ['What PAMHO Most Needs', e => e.pamho_most_needs],
      ['Skills', e => e.skills],
      ['Work Samples', e => e.work_samples],
      ['Weekly Deliverables', e => e.weekly_deliverables],
      ['Referee 1', e => [e.referee_1_name, e.referee_1_relationship, e.referee_1_organization, e.referee_1_email, e.referee_1_phone].filter(Boolean).join(' | ')],
      ['Referee 2', e => [e.referee_2_name, e.referee_2_relationship, e.referee_2_organization, e.referee_2_email, e.referee_2_phone].filter(Boolean).join(' | ')],
      ['Submitted At', e => (e.created_at ? new Date(e.created_at).toISOString() : '')],
    ];
    const rows = [cols.map(([h]) => csvCell(h)).join(',')];
    filtered.forEach(e => rows.push(cols.map(([, fn]) => csvCell(fn(e))).join(',')));

    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `pamho_volunteer_applications_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    if (!filtered.length) return alert('No volunteer data to export');
    const doc = new jsPDF({ orientation: 'landscape' });
    doc.setFontSize(14);
    doc.text('PAMHO — VOLUNTEER APPLICATIONS', 14, 15);
    doc.setFontSize(10);
    doc.text(`Total Applicants: ${filtered.length} | Export Date: ${new Date().toLocaleDateString()}`, 14, 22);

    autoTable(doc, {
      head: [['#', 'REF', 'NAME', 'EMAIL', 'WHATSAPP', 'COUNTRY', 'TYPE', 'TEAM', 'HRS/WK', 'STATUS', 'SUBMITTED']],
      body: filtered.map((e, i) => [
        i + 1,
        e.reference_id || '—',
        e.full_name || '—',
        e.email || '—',
        e.whatsapp || '—',
        e.country || '—',
        typeLabel(e.application_type),
        e.selected_team || '—',
        e.hours_per_week || '—',
        (e.status || 'new').toUpperCase(),
        e.created_at ? new Date(e.created_at).toLocaleDateString() : '—',
      ]),
      startY: 28,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [132, 66, 250] },
    });
    doc.save(`pamho_volunteer_applications_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const StatusBadge = ({ status }: { status: string }) => (
    <span className={`px-2.5 py-1 text-xs rounded-sm uppercase tracking-wider font-mono font-medium border ${STATUS_STYLES[status] || STATUS_STYLES.new}`}>
      {STATUSES.find(s => s.value === status)?.label || status}
    </span>
  );

  const Field = ({ label, value, href }: { label: string; value?: string; href?: string }) => (
    <div>
      <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-1">{label}</span>
      {href && value ? (
        <a href={href} className="text-white hover:text-[#b48aff] break-words">{value}</a>
      ) : (
        <span className="text-white break-words">{value || '—'}</span>
      )}
    </div>
  );

  const LongAnswer = ({ label, value }: { label: string; value?: string }) =>
    value ? (
      <div className="mb-5">
        <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-2">{label}</span>
        <div className="p-4 bg-[#0a0a0c] border border-neutral-800/80 rounded-sm text-neutral-300 text-sm leading-relaxed whitespace-pre-wrap break-words">
          {value}
        </div>
      </div>
    ) : null;

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="border-t border-neutral-800 pt-6 mb-6">
      <h4 className="text-xs font-mono uppercase tracking-widest text-[#8442fa] mb-4">{title}</h4>
      {children}
    </div>
  );

  const selectClass =
    'bg-[#0a0a0c] border border-neutral-800 rounded-sm px-3 py-2 text-sm text-[#f4f2ee] focus:border-[#8442fa] outline-none';

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-[#8442fa] mb-2 block">Volunteer Programme</span>
          <h1 className="text-3xl font-bold text-white mb-2">Volunteer Applications</h1>
          <p className="text-sm text-neutral-400">
            Responses submitted through the “Lead a Team” and “Join a Team” volunteer forms.
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
        {[
          { label: 'Total Applications', value: entries.length },
          { label: 'Lead a Team', value: entries.filter(e => e.application_type === 'lead').length },
          { label: 'Join a Team', value: entries.filter(e => e.application_type === 'join').length },
          { label: 'Awaiting Review', value: entries.filter(e => (e.status || 'new') === 'new').length },
        ].map(m => (
          <div key={m.label} className="bg-[#121216] border border-neutral-800 p-6 rounded-sm">
            <div className="text-neutral-500 text-xs font-mono uppercase tracking-wider mb-2">{m.label}</div>
            <div className="text-3xl font-bold text-white">{m.value}</div>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="bg-[#121216] border border-neutral-800 p-4 rounded-sm mb-6 flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
        <input
          type="text"
          placeholder="Search by name, email, country, team or reference..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full lg:w-96 bg-[#0a0a0c] border border-neutral-800 rounded-sm px-4 py-2.5 text-sm text-[#f4f2ee] placeholder-neutral-500 focus:border-[#8442fa] outline-none"
        />
        <div className="flex flex-wrap items-center gap-3">
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value as 'all' | 'lead' | 'join')} className={selectClass}>
            <option value="all">All Tracks</option>
            <option value="lead">Lead a Team</option>
            <option value="join">Join a Team</option>
          </select>
          <select value={teamFilter} onChange={e => setTeamFilter(e.target.value)} className={selectClass}>
            <option value="all">All Teams</option>
            {teams.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className={selectClass}>
            <option value="all">All Statuses</option>
            {STATUSES.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-950/40 border border-red-800/60 rounded-sm flex items-center justify-between text-sm text-red-200">
          <span>{error}</span>
          <button
            onClick={fetchApplications}
            className="px-3 py-1 bg-red-900/60 hover:bg-red-800 text-white text-xs uppercase font-mono tracking-wider rounded-sm transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="py-24 text-center text-neutral-500">Loading volunteer applications...</div>
      ) : filtered.length === 0 ? (
        <div className="py-24 text-center bg-[#121216] border border-neutral-800 rounded-sm">
          <p className="text-lg text-neutral-400 mb-2">No volunteer applications found.</p>
          <p className="text-sm text-neutral-600">
            {search || typeFilter !== 'all' || statusFilter !== 'all' || teamFilter !== 'all'
              ? 'Try adjusting your search filters.'
              : 'New applications will appear here as soon as volunteers submit the form.'}
          </p>
        </div>
      ) : (
        <div className="bg-[#121216] border border-neutral-800 rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 font-mono text-xs uppercase tracking-wider bg-[#0d0d10]">
                  <th className="py-4 px-6">Applicant</th>
                  <th className="py-4 px-6">Track</th>
                  <th className="py-4 px-6">Team</th>
                  <th className="py-4 px-6">Country</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Submitted</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {filtered.map(e => (
                  <tr key={e.id} className="hover:bg-neutral-900/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-semibold text-white">{e.full_name}</div>
                      <a href={`mailto:${e.email}`} className="text-xs text-[#b48aff] hover:underline">{e.email}</a>
                      {e.reference_id && <div className="text-xs text-neutral-600 font-mono mt-0.5">{e.reference_id}</div>}
                    </td>
                    <td className="py-4 px-6 text-neutral-300">{typeLabel(e.application_type)}</td>
                    <td className="py-4 px-6 text-neutral-300">
                      {e.selected_team || '—'}
                      {e.hours_per_week && <div className="text-xs text-neutral-500">{e.hours_per_week} hrs/wk</div>}
                    </td>
                    <td className="py-4 px-6 text-neutral-400">{e.country}</td>
                    <td className="py-4 px-6"><StatusBadge status={e.status || 'new'} /></td>
                    <td className="py-4 px-6 text-neutral-500 font-mono text-xs">
                      {e.created_at ? new Date(e.created_at).toLocaleDateString() : '—'}
                    </td>
                    <td className="py-4 px-6 text-right space-x-3 whitespace-nowrap">
                      <button
                        onClick={() => setSelected(e)}
                        className="text-xs text-[#b48aff] hover:text-white uppercase font-mono tracking-wider transition-colors"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(e.id)}
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
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div
            className="bg-[#121216] border border-neutral-800 rounded-sm max-w-3xl w-full p-8 max-h-[90vh] overflow-y-auto"
            onClick={ev => ev.stopPropagation()}
          >
            <div className="flex justify-between items-start border-b border-neutral-800 pb-4 mb-6 gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#8442fa] mb-1 block">
                  {typeLabel(selected.application_type)} · {selected.selected_team}
                </span>
                <h3 className="text-2xl font-bold text-white">{selected.full_name}</h3>
                {selected.reference_id && <div className="text-xs text-neutral-500 font-mono mt-1">{selected.reference_id}</div>}
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={selected.status || 'new'}
                  onChange={ev => updateStatus(selected.id, ev.target.value)}
                  className={selectClass}
                  aria-label="Application status"
                >
                  {STATUSES.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                <button onClick={() => setSelected(null)} className="text-neutral-500 hover:text-white p-2 text-xl" aria-label="Close">
                  ✕
                </button>
              </div>
            </div>

            <Section title="Part 1 · About the applicant">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
                <Field label="Email" value={selected.email} href={`mailto:${selected.email}`} />
                <Field label="WhatsApp" value={selected.whatsapp} />
                <Field label="Country" value={selected.country} />
                <Field label="Time Zone" value={selected.time_zone} />
                <Field label="Highest Qualification" value={selected.highest_qualification} />
                <Field label="Current Occupation" value={selected.current_occupation} />
                <Field label="Languages" value={selected.languages} />
                <Field label="Reliable Internet & Device" value={selected.reliable_internet_device} />
                <Field label="CV File" value={selected.cv_file_name} />
              </div>
              <LongAnswer label="Work / social links" value={selected.work_links} />
            </Section>

            <Section title="Part 2 · Team">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label="Selected Team" value={selected.selected_team} />
                <Field label="Hours per Week" value={selected.hours_per_week} />
              </div>
            </Section>

            <Section title="Part 3 · Application questions">
              <LongAnswer label={selected.application_type === 'lead' ? 'Why lead this team & PAMHO' : 'Why join this team & PAMHO'} value={selected.why_pamho} />
              <LongAnswer label="Team or project led & achievements" value={selected.team_project_led} />
              <LongAnswer label="First 30 days plan" value={selected.first_30_days_plan} />
              <LongAnswer label="What PAMHO most needs in this area" value={selected.pamho_most_needs} />
              <LongAnswer label="Main skills" value={selected.skills} />
              <LongAnswer label="Work samples" value={selected.work_samples} />
              <LongAnswer label="Realistic weekly deliverables" value={selected.weekly_deliverables} />
            </Section>

            <Section title="Part 4 · Referees">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2].map(n => {
                  const r = selected as unknown as Record<string, string>;
                  return (
                    <div key={n} className="p-4 bg-[#0a0a0c] border border-neutral-800/80 rounded-sm space-y-1 text-sm">
                      <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">Referee {n}</div>
                      <div className="text-white font-medium">{r[`referee_${n}_name`] || '—'}</div>
                      <div className="text-neutral-400">{[r[`referee_${n}_relationship`], r[`referee_${n}_organization`]].filter(Boolean).join(' · ')}</div>
                      {r[`referee_${n}_email`] && (
                        <a href={`mailto:${r[`referee_${n}_email`]}`} className="block text-[#b48aff] hover:underline break-words">{r[`referee_${n}_email`]}</a>
                      )}
                      {r[`referee_${n}_phone`] && <div className="text-neutral-400">{r[`referee_${n}_phone`]}</div>}
                    </div>
                  );
                })}
              </div>
            </Section>

            <Section title="Part 5 · Confirmations">
              <ul className="space-y-2 text-sm">
                {[
                  ['Unpaid role & 6-month probation', selected.agreed_unpaid_probation],
                  ['Weekly hours commitment', selected.agreed_weekly_hours],
                  ['Referees may be contacted', selected.agreed_referees_contacted],
                  ['Data storage & processing consent', selected.agreed_data_storage],
                ].map(([label, ok]) => (
                  <li key={label as string} className="flex items-center gap-2">
                    <span className={ok ? 'text-emerald-400' : 'text-red-400'}>{ok ? '✓' : '✕'}</span>
                    <span className="text-neutral-300">{label}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <div className="border-t border-neutral-800 pt-6 flex flex-wrap justify-between items-center gap-3 text-xs text-neutral-500">
              <div>Submitted on: {new Date(selected.created_at).toLocaleString()}</div>
              <button
                onClick={() => setSelected(null)}
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
