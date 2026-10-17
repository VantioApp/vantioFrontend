import { useQuery } from '@tanstack/react-query';
import { getSubjectProgressAction } from '@/core/actions/quiz/quiz-actions';
import { useAuthStore } from '@/presentation/stores/authStore';

export function useSubjectProgress(testId: string | null) {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['quiz-progress', testId],
    queryFn: () => getSubjectProgressAction(testId!, token!),
    enabled: !!testId && !!token,
    staleTime: 5 * 60 * 1000,
  });
}
