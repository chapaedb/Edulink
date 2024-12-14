import { useState, useCallback } from 'react';
import { auth } from '../lib/api';

interface AuthState {
  user: any | null;
  isLoading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: false,
    error: null,
  });

  const login = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await auth.login({ email, password });
      setState(prev => ({ ...prev, user: response.user, isLoading: false }));
      localStorage.setItem('token', response.token);
      return response;
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.response?.data?.message || 'An error occurred',
        isLoading: false,
      }));
      throw error;
    }
  }, []);

  const register = useCallback(async (data: any) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await auth.register(data);
      setState(prev => ({ ...prev, user: response.user, isLoading: false }));
      localStorage.setItem('token', response.token);
      return response;
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.response?.data?.message || 'An error occurred',
        isLoading: false,
      }));
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      await auth.logout();
      localStorage.removeItem('token');
      setState({ user: null, isLoading: false, error: null });
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.response?.data?.message || 'An error occurred',
        isLoading: false,
      }));
    }
  }, []);

  return {
    ...state,
    login,
    register,
    logout,
  };
}