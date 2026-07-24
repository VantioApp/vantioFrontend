import { useQuery } from '@tanstack/react-query';
import { getAdminUserDetailsAction } from '@/core/actions/admin/admin-actions';
import { useAuthStore } from '@/presentation/stores/authStore';
import type { AdminUserDetails } from '@/core/interfaces';

export function useAdminUserDetails(
  userId: string | null,
  initialData?: AdminUserDetails
) {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['admin-user-details', userId],
    queryFn: () => getAdminUserDetailsAction(userId!, token!),
    enabled: !!userId && !!token,
    initialData,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
