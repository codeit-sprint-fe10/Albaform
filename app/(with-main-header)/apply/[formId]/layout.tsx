'use client';

import { useEffect, type ReactNode } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getAlbaDetail } from '@/services/alba';
import Loader from './_components/Loader';
import { getMyApplication } from '@/services/application';

const Layout = ({ children }: { children: ReactNode }) => {
  const { formId } = useParams();
  const { replace } = useRouter();

  const { isLoading: isValidLoading, error } = useQuery({
    queryKey: ['forms', formId],
    queryFn: () => getAlbaDetail(Number(formId)),
    retry: 1,
  });

  const { isLoading: isDuplicateLoading, data } = useQuery({
    queryKey: ['my-application', formId],
    queryFn: () => getMyApplication({ formId: Number(formId) }),
    retry: 1,
  });

  useEffect(() => {
    if (error) {
      window.alert('존재하지 않는 알바폼입니다.');
      replace('/albalist');
    }
  }, [error, replace]);

  useEffect(() => {
    if (data?.id) {
      window.alert('이미 지원한 알바폼입니다.');
      replace('/albalist');
    }
  }, [data, replace]);

  if (isValidLoading || isDuplicateLoading)
    return <Loader className="mt-24 lg:mt-32" />;
  return <>{children}</>;
};

export default Layout;
