import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import UserDetailsClient from './UserDetailsClient';
import {
  getAdminUserDetailsAction,
  getAdminUserTestsAction,
} from '@/core/actions/admin/admin-actions';
import type { AdminUserDetails, UserTestsResponse } from '@/core/interfaces';

export default async function UserDetailsPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || cookieStore.get('vantio_token')?.value;

  if (!token) {
    redirect('/login');
  }

  let initialUser: AdminUserDetails | null = null;
  let initialTests: UserTestsResponse | null = null;

  try {
    [initialUser, initialTests] = await Promise.all([
      getAdminUserDetailsAction(userId, token),
      getAdminUserTestsAction(userId, { page: 1, limit: 20 }, token),
    ]);
  } catch {
    // Server fetch failed — Client component will fall back to client-side fetching
  }

  return (
    <UserDetailsClient
      userId={userId}
      initialUser={initialUser}
      initialTests={initialTests}
    />
  );
}
