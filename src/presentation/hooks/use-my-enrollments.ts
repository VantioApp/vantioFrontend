import { useQuery } from '@tanstack/react-query';
import { getMyEnrollmentsAction } from '@/core/actions/enrollments/enrollments-actions';
import { useAuthStore } from '@/presentation/stores/authStore';
import type { MyEnrollments } from '@/core/interfaces';

export function useMyEnrollments(): { data: MyEnrollments | undefined } {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['my-enrollments'],
    queryFn: () => getMyEnrollmentsAction(token!),
    enabled: !!token,
  });
}
