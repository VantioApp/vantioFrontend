import type { Metadata } from 'next';
import AdminUsersClient from './UsersClient';

export const metadata: Metadata = {
  title: 'Gestión de Usuarios | Vantio Admin',
  description: 'Lista de usuarios registrados en la plataforma con métricas de uso',
};

export default function AdminUsersPage() {
  return <AdminUsersClient />;
}
