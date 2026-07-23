export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatarUrl?: string | null;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
