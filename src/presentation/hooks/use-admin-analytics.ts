import { useQuery } from '@tanstack/react-query';
import { getAdminAnalyticsAction } from '@/core/actions/admin/admin-actions';
import { useAuthStore } from '@/presentation/stores/authStore';

export function useAdminAnalytics(days: number) {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['admin-analytics', days],
    queryFn: () => getAdminAnalyticsAction(days, token!),
    enabled: !!token,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
