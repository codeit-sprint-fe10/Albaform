import type { ReactNode } from 'react';
import AuthHeader from '@/components/AuthHeader';

const Layout = ({ children }: { children: ReactNode }) => {
  const mainStyle =
    'flex flex-col gap-10 md:gap-11 lg:gap-12 ' +
    'min-h-[calc(100vh-54px)] md:min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-88px)] ' +
    'mt-[54px] md:mt-[60px] lg:mt-[88px] py-12 md:py-16 lg:py-32 ' +
    'px-[max(24px,calc((100%-360px)/2))] lg:px-[calc((100%-640px)/2)] text-black-500';

  return (
    <>
      <AuthHeader />
      <main className={mainStyle}>{children}</main>
    </>
  );
};

export default Layout;
