import { useMutation, useQueryClient } from '@tanstack/react-query';
import { importQuestionsAction } from '@/core/actions/admin/admin-actions';
import { useAuthStore } from '@/presentation/stores/authStore';
import type { ImportQuestionsData } from '@/core/interfaces';

export function useImportQuestions() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ImportQuestionsData) => {
      const token = useAuthStore.getState().token;
      return importQuestionsAction(data, token!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-questions'] });
      queryClient.invalidateQueries({ queryKey: ['admin-subjects'] });
    },
  });
}
