import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enrollAreaAction } from '@/core/actions/enrollments/enrollments-actions';
import { useAuthStore } from '@/presentation/stores/authStore';

export function useEnrollArea() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (area: string) => {
      const token = useAuthStore.getState().token;
      return enrollAreaAction(area, token!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-enrollments'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
}
