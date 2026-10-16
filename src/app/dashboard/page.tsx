import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';

// Los datos se cargan en el cliente con TanStack Query para aprovechar su caché:
// pedirlos aquí obligaría a repetir las peticiones en cada navegación al dashboard.
export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || cookieStore.get('vantio_token')?.value;

  if (!token) {
    redirect('/login');
  }

  return <DashboardClient />;
}
