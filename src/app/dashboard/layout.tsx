'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, GraduationCap, History, UserCircle, LogOut,
} from 'lucide-react';
import { Logo } from '@/presentation/components/ui/logo';
import { useAuthStore } from '@/presentation/stores/authStore';
import { useAuthHydration } from '@/presentation/hooks/use-auth-hydration';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/courses', label: 'Mis Cursos', icon: GraduationCap },
  { href: '/dashboard/history', label: 'Historial', icon: History },
  { href: '/dashboard/profile', label: 'Perfil', icon: UserCircle },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isHydrated = useAuthHydration();
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (!isHydrated) return;
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isHydrated, isAuthenticated, router]);

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
            <h1 className="font-serif text-lg font-bold text-white tracking-tight leading-none">Vantio Suite</h1>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">Estudiante</p>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
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
          <div className="flex flex-col gap-0.5">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors text-left cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-rose-400/80" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-grow flex flex-col min-w-0 overflow-y-auto md:ml-64">
        <header className="md:hidden bg-slate-900 border-b border-slate-800 h-16 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <Logo variant="isotype" theme="dark" height={28} />
            <span className="font-serif font-bold text-white text-lg">Vantio</span>
          </div>
          <button onClick={handleLogout} className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg cursor-pointer">
            <LogOut className="w-5 h-5" />
          </button>
        </header>

        <div className="p-6 md:p-10 max-w-6xl w-full mx-auto flex flex-col gap-8">
          {children}
        </div>
      </main>
    </div>
  );
}
