import { useQuery } from '@tanstack/react-query';
import { getAdminUserTestsAction } from '@/core/actions/admin/admin-actions';
import { useAuthStore } from '@/presentation/stores/authStore';
import type { UserTestsResponse } from '@/core/interfaces';

export function useAdminUserTests(
  userId: string | null,
  page: number = 1,
  limit: number = 20,
  initialData?: UserTestsResponse
) {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['admin-user-tests', userId, page, limit],
    queryFn: () => getAdminUserTestsAction(userId!, { page, limit }, token!),
    enabled: !!userId && !!token,
    initialData,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
