import type { Subject } from '../questions/questions';

export interface QuestionOption {
  label: string;
  text: string;
}

export interface Question {
  id: string;
  statement: string;
  options: QuestionOption[];
  correctAnswers: string[];
  category: string;
  explanation: string;
  isActive?: boolean;
  subjectId?: string;
  subject?: Subject;
}

export interface QuizAnswer {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
}

export interface QuizState {
  testId: string | null;
  questions: Question[];
  currentQuestionIndex: number;
  selectedOptionIndex: number | null;
  answers: QuizAnswer[];
  score: number;
  timeLeft: number;
  isActive: boolean;
  isFinished: boolean;
}

export interface TestHistoryItem {
  id: string;
  totalQuestions: number;
  correctCount: number;
  score: number;
  passed: boolean;
  startedAt: string;
  finishedAt: string;
}

export interface GenerateQuizRequest {
  area: string;
  totalQuestions?: number;
}

export interface GenerateQuizResponse {
  testId: string;
  totalQuestions: number;
  questions: Question[];
}

export interface QuizAnswerItem {
  testQuestionId: string;
  selectedAnswer: string;
}

export interface SubmitQuizRequest {
  testId: string;
  answers: QuizAnswerItem[];
}

export interface SubmitQuizResponse {
  score: number;
  passed: boolean;
  totalQuestions: number;
  correctCount: number;
}

export interface TestResultQuestion extends Question {
  explanation: string;
}

export interface TestResultsResponse {
  testId: string;
  score: number;
  passed: boolean;
  questions: TestResultQuestion[];
}
