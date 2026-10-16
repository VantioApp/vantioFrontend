'use client';

import { useMemo, useState } from 'react';
import { X } from 'lucide-react';
import type { AvailableArea } from '@/core/interfaces';

const PRESETS = [40, 80, 144] as const;
const MAX_QUESTIONS = 200;

export interface StartQuizOptions {
  totalQuestions: number;
  subjectIds?: string[];
}

interface StartQuizDialogProps {
  area: AvailableArea;
  isPending: boolean;
  onStart: (options: StartQuizOptions) => void;
  onClose: () => void;
}

export default function StartQuizDialog({ area, isPending, onStart, onClose }: StartQuizDialogProps) {
  const [preset, setPreset] = useState<number | 'custom'>(40);
  const [custom, setCustom] = useState('60');
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(area.subjects.filter((s) => s.totalQuestions > 0).map((s) => s.id)),
  );

  const available = useMemo(
    () =>
      area.subjects
        .filter((s) => selected.has(s.id))
        .reduce((n, s) => n + s.totalQuestions, 0),
    [area.subjects, selected],
  );

  const requested = preset === 'custom' ? Number.parseInt(custom, 10) : preset;
  const validSize = Number.isInteger(requested) && requested >= 1 && requested <= MAX_QUESTIONS;
  const effective = validSize ? Math.min(requested, available) : 0;
  const allSelected = selected.size === area.subjects.filter((s) => s.totalQuestions > 0).length;

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const submit = () => {
    if (!validSize || selected.size === 0 || available === 0) return;
    onStart({
      totalQuestions: requested,
      subjectIds: allSelected ? undefined : [...selected],
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Configurar prueba de ${area.area}`}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h3 className="font-serif text-xl font-bold text-slate-900">Configurar prueba · {area.area}</h3>
          <button onClick={onClose} aria-label="Cerrar" className="text-slate-400 hover:text-slate-700 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Número de preguntas</p>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((n) => (
                <button
                  key={n}
                  onClick={() => setPreset(n)}
                  className={`px-4 py-2 rounded-lg border text-sm font-semibold cursor-pointer ${
                    preset === n ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPreset('custom')}
                className={`px-4 py-2 rounded-lg border text-sm font-semibold cursor-pointer ${
                  preset === 'custom' ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                Personalizado
              </button>
              {preset === 'custom' && (
                <input
                  type="number"
                  min={1}
                  max={MAX_QUESTIONS}
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  aria-label="Número de preguntas personalizado"
                  className="w-24 px-3 py-2 rounded-lg border border-slate-300 text-sm"
                />
              )}
            </div>
            {!validSize && (
              <p className="text-xs text-rose-600 mt-2">Ingresa un número entre 1 y {MAX_QUESTIONS}.</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ejes temáticos</p>
              <button
                onClick={() =>
                  setSelected(
                    allSelected
                      ? new Set()
                      : new Set(area.subjects.filter((s) => s.totalQuestions > 0).map((s) => s.id)),
                  )
                }
                className="text-xs font-semibold text-amber-700 hover:underline cursor-pointer"
              >
                {allSelected ? 'Quitar todos' : 'Seleccionar todos'}
              </button>
            </div>
            <ul className="space-y-1.5 max-h-60 overflow-y-auto">
              {area.subjects.map((s) => (
                <li key={s.id}>
                  <label
                    className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg border text-sm ${
                      s.totalQuestions === 0 ? 'opacity-50 border-slate-100' : 'border-slate-200 cursor-pointer hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selected.has(s.id)}
                        disabled={s.totalQuestions === 0}
                        onChange={() => toggle(s.id)}
                      />
                      {s.name}
                    </span>
                    <span className="text-xs text-slate-500 shrink-0">{s.totalQuestions}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {validSize && available > 0 && requested > available && (
            <p className="text-xs text-amber-700">
              Solo hay {available} preguntas activas en los ejes elegidos; la prueba tendrá {available}.
            </p>
          )}
        </div>

        <div className="flex gap-2 px-6 py-4 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={submit}
            disabled={isPending || !validSize || selected.size === 0 || available === 0}
            className="flex-1 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isPending ? 'Generando...' : `Iniciar prueba${effective ? ` (${effective})` : ''}`}
          </button>
        </div>
      </div>
    </div>
  );
}
