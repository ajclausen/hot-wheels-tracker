import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import type { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data } = await axios.get('/api/auth/me');
      setState(prev => ({ ...prev, user: data.user, loading: false }));
    } catch (err) {
      setState(prev => ({ ...prev, user: null, loading: false }));
    }
  };

  const login = async (username: string, password: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const { data } = await axios.post('/api/auth/login', { username, password });
      setState(prev => ({ ...prev, user: data.user, loading: false }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err.response?.data?.error || 'Login failed',
        loading: false
      }));
      throw err;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const { data } = await axios.post('/api/auth/register', {
        username,
        email,
        password
      });
      setState(prev => ({ ...prev, user: data.user, loading: false }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err.response?.data?.error || 'Registration failed',
        loading: false
      }));
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
      setState(prev => ({ ...prev, user: null, error: null }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: 'Logout failed'
      }));
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}