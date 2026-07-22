'use client';

import { AuthHydrator } from '@/components/AuthHydrator';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthHydrator />
      {children}
    </>
  );
}
