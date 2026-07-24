import { useMutation, useQueryClient } from '@tanstack/react-query';
import { unenrollAreaAction } from '@/core/actions/enrollments/enrollments-actions';
import { useAuthStore } from '@/presentation/stores/authStore';

export function useUnenrollArea() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (area: string) => {
      const token = useAuthStore.getState().token;
      return unenrollAreaAction(area, token!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-enrollments'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
}
