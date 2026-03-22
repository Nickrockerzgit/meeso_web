import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [stage, setStage] = useState('login');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      // Send OTP to email after successful login
      await fetch(`${API}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, purpose: 'login' }),
      });

      setStage('verifyOtp');
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, purpose: 'login' }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'OTP verification failed');

      localStorage.setItem('authToken', data.token);
      setError('');
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>
        <form onSubmit={stage === 'login' ? handleSubmit : handleVerifyOtp} className="space-y-4">
          {stage === 'login' ? (
            <>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="w-full border rounded px-3 py-2" />
              </div>
              <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded">Sign In</button>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-4">OTP sent to {email}. Please verify to continue.</p>
              <div>
                <label className="block text-sm font-medium">Enter OTP</label>
                <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" required className="w-full border rounded px-3 py-2" />
              </div>
              <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded">Verify OTP</button>
            </>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
        <p className="text-sm mt-4 text-center">
          New user? <button onClick={() => navigate('/signup')} className="text-indigo-600 underline">Sign Up</button>
        </p>
        <p className="text-sm mt-2 text-center">
          <button onClick={() => navigate('/forgot-password')} className="text-indigo-600 underline">Forgot password?</button>
        </p>
      </div>
    </div>
  );
}
