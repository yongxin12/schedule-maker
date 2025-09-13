import { create } from 'zustand';
import { User, authStorage } from '@/lib/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  
  login: (user: User, token: string) => {
    authStorage.setUser(user);
    authStorage.setToken(token);
    set({ user, isAuthenticated: true, isLoading: false });
  },
  
  logout: () => {
    authStorage.clear();
    set({ user: null, isAuthenticated: false, isLoading: false });
  },
  
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  
  initializeAuth: () => {
    const user = authStorage.getUser();
    const token = authStorage.getToken();
    
    if (user && token) {
      set({ user, isAuthenticated: true, isLoading: false });
    } else {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
