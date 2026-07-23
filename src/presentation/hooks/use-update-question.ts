import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateQuestionAction } from '@/core/actions/admin/admin-actions';
import { useAuthStore } from '@/presentation/stores/authStore';
import type { UpdateQuestionData } from '@/core/interfaces';

export function useUpdateQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateQuestionData;
    }) => {
      const token = useAuthStore.getState().token;
      return updateQuestionAction(id, data, token!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-questions'] });
      queryClient.invalidateQueries({ queryKey: ['admin-subjects'] });
    },
  });
}
