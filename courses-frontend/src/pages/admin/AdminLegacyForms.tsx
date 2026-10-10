import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function AdminLegacyForms() {
  const [activeTab, setActiveTab] = useState<'registrations' | 'ambassadors' | 'partners'>('registrations');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTab = async (tab: string) => {
    setLoading(true);
    const token = localStorage.getItem('pamho_access');
    try {
      const res = await fetch(`/api/v1/${tab}/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const resData = await res.json();
      setData(resData.results || resData || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTab(activeTab);
  }, [activeTab]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    const token = localStorage.getItem('pamho_access');
    try {
      const res = await fetch(`/api/v1/${activeTab}/${id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setData(data.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const exportToCSV = () => {
    if (!data.length) return alert('No data to export');
    
    // get all keys
    const keys = new Set<string>();
    data.forEach(item => Object.keys(item).forEach(k => keys.add(k)));
    const cols = Array.from(keys);

    const rows = [cols.join(",")];
    data.forEach(item => {
      const row = cols.map(k => `"${String(item[k] || "").replace(/"/g, '""')}"`);
      rows.push(row.join(","));
    });

    const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `pamho_${activeTab}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    if (!data.length) return alert('No data to export');
    
    const doc = new jsPDF({ orientation: "landscape" });
    const cols = Object.keys(data[0]).filter(k => k !== 'id' && k !== 'created_at' && k !== 'updated_at'); // explicitly ignore ID and timestamps
    
    const head = [cols.map(c => c.replace('_', ' ').toUpperCase())];
    const body = data.map(item => cols.map(c => String(item[c] || "—")));

    doc.setFontSize(14);
    doc.text(`PAMHO ${activeTab.toUpperCase()} EXPORT`, 14, 15);
    
    autoTable(doc, {
      head,
      body,
      startY: 20,
      styles: { fontSize: 8, overflow: 'linebreak' },
      theme: 'grid'
    });

    doc.save(`pamho_${activeTab}_export.pdf`);
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Legacy Forms</h1>
          <p className="text-sm text-neutral-400">Manage and export data from old forms.</p>
        </div>
        <div className="flex gap-4">
          <button onClick={exportToCSV} className="bg-[#121216] border border-neutral-800 text-neutral-300 px-4 py-2 rounded-sm text-sm hover:text-white hover:border-neutral-600">Export CSV</button>
          <button onClick={exportToPDF} className="bg-[#8442fa] text-white px-4 py-2 rounded-sm text-sm hover:bg-[#6c35d4]">Export PDF</button>
        </div>
      </div>
      
      <div className="mb-6 flex gap-2 border-b border-neutral-800 pb-2 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('registrations')} 
          className={`px-4 py-2 rounded-sm text-sm ${activeTab === 'registrations' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
        >Event Registrations</button>
        <button 
          onClick={() => setActiveTab('ambassadors')} 
          className={`px-4 py-2 rounded-sm text-sm ${activeTab === 'ambassadors' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
        >Ambassadors</button>
        <button 
          onClick={() => setActiveTab('partners')} 
          className={`px-4 py-2 rounded-sm text-sm ${activeTab === 'partners' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
        >Partners</button>
      </div>

      {loading ? (
        <div className="text-neutral-500">Loading data...</div>
      ) : data.length === 0 ? (
        <div className="text-neutral-500 p-8 border border-neutral-800 bg-[#121216] text-center rounded-sm">No records found.</div>
      ) : (
        <div className="bg-[#121216] border border-neutral-800 rounded-sm overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-400">
            <thead className="bg-[#0a0a0c] text-xs uppercase text-neutral-500 border-b border-neutral-800">
              <tr>
                {Object.keys(data[0]).filter(k => k !== 'id').map(k => (
                  <th key={k} className="px-4 py-3">{k.replace('_', ' ')}</th>
                ))}
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={item.id || idx} className="border-b border-neutral-800/50 hover:bg-neutral-900/50">
                  {Object.keys(item).filter(k => k !== 'id').map(k => (
                    <td key={k} className="px-4 py-3 whitespace-nowrap max-w-[200px] overflow-hidden text-ellipsis" title={String(item[k])}>
                      {String(item[k] || '—')}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300">Delete</button>
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
