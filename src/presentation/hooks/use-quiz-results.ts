import { useQuery } from '@tanstack/react-query';
import { getQuizResultsAction } from '@/core/actions/quiz/quiz-actions';
import { useAuthStore } from '@/presentation/stores/authStore';
import type { TestResultsResponse } from '@/core/interfaces/quiz/quiz';

export function useQuizResults(testId: string | null, initialData?: TestResultsResponse) {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['quiz-results', testId],
    queryFn: () => getQuizResultsAction(testId!, token!),
    enabled: !!testId && !!token,
    initialData,
  });
}
