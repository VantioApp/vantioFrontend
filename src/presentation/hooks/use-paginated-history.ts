import { useQuery } from '@tanstack/react-query';
import { getQuizHistoryAction } from '@/core/actions/quiz/quiz-actions';
import { useAuthStore } from '@/presentation/stores/authStore';
import type { PaginatedHistory } from '@/core/interfaces/quiz/quiz';

export function usePaginatedHistory(
  userId: string | undefined,
  page: number = 1,
  limit: number = 20,
  initialData?: PaginatedHistory
) {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['quiz-history', userId, page, limit],
    queryFn: () => getQuizHistoryAction(userId!, token!, { page, limit }),
    enabled: !!userId && !!token,
    initialData,
    staleTime: 2 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
}
