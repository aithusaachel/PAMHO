import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    courses: 0,
    programs: 0,
    enrollments: 0,
    resources: 0,
    enquiries: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('pamho_access');
      if (!token) return;

      try {
        const headers = { 'Authorization': `Bearer ${token}` };
        
        // Fetch real data
        const [courses, programs, enrollments, resources, enquiries] = await Promise.all([
          fetch('/api/v1/courses/', { headers }),
          fetch('/api/v1/programs/', { headers }),
          fetch('/api/v1/enrollments/', { headers }),
          fetch('/api/v1/resources/', { headers }),
          fetch('/api/v1/enquiries/', { headers })
        ]);

        const cData = await courses.json();
        const pData = await programs.json();
        const eData = await enrollments.json();
        const rData = await resources.json();
        const enqData = await enquiries.json();

        setStats({
          courses: cData.results ? cData.results.length : cData.length || 0,
          programs: pData.results ? pData.results.length : pData.length || 0,
          enrollments: eData.results ? eData.results.length : eData.length || 0,
          resources: rData.results ? rData.results.length : rData.length || 0,
          enquiries: enqData.results ? enqData.results.length : enqData.length || 0,
        });
      } catch (err) {
        console.error("Failed to fetch admin stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome, {user?.first_name || user?.username}</h1>
        <p className="text-neutral-400">Here is what's happening across the PAMHO platform today.</p>
      </div>

      {loading ? (
        <div className="text-neutral-500">Loading metrics...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#121216] border border-neutral-800 p-6 rounded-sm">
            <div className="text-neutral-500 text-sm font-medium mb-2 uppercase tracking-wider">Total Courses</div>
            <div className="text-4xl font-bold text-white mb-4">{stats.courses}</div>
            <Link to="/admin/courses" className="text-sm text-[#b48aff] hover:text-[#9b6cf5] transition-colors">Manage Courses &rarr;</Link>
          </div>
          <div className="bg-[#121216] border border-neutral-800 p-6 rounded-sm">
            <div className="text-neutral-500 text-sm font-medium mb-2 uppercase tracking-wider">Active Enrollments</div>
            <div className="text-4xl font-bold text-white mb-4">{stats.enrollments}</div>
            <Link to="/admin/enrollments" className="text-sm text-[#b48aff] hover:text-[#9b6cf5] transition-colors">View Enrollments &rarr;</Link>
          </div>
          <div className="bg-[#121216] border border-neutral-800 p-6 rounded-sm">
            <div className="text-neutral-500 text-sm font-medium mb-2 uppercase tracking-wider">Programs / Events</div>
            <div className="text-4xl font-bold text-white mb-4">{stats.programs}</div>
            <Link to="/admin/programs" className="text-sm text-[#b48aff] hover:text-[#9b6cf5] transition-colors">Manage Programs &rarr;</Link>
          </div>
          <div className="bg-[#121216] border border-neutral-800 p-6 rounded-sm">
            <div className="text-neutral-500 text-sm font-medium mb-2 uppercase tracking-wider">Resources</div>
            <div className="text-4xl font-bold text-white mb-4">{stats.resources}</div>
            <Link to="/admin/resources" className="text-sm text-[#b48aff] hover:text-[#9b6cf5] transition-colors">Manage Resources &rarr;</Link>
          </div>
          <div className="bg-[#121216] border border-neutral-800 p-6 rounded-sm">
            <div className="text-neutral-500 text-sm font-medium mb-2 uppercase tracking-wider">Enquiries</div>
            <div className="text-4xl font-bold text-white mb-4">{stats.enquiries}</div>
            <Link to="/admin/enquiries" className="text-sm text-[#b48aff] hover:text-[#9b6cf5] transition-colors">View Enquiries &rarr;</Link>
          </div>
        </div>
      )}
    </div>
  );
}
