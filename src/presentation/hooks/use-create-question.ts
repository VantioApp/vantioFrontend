import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createQuestionAction } from '@/core/actions/admin/admin-actions';
import { useAuthStore } from '@/presentation/stores/authStore';
import type { CreateQuestionData } from '@/core/interfaces';

export function useCreateQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateQuestionData) => {
      const token = useAuthStore.getState().token;
      return createQuestionAction(data, token!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-questions'] });
      queryClient.invalidateQueries({ queryKey: ['admin-subjects'] });
    },
  });
}
