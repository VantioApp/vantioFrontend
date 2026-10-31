import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Question, QuizMode, QuizState } from '@/core/interfaces';

interface SetQuizOptions {
  mode?: QuizMode;
  timeLimitSeconds?: number;
}

interface QuizStore extends QuizState {
  setQuiz: (testId: string, questions: Question[], options?: SetQuizOptions) => void;
  selectOption: (optionIndex: number) => void;
  nextQuestion: () => void;
  /** Solo simulacro: navegación libre entre preguntas. */
  goToQuestion: (index: number) => void;
  toggleFlag: () => void;
  tickTimer: () => void;
  markSubmitted: () => void;
  resetQuiz: () => void;
}

const BASE_QUIZ_SECONDS = 1800;
const SECONDS_PER_QUESTION = 45;

/** 30 min para 40 preguntas; los simulacros más largos escalan a 45 s por pregunta. */
const quizDuration = (questionCount: number) =>
  Math.max(BASE_QUIZ_SECONDS, questionCount * SECONDS_PER_QUESTION);

const initialQuizState: QuizState = {
  testId: null,
  mode: 'practice',
  deadlineAt: null,
  flagged: [],
  questions: [],
  currentQuestionIndex: 0,
  selectedOptionIndex: null,
  answers: [],
  score: 0,
  timeLeft: BASE_QUIZ_SECONDS,
  isActive: false,
  isFinished: false,
};

const answeredIndex = (state: QuizState, questionIndex: number): number | null => {
  const question = state.questions[questionIndex];
  if (!question) return null;
  const answer = state.answers.find((a) => a.questionId === question.id);
  return answer ? answer.selectedIndex : null;
};

export const useQuizStore = create<QuizStore>()(
  persist(
    (set, get) => ({
      ...initialQuizState,

      setQuiz: (testId, questions, options) => {
        const mode = options?.mode ?? 'practice';
        const timeLimit = options?.timeLimitSeconds;
        const isTimed = mode === 'idoneidad_simulacro' && !!timeLimit;
        set({
          testId,
          mode,
          deadlineAt: isTimed ? Date.now() + timeLimit * 1000 : null,
          flagged: [],
          questions,
          currentQuestionIndex: 0,
          selectedOptionIndex: null,
          answers: [],
          score: 0,
          timeLeft: isTimed ? timeLimit : quizDuration(questions.length),
          isActive: true,
          isFinished: false,
        });
      },

      selectOption: (optionIndex) => {
        const state = get();
        if (state.mode !== 'idoneidad_simulacro') {
          set({ selectedOptionIndex: optionIndex });
          return;
        }
        const question = state.questions[state.currentQuestionIndex];
        if (!question) return;
        const answer = {
          questionId: question.id,
          testQuestionId: question.testQuestionId,
          selectedIndex: optionIndex,
          selectedAnswer: question.options[optionIndex].label,
          isCorrect: null,
        };
        set({
          selectedOptionIndex: optionIndex,
          answers: [...state.answers.filter((a) => a.questionId !== question.id), answer],
        });
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

      goToQuestion: (index) => {
        const state = get();
        if (state.mode !== 'idoneidad_simulacro') return;
        if (index < 0 || index >= state.questions.length) return;
        set({
          currentQuestionIndex: index,
          selectedOptionIndex: answeredIndex(state, index),
        });
      },

      toggleFlag: () => {
        const { questions, currentQuestionIndex, flagged } = get();
        const question = questions[currentQuestionIndex];
        if (!question) return;
        set({
          flagged: flagged.includes(question.id)
            ? flagged.filter((id) => id !== question.id)
            : [...flagged, question.id],
        });
      },

      tickTimer: () => {
        const { timeLeft, isActive, deadlineAt } = get();
        if (!isActive) return;
        // Con plazo absoluto (simulacro) el reloj sobrevive a recargas y pestañas dormidas.
        const remaining =
          deadlineAt !== null ? Math.max(0, Math.ceil((deadlineAt - Date.now()) / 1000)) : timeLeft - 1;
        if (remaining <= 0) {
          set({ timeLeft: 0, isActive: false, isFinished: true });
        } else {
          set({ timeLeft: remaining });
        }
      },

      markSubmitted: () => {
        set({ isActive: false, isFinished: true });
      },

      resetQuiz: () => {
        set(initialQuizState);
      },
    }),
    {
      name: 'vantio-quiz-session',
      storage: createJSONStorage(() => sessionStorage),
      // Se hidrata a mano desde la página del quiz para evitar desajustes SSR.
      skipHydration: true,
      // Solo el simulacro (5 h) se conserva ante recargas; la práctica no.
      partialize: (state) =>
        state.mode === 'idoneidad_simulacro' && state.isActive
          ? {
              testId: state.testId,
              mode: state.mode,
              deadlineAt: state.deadlineAt,
              flagged: state.flagged,
              questions: state.questions,
              currentQuestionIndex: state.currentQuestionIndex,
              selectedOptionIndex: state.selectedOptionIndex,
              answers: state.answers,
              timeLeft: state.timeLeft,
              isActive: state.isActive,
              isFinished: state.isFinished,
              score: state.score,
            }
          : {},
    }
  )
);
