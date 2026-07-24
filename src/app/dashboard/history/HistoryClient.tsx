'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, CheckCircle2, XCircle, ChevronLeft, ChevronRight, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { usePaginatedHistory } from '@/presentation/hooks/use-paginated-history';
import { useProfile } from '@/presentation/hooks/use-profile';
import { formatDateTime } from '@/core/utils/format-date-time';

export default function HistoryClient() {
  const router = useRouter();
  const { data: user } = useProfile();
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isLoading } = usePaginatedHistory(user?.id, page, limit);
  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;
  const total = data?.total ?? 0;

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-slate-900 font-bold tracking-tight">Historial de Pruebas</h1>
          <p className="text-sm text-slate-500 mt-1">Revisa todas tus pruebas realizadas y su desempeño.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-200">
          <h3 className="font-serif text-xl font-bold text-slate-900">
            Todas las Pruebas
            <span className="text-sm font-normal text-slate-500 ml-2">({total} total)</span>
          </h3>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-slate-400 text-sm">Cargando historial...</p>
          </div>
        ) : items.length > 0 ? (
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
                  {items.map((test) => (
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
                          Ver <ChevronRightIcon className="w-3.5 h-3.5" />
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
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Anterior
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum: number;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          pageNum === page
                            ? 'bg-slate-900 text-white'
                            : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Siguiente
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 border border-dashed border-slate-200 rounded-lg">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-500">Aún no has completado ninguna prueba.</p>
          </div>
        )}
      </div>
    </>
  );
}
