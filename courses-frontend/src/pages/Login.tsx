import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/institute/dashboard';

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
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 shadow-sm border border-neutral-100 rounded-lg">
        <div>
          <h2 className="text-center text-3xl font-light text-[#1A1A1A]">
            Sign in to PAMHO
          </h2>
          <p className="mt-2 text-center text-sm text-neutral-600">
            Welcome back to the Institute
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-800 p-4 rounded text-sm text-center">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700">Username</label>
              <input
                type="text"
                required
                className="mt-1 appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 focus:outline-none focus:ring-[#4A3B69] focus:border-[#4A3B69] sm:text-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Password</label>
              <input
                type="password"
                required
                className="mt-1 appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 focus:outline-none focus:ring-[#4A3B69] focus:border-[#4A3B69] sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-none text-white bg-[#4A3B69] hover:bg-[#3A2D54] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A3B69] disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-neutral-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-[#4A3B69] hover:text-[#3A2D54]">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
