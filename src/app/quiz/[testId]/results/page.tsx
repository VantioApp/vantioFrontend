'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { 
  CheckCircle, AlertTriangle, ArrowRight, Gavel, RefreshCw, 
  ChevronRight, BookOpen, Scale, Award, ShieldCheck
} from 'lucide-react';
import { useQuizStore } from '@/stores/quizStore';
import { useAuthStore } from '@/stores/authStore';

export default function QuizResultsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { questions, score, answers, resetQuiz } = useQuizStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const totalQuestions = questions.length || 10;
  const scorePercent = Math.round((score / totalQuestions) * 100);
  const isPassed = scorePercent >= 70;

  const handleRetry = () => {
    resetQuiz();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-800 antialiased justify-between">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Scale className="w-7 h-7 text-slate-900" />
            <span className="font-serif text-xl font-bold text-slate-900 tracking-tight">Vantio</span>
          </Link>

          <div className="bg-slate-900 text-white rounded-lg px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1 border border-slate-800 shadow-sm">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Resultado Oficial Guardado</span>
          </div>
        </div>
      </header>

      <main className="flex-grow py-12 px-6 max-w-3xl w-full mx-auto flex flex-col gap-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
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
                : 'Te recomendamos revisar la jurisprudencia y doctrina sugeridas en las explicaciones de las respuestas incorrectas.'
              }
            </p>
          </div>

          <div className="my-4 flex items-center gap-6 bg-slate-50 border border-slate-200/60 p-4 rounded-xl w-full max-w-sm justify-around">
            <div className="text-center">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Aciertos</p>
              <p className="text-3xl font-serif font-bold text-slate-900 mt-0.5">{score} / {totalQuestions}</p>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div className="text-center">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nota Porcentual</p>
              <p className={`text-3xl font-serif font-bold mt-0.5 ${isPassed ? 'text-emerald-600' : 'text-rose-600'}`}>
                {scorePercent}%
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <Link
              href="/dashboard"
              className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-lg text-sm shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Volver al Dashboard
              <ChevronRight className="w-4 h-4 text-amber-400" />
            </Link>
            <button
              onClick={handleRetry}
              className="flex-1 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-semibold py-3 px-4 rounded-lg text-sm shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4 text-amber-600" />
              Repetir Simulacro
            </button>
          </div>
        </motion.div>

        <div>
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-5.5 h-5.5 text-amber-600" />
            Revisión Doctrinal del Cuestionario
          </h2>

          <div className="flex flex-col gap-6">
            {questions.map((question, qIdx) => {
              const answerObj = answers.find(a => a.questionId === question.id);
              const studentAnswerIdx = answerObj ? answerObj.selectedIndex : null;
              const isCorrect = answerObj ? answerObj.isCorrect : false;
              const optionLetters = ['A', 'B', 'C', 'D'];

              return (
                <div 
                  key={question.id} 
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
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                      <Gavel className="w-3.5 h-3.5 text-amber-600" />
                      {question.category}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg text-slate-900 font-bold leading-normal">
                    {question.statement}
                  </h3>

                  <div className="flex flex-col gap-2 pt-2">
                    {question.options.map((option, oIdx) => {
                      const letter = optionLetters[oIdx];
                      const isCorrectOption = option.label === question.correctAnswer;
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
                            <span className="ml-auto text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded-md shrink-0">
                              Respuesta Correcta
                            </span>
                          )}
                          {isStudentChoice && !isCorrectOption && (
                            <span className="ml-auto text-[10px] font-bold text-rose-700 uppercase tracking-wider bg-rose-100 px-2 py-0.5 rounded-md shrink-0">
                              Tu Selección
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                      <BookOpen className="w-4 h-4 text-amber-600" />
                      Fundamento Jurídico Doctrinal
                    </p>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                      {question.explanation}
                    </p>
                  </div>
                </div>
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
