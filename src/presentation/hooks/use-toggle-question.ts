import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleQuestionAction } from '@/core/actions/admin/admin-actions';
import { useAuthStore } from '@/presentation/stores/authStore';
import type { AdminQuestionsResponse } from '@/core/interfaces';

export function useToggleQuestion(
  area: string,
  page: number,
  search: string,
  subjectId: string,
  isActive: string,
) {
  const queryClient = useQueryClient();
  const queryKey = [
    'admin-questions',
    area,
    page,
    search,
    subjectId,
    isActive,
  ];

  return useMutation({
    mutationFn: (questionId: string) => {
      const token = useAuthStore.getState().token;
      return toggleQuestionAction(questionId, token!);
    },
    onMutate: async (questionId) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<AdminQuestionsResponse>(queryKey);

      if (previous) {
        queryClient.setQueryData<AdminQuestionsResponse>(queryKey, {
          ...previous,
          questions: previous.questions.map((q) =>
            q.id === questionId ? { ...q, isActive: !q.isActive } : q,
          ),
        });
      }

      return { previous };
    },
    onError: (_err, _questionId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-questions'] });
    },
  });
}
