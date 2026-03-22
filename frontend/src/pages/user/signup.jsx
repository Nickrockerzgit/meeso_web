import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [stage, setStage] = useState('signup');
  const [otp, setOtp] = useState('');

  const sendOtp = async (emailToSend) => {
    const res = await fetch(`${API}/api/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailToSend, purpose: 'signup' }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'OTP send error');
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Signup failed');

      await sendOtp(email);
      setStage('verifyOtp');
      setMessage('Signup successful. OTP sent to your email. Enter OTP to continue.');
      setError('');
    } catch (err) {
      setError(err.message);
      setMessage('');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, purpose: 'signup' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'OTP verify failed');

      localStorage.setItem('authToken', data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
      setMessage('');
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <form onSubmit={stage === 'signup' ? handleSubmit : handleVerifyOtp} className="space-y-4">
          {stage === 'signup' ? (
            <>
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" required className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="w-full border rounded px-3 py-2" />
              </div>
              <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded">Sign Up</button>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium">Enter OTP</label>
                <input value={otp} onChange={(e) => setOtp(e.target.value)} required className="w-full border rounded px-3 py-2" />
              </div>
              <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded">Verify OTP</button>
            </>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}
        </form>
        <p className="text-sm mt-4 text-center">
          Already user? <button onClick={() => navigate('/signin')} className="text-indigo-600 underline">Sign In</button>
        </p>
      </div>
    </div>
  );
}
