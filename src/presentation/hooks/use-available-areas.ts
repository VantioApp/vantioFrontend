import { useQuery } from '@tanstack/react-query';
import { getAvailableAreasAction } from '@/core/actions/enrollments/enrollments-actions';
import { useAuthStore } from '@/presentation/stores/authStore';
import type { AvailableArea } from '@/core/interfaces';

export function useAvailableAreas(): { data: AvailableArea[] | undefined } {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['available-areas'],
    queryFn: () => getAvailableAreasAction(token!),
    enabled: !!token,
  });
}
