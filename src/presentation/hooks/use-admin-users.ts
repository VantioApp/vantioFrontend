import { useQuery } from '@tanstack/react-query';
import { getAdminUsersAction } from '@/core/actions/admin/admin-actions';
import { useAuthStore } from '@/presentation/stores/authStore';

export function useAdminUsers(
  params: { search?: string; page?: number; limit?: number } = {},
) {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['admin-users', params.page, params.search],
    queryFn: () => getAdminUsersAction(params, token!),
    enabled: !!token,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
