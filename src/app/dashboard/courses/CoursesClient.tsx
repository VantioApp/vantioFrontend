'use client';

import { useRouter } from 'next/navigation';
import { BookOpen, CheckCircle2, LogIn, LogOut as LogOutIcon, GraduationCap } from 'lucide-react';
import { useAvailableAreas } from '@/presentation/hooks/use-available-areas';
import { useMyEnrollments } from '@/presentation/hooks/use-my-enrollments';
import { useEnrollArea } from '@/presentation/hooks/use-enroll-area';
import { useUnenrollArea } from '@/presentation/hooks/use-unenroll-area';
import { useGenerateQuiz } from '@/presentation/hooks/use-quiz';
import { useQuizStore } from '@/presentation/stores/quizStore';

export default function CoursesClient() {
  const router = useRouter();
  const { data: availableAreas = [] } = useAvailableAreas();
  const { data: myEnrollments } = useMyEnrollments();
  const { mutate: enrollArea, isPending: isEnrolling } = useEnrollArea();
  const { mutate: unenrollArea, isPending: isUnenrolling } = useUnenrollArea();
  const { mutate: generateQuiz } = useGenerateQuiz();

  const enrolledAreas = myEnrollments?.enrolledAreas ?? [];

  const handleStartQuiz = (area: string) => {
    generateQuiz({ area }, {
      onSuccess: () => {
        const { testId } = useQuizStore.getState();
        if (testId) router.push(`/quiz/${testId}`);
      },
    });
  };

  const enrolledAreasList = availableAreas.filter((area) =>
    enrolledAreas.includes(area.area),
  );
  const unenrolledAreasList = availableAreas.filter(
    (area) => !enrolledAreas.includes(area.area),
  );

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-slate-900 font-bold tracking-tight">Mis Cursos</h1>
          <p className="text-sm text-slate-500 mt-1">Gestiona tus inscripciones en las áreas de estudio.</p>
        </div>
      </div>

      {enrolledAreasList.length > 0 && (
        <div className="bg-white rounded-xl border border-emerald-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-emerald-100">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="font-serif text-xl font-bold text-slate-900">Áreas Inscritas</h3>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full ml-2">
              {enrolledAreasList.length}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {enrolledAreasList.map((area) => (
              <div
                key={area.area}
                className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-4 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{area.area}</p>
                      <p className="text-xs text-slate-500">
                        {area.subjectCount} materia{area.subjectCount !== 1 ? 's' : ''} · {area.totalQuestions} preguntas
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider">
                    <CheckCircle2 className="w-3 h-3" />
                    Inscrito
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleStartQuiz(area.area)}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95 cursor-pointer"
                  >
                    Iniciar Prueba
                  </button>
                  <button
                    onClick={() => unenrollArea(area.area)}
                    disabled={isUnenrolling}
                    title="Desinscribirse"
                    className="px-3 py-2 rounded-lg border border-slate-200 text-slate-500 hover:text-rose-600 hover:border-rose-200 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    <LogOutIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {unenrolledAreasList.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
            <GraduationCap className="w-5 h-5 text-amber-600" />
            <h3 className="font-serif text-xl font-bold text-slate-900">Áreas Disponibles</h3>
            <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full ml-2">
              {unenrolledAreasList.length} para inscribir
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {unenrolledAreasList.map((area) => (
              <div
                key={area.area}
                className="rounded-lg border border-slate-200 bg-white hover:border-slate-300 p-4 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{area.area}</p>
                      <p className="text-xs text-slate-500">
                        {area.subjectCount} materia{area.subjectCount !== 1 ? 's' : ''} · {area.totalQuestions} preguntas
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => enrollArea(area.area)}
                  disabled={isEnrolling}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Inscribirme
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {availableAreas.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
          <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-sm font-medium text-slate-500">No hay áreas disponibles en este momento.</p>
        </div>
      )}
    </>
  );
}
