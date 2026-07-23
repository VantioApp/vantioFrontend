import { create } from 'zustand';
import type { Question, QuizState } from '@/core/interfaces';

interface QuizStore extends QuizState {
  setQuiz: (testId: string, questions: Question[]) => void;
  selectOption: (optionIndex: number) => void;
  nextQuestion: () => void;
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

  setQuiz: (testId, questions) => {
    set({
      testId,
      questions,
      currentQuestionIndex: 0,
      selectedOptionIndex: null,
      answers: [],
      score: 0,
      timeLeft: 1800,
      isActive: true,
      isFinished: false,
    });
  },

  selectOption: (optionIndex) => {
    set({ selectedOptionIndex: optionIndex });
  },

  nextQuestion: () => {
    const { questions, currentQuestionIndex, selectedOptionIndex, answers, score } = get();
    if (selectedOptionIndex === null) return;

    const currentQuestion = questions[currentQuestionIndex];
    const selectedLabel = currentQuestion.options[selectedOptionIndex].label;
    const isCorrect = currentQuestion.correctAnswers.includes(selectedLabel);
    const nextAnswers = [
      ...answers,
      { questionId: currentQuestion.id, selectedIndex: selectedOptionIndex, isCorrect },
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
    }
  },

  tickTimer: () => {
    const { timeLeft, isActive } = get();
    if (!isActive) return;
    if (timeLeft <= 1) {
      set({ timeLeft: 0, isActive: false, isFinished: true });
    } else {
      set({ timeLeft: timeLeft - 1 });
    }
  },

  resetQuiz: () => {
    set(initialQuizState);
  },
}));
