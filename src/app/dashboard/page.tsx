import { cookies } from 'next/headers';
import DashboardClient from './DashboardClient';
import type { User } from '@/types';

interface TestHistoryItem {
  id: string;
  totalQuestions: number;
  correctCount: number;
  score: number;
  passed: boolean;
  startedAt: string;
  finishedAt: string | null;
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || cookieStore.get('vantio_token')?.value;

  let initialUser: User | null = null;
  let initialHistory: TestHistoryItem[] | null = null;

  if (token) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001/api';

      const userRes = await fetch(`${apiUrl}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      });

      if (userRes.ok) {
        initialUser = await userRes.json();

        if (initialUser?.id) {
          const historyRes = await fetch(`${apiUrl}/quiz/history/${initialUser.id}`, {
            headers: { Authorization: `Bearer ${token}` },
            cache: 'no-store',
          });

          if (historyRes.ok) {
            initialHistory = await historyRes.json();
          }
        }
      }
    } catch {
      // Server fetch failed — DashboardClient will fall back to client-side fetching
    }
  }

  return <DashboardClient initialUser={initialUser} initialHistory={initialHistory} />;
}
