import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAreaAction } from '@/core/actions/admin/admin-actions';
import { useAuthStore } from '@/presentation/stores/authStore';

export function useCreateArea() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => {
      const token = useAuthStore.getState().token;
      return createAreaAction(name, token!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-subjects'] });
    },
  });
}
