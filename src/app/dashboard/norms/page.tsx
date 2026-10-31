import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import NormsClient from './NormsClient';

export default async function NormsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || cookieStore.get('vantio_token')?.value;

  if (!token) {
    redirect('/login');
  }

  return <NormsClient />;
}
