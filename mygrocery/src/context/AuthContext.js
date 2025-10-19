import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('user');
    if (storedAuth === 'true' && storedUser)
    {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signIn = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  const requestOtp = async (formData, type) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8082/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrMobile: formData.identifier, type }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        data = { message: 'Invalid server response' };
      }

      if (response.ok) {
        setOtpSent(true);
        setError('');
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Server error. Try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (formData, otp, type) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8082/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrMobile: formData.identifier, otp, type }),
      });

      const data = await response.json();

      if (response.ok) {
        signIn(data.user || { identifier: formData.identifier }); // save user
        return true;
      } else {
        setError(data.message || 'Invalid OTP');
        return false;
      }
    } catch (err) {
      setError('Server error. Try again later.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        signIn,
        signOut,
        isLoading,
        error,
        otpSent,
        requestOtp,
        verifyOtp,
        setOtpSent,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
