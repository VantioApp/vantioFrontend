import { useQuery } from '@tanstack/react-query';
import { getAdminQuestionsAction } from '@/core/actions/admin/admin-actions';
import { useAuthStore } from '@/presentation/stores/authStore';

export function useAdminQuestions(
  params: {
    area?: string;
    subjectId?: string;
    search?: string;
    isActive?: boolean;
    page?: number;
    limit?: number;
  } = {},
) {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: [
      'admin-questions',
      params.area,
      params.page,
      params.search,
      params.subjectId,
      params.isActive,
    ],
    queryFn: () => getAdminQuestionsAction(params, token!),
    enabled: !!token,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
