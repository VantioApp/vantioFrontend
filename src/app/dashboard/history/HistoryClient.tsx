'use client';

import { useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePaginatedHistory } from '@/presentation/hooks/use-paginated-history';
import { useProfile } from '@/presentation/hooks/use-profile';
import { HistoryTable } from '@/presentation/components/quiz/HistoryTable';

export default function HistoryClient() {
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
            <HistoryTable items={items} />

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
