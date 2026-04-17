import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type User } from '../types';
import { logout as postLogout } from '../api/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (userData: User) => set({ 
        user: userData, 
        isAuthenticated: true 
      }),
      logout: async () => {
        await postLogout();
        set({ 
          user: null, 
          isAuthenticated: false 
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);