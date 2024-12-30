import React, { ReactNode } from 'react';
import MainHeader from '@/components/MainHeader';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="fixed top-0 w-full border-b border-solid border-line-100 bg-gray-50 z-50">
        <div className="px-6 md:px-[72px] lg:max-w-container m-auto">
          <MainHeader />
        </div>
      </div>
      <main className="mt-[50px] md:mt-[78px] lg:mt-[92px] px-6 md:px-[72px] lg:max-w-container lg:m-auto">
        {children}
      </main>
    </>
  );
};

export default Layout;
