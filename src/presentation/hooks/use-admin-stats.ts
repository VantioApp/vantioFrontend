import { useQuery } from '@tanstack/react-query';
import { getAdminStatsAction } from '@/core/actions/admin/admin-actions';
import { useAuthStore } from '@/presentation/stores/authStore';
import type { AdminStats } from '@/core/interfaces';

export function useAdminStats(days: number = 7, initialData?: AdminStats) {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['admin-stats', days],
    queryFn: () => getAdminStatsAction(days, token!),
    enabled: !!token,
    initialData,
  });
}
