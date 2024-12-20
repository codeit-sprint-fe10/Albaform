import { ReactNode } from 'react';
import MainHeader from '@/components/MainHeader';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-w-[320px]">
      <div className="w-full border-b border-solid border-lin-100">
        <div className="px-[24px] md:px-[72px] lg: max-w-container m-auto">
          <MainHeader />
        </div>
      </div>
      <main className="px-[24px] md:px-[72px] lg: max-w-container m-auto">
        {children}
      </main>
    </div>
  );
}
