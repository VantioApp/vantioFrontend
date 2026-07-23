import { cookies } from 'next/headers';
import AdminClient from './AdminClient';
import { getAdminStatsAction } from '@/core/actions/admin/admin-actions';

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || cookieStore.get('vantio_token')?.value;

  let initialStats = null;
  if (token) {
    try {
      initialStats = await getAdminStatsAction(7, token);
    } catch {}
  }

  return <AdminClient initialStats={initialStats} />;
}
