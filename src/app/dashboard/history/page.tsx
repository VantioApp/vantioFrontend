import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import HistoryClient from './HistoryClient';

export default async function HistoryPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || cookieStore.get('vantio_token')?.value;

  if (!token) {
    redirect('/login');
  }

  return <HistoryClient />;
}
