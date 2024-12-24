import type { ReactNode } from 'react';
import AuthHeader from '@/components/AuthHeader';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <AuthHeader />
      {children}
    </>
  );
};

export default Layout;
