'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ClipboardCheck, Copy, Check, Plus, Link2Off, Link2 } from 'lucide-react';
import { useAdminSubjects } from '@/presentation/hooks/use-admin-subjects';
import {
  useCreateReviewLink,
  useReviewLinks,
  useSetReviewLinkActive,
} from '@/presentation/hooks/use-reviews';
import { formatDateTime } from '@/core/utils/format-date-time';
import type { ReviewLink } from '@/core/interfaces';

const shareUrl = (token: string) => `${window.location.origin}/revision/${token}`;

function CopyButton({ token }: { token: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl(token));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt('Copie el enlace:', shareUrl(token));
    }
  };
  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:border-slate-400 cursor-pointer"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copiado' : 'Copiar enlace'}
    </button>
  );
}

function CreateLinkForm({ onDone }: { onDone: () => void }) {
  const { data: subjects = [] } = useAdminSubjects();
  const { mutate: create, isPending, error } = useCreateReviewLink();
  const [name, setName] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [expires, setExpires] = useState('');
  const [created, setCreated] = useState<string | null>(null);

  const byArea = useMemo(() => {
    const m = new Map<string, typeof subjects>();
    for (const s of subjects) m.set(s.area, [...(m.get(s.area) ?? []), s]);
    return [...m.entries()];
  }, [subjects]);

  const toggle = (id: string) =>
    setSelected((p) => {
      const n = new Set(p);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  const submit = () => {
    create(
      {
        reviewerName: name.trim(),
        subjectIds: [...selected],
        expiresAt: expires ? new Date(`${expires}T23:59:59`).toISOString() : undefined,
      },
      { onSuccess: (res) => setCreated(res.token) },
    );
  };

  if (created) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
        <p className="font-semibold text-emerald-900">Enlace creado para {name}</p>
        <code className="block mt-2 p-2 bg-white border border-emerald-200 rounded text-xs break-all">
          {shareUrl(created)}
        </code>
        <p className="text-xs text-emerald-800 mt-2">
          Quien tenga este enlace puede ver la clave de las preguntas asignadas. Compártalo solo con el revisor.
        </p>
        <div className="flex gap-2 mt-3">
          <CopyButton token={created} />
          <button onClick={onDone} className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer">
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
      <h3 className="font-serif text-lg font-bold text-slate-900">Nuevo enlace de revisión</h3>
      <label className="block text-sm">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nombre del revisor</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={120}
          className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
          placeholder="Dra. Ana Pérez"
        />
      </label>
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Ejes que podrá revisar</p>
        <div className="max-h-64 overflow-y-auto space-y-3">
          {byArea.map(([area, list]) => (
            <div key={area}>
              <p className="text-xs font-bold text-slate-400 mb-1">{area}</p>
              {list.map((s) => (
                <label key={s.id} className="flex items-center justify-between gap-3 px-3 py-1.5 rounded-lg hover:bg-slate-50 text-sm cursor-pointer">
                  <span className="flex items-center gap-2">
                    <input type="checkbox" checked={selected.has(s.id)} onChange={() => toggle(s.id)} />
                    {s.name}
                  </span>
                  <span className="text-xs text-slate-400">{s.questionCount}</span>
                </label>
              ))}
            </div>
          ))}
        </div>
      </div>
      <label className="block text-sm">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Vence (opcional)</span>
        <input
          type="date"
          value={expires}
          min={new Date().toISOString().slice(0, 10)}
          onChange={(e) => setExpires(e.target.value)}
          className="mt-1 block px-3 py-2 rounded-lg border border-slate-300 text-sm"
        />
      </label>
      {error && <p className="text-sm text-rose-600">{error.message}</p>}
      <div className="flex gap-2">
        <button
          onClick={submit}
          disabled={isPending || !name.trim() || selected.size === 0}
          className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isPending ? 'Creando…' : 'Crear enlace'}
        </button>
        <button onClick={onDone} className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 cursor-pointer">
          Cancelar
        </button>
      </div>
    </div>
  );
}

function LinkRow({ link }: { link: ReviewLink }) {
  const { mutate: setActive, isPending } = useSetReviewLinkActive();
  const expired = !!link.expiresAt && new Date(link.expiresAt) <= new Date();
  const pct = link.totalQuestions ? Math.round((100 * link.reviewed) / link.totalQuestions) : 0;
  return (
    <div className={`bg-white border border-slate-200 rounded-xl p-4 ${!link.isActive || expired ? 'opacity-70' : ''}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-slate-900">
            {link.reviewerName}
            {!link.isActive && <span className="ml-2 text-[10px] font-bold uppercase bg-slate-200 text-slate-600 px-2 py-0.5 rounded">Revocado</span>}
            {link.isActive && expired && <span className="ml-2 text-[10px] font-bold uppercase bg-amber-100 text-amber-700 px-2 py-0.5 rounded">Vencido</span>}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            {link.subjects.map((s) => s.name).join(' · ')}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            Creado {formatDateTime(link.createdAt)}
            {link.lastUsedAt ? ` · último acceso ${formatDateTime(link.lastUsedAt)}` : ' · sin accesos'}
            {link.expiresAt ? ` · vence ${formatDateTime(link.expiresAt)}` : ''}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <CopyButton token={link.token} />
          <Link
            href={`/admin/reviews/${link.id}`}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:border-slate-400 cursor-pointer"
          >
            Ver resultados
          </Link>
          <button
            onClick={() => setActive({ id: link.id, active: !link.isActive })}
            disabled={isPending}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:border-slate-400 disabled:opacity-50 cursor-pointer"
          >
            {link.isActive ? <Link2Off className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
            {link.isActive ? 'Revocar' : 'Reactivar'}
          </button>
        </div>
      </div>
      <div className="mt-3 h-1.5 bg-slate-200 rounded overflow-hidden">
        <div className="h-full bg-emerald-500" style={{ width: `${pct}%` }} />
      </div>
      <p className="text-xs text-slate-500 mt-1.5">
        {link.reviewed}/{link.totalQuestions} revisadas ({pct}%) · correctas {link.counts.ok} · corregir {link.counts.fix} · rechazar {link.counts.no}
      </p>
    </div>
  );
}

export default function AdminReviewsPage() {
  const { data: links = [], isLoading } = useReviewLinks();
  const [creating, setCreating] = useState(false);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-slate-900 font-bold tracking-tight flex items-center gap-3">
            <ClipboardCheck className="w-7 h-7 text-amber-600" />
            Revisiones
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Enlaces para que profesionales validen las preguntas de los ejes que usted elija.
          </p>
        </div>
        {!creating && (
          <button
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Nuevo enlace
          </button>
        )}
      </div>

      {creating && <CreateLinkForm onDone={() => setCreating(false)} />}

      <div className="space-y-3">
        {isLoading && <p className="text-sm text-slate-400">Cargando…</p>}
        {!isLoading && links.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-10 border border-dashed border-slate-300 rounded-xl">
            Aún no hay enlaces de revisión.
          </p>
        )}
        {links.map((l) => (
          <LinkRow key={l.id} link={l} />
        ))}
      </div>
    </>
  );
}
