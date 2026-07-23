import { useMutation, useQueryClient } from '@tanstack/react-query';
import { generateQuizAction, submitQuizAction } from '@/core/actions/quiz/quiz-actions';
import { useAuthStore } from '@/presentation/stores/authStore';
import { useQuizStore } from '@/presentation/stores/quizStore';
import type { GenerateQuizResponse } from '@/core/interfaces/quiz/quiz';

export function useGenerateQuiz() {
  return useMutation({
    mutationFn: ({
      area,
      totalQuestions,
    }: {
      area: string;
      totalQuestions?: number;
    }) => {
      const token = useAuthStore.getState().token;
      return generateQuizAction({ area, totalQuestions }, token!);
    },
    onSuccess: (data: GenerateQuizResponse) => {
      useQuizStore.getState().setQuiz(data.testId, data.questions);
    },
  });
}

export function useSubmitQuiz() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      testId,
      answers,
    }: {
      testId: string;
      answers: { testQuestionId: string; selectedAnswer: string }[];
    }) => {
      const token = useAuthStore.getState().token;
      return submitQuizAction(testId, answers, token!);
    },
    onSuccess: () => {
      const userId = useAuthStore.getState().user?.id;
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ['quiz-history', userId] });
      }
    },
  });
}
