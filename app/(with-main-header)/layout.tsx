import { ReactNode } from 'react';
import MainHeader from '@/components/MainHeader';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="fixed top-0 w-full border-b border-solid border-lin-100 bg-white z-50">
        <div className="px-[24px] md:px-[72px] lg:max-w-container m-auto">
          <MainHeader />
        </div>
      </div>
      <main className="mt-[60px] md:mt-[78px] lg:mt-[92px] px-[24px] md:px-[72px] lg:max-w-container lg:m-auto overflow-y-auto">
        {children}
      </main>
    </>
  );
}
