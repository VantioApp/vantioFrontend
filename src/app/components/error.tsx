'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Algo salio mal</h2>
        <p className="text-slate-600">{error.message}</p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-800"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
