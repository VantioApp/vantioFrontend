export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-slate-200 rounded w-64"></div>
        <div className="h-32 bg-slate-200 rounded"></div>
      </div>
    </div>
  );
}
