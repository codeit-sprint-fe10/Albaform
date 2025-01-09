'use client';

import { useEffect, type ReactNode } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  useGetAlbaDetail,
  useGetMyApplication,
} from './_hook/useTanstackQuery';
import Loader from './_components/Loader';
import { isWithinInterval } from '@/utils/date';

const Layout = ({ children }: { children: ReactNode }) => {
  const formId = Number(useParams()['formId']);
  const { replace } = useRouter();
  const {
    isLoading: isValidLoading,
    data: albaData,
    error,
  } = useGetAlbaDetail(formId);
  const { isLoading: isDuplicateLoading, data: applicationData } =
    useGetMyApplication(formId);

  useEffect(() => {
    if (error) {
      window.alert('존재하지 않는 알바폼입니다.');
      replace('/albalist');
    }
  }, [error, replace]);

  useEffect(() => {
    if (albaData) {
      const start = new Date(albaData.recruitmentStartDate);
      const end = new Date(albaData.recruitmentEndDate);

      if (!isWithinInterval(new Date(), { start, end })) {
        window.alert('현재 지원 기간이 아닙니다.');
        replace('/albalist');
      }
    }
  }, [albaData, replace]);

  useEffect(() => {
    if (applicationData?.id) {
      window.alert('이미 지원한 알바폼입니다.');
      replace('/albalist');
    }
  }, [applicationData, replace]);

  if (isValidLoading || isDuplicateLoading)
    return <Loader className="mt-24 lg:mt-32" />;
  return <>{children}</>;
};

export default Layout;
