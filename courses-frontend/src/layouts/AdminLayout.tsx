import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const links = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Courses', path: '/admin/courses' },
    { name: 'Programs', path: '/admin/programs' },
    { name: 'Resources', path: '/admin/resources' },
    { name: 'Form Submissions', path: '/admin/enquiries' },
    { name: 'Legacy Forms', path: '/admin/legacy-forms' },
    { name: 'Enrollments', path: '/admin/enrollments' },
    { name: 'Users', path: '/admin/users' },
  ];

  return (
    <div className="min-h-screen flex bg-[#0a0a0c]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#121216] border-r border-neutral-800 flex flex-col shrink-0">
        <div className="p-6 border-b border-neutral-800">
          <Link to="/" className="text-xl font-bold text-[#f4f2ee]">PAMHO <span className="text-[#8442fa]">Admin</span></Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {links.map(link => {
            const isActive = location.pathname === link.path || (link.path !== '/admin' && location.pathname.startsWith(link.path));
            // Restrict Users tab to superadmin/admin if we want UI-level hiding
            if (link.name === 'Users' && user?.role !== 'superadmin' && user?.role !== 'administrator') return null;
            
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-4 py-3 rounded-sm text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-[#8442fa]/10 text-[#b48aff] border-l-2 border-[#8442fa]' 
                    : 'text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-neutral-800">
          <div className="text-xs text-neutral-500 mb-4 px-4 uppercase tracking-widest">
            {user?.role.replace('_', ' ')}
          </div>
          <button 
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-neutral-400 hover:text-red-400 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
