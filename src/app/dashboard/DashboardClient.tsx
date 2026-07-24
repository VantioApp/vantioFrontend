'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Users, CheckCircle2, XCircle, GraduationCap, LogIn, LogOut as LogOutIcon, ChevronRight, TrendingUp } from 'lucide-react';
import { useProfile } from '@/presentation/hooks/use-profile';
import { useQuizHistory } from '@/presentation/hooks/use-quiz-history';
import { useGenerateQuiz } from '@/presentation/hooks/use-quiz';
import { useAvailableAreas } from '@/presentation/hooks/use-available-areas';
import { useMyEnrollments } from '@/presentation/hooks/use-my-enrollments';
import { useEnrollArea } from '@/presentation/hooks/use-enroll-area';
import { useUnenrollArea } from '@/presentation/hooks/use-unenroll-area';
import { useQuizStore } from '@/presentation/stores/quizStore';
import { formatDate } from '@/core/utils/format-date';
import { formatDateTime } from '@/core/utils/format-date-time';
import type { User, PaginatedHistory } from '@/core/interfaces';

interface DashboardClientProps {
  initialUser: User | null;
  initialHistory: PaginatedHistory | null;
}

export default function DashboardClient({ initialUser, initialHistory }: DashboardClientProps) {
  const router = useRouter();
  const { data: user } = useProfile(initialUser || undefined);
  const { data: historyData } = useQuizHistory(user?.id, initialHistory || undefined);
  const { mutate: generateQuiz, isPending: isGenerating } = useGenerateQuiz();
  const { data: availableAreas = [] } = useAvailableAreas();
  const { data: myEnrollments } = useMyEnrollments();
  const { mutate: enrollArea, isPending: isEnrolling } = useEnrollArea();
  const { mutate: unenrollArea, isPending: isUnenrolling } = useUnenrollArea();

  const enrolledAreas = myEnrollments?.enrolledAreas ?? user?.enrolledAreas ?? [];
  const history = historyData?.items ?? [];

  const handleStartQuiz = (area: string) => {
    generateQuiz({ area }, {
      onSuccess: () => {
        const { testId } = useQuizStore.getState();
        if (testId) router.push(`/quiz/${testId}`);
      },
    });
  };

  if (!user) return null;

  const memberSince = user.createdAt ? formatDate(user.createdAt) : 'N/A';
  const totalTests = historyData?.total ?? 0;
  const avgScore = history.length > 0
    ? Math.round(history.reduce((sum, t) => sum + t.score, 0) / history.length)
    : 0;
  const lastTest = history.length > 0 ? history[0] : null;

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-slate-900 font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Bienvenido de vuelta a tu progreso académico.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col items-center text-center lg:col-span-1">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-slate-50 shadow-sm bg-slate-100 flex items-center justify-center">
            {user.avatarUrl ? (
              <Image src={user.avatarUrl} alt={user.name} width={96} height={96} className="w-full h-full object-cover" />
            ) : (
              <Users className="w-12 h-12 text-slate-400" />
            )}
          </div>
          <h2 className="font-serif text-xl font-bold text-slate-900">{user.name}</h2>
          <p className="text-sm text-slate-500 mt-1 mb-6">Miembro desde: {memberSince}</p>
          <Link
            href="/dashboard/profile"
            className="w-full border border-slate-300 text-slate-900 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors text-center cursor-pointer"
          >
            Editar Perfil
          </Link>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 text-slate-900 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pruebas Realizadas</p>
                <p className="text-2xl font-bold text-slate-950 mt-0.5">{totalTests}</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-lg flex items-center justify-center border border-amber-200">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Promedio</p>
                <p className="text-2xl font-bold text-slate-950 mt-0.5">{avgScore}%</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-lg flex items-center justify-center border border-emerald-200">
                <GraduationCap className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Última Prueba</p>
                <p className="text-sm font-bold text-slate-950 mt-0.5 truncate max-w-[120px]">
                  {lastTest ? lastTest.area : '—'}
                </p>
              </div>
            </div>
          </div>

          <div id="areas" className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-amber-600" />
                <h3 className="font-serif text-xl font-bold text-slate-900">Áreas Disponibles</h3>
              </div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {enrolledAreas.length} inscrita{enrolledAreas.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {availableAreas.map((area) => {
                const isEnrolled = enrolledAreas.includes(area.area);
                return (
                  <div
                    key={area.area}
                    className={`rounded-lg border p-4 transition-all ${
                      isEnrolled
                        ? 'border-emerald-200 bg-emerald-50/50'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <BookOpen className={`w-5 h-5 ${isEnrolled ? 'text-emerald-600' : 'text-slate-400'}`} />
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">{area.area}</p>
                          <p className="text-xs text-slate-500">
                            {area.subjectCount} materia{area.subjectCount !== 1 ? 's' : ''} · {area.totalQuestions} preguntas
                          </p>
                        </div>
                      </div>
                      {isEnrolled && (
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider">
                          <CheckCircle2 className="w-3 h-3" />
                          Inscrito
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {isEnrolled ? (
                        <>
                          <button
                            onClick={() => handleStartQuiz(area.area)}
                            disabled={isGenerating}
                            className="flex-1 bg-slate-900 hover:bg-slate-800 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isGenerating ? 'Generando...' : 'Iniciar Prueba'}
                          </button>
                          <button
                            onClick={() => unenrollArea(area.area)}
                            disabled={isUnenrolling}
                            title="Desinscribirse"
                            className="px-3 py-2 rounded-lg border border-slate-200 text-slate-500 hover:text-rose-600 hover:border-rose-200 transition-colors disabled:opacity-50 cursor-pointer"
                          >
                            <LogOutIcon className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => enrollArea(area.area)}
                          disabled={isEnrolling}
                          className="w-full bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
                        >
                          <LogIn className="w-3.5 h-3.5" />
                          Inscribirme
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {availableAreas.length === 0 && (
              <div className="text-center py-8 border border-dashed border-slate-200 rounded-lg">
                <GraduationCap className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-medium text-slate-500">No hay áreas disponibles.</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex-1">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-200">
              <h3 className="font-serif text-xl font-bold text-slate-900">Mi Historial de Pruebas</h3>
              <Link
                href="/dashboard/history"
                className="text-amber-600 text-xs font-semibold hover:underline cursor-pointer"
              >
                Ver Todo
              </Link>
            </div>

            {history.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                      <th className="py-3 px-2 font-medium">Área</th>
                      <th className="py-3 px-2 font-medium">Fecha</th>
                      <th className="py-3 px-2 font-medium">Puntaje</th>
                      <th className="py-3 px-2 font-medium">%</th>
                      <th className="py-3 px-2 font-medium text-right">Estado</th>
                      <th className="py-3 px-2 font-medium text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {history.slice(0, 5).map((test) => (
                      <tr
                        key={test.id}
                        className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                        onClick={() => router.push(`/quiz/${test.id}/results`)}
                      >
                        <td className="py-4 px-2 font-medium text-slate-900">{test.area}</td>
                        <td className="py-4 px-2 text-slate-600 text-xs">
                          {test.finishedAt ? formatDateTime(test.finishedAt) : formatDateTime(test.startedAt)}
                        </td>
                        <td className="py-4 px-2 text-slate-900 font-semibold">
                          {test.correctCount}/{test.totalQuestions}
                        </td>
                        <td className="py-4 px-2 text-slate-900 font-semibold">
                          {Math.round(test.score)}%
                        </td>
                        <td className="py-4 px-2 text-right">
                          {test.passed ? (
                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-1 rounded text-xs font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Aprobado
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200 px-2 py-1 rounded text-xs font-semibold">
                              <XCircle className="w-3.5 h-3.5" />
                              Requiere Refuerzo
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-2 text-right">
                          <Link
                            href={`/quiz/${test.id}/results`}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 text-xs font-semibold cursor-pointer"
                          >
                            Ver <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed border-slate-200 rounded-lg">
                <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-medium text-slate-500">Aún no has completado ninguna prueba.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
