'use client';

import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, BookOpenText, Loader2, X } from 'lucide-react';
import { useNormArticles, useNorms } from '@/presentation/hooks/use-norms';
import { useAuthStore } from '@/presentation/stores/authStore';
import type { NormSummary } from '@/core/interfaces';

interface NormKioskProps {
  /** `drawer` se abre sobre el simulacro; `page` ocupa la ruta de estudio. */
  variant?: 'drawer' | 'page';
  onClose?: () => void;
}

const KIND_LABELS: Record<string, string> = {
  constitucion: 'Constitución',
  codigo: 'Códigos',
  ley: 'Leyes',
  decreto: 'Decretos',
  tratado: 'Tratados',
};

const BLOCKED_KEYS = new Set(['c', 'x', 'a', 'p', 's']);

const formatDate = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    : null;

/**
 * Quiosco normativo simulado: lectura secuencial sin búsqueda, sin copia y sin
 * impresión, que se reinicia al cerrar. Es un freno de entrenamiento, no una
 * protección: el navegador sigue permitiendo Ctrl+F, por eso solo se sirven
 * textos de dominio público.
 */
export default function NormKiosk({ variant = 'drawer', onClose }: NormKioskProps) {
  const queryClient = useQueryClient();
  const email = useAuthStore((s) => s.user?.email) ?? 'vantio';
  const { data: norms = [], isLoading: isLoadingNorms } = useNorms();
  const [slug, setSlug] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const {
    data: pages,
    isLoading: isLoadingArticles,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useNormArticles(slug);

  // Cada ingreso empieza desde cero: no se conserva lo leído.
  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ['norm-articles'] });
    };
  }, [queryClient]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && BLOCKED_KEYS.has(e.key.toLowerCase())) e.preventDefault();
      if (e.key === 'Escape' && variant === 'drawer') onClose?.();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [variant, onClose]);

  useEffect(() => {
    if (variant === 'drawer') closeRef.current?.focus();
  }, [variant]);

  const grouped = norms.reduce<Record<string, NormSummary[]>>((acc, n) => {
    (acc[n.kind] ??= []).push(n);
    return acc;
  }, {});

  const current = pages?.pages[0]?.norm;
  const cutoff = formatDate(current?.vigenciaCorte ?? norms.find((n) => n.slug === slug)?.vigenciaCorte ?? null);

  const body = (
    <div
      className="relative flex h-full flex-col bg-white select-none print:hidden"
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
        <div className="flex min-w-0 items-center gap-2">
          {slug ? (
            <button
              type="button"
              onClick={() => setSlug(null)}
              aria-label="Volver al listado de normas"
              className="cursor-pointer rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          ) : (
            <BookOpenText className="h-5 w-5 text-amber-600" />
          )}
          <h2 className="truncate font-serif text-lg font-bold text-slate-900">
            {slug ? (current?.title ?? 'Cargando…') : 'Quiosco Normativo'}
          </h2>
        </div>
        {variant === 'drawer' && (
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar el Quiosco Normativo"
            className="cursor-pointer rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <p className="border-b border-amber-100 bg-amber-50 px-5 py-2 text-[11px] leading-relaxed text-amber-900">
        Práctica con textos de consulta, sin búsqueda ni copia, como en el examen. No incluye jurisprudencia.
        {cutoff ? ` Vigencia al ${cutoff}.` : ''} Material de preparación de Vantio, no afiliado al CSJ ni al Icfes.
      </p>

      <div className="relative flex-1 overflow-y-auto px-5 py-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden opacity-[0.06]"
        >
          <div className="-rotate-12 grid grid-cols-2 gap-x-10 gap-y-16 p-6 text-sm font-semibold text-slate-900">
            {Array.from({ length: 24 }, (_, i) => (
              <span key={i}>{email}</span>
            ))}
          </div>
        </div>

        {!slug && (
          <div className="flex flex-col gap-6">
            {isLoadingNorms && <p className="text-sm text-slate-500">Cargando normas…</p>}
            {!isLoadingNorms && norms.length === 0 && (
              <p className="text-sm text-slate-500">Aún no hay normas cargadas.</p>
            )}
            {Object.entries(grouped).map(([kind, items]) => (
              <section key={kind}>
                <h3 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {KIND_LABELS[kind] ?? kind}
                </h3>
                <ul className="flex flex-col gap-1.5">
                  {items.map((n) => (
                    <li key={n.slug}>
                      <button
                        type="button"
                        onClick={() => setSlug(n.slug)}
                        className="w-full cursor-pointer rounded-lg border border-slate-200 px-4 py-3 text-left text-sm font-medium text-slate-800 hover:border-slate-300 hover:bg-slate-50"
                      >
                        {n.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}

        {slug && (
          <div className="flex flex-col gap-5">
            {isLoadingArticles && <p className="text-sm text-slate-500">Cargando texto…</p>}
            {pages?.pages.flatMap((p) => p.items).map((a) => (
              <article key={a.ordinal}>
                <h3 className="text-sm font-bold text-slate-900">{a.label}</h3>
                <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-slate-700">{a.text}</p>
              </article>
            ))}
            {hasNextPage && (
              <button
                type="button"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isFetchingNextPage && <Loader2 className="h-4 w-4 animate-spin" />}
                Continuar leyendo
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (variant === 'page') {
    return <div className="h-[75vh] overflow-hidden rounded-xl border border-slate-200 shadow-sm">{body}</div>;
  }

  return (
    <div className="fixed inset-0 z-[60] flex justify-end print:hidden" role="dialog" aria-modal="true" aria-label="Quiosco Normativo">
      <button
        type="button"
        aria-label="Cerrar el Quiosco Normativo"
        onClick={onClose}
        className="absolute inset-0 cursor-pointer bg-slate-900/40"
        tabIndex={-1}
      />
      <div className="relative h-full w-full max-w-xl shadow-xl">{body}</div>
    </div>
  );
}
