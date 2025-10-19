import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignUpPage = () => {
  const [formData, setFormData] = useState({ identifier: '' });
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const { otpSent, isLoading, error, setError, setOtpSent, requestOtp, verifyOtp } = useAuth();

  const handleChange = (e) => setFormData({ ...formData, identifier: e.target.value });
  const handleOtpChange = (e) => setOtp(e.target.value);

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError(null);
    if (!formData.identifier) {
      setError('Please enter email or mobile number');
      return;
    }
    await requestOtp(formData, 'signup');
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const success = await verifyOtp(formData, otp, 'signup');
    if (success) navigate('/welcome'); // redirect new users
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 shadow-md rounded bg-white">
        <h2 className="text-2xl font-bold text-center mb-4">
          {otpSent ? 'Enter OTP' : 'Sign Up'}
        </h2>

        {error && <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">{error}</div>}

        <form onSubmit={otpSent ? handleVerifyOtp : handleRequestOtp} className="space-y-4">
          {!otpSent ? (
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="Enter Email or Phone"
              required
              className="w-full border p-2 rounded"
            />
          ) : (
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter 6-digit OTP"
              maxLength="6"
              required
              className="w-full border p-2 rounded text-center tracking-widest"
            />
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : otpSent ? 'Verify OTP' : 'Request OTP'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/signin" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
