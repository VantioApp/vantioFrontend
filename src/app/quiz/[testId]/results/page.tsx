'use client';

import { useEffect, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { 
  CheckCircle, AlertTriangle, Gavel, RefreshCw, 
  ChevronRight, BookOpen, Award, Loader2, X
} from 'lucide-react';
import { Logo } from '@/presentation/components/ui/logo';
import { useQuizStore } from '@/presentation/stores/quizStore';
import { useProfile } from '@/presentation/hooks/use-profile';
import { useQuizResults } from '@/presentation/hooks/use-quiz-results';
import PlanRefuerzo from '@/presentation/components/quiz/PlanRefuerzo';
import PerformancePolarChart from '@/presentation/components/quiz/PerformancePolarChart';
import type { TestResultQuestionRaw, TestResultsResponse } from '@/core/interfaces';

const optionLetters = ['A', 'B', 'C', 'D'];

const QuestionReviewCard = React.memo(function QuestionReviewCard({
  question,
  selectedAnswer,
  isCorrect,
  qIdx,
}: {
  question: TestResultQuestionRaw;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  qIdx: number;
}) {
  const studentAnswerIdx = selectedAnswer
    ? question.options.findIndex((o) => o.label === selectedAnswer)
    : null;

  return (
    <div 
      className={`bg-white rounded-xl border p-6 md:p-8 shadow-xs flex flex-col gap-4 relative overflow-hidden ${
        isCorrect ? 'border-emerald-200' : 'border-rose-200'
      }`}
    >
      <div className={`absolute top-0 left-0 w-1.5 h-full ${
        isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
      }`} />

      <div className="flex justify-between items-center gap-4 border-b border-slate-100 pb-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Pregunta {qIdx + 1}
        </span>
        <div className="flex items-center gap-2">
          {question.themeName && (
            <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
              {question.themeName}
            </span>
          )}
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <Gavel className="w-3.5 h-3.5 text-amber-600" />
            {question.subjectName}
          </span>
        </div>
      </div>

      <h3 className="font-serif text-lg text-slate-900 font-bold leading-normal">
        {question.text}
      </h3>

      <div className="flex flex-col gap-2 pt-2">
        {question.options.map((option, oIdx) => {
          const letter = optionLetters[oIdx];
          const isCorrectOption = question.correctAnswer === option.label;
          const isStudentChoice = oIdx === studentAnswerIdx;

          let rowStyle = 'bg-slate-50 border-slate-200 text-slate-700';
          let letterStyle = 'bg-slate-200 text-slate-600 border-slate-300';

          if (isCorrectOption) {
            rowStyle = 'bg-emerald-50/60 border-emerald-300 text-emerald-900 font-medium';
            letterStyle = 'bg-emerald-500 text-white border-emerald-600';
          } else if (isStudentChoice && !isCorrect) {
            rowStyle = 'bg-rose-50/60 border-rose-200 text-rose-900';
            letterStyle = 'bg-rose-500 text-white border-rose-600';
          }

          return (
            <div key={oIdx} className={`rounded-lg p-3.5 flex items-start gap-3 border text-xs sm:text-sm ${rowStyle}`}>
              <span className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full font-bold text-xs border ${letterStyle}`}>
                {letter}
              </span>
              <span className="pt-0.5 leading-normal">{option.text}</span>
              
              {isCorrectOption && (
                <span className="ml-auto text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded-md shrink-0 flex items-center gap-1">
                  {isStudentChoice && (
                    <CheckCircle className="w-3 h-3" />
                  )}
                  {isStudentChoice ? 'Tu Respuesta Correcta' : 'Respuesta Correcta'}
                </span>
              )}
              {isStudentChoice && !isCorrectOption && (
                <span className="ml-auto text-[10px] font-bold text-rose-700 uppercase tracking-wider bg-rose-100 px-2 py-0.5 rounded-md shrink-0 flex items-center gap-1">
                  <X className="w-3 h-3" />
                  Tu Selección
                </span>
              )}
            </div>
          );
        })}
      </div>

      {question.explanation && (
        <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
            <BookOpen className="w-4 h-4 text-amber-600" />
            Fundamento Jurídico
          </p>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
});

export default function QuizResultsPage() {
  const router = useRouter();
  const params = useParams();
  const testId = params.testId as string;
  const shouldReduce = useReducedMotion();
  const { data: user } = useProfile();
  const resetQuiz = useQuizStore((s) => s.resetQuiz);

  const { data: resultsData, isLoading: isLoadingResults } = useQuizResults(testId);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const totalQuestions = resultsData?.totalQuestions || 10;
  const correctCount = resultsData?.correctCount || 0;
  const scorePercent = resultsData?.score ?? (resultsData?.questions?.length ? Math.round((correctCount / totalQuestions) * 100) : 0);
  const isPassed = resultsData?.passed ?? scorePercent >= 70;

  const handleRetry = () => {
    resetQuiz();
    router.push('/dashboard');
  };

  const feedback = resultsData?.feedback || null;

  if (isLoadingResults) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-800 antialiased items-center justify-center">
        <Loader2 className="w-10 h-10 text-slate-400 animate-spin mb-4" />
        <p className="text-slate-500 text-sm">Cargando resultados de la prueba...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-800 antialiased justify-between">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center">
            <Logo variant="full" theme="light" height={32} />
          </Link>

          <div className="bg-slate-900 text-white rounded-lg px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1 border border-slate-800 shadow-sm">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Resultado Oficial Guardado</span>
          </div>
        </div>
      </header>

      <main className="flex-grow py-12 px-6 max-w-3xl w-full mx-auto flex flex-col gap-8">
        <motion.div 
          initial={shouldReduce ? false : { opacity: 0, scale: 0.98 }}
          animate={shouldReduce ? false : { opacity: 1, scale: 1 }}
          className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm text-center flex flex-col items-center gap-4"
        >
          {isPassed ? (
            <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center shadow-xs">
              <CheckCircle className="w-10 h-10" />
            </div>
          ) : (
            <div className="w-16 h-16 bg-rose-50 border border-rose-200 text-rose-600 rounded-full flex items-center justify-center shadow-xs">
              <AlertTriangle className="w-10 h-10" />
            </div>
          )}

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Diagnóstico de Desempeño</span>
            <h1 className="font-serif text-3xl font-bold text-slate-900 mt-1">
              {isPassed ? '¡Prueba Aprobada!' : 'Requiere Refuerzo Doctrinal'}
            </h1>
            <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
              {isPassed 
                ? 'Excelente nivel. Cuentas con fundamentos sólidos para enfrentar tu examen preparatorio con confianza.' 
                : 'Revisa el plan de refuerzo y los recursos sugeridos para fortalecer los temas donde fallaste.'
              }
            </p>
          </div>

          <div className="my-4 flex items-center gap-6 bg-slate-50 border border-slate-200/60 p-4 rounded-xl w-full max-w-sm justify-around">
            <div className="text-center">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Aciertos</p>
              <p className="text-3xl font-serif font-bold text-slate-900 mt-0.5">{correctCount} / {totalQuestions}</p>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div className="text-center">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nota Porcentual</p>
              <p className={`text-3xl font-serif font-bold mt-0.5 ${isPassed ? 'text-emerald-600' : 'text-rose-600'}`}>
                {Math.round(scorePercent)}%
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <Link
              href="/dashboard"
              className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-lg text-sm shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              Volver al Dashboard
              <ChevronRight className="w-4 h-4 text-amber-400" />
            </Link>
            <button
              onClick={handleRetry}
              className="flex-1 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-semibold py-3 px-4 rounded-lg text-sm shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-amber-600" />
              Repetir Simulacro
            </button>
          </div>
        </motion.div>

        {feedback ? (
          <>
            <div>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <BookOpen className="w-5.5 h-5.5 text-amber-600" />
                Plan de Refuerzo Personalizado
              </h2>
              <PlanRefuerzo feedback={feedback} />
            </div>
            <PerformancePolarChart themeAnalysis={feedback.themeAnalysis} />
          </>
        ) : null}

        <div>
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-5.5 h-5.5 text-amber-600" />
            Revisión Doctrinal del Cuestionario
          </h2>

          <div className="flex flex-col gap-6 content-visibility-auto">
            {resultsData?.questions.map((question, qIdx) => {
              return (
                <QuestionReviewCard
                  key={question.id || qIdx}
                  question={question}
                  selectedAnswer={question.selectedAnswer || null}
                  isCorrect={question.isCorrect || null}
                  qIdx={qIdx}
                />
              );
            })}
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 py-6 text-center border-t border-slate-800">
        <p className="text-xs text-slate-500">
          © 2026 Vantio Legal Education. Todos los derechos reservados. Excelencia Profesional en el Derecho.
        </p>
      </footer>
    </div>
  );
}
