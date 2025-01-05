'use client';

import { useEffect, type ReactNode } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getAlbaDetail } from '@/services/alba';
import Loader from './_components/Loader';

const Layout = ({ children }: { children: ReactNode }) => {
  const { formId } = useParams();
  const { replace } = useRouter();

  const { isLoading, error } = useQuery({
    queryKey: ['forms', formId],
    queryFn: () => getAlbaDetail(Number(formId)),
    retry: 0,
  });

  useEffect(() => {
    if (error) {
      window.alert('존재하지 않는 알바폼입니다.');
      replace('/albalist');
    }
  }, [error, replace]);

  if (isLoading) return <Loader className="mt-24 lg:mt-32" />;
  return <>{children}</>;
};

export default Layout;
