import { create } from 'zustand';
import type { Question, QuizState } from '@/core/interfaces';

interface QuizStore extends QuizState {
  setQuiz: (testId: string, questions: Question[]) => void;
  selectOption: (optionIndex: number) => void;
  nextQuestion: () => void;
  tickTimer: () => void;
  resetQuiz: () => void;
}

const BASE_QUIZ_SECONDS = 1800;
const SECONDS_PER_QUESTION = 45;

/** 30 min para 40 preguntas; los simulacros más largos escalan a 45 s por pregunta. */
const quizDuration = (questionCount: number) =>
  Math.max(BASE_QUIZ_SECONDS, questionCount * SECONDS_PER_QUESTION);

const initialQuizState: QuizState = {
  testId: null,
  questions: [],
  currentQuestionIndex: 0,
  selectedOptionIndex: null,
  answers: [],
  score: 0,
  timeLeft: BASE_QUIZ_SECONDS,
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
      timeLeft: quizDuration(questions.length),
      isActive: true,
      isFinished: false,
    });
  },

  selectOption: (optionIndex) => {
    set({ selectedOptionIndex: optionIndex });
  },

  nextQuestion: () => {
    const { questions, currentQuestionIndex, selectedOptionIndex, answers } = get();
    if (selectedOptionIndex === null) return;

    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = currentQuestion.options[selectedOptionIndex].label;
    const nextAnswers = [
      ...answers,
      {
        questionId: currentQuestion.id,
        testQuestionId: currentQuestion.testQuestionId,
        selectedIndex: selectedOptionIndex,
        selectedAnswer,
        isCorrect: null,
      },
    ];

    if (currentQuestionIndex + 1 < questions.length) {
      set({
        currentQuestionIndex: currentQuestionIndex + 1,
        selectedOptionIndex: null,
        answers: nextAnswers,
      });
    } else {
      set({
        answers: nextAnswers,
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
