import { useQuery } from '@tanstack/react-query';
import { getAdminTestResultsAction } from '@/core/actions/admin/admin-actions';
import { useAuthStore } from '@/presentation/stores/authStore';
import type { TestResultsResponse } from '@/core/interfaces';

export function useAdminTestResults(
  testId: string | null,
  initialData?: TestResultsResponse
) {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['admin-test-results', testId],
    queryFn: () => getAdminTestResultsAction(testId!, token!),
    enabled: !!testId && !!token,
    initialData,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
