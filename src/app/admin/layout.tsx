'use client';

// TODO: Convertir a Server Component parcial — el sidebar de navegacion puede ser un Server Component
// que lea el rol del usuario desde cookies. La proteccion de ruta ya es manejada por middleware.ts.
// Mantener 'use client' solo para los elementos interactivos (logout, estado activo del nav).

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Users, FileText, BarChart2, Settings, HelpCircle, LogOut, PlusCircle,
  LayoutDashboard,
} from 'lucide-react';
import { Logo } from '@/presentation/components/ui/logo';
import { useAuthStore } from '@/presentation/stores/authStore';
import { useAuthHydration } from '@/presentation/hooks/use-auth-hydration';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/exams', label: 'Exams', icon: FileText },
  { href: '/admin/users', label: 'User Management', icon: Users },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isHydrated = useAuthHydration();
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (!isHydrated) return;
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/login');
    }
  }, [isHydrated, isAuthenticated, user, router]);

  const handleLogout = () => {
    clearAuth();
    router.push('/');
  };

  if (!isHydrated || !user) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800 antialiased">
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800 shrink-0 p-6 fixed h-screen">
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-800">
          <Logo variant="isotype" theme="dark" height={40} />
          <div>
            <h1 className="font-serif text-lg font-bold text-white tracking-tight leading-none">Admin Portal</h1>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">Vantio Suite</p>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = item.href === '/admin'
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                  isActive ? 'bg-slate-800 text-white' : 'hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-slate-800 flex flex-col gap-4">
          <button className="w-full bg-amber-600 hover:bg-amber-500 text-slate-950 font-semibold py-2.5 px-4 rounded-lg text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm">
            <PlusCircle className="w-4 h-4" />
            New Exam
          </button>

          <div className="flex flex-col gap-0.5">
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-medium hover:text-white transition-colors">
              <HelpCircle className="w-4 h-4 text-slate-500" />
              Help Center
            </a>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors text-left"
            >
              <LogOut className="w-4 h-4 text-rose-400/80" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-grow flex flex-col min-w-0 overflow-y-auto md:ml-64">
        <header className="md:hidden bg-slate-900 border-b border-slate-800 h-16 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <Logo variant="isotype" theme="dark" height={28} />
            <span className="font-serif font-bold text-white text-lg">Admin</span>
          </div>
          <button onClick={handleLogout} className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg cursor-pointer">
            <LogOut className="w-5 h-5" />
          </button>
        </header>

        <div className="p-6 md:p-10 max-w-6xl w-full mx-auto flex flex-col gap-8 select-none">
          {children}
        </div>
      </main>
    </div>
  );
}
