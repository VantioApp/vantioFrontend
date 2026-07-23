import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';
import { getProfileAction } from '@/core/actions/auth/auth-actions';
import { getQuizHistoryAction } from '@/core/actions/quiz/quiz-actions';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || cookieStore.get('vantio_token')?.value;

  if (!token) {
    redirect('/login');
  }

  let initialUser = null;
  let initialHistory = null;

  try {
    initialUser = await getProfileAction(token);
    initialHistory = await getQuizHistoryAction(initialUser.id, token);
  } catch {
    // Server fetch failed — DashboardClient will fall back to client-side fetching
  }

  return <DashboardClient initialUser={initialUser} initialHistory={initialHistory} />;
}
