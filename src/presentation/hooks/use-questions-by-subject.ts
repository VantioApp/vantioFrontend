import { useQuery } from '@tanstack/react-query';
import { getQuestionsBySubjectAction } from '@/core/actions/questions/questions-actions';

export function useQuestionsBySubject(
  subjectId: string,
  params?: { page?: number; limit?: number },
) {
  return useQuery({
    queryKey: ['questions-by-subject', subjectId, params?.page],
    queryFn: () => getQuestionsBySubjectAction(subjectId, params),
    enabled: !!subjectId,
  });
}
