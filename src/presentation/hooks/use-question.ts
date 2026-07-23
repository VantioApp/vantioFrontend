import { useQuery } from '@tanstack/react-query';
import { getQuestionAction } from '@/core/actions/questions/questions-actions';

export function useQuestion(id: string) {
  return useQuery({
    queryKey: ['question', id],
    queryFn: () => getQuestionAction(id),
    enabled: !!id,
  });
}
