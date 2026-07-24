import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ExamReviewClient from './ExamReviewClient';
import { getAdminTestResultsAction } from '@/core/actions/admin/admin-actions';
import { getAdminUserDetailsAction } from '@/core/actions/admin/admin-actions';
import type { TestResultsResponse, AdminUserDetails } from '@/core/interfaces';

export default async function ExamReviewPage({
  params,
}: {
  params: Promise<{ userId: string; testId: string }>;
}) {
  const { userId, testId } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || cookieStore.get('vantio_token')?.value;

  if (!token) {
    redirect('/login');
  }

  let initialResults: TestResultsResponse | null = null;
  let initialUser: AdminUserDetails | null = null;

  try {
    [initialResults, initialUser] = await Promise.all([
      getAdminTestResultsAction(testId, token),
      getAdminUserDetailsAction(userId, token),
    ]);
  } catch {
    // Server fetch failed — Client component will fall back to client-side fetching
  }

  return (
    <ExamReviewClient
      userId={userId}
      testId={testId}
      initialResults={initialResults}
      initialUser={initialUser}
    />
  );
}
