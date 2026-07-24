import { useQuery } from '@tanstack/react-query';
import { getQuizHistoryAction } from '@/core/actions/quiz/quiz-actions';
import { useAuthStore } from '@/presentation/stores/authStore';
import type { PaginatedHistory } from '@/core/interfaces/quiz/quiz';

export function useQuizHistory(userId: string | undefined, initialData?: PaginatedHistory) {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['quiz-history', userId],
    queryFn: () => getQuizHistoryAction(userId!, token!),
    enabled: !!userId && !!token,
    initialData,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
