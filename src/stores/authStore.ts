import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';
import api from '@/lib/api';

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loadProfile: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post<{ user: User; access_token: string }>(
            '/auth/login',
            { email, password }
          );
          document.cookie = `access_token=${response.access_token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
          document.cookie = `vantio_token=${response.access_token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
          set({
            user: response.user,
            token: response.access_token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Error al iniciar sesión',
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post<{ user: User; access_token: string }>(
            '/auth/register',
            { name, email, password }
          );
          document.cookie = `access_token=${response.access_token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
          document.cookie = `vantio_token=${response.access_token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
          set({
            user: response.user,
            token: response.access_token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Error al registrarse',
            isLoading: false,
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          await api.post('/auth/logout');
        } catch (error) {
          console.error('Error durante logout:', error);
        } finally {
          document.cookie = 'access_token=; path=/; max-age=0';
          document.cookie = 'vantio_token=; path=/; max-age=0';
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
          });
        }
      },

      loadProfile: async () => {
        const { token } = get();
        console.log('[loadProfile] Token:', token ? 'EXISTS' : 'NULL');
        if (!token) return;

        try {
          console.log('[loadProfile] Calling /auth/profile...');
          const user = await api.get<User>('/auth/profile', token);
          console.log('[loadProfile] Profile loaded:', user.name);
          set({ user, isAuthenticated: true });
        } catch (error) {
          console.error('[loadProfile] Failed:', error);
          console.log('[loadProfile] Calling logout...');
          get().logout();
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'vantio-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
