import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import { Reveal } from '../components/Reveal';

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
        setError(data.detail || 'Authentication failed. Incorrect username or password.');
      }
    } catch (err) {
      setError('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center py-24 px-6 sm:px-12 relative">
      <SEO title="Sign In | PAMHO" />
      <div className="grain-overlay"></div>
      
      <div className="max-w-xl w-full flex flex-col z-10">
        <Reveal>
          <div className="mb-16">
            <span className="label-tracking text-[#D1893D] mb-4 block">Sign In</span>
            <h2 className="title-hero mb-4 text-left">
              Welcome Back
            </h2>
            <p className="font-sans font-light text-[rgba(245,242,233,0.5)] text-lg">
              Enter your credentials to access the PAMHO Institute network.
            </p>
          </div>
          
          <form className="space-y-8" onSubmit={handleSubmit}>
            {error && (
              <div className="border border-red-900/50 bg-red-900/10 text-red-400 p-4 font-sans font-light text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-8">
              <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#D1893D] transition-colors pb-2">
                <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">Username</label>
                <input
                  type="text"
                  required
                  className="w-full bg-transparent font-serif text-2xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]"
                  placeholder="Your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              
              <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#D1893D] transition-colors pb-2">
                <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">Password</label>
                <input
                  type="password"
                  required
                  className="w-full bg-transparent font-serif text-2xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-cinematic w-full disabled:opacity-50"
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>
          
          <div className="mt-12 pt-8 border-t border-[rgba(245,242,233,0.05)]">
            <p className="font-sans font-light text-[rgba(245,242,233,0.4)]">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#D1893D] hover:text-[#F5F2E9] transition-colors">
                Create one here
              </Link>
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
