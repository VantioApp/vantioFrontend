import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  generateIdoneidadSimulacroAction,
  generateQuizAction,
  submitQuizAction,
} from '@/core/actions/quiz/quiz-actions';
import { useAuthStore } from '@/presentation/stores/authStore';
import { useQuizStore } from '@/presentation/stores/quizStore';
import type { GenerateQuizResponse } from '@/core/interfaces/quiz/quiz';

export function useGenerateQuiz() {
  return useMutation({
    mutationFn: ({
      area,
      totalQuestions,
      subjectIds,
    }: {
      area: string;
      totalQuestions?: number;
      subjectIds?: string[];
    }) => {
      const token = useAuthStore.getState().token;
      return generateQuizAction({ area, totalQuestions, subjectIds }, token!);
    },
    onSuccess: (data: GenerateQuizResponse) => {
      useQuizStore.getState().setQuiz(data.testId, data.questions);
    },
  });
}

export function useGenerateIdoneidadSimulacro() {
  return useMutation({
    mutationFn: () => {
      const token = useAuthStore.getState().token;
      return generateIdoneidadSimulacroAction(token!);
    },
    onSuccess: (data: GenerateQuizResponse) => {
      useQuizStore.getState().setQuiz(data.testId, data.questions, {
        mode: 'idoneidad_simulacro',
        timeLimitSeconds: data.timeLimitSeconds ?? undefined,
      });
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
