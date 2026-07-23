import { useQuery } from '@tanstack/react-query';
import { getSubjectsAction } from '@/core/actions/questions/questions-actions';
import type { Subject } from '@/core/interfaces';

export function useSubjects(initialData?: Subject[]) {
  return useQuery({
    queryKey: ['subjects'],
    queryFn: getSubjectsAction,
    initialData,
  });
}
