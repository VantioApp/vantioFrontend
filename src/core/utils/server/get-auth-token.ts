import { cookies } from 'next/headers';

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return (
    cookieStore.get('access_token')?.value ||
    cookieStore.get('vantio_token')?.value ||
    null
  );
}
