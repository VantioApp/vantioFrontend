import { create } from 'zustand';
import { Question, QuizState } from '@/types';
import api from '@/lib/api';
import { useAuthStore } from './authStore';

interface QuizStore extends QuizState {
  startQuiz: (area: string, totalQuestions?: number) => Promise<void>;
  selectOption: (optionIndex: number) => void;
  nextQuestion: () => void;
  finishQuiz: () => void;
  tickTimer: () => void;
  resetQuiz: () => void;
}

const initialQuizState: QuizState = {
  testId: null,
  questions: [],
  currentQuestionIndex: 0,
  selectedOptionIndex: null,
  answers: [],
  score: 0,
  timeLeft: 1800,
  isActive: false,
  isFinished: false,
};

export const useQuizStore = create<QuizStore>((set, get) => ({
  ...initialQuizState,

  startQuiz: async (area, totalQuestions = 40) => {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error('No autenticado');

    try {
      const response = await api.post<{
        testId: string;
        totalQuestions: number;
        questions: Question[];
      }>('/quiz/generate', { area, totalQuestions }, token);

      set({
        testId: response.testId,
        questions: response.questions,
        currentQuestionIndex: 0,
        selectedOptionIndex: null,
        answers: [],
        score: 0,
        timeLeft: 1800,
        isActive: true,
        isFinished: false,
      });
    } catch (error) {
      console.error('Failed to start quiz:', error);
      throw error;
    }
  },

  selectOption: (optionIndex) => {
    set({ selectedOptionIndex: optionIndex });
  },

  nextQuestion: () => {
    const { questions, currentQuestionIndex, selectedOptionIndex, answers, score, testId } = get();

    if (selectedOptionIndex === null) return;

    const currentQuestion = questions[currentQuestionIndex];
    const selectedLabel = currentQuestion.options[selectedOptionIndex].label;
    const isCorrect = currentQuestion.correctAnswers.includes(selectedLabel);
    const nextAnswers = [
      ...answers,
      {
        questionId: currentQuestion.id,
        selectedIndex: selectedOptionIndex,
        isCorrect,
      },
    ];

    const nextScore = isCorrect ? score + 1 : score;

    if (currentQuestionIndex + 1 < questions.length) {
      set({
        currentQuestionIndex: currentQuestionIndex + 1,
        selectedOptionIndex: null,
        answers: nextAnswers,
        score: nextScore,
      });
    } else {
      set({
        answers: nextAnswers,
        score: nextScore,
        isFinished: true,
        isActive: false,
      });
      get().finishQuiz();
    }
  },

  finishQuiz: async () => {
    const { testId, answers, questions } = get();
    const { token } = useAuthStore.getState();

    if (!testId || !token) return;

    try {
      const submitAnswers = answers.map((a) => ({
        testQuestionId: a.questionId,
        selectedAnswer: questions.find((q) => q.id === a.questionId)?.options[a.selectedIndex]?.label || '',
      }));

      await api.post(`/quiz/${testId}/submit`, { answers: submitAnswers }, token);
    } catch (error) {
      console.error('Failed to submit quiz:', error);
    }
  },

  tickTimer: () => {
    const { timeLeft, isActive } = get();
    if (!isActive) return;

    if (timeLeft <= 1) {
      set({ timeLeft: 0, isActive: false, isFinished: true });
      get().finishQuiz();
    } else {
      set({ timeLeft: timeLeft - 1 });
    }
  },

  resetQuiz: () => {
    set(initialQuizState);
  },
}));
