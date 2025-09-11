import {useState} from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    try {
      setLoading(true);
      console.log('Login with:', email, password);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Accept any email/password for testing
      if (email && password && password.length >= 6) {
        setIsAuthenticated(true);
        setUser({email, verified: true});
        return {success: true};
      } else {
        return {success: false, error: 'Invalid credentials'};
      }
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

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
  };
};