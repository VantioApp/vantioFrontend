import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ProfileClient from './ProfileClient';

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || cookieStore.get('vantio_token')?.value;

  if (!token) {
    redirect('/login');
  }

  return <ProfileClient />;
}
