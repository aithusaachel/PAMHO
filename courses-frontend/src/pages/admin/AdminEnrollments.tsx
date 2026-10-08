import { useEffect, useState } from 'react';

export default function AdminEnrollments() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      const token = localStorage.getItem('pamho_access');
      try {
        const res = await fetch('/api/v1/enrollments/', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setEnrollments(data.results || data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Student Enrollments</h1>
        <p className="text-sm text-neutral-400">Inspect student enrollments and course progress.</p>
      </div>
      
      {loading ? (
        <div className="text-neutral-500">Loading enrollments...</div>
      ) : enrollments.length === 0 ? (
        <div className="bg-[#121216] border border-neutral-800 p-12 text-center rounded-sm">
          <p className="text-neutral-500 mb-4">No enrollments exist yet.</p>
        </div>
      ) : (
        <div className="bg-[#121216] border border-neutral-800 rounded-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-900 border-b border-neutral-800">
                <th className="px-6 py-4 text-xs font-medium text-neutral-400 uppercase tracking-wider">Student ID</th>
                <th className="px-6 py-4 text-xs font-medium text-neutral-400 uppercase tracking-wider">Course</th>
                <th className="px-6 py-4 text-xs font-medium text-neutral-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-medium text-neutral-400 uppercase tracking-wider">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {enrollments.map((enrollment: any) => (
                <tr key={enrollment.id} className="hover:bg-neutral-900/50">
                  <td className="px-6 py-4 text-sm text-neutral-200">
                    Student #{enrollment.student || enrollment.student_id || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-white">
                    {enrollment.course_title}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-mono px-2 py-1 rounded-sm ${enrollment.status === 'active' ? 'bg-green-900/30 text-green-400' : 'bg-neutral-800 text-neutral-300'}`}>
                      {enrollment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-neutral-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[#8442fa]" style={{ width: `${enrollment.progress_summary?.percent_complete || 0}%` }}></div>
                      </div>
                      <span className="text-xs text-neutral-400">{enrollment.progress_summary?.percent_complete || 0}%</span>
                    </div>
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
