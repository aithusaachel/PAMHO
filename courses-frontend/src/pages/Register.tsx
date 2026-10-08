import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
      // 1. Register the user
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
        // Extract errors
        const errorMsg = Object.values(data).flat().join(' ') || 'Registration failed.';
        setError(errorMsg);
        setIsSubmitting(false);
        return;
      }

      // 2. Automatically log them in after registration
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
        // If login somehow fails, navigate to login
        navigate('/login');
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
            Create an Account
          </h2>
          <p className="mt-2 text-center text-sm text-neutral-600">
            Join the PAMHO Institute
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-800 p-4 rounded text-sm text-center">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700">First Name</label>
                <input
                  type="text"
                  className="mt-1 appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 focus:outline-none focus:ring-[#4A3B69] focus:border-[#4A3B69] sm:text-sm"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700">Last Name</label>
                <input
                  type="text"
                  className="mt-1 appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 focus:outline-none focus:ring-[#4A3B69] focus:border-[#4A3B69] sm:text-sm"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            
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
              <label className="block text-sm font-medium text-neutral-700">Email address</label>
              <input
                type="email"
                required
                className="mt-1 appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 focus:outline-none focus:ring-[#4A3B69] focus:border-[#4A3B69] sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-neutral-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-[#4A3B69] hover:text-[#3A2D54]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
