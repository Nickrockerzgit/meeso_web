import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [stage, setStage] = useState('request');

  const requestOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed');
      setStage('verify');
      setMessage('OTP has been sent to your email.');
      setError('');
    } catch (err) {
      setError(err.message);
      setMessage('');
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed');
      setMessage('Password reset successfully. Please sign in.');
      setError('');
      setStage('done');
    } catch (err) {
      setError(err.message);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
        <form onSubmit={stage === 'request' ? requestOtp : resetPassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="w-full border rounded px-3 py-2" />
          </div>

          {stage !== 'request' && (
            <>
              <div>
                <label className="block text-sm font-medium">OTP</label>
                <input value={otp} onChange={(e) => setOtp(e.target.value)} required className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">New Password</label>
                <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" required className="w-full border rounded px-3 py-2" />
              </div>
            </>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}

          <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded">
            {stage === 'request' ? 'Send OTP' : 'Reset Password'}
          </button>
        </form>
        <p className="text-sm mt-4 text-center">
          <button onClick={() => navigate('/signin')} className="text-indigo-600 underline">Back to Sign In</button>
        </p>
      </div>
    </div>
  );
}
