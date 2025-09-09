import {useState, useEffect} from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    try {
      setLoading(true);
      console.log('Login with:', email, password);
      return {success: true};
    } catch (error) {
      console.error('Login failed:', error);
      return {success: false, error: error.message};
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const verifyEmail = async (email, code) => {
    try {
      setLoading(true);
      console.log('Verify email:', email, 'with code:', code);
      return {success: true};
    } catch (error) {
      console.error('Email verification failed:', error);
      return {success: false, error: error.message};
    } finally {
      setLoading(false);
    }
  };

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    verifyEmail,
  };
};
