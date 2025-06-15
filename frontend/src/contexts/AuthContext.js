import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../hooks/useNotification';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (token && userData) {
          try {
            const parsedUserData = JSON.parse(userData);
            if (parsedUserData && typeof parsedUserData === 'object') {
              setUser(parsedUserData);
              api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } else {
              // Invalid user data format
              localStorage.removeItem('token');
              localStorage.removeItem('user');
            }
          } catch (parseError) {
            console.error('Error parsing user data:', parseError);
            // Clear invalid data
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear any potentially corrupted data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user: userData } = response.data;
      
      if (!token || !userData) {
        throw new Error('Invalid response from server');
      }

      // Store auth data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(userData);
      showNotification('Login successful', 'success');
      
      // Redirect based on user role
      const role = userData.role?.toLowerCase();
      if (role) {
        navigate(`/${role}/dashboard`);
      } else {
        throw new Error('Invalid user role');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      showNotification(errorMessage, 'error');
      throw error;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
      navigate('/login');
      showNotification('Logged out successfully', 'success');
    } catch (error) {
      console.error('Error during logout:', error);
      showNotification('Error during logout', 'error');
    }
  };

  const register = async (userData) => {
    try {
      if (!userData || typeof userData !== 'object') {
        throw new Error('Invalid registration data');
      }

      const response = await api.post('/auth/register', userData);
      if (!response.data) {
        throw new Error('Invalid response from server');
      }

      showNotification('Registration successful', 'success');
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      showNotification(errorMessage, 'error');
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
    isDoctor: user?.role === 'DOCTOR',
    isPatient: user?.role === 'PATIENT'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 