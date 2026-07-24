import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfileAction } from '@/core/actions/auth/auth-actions';
import { useAuthStore } from '@/presentation/stores/authStore';

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { name?: string; avatarUrl?: string | null }) => {
      const token = useAuthStore.getState().token;
      return updateProfileAction(data, token!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}
