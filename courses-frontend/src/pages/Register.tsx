import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import { Reveal } from '../components/Reveal';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const registerRes = await fetch('/api/v1/auth/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password,
          first_name: firstName,
          last_name: lastName
        }),
      });

      if (!registerRes.ok) {
        const data = await registerRes.json();
        const errorMsg = Object.values(data).flat().join(' ') || 'Registration failed.';
        setError(errorMsg);
        setIsSubmitting(false);
        return;
      }

      const loginRes = await fetch('/api/v1/auth/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (loginRes.ok) {
        const loginData = await loginRes.json();
        login(loginData.access, loginData.refresh);
        navigate('/institute/dashboard');
      } else {
        navigate('/login');
      }
    } catch (err) {
      setError('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center py-24 px-6 sm:px-12 relative">
      <SEO title="Create Account | PAMHO" />
      <div className="grain-overlay"></div>
      
      <div className="max-w-2xl w-full flex flex-col z-10">
        <Reveal>
          <div className="mb-16">
            <span className="label-tracking text-[#D1893D] mb-4 block">Join the Institute</span>
            <h2 className="title-hero mb-4 text-left">
              Create Account
            </h2>
            <p className="font-sans font-light text-[rgba(245,242,233,0.5)] text-lg">
              Register to access the PAMHO Institute network and educational pathways.
            </p>
          </div>
          
          <form className="space-y-12" onSubmit={handleSubmit}>
            {error && (
              <div className="border border-red-900/50 bg-red-900/10 text-red-400 p-4 font-sans font-light text-sm">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#D1893D] transition-colors pb-2">
                <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">First Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-transparent font-serif text-2xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              
              <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#D1893D] transition-colors pb-2">
                <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">Last Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-transparent font-serif text-2xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#D1893D] transition-colors pb-2">
              <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">Username</label>
              <input
                type="text"
                required
                className="w-full bg-transparent font-serif text-2xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#D1893D] transition-colors pb-2">
              <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">Email Address</label>
              <input
                type="email"
                required
                className="w-full bg-transparent font-serif text-2xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col border-b border-[rgba(245,242,233,0.1)] focus-within:border-[#D1893D] transition-colors pb-2">
              <label className="label-tracking text-[rgba(245,242,233,0.4)] mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full bg-transparent font-serif text-2xl text-[#F5F2E9] focus:outline-none placeholder:text-[rgba(245,242,233,0.15)]"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-cinematic w-full disabled:opacity-50"
              >
                {isSubmitting ? 'Processing...' : 'Create Account'}
              </button>
            </div>
          </form>
          
          <div className="mt-12 pt-8 border-t border-[rgba(245,242,233,0.05)]">
            <p className="font-sans font-light text-[rgba(245,242,233,0.4)]">
              Already have an account?{' '}
              <Link to="/login" className="text-[#D1893D] hover:text-[#F5F2E9] transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
