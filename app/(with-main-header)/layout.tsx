import { ReactNode } from 'react';
import MainHeader from '@/components/MainHeader';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="text-orange-200">
      <nav>
        <MainHeader />
      </nav>
      <main>{children}</main>
    </div>
  );
}
