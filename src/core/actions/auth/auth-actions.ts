import { api } from '../api/fetch-client';
import type {
  User,
  AuthResponse,
} from '@/core/interfaces';

export const loginAction = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  return api.post<AuthResponse>('/auth/login', { email, password });
};

export const registerAction = async (
  name: string,
  email: string,
  password: string,
): Promise<AuthResponse> => {
  return api.post<AuthResponse>('/auth/register', { name, email, password });
};

export const logoutAction = async (): Promise<void> => {
  return api.post<void>('/auth/logout');
};

export const getProfileAction = async (
  token: string,
): Promise<User> => {
  return api.get<User>('/auth/profile', token);
};

export const updateProfileAction = async (
  data: { name?: string; avatarUrl?: string | null },
  token: string,
): Promise<User> => {
  return api.patch<User>('/auth/profile', data, token);
};
