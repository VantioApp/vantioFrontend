import { cookies } from 'next/headers';
import AdminClient from './AdminClient';

interface AdminStats {
  totalUsers: number;
  totalTests: number;
  averageScore: number;
  recentTestTakers: number;
  testsByArea: { area: string; totalTests: number; averageScore: number }[];
  availableAreas: { area: string; subjectCount: number; totalQuestions: number }[];
}

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || cookieStore.get('vantio_token')?.value;

  let initialStats: AdminStats | null = null;

  if (token) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001/api';

      const statsRes = await fetch(`${apiUrl}/admin/stats?days=7`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      });

      if (statsRes.ok) {
        initialStats = await statsRes.json();
      }
    } catch {
      // Server fetch failed — AdminClient will fall back to client-side fetching
    }
  }

  return <AdminClient initialStats={initialStats} />;
}
