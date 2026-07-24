import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import CoursesClient from './CoursesClient';

export default async function CoursesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || cookieStore.get('vantio_token')?.value;

  if (!token) {
    redirect('/login');
  }

  return <CoursesClient />;
}
