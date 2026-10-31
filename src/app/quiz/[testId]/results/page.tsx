'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import {
  CheckCircle, AlertTriangle, RefreshCw,
  ChevronRight, BookOpen, Award, Loader2
} from 'lucide-react';
import { Logo } from '@/presentation/components/ui/logo';
import { FooterMinimal } from '@/presentation/components/ui/footer';
import { useQuizStore } from '@/presentation/stores/quizStore';
import { useAuthStore } from '@/presentation/stores/authStore';
import { useProfile } from '@/presentation/hooks/use-profile';
import { useAuthHydration } from '@/presentation/hooks/use-auth-hydration';
import { useQuizResults } from '@/presentation/hooks/use-quiz-results';
import PlanRefuerzo from '@/presentation/components/quiz/PlanRefuerzo';
import StudyReport from '@/presentation/components/quiz/StudyReport';
import ThemePerformanceBars from '@/presentation/components/quiz/ThemePerformanceBars';
import SubjectProgressChart from '@/presentation/components/quiz/SubjectProgressChart';
import QuestionReviewCard from '@/presentation/components/quiz/QuestionReviewCard';

export default function QuizResultsPage() {
  const router = useRouter();
  const params = useParams();
  const testId = params.testId as string;
  const shouldReduce = useReducedMotion();
  const { data: user } = useProfile();
  const isHydrated = useAuthHydration();
  const hasToken = useAuthStore((s) => !!s.token);
  const resetQuiz = useQuizStore((s) => s.resetQuiz);

  const { data: resultsData, isLoading: isLoadingResults } = useQuizResults(testId);

  useEffect(() => {
    if (isHydrated && !hasToken && !user) {
      router.replace('/login');
    }
  }, [isHydrated, hasToken, user, router]);

  const totalQuestions = resultsData?.totalQuestions ?? 0;
  const correctCount = resultsData?.correctCount ?? 0;
  const scorePercent = resultsData?.score ?? 0;
  const isSimulacro = resultsData?.mode === 'idoneidad_simulacro';
  const percentile = resultsData?.percentile ?? null;
  const isPassed = resultsData?.passed ?? scorePercent >= 60;
  // El simulacro de idoneidad se aprueba frente a la media nacional: sin veredicto fijo.
  const showVerdict = !isSimulacro;

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

  if (!resultsData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-800 antialiased items-center justify-center px-6 text-center">
        <AlertTriangle className="w-10 h-10 text-amber-500 mb-4" />
        <p className="text-slate-700 text-sm font-semibold">No se pudieron cargar los resultados de la prueba.</p>
        <Link
          href="/dashboard"
          className="mt-4 inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 text-sm font-semibold cursor-pointer"
        >
          Volver al Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-800 antialiased justify-between">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center cursor-pointer">
            <Logo variant="full" theme="light" height={32} />
          </Link>

          <div className="bg-slate-900 text-white rounded-lg px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1 border border-slate-800 shadow-sm">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Resultado Oficial Guardado</span>
            <span className="sm:hidden">Guardado</span>
          </div>
        </div>
      </header>

      <main className="flex-grow py-8 sm:py-12 px-4 sm:px-6 max-w-3xl w-full mx-auto flex flex-col gap-8">
        {feedback && <StudyReport testId={testId} feedback={feedback} />}

        <motion.div 
          initial={shouldReduce ? false : { opacity: 0, scale: 0.98 }}
          animate={shouldReduce ? false : { opacity: 1, scale: 1 }}
          className="bg-white rounded-xl border border-slate-200 p-5 sm:p-8 shadow-sm text-center flex flex-col items-center gap-4"
        >
          {!showVerdict ? (
            <div className="w-16 h-16 bg-slate-50 border border-slate-200 text-slate-600 rounded-full flex items-center justify-center shadow-xs">
              <Award className="w-10 h-10" />
            </div>
          ) : isPassed ? (
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
              {!showVerdict ? 'Simulacro de Idoneidad' : isPassed ? '¡Prueba Aprobada!' : 'Requiere Refuerzo Doctrinal'}
            </h1>
            <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
              {!showVerdict
                ? 'En el examen oficial se aprueba al superar la media nacional, por lo que aquí no hay un umbral fijo. Usa el percentil y el desglose por competencia como referencia.'
                : isPassed 
                ? 'Excelente nivel. Cuentas con fundamentos sólidos para enfrentar tu examen preparatorio con confianza.' 
                : 'Revisa el plan de refuerzo y los recursos sugeridos para fortalecer los temas donde fallaste.'
              }
            </p>
          </div>

          <div className={`my-4 flex items-center gap-3 sm:gap-6 bg-slate-50 border border-slate-200/60 p-4 rounded-xl w-full justify-around ${isSimulacro ? 'max-w-lg' : 'max-w-sm'}`}>
            <div className="text-center">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Aciertos</p>
              <p className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-0.5 whitespace-nowrap">{correctCount} / {totalQuestions}</p>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div className="text-center">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nota Porcentual</p>
              <p className={`text-2xl sm:text-3xl font-serif font-bold mt-0.5 ${!showVerdict ? 'text-slate-900' : isPassed ? 'text-emerald-600' : 'text-rose-600'}`}>
                {Math.round(scorePercent)}%
              </p>
            </div>
            {isSimulacro && (
              <>
                <div className="w-px h-10 bg-slate-200" />
                <div className="text-center">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Percentil Vantio</p>
                  <p className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-0.5">
                    {percentile !== null ? Math.round(percentile) : '—'}
                  </p>
                </div>
              </>
            )}
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
            <SubjectProgressChart testId={testId} />
            <ThemePerformanceBars themeAnalysis={feedback.themeAnalysis} />
            <div>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <BookOpen className="w-5.5 h-5.5 text-amber-600" />
                Recursos de Refuerzo
              </h2>
              <PlanRefuerzo feedback={feedback} />
            </div>
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
                  isCorrect={question.isCorrect ?? null}
                  qIdx={qIdx}
                />
              );
            })}
          </div>
        </div>
      </main>

      <FooterMinimal />
    </div>
  );
}
