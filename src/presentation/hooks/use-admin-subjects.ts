import { useQuery } from '@tanstack/react-query';
import { getAdminSubjectsAction } from '@/core/actions/admin/admin-actions';
import { useAuthStore } from '@/presentation/stores/authStore';
import type { AdminSubject } from '@/core/interfaces';

export function useAdminSubjects(initialData?: AdminSubject[]) {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['admin-subjects'],
    queryFn: () => getAdminSubjectsAction(token!),
    enabled: !!token,
    initialData,
  });
}
