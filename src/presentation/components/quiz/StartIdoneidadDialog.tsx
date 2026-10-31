'use client';

import Link from 'next/link';
import { BookOpenText, ClipboardList, Clock, Loader2, X } from 'lucide-react';

interface StartIdoneidadDialogProps {
  isPending: boolean;
  error?: string | null;
  onStartSimulacro: () => void;
  onPractice: () => void;
  onClose: () => void;
}

export default function StartIdoneidadDialog({
  isPending,
  error,
  onStartSimulacro,
  onPractice,
  onClose,
}: StartIdoneidadDialogProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Examen de Idoneidad"
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h3 className="font-serif text-xl font-bold text-slate-900">Examen de Idoneidad</h3>
          <button onClick={onClose} aria-label="Cerrar" className="text-slate-400 hover:text-slate-700 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="rounded-lg border border-slate-200 p-4">
            <p className="font-semibold text-slate-900 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              Simulacro completo
            </p>
            <ul className="mt-2 text-xs text-slate-600 space-y-1 list-disc pl-5">
              <li>63 preguntas: 21 por competencia, agrupadas por situación.</li>
              <li>5 horas, con el tiempo controlado por el servidor.</li>
              <li>Puedes volver a preguntas anteriores y marcarlas para revisar.</li>
              <li>Quiosco Normativo disponible durante la prueba, sin búsqueda ni copia.</li>
              <li>El resultado se muestra como percentil frente a otros usuarios de Vantio.</li>
            </ul>
            <button
              onClick={onStartSimulacro}
              disabled={isPending}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg text-xs font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              Iniciar simulacro
            </button>
            {error && <p role="alert" className="mt-2 text-xs text-rose-600">{error}</p>}
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <p className="font-semibold text-slate-900 text-sm flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-amber-600" />
              Práctica por competencia
            </p>
            <p className="mt-2 text-xs text-slate-600">Elige competencias y el número de preguntas, sin límite de 5 horas.</p>
            <button
              onClick={onPractice}
              disabled={isPending}
              className="mt-4 w-full border border-slate-300 hover:bg-slate-50 text-slate-800 px-4 py-2.5 rounded-lg text-xs font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Configurar práctica
            </button>
          </div>

          <Link
            href="/dashboard/norms"
            className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <BookOpenText className="w-4 h-4 text-amber-600" />
            Explorar el Quiosco Normativo
          </Link>
        </div>
      </div>
    </div>
  );
}
