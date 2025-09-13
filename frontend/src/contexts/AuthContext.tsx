'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useAuthStore } from '@/store/auth';
import { authApi } from '@/services/auth';

// Define a proper interface for the context
interface AuthContextType {
  // Add context methods if needed in the future
  initialized?: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { initializeAuth, isAuthenticated, user, setLoading } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true);
        initializeAuth();
        
        // Verify token is still valid if user is logged in
        if (isAuthenticated && user) {
          await authApi.me();
        }
      } catch {
        // Token is invalid, clear auth state
        useAuthStore.getState().logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [initializeAuth, isAuthenticated, user, setLoading]);

  return (
    <AuthContext.Provider value={{ initialized: true }}>
      {children}
    </AuthContext.Provider>
  );
};
