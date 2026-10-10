import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  useEffect(() => {
    if (user && (user.role === 'superadmin' || user.role === 'administrator' || user.role === 'content_manager')) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/v1/auth/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        await login(data.access, data.refresh);
        // The useEffect will handle navigation if the role is correct.
        // If not, we should probably handle it, but ProtectedRoute will kick them out anyway.
        navigate(from, { replace: true });
      } else {
        const data = await response.json();
        setError(data.detail || 'Failed to authenticate. Please check your credentials.');
      }
    } catch (err) {
      setError('A network error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[#121216] border border-neutral-800 p-10 rounded-sm shadow-2xl">
        <div>
          <h2 className="text-center text-3xl font-bold text-[#f4f2ee]">
            PAMHO <span className="text-[#8442fa]">Admin</span>
          </h2>
          <p className="mt-4 text-center text-sm text-neutral-400">
            Authorized Personnel Only
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-900/30 text-red-400 border border-red-900/50 p-4 rounded-sm text-sm text-center">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1">Username</label>
              <input
                type="text"
                required
                className="w-full bg-[#0a0a0c] border border-neutral-800 rounded-sm px-4 py-3 text-white focus:border-[#8442fa] outline-none transition-colors"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full bg-[#0a0a0c] border border-neutral-800 rounded-sm px-4 py-3 pr-16 text-white focus:border-[#8442fa] outline-none transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-neutral-400 hover:text-white focus:outline-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-sm text-white bg-[#8442fa] hover:bg-[#985eff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#121216] focus:ring-[#8442fa] disabled:opacity-50 transition-colors shadow-[0_4px_20px_-5px_rgba(132,66,250,0.4)]"
            >
              {isSubmitting ? 'Authenticating...' : 'Sign in to Administration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
