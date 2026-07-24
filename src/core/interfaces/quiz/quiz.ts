import type { Subject } from '../questions/questions';

export interface QuestionOption {
  label: string;
  text: string;
}

export interface Question {
  id: string;
  testQuestionId: string;
  order: number;
  statement: string;
  options: QuestionOption[];
  correctAnswer?: string;
  category: string;
  explanation?: string;
  isActive?: boolean;
  subjectId?: string;
  subject?: Subject;
  themeName?: string;
  subjectName?: string;
}

export interface QuizAnswer {
  questionId: string;
  testQuestionId: string;
  selectedIndex: number;
  selectedAnswer: string;
  isCorrect?: boolean | null;
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
  area: string;
}

export interface PaginatedHistory {
  items: TestHistoryItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
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

export interface TestResultQuestionRaw {
  id: string;
  order: number;
  text: string;
  options: QuestionOption[];
  selectedAnswer: string | null;
  correctAnswer: string;
  isCorrect: boolean | null;
  explanation: string | null;
  themeName: string | null;
  subjectName: string;
}

export interface ThemeAnalysisItem {
  themeId: string;
  themeName: string;
  subjectId: string;
  subjectName: string;
  correct: number;
  total: number;
  pct: number;
}

export interface ClassifiedTheme {
  themeId: string;
  name: string;
  subjectName: string;
  pct: number;
  correct: number;
  total: number;
}

export interface StudyResource {
  id: string;
  title: string;
  type: 'doctrina' | 'jurisprudencia' | 'ley' | 'articulo';
  citation: string | null;
  description: string | null;
  url: string | null;
  themeName: string | null;
  subjectName: string;
}

export interface TestFeedback {
  id: string;
  themeAnalysis: ThemeAnalysisItem[];
  weakThemes: ClassifiedTheme[];
  strongThemes: ClassifiedTheme[];
  recommendation: string | null;
  studyResources: StudyResource[];
  createdAt: string;
}

export interface TestResultsResponse {
  testId: string;
  totalQuestions: number;
  correctCount: number;
  score: number;
  passed: boolean;
  startedAt: string;
  finishedAt: string;
  questions: TestResultQuestionRaw[];
  feedback: TestFeedback | null;
}
