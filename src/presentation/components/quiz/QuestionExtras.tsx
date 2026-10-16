import { BookOpen, FileText } from 'lucide-react';

/** Caso o contexto previo al enunciado (preguntas de juicio situacional). */
export function CaseBlock({ caseText }: { caseText?: string | null }) {
  if (!caseText) return null;
  return (
    <div className="mb-5 p-4 bg-slate-50 rounded-lg border border-slate-200">
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
        <FileText className="w-3.5 h-3.5 text-amber-600" />
        Caso
      </p>
      <p className="text-sm md:text-base text-slate-700 leading-relaxed">{caseText}</p>
    </div>
  );
}

/** Explicación específica de una opción, mostrada bajo la opción en los resultados. */
export function OptionExplanation({
  text,
  isCorrect,
}: {
  text?: string | null;
  isCorrect: boolean;
}) {
  if (!text) return null;
  return (
    <p
      className={`mt-1 text-xs leading-relaxed ${
        isCorrect ? 'text-emerald-800' : 'text-slate-500'
      }`}
    >
      {text}
    </p>
  );
}

/** Normas citadas como fundamento de la pregunta. */
export function SourcesBlock({ sources }: { sources?: string[] | null }) {
  if (!sources || sources.length === 0) return null;
  return (
    <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
      <p className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
        <BookOpen className="w-4 h-4 text-amber-600" />
        Fundamento Normativo
      </p>
      <ul className="text-xs md:text-sm text-slate-600 leading-relaxed list-disc pl-5">
        {sources.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </div>
  );
}
