import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type User } from '../types';
import { login as loginApi, logout as postLogout } from '../api/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  username: string;
  setUsername: (userName: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
  loading: boolean;
  handleLogin: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (userData: User) =>
        set({
          user: userData,
          isAuthenticated: true,
        }),
      logout: async () => {
        await postLogout();
        set({
          user: null,
          isAuthenticated: false,
        });
      },
      username: '',
      setUsername: (userName: string) => set({ username: userName }),
      password: '',
      setPassword: (password: string) => set({ password }),
      error: null,
      setError: (error: string | null) => set({ error }),
      loading: false,
      handleLogin: async () => {
        set({ error: null, loading: true });
        const { username, password, login } = get();
        try {
          const response = await loginApi(username, password);
          if (response.success && response.data) {
            login(response.data);
          } else {
            set({ error: response.error || 'Невірні дані' });
          }
        } catch (err: any) {
          if (err.status === 401) {
            set({ error: 'Невірні дані' });
          } else {
            set({ error: 'Сервер не відповідає' });
          }
        } finally {
          set({ loading: false, username: '', password: '' });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
