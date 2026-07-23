import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginAction, registerAction, logoutAction } from '@/core/actions/auth/auth-actions';
import { useAuthStore } from '@/presentation/stores/authStore';
import type { AuthResponse } from '@/core/interfaces/auth/auth';

function setAuthCookies(token: string) {
  const cookieOpts = 'path=/; max-age=604800; SameSite=Lax';
  document.cookie = `access_token=${token}; ${cookieOpts}`;
  document.cookie = `vantio_token=${token}; ${cookieOpts}`;
}

function clearAuthCookies() {
  document.cookie = 'access_token=; path=/; max-age=0';
  document.cookie = 'vantio_token=; path=/; max-age=0';
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginAction(email, password),
    onSuccess: (data: AuthResponse) => {
      useAuthStore.getState().setAuth(data.user, data.access_token);
      setAuthCookies(data.access_token);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => registerAction(name, email, password),
    onSuccess: (data: AuthResponse) => {
      useAuthStore.getState().setAuth(data.user, data.access_token);
      setAuthCookies(data.access_token);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutAction,
    onSuccess: () => {
      useAuthStore.getState().clearAuth();
      clearAuthCookies();
      queryClient.clear();
    },
  });
}
