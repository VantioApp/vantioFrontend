'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Calendar, Award, TrendingUp, GraduationCap, BookOpen, CheckCircle2, XCircle, ChevronRight, Clock } from 'lucide-react';
import { useAuthStore } from '@/presentation/stores/authStore';
import { useAuthHydration } from '@/presentation/hooks/use-auth-hydration';
import { useAdminUserDetails } from '@/presentation/hooks/use-admin-user-details';
import { useAdminUserTests } from '@/presentation/hooks/use-admin-user-tests';
import { formatDate } from '@/core/utils/format-date';
import { formatDateTime } from '@/core/utils/format-date-time';
import type { AdminUserDetails, UserTestsResponse } from '@/core/interfaces';

interface UserDetailsClientProps {
  userId: string;
  initialUser: AdminUserDetails | null;
  initialTests: UserTestsResponse | null;
}

export default function UserDetailsClient({
  userId,
  initialUser,
  initialTests,
}: UserDetailsClientProps) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isHydrated = useAuthHydration();
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data: userDetails } = useAdminUserDetails(userId, initialUser || undefined);
  const { data: testsData, isLoading: isLoadingTests } = useAdminUserTests(
    userId,
    page,
    limit,
    initialTests || undefined
  );

  useEffect(() => {
    if (!isHydrated) return;
    if (user?.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [isHydrated, user, router]);

  if (!user) return null;

  const details = userDetails ?? initialUser;
  const tests = testsData?.items ?? [];
  const totalPages = testsData?.totalPages ?? 1;
  const total = testsData?.total ?? 0;

  if (!details) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-sm text-slate-500">Cargando información del usuario...</p>
      </div>
    );
  }

  const memberSince = details.createdAt ? formatDate(details.createdAt) : 'N/A';

  return (
    <>
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push('/admin/users')}
          className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="font-serif text-3xl md:text-4xl text-slate-900 font-bold tracking-tight">
            Detalle del Usuario
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Información completa y desempeño académico
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col items-center text-center lg:col-span-1">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-slate-50 shadow-sm bg-slate-100 flex items-center justify-center">
            {details.avatarUrl ? (
              <Image src={details.avatarUrl} alt={details.name} width={96} height={96} className="w-full h-full object-cover" />
            ) : (
              <GraduationCap className="w-12 h-12 text-slate-400" />
            )}
          </div>
          <h2 className="font-serif text-xl font-bold text-slate-900">{details.name}</h2>
          <p className="text-sm text-slate-500 mt-1 mb-2 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" />
            {details.email}
          </p>
          <span className={`inline-flex px-2.5 py-1 rounded text-xs font-semibold mb-4 ${
            details.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
          }`}>
            {details.role === 'admin' ? 'Administrador' : 'Estudiante'}
          </span>
          <div className="w-full pt-4 border-t border-slate-100 flex flex-col gap-2 text-xs text-slate-600">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                Miembro desde
              </span>
              <span className="font-semibold text-slate-900">{memberSince}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 text-slate-900 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pruebas</p>
                <p className="text-2xl font-bold text-slate-950 mt-0.5">{details.totalTests}</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-lg flex items-center justify-center border border-amber-200">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Promedio</p>
                <p className="text-2xl font-bold text-slate-950 mt-0.5">{details.averageScore}%</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-lg flex items-center justify-center border border-emerald-200">
                <Award className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Último</p>
                <p className="text-2xl font-bold text-slate-950 mt-0.5">
                  {details.lastTestScore !== null ? `${details.lastTestScore}%` : '—'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
              <GraduationCap className="w-5 h-5 text-amber-600" />
              <h3 className="font-serif text-xl font-bold text-slate-900">Áreas Inscritas</h3>
              <span className="ml-auto text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {details.enrolledAreasCount} {details.enrolledAreasCount === 1 ? 'área' : 'áreas'}
              </span>
            </div>
            {details.enrolledAreas.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {details.enrolledAreas.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded text-xs font-medium"
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    {area}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">El usuario no está inscrito en ninguna área</p>
            )}
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-200">
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Historial de Exámenes
                <span className="text-sm font-normal text-slate-500 ml-2">({total} total)</span>
              </h3>
            </div>

            {isLoadingTests ? (
              <div className="text-center py-8">
                <p className="text-sm text-slate-400">Cargando exámenes...</p>
              </div>
            ) : tests.length > 0 ? (
              <>
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
                      {tests.map((test) => (
                        <tr
                          key={test.id}
                          onClick={() => router.push(`/admin/users/${userId}/tests/${test.id}`)}
                          className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
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
                              href={`/admin/users/${userId}/tests/${test.id}`}
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

                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
                    <p className="text-xs text-slate-500">
                      Página {page} de {totalPages}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        Anterior
                      </button>
                      <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        Siguiente
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 border border-dashed border-slate-200 rounded-lg">
                <Clock className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-medium text-slate-500">Este usuario aún no ha realizado exámenes.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
