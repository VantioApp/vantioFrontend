'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ChevronRight, XCircle } from 'lucide-react';
import type { TestHistoryItem } from '@/core/interfaces/quiz/quiz';

const DATE_FORMAT: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
const TIME_FORMAT: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };

function splitDate(test: TestHistoryItem) {
  const date = new Date(test.finishedAt ?? test.startedAt);
  return {
    day: date.toLocaleDateString('es-ES', DATE_FORMAT),
    time: date.toLocaleTimeString('es-ES', TIME_FORMAT),
  };
}

function StatusBadge({ passed }: { passed: boolean }) {
  return passed ? (
    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
      <CheckCircle2 className="w-3.5 h-3.5" />
      Aprobado
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
      <XCircle className="w-3.5 h-3.5" />
      Requiere Refuerzo
    </span>
  );
}

/** Historial de pruebas: tarjetas en móvil y tabla en pantallas medianas en adelante, sin scroll horizontal. */
export function HistoryTable({ items }: { items: TestHistoryItem[] }) {
  const router = useRouter();
  const open = (id: string) => router.push(`/quiz/${id}/results`);

  return (
    <>
      <ul className="md:hidden flex flex-col divide-y divide-slate-100">
        {items.map((test) => {
          const { day, time } = splitDate(test);
          return (
            <li key={test.id}>
              <button
                type="button"
                onClick={() => open(test.id)}
                className="w-full text-left py-4 flex flex-col gap-2 cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 truncate">{test.area}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{day} · {time}</p>
                  </div>
                  <p className="text-right shrink-0">
                    <span className="block font-semibold text-slate-900">
                      {test.correctCount}/{test.totalQuestions}
                    </span>
                    <span className="block text-xs text-slate-500">{Math.round(test.score)}%</span>
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <StatusBadge passed={test.passed} />
                  <span className="inline-flex items-center gap-1 text-amber-600 text-xs font-semibold">
                    Ver <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <table className="hidden md:table w-full text-left border-collapse">
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
          {items.map((test) => {
            const { day, time } = splitDate(test);
            return (
              <tr
                key={test.id}
                className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => open(test.id)}
              >
                <td className="py-4 px-2 font-medium text-slate-900">{test.area}</td>
                <td className="py-4 px-2 text-slate-600 text-xs">
                  <span className="block whitespace-nowrap">{day}</span>
                  <span className="block text-slate-400">{time}</span>
                </td>
                <td className="py-4 px-2 text-slate-900 font-semibold">
                  {test.correctCount}/{test.totalQuestions}
                </td>
                <td className="py-4 px-2 text-slate-900 font-semibold">{Math.round(test.score)}%</td>
                <td className="py-4 px-2 text-right">
                  <StatusBadge passed={test.passed} />
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
            );
          })}
        </tbody>
      </table>
    </>
  );
}
