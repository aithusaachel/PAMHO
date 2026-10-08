import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function AdminUsers() {
  const { user } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('pamho_access');
      try {
        const res = await fetch('/api/v1/users/', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!res.ok) {
           if (res.status === 403) {
             setError("You do not have permission to view users.");
           } else {
             setError("Failed to fetch users.");
           }
           return;
        }

        const data = await res.json();
        setUsers(data.results || data || []);
      } catch (err) {
        console.error(err);
        setError("Network error fetching users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: number, newRole: string) => {
    if (user?.role !== 'superadmin') {
      alert("Only superadmins can change roles.");
      return;
    }
    
    const token = localStorage.getItem('pamho_access');
    try {
      const res = await fetch(`/api/v1/users/${userId}/`, {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: newRole })
      });
      
      if (res.ok) {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
      } else {
        alert("Failed to update role. Are you a superadmin?");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-900/20 border border-red-900 text-red-400 p-6 rounded-sm">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Manage Users</h1>
        <p className="text-sm text-neutral-400">View registered users and manage role assignments.</p>
      </div>
      
      {loading ? (
        <div className="text-neutral-500">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="bg-[#121216] border border-neutral-800 p-12 text-center rounded-sm">
          <p className="text-neutral-500 mb-4">No users found.</p>
        </div>
      ) : (
        <div className="bg-[#121216] border border-neutral-800 rounded-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-900 border-b border-neutral-800">
                <th className="px-6 py-4 text-xs font-medium text-neutral-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-xs font-medium text-neutral-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-medium text-neutral-400 uppercase tracking-wider">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {users.map((u: any) => (
                <tr key={u.id} className="hover:bg-neutral-900/50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-white">{u.first_name} {u.last_name}</div>
                    <div className="text-xs text-neutral-500">@{u.username}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-400">
                    {u.email}
                  </td>
                  <td className="px-6 py-4">
                    {user?.role === 'superadmin' ? (
                      <select 
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className="bg-neutral-900 border border-neutral-700 text-sm text-white rounded-sm px-2 py-1 outline-none focus:border-[#8442fa]"
                      >
                        <option value="student">Student</option>
                        <option value="content_manager">Content Manager</option>
                        <option value="administrator">Administrator</option>
                        <option value="superadmin">Superadmin</option>
                      </select>
                    ) : (
                      <span className="text-xs font-mono px-2 py-1 bg-neutral-800 text-neutral-300 rounded-sm">
                        {u.role}
                      </span>
                    )}
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
