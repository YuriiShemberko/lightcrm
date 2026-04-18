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
  setUsername: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  error: string | null;
  setError: (v: string | null) => void;
  loading: boolean;
  setLoading: (v: boolean) => void;
  handleLogin: () => Promise<{ success: boolean; error?: string }>; // навігацію робити у компоненті
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
      setUsername: (v) => set({ username: v }),
      password: '',
      setPassword: (v) => set({ password: v }),
      error: null,
      setError: (v) => set({ error: v }),
      loading: false,
      setLoading: (v) => set({ loading: v }),
      handleLogin: async () => {
        set({ error: null, loading: true });
        const { username, password, login } = get();
        try {
          const response = await loginApi(username, password);
          if (response.success) {
            login(response.data);
            return { success: true };
          } else {
            set({ error: response.error || 'Невірні дані' });
            return { success: false, error: response.error };
          }
        } catch (err: any) {
          if (err.status === 401) {
            set({ error: 'Невірні дані' });
            return { success: false, error: 'Невірні дані' };
          } else {
            set({ error: 'Сервер не відповідає' });
            return { success: false, error: 'Сервер не відповідає' };
          }
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
