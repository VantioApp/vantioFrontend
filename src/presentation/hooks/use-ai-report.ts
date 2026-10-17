import { useQuery, useQueryClient } from '@tanstack/react-query';
import { generateAiReportAction } from '@/core/actions/quiz/quiz-actions';
import { useAuthStore } from '@/presentation/stores/authStore';
import type { AiReport, TestResultsResponse } from '@/core/interfaces';

/**
 * Informe de IA del test. El POST es idempotente en el backend, por lo que se modela como
 * query (deduplicada por testId, segura bajo StrictMode). Si ya viene en el feedback cacheado
 * no se solicita.
 */
export function useAiReport(testId: string, existing: AiReport | null | undefined, enabled: boolean) {
  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();
  const shouldFetch = enabled && !existing && !!token;

  const query = useQuery({
    queryKey: ['ai-report', testId],
    queryFn: async () => {
      const data = await generateAiReportAction(testId, token!);
      if (data.status === 'READY') {
        queryClient.setQueryData<TestResultsResponse>(['quiz-results', testId], (prev) =>
          prev?.feedback ? { ...prev, feedback: { ...prev.feedback, aiReport: data.report } } : prev
        );
      }
      return data;
    },
    enabled: shouldFetch,
    retry: false,
    staleTime: Infinity,
    gcTime: 10 * 60 * 1000,
  });

  const report = existing ?? (query.data?.status === 'READY' ? query.data.report : null);
  const isFailed = !report && (query.isError || query.data?.status === 'FAILED');

  return {
    report,
    isGenerating: !report && !isFailed && enabled && (query.isFetching || !token),
    isFailed,
    retry: () => {
      void query.refetch();
    },
  };
}
