'use client';

import { useEffect, PropsWithChildren } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  useGetAlbaDetail,
  useGetMyApplication,
} from './_hooks/useTanstackQuery';
import Loader from '@/components/Loader';
import { isWithinInterval } from '@/utils/date';
import { toast } from 'react-toastify';

const Layout = ({ children }: PropsWithChildren) => {
  const formId = Number(useParams()['formId']);
  const { replace } = useRouter();
  const {
    isLoading: albaIsLoading,
    data: albaData,
    error,
  } = useGetAlbaDetail(formId);
  const { isLoading: applicationIsLoading, data: applicationData } =
    useGetMyApplication(formId);

  useEffect(() => {
    if (error) {
      toast.error('존재하지 않는 알바폼입니다.');
      replace('/albalist');
    }
  }, [error, replace]);

  useEffect(() => {
    if (albaData) {
      const start = new Date(albaData.recruitmentStartDate);
      const end = new Date(albaData.recruitmentEndDate);

      if (!isWithinInterval(new Date(), { start, end })) {
        toast.error('현재 모집 기간이 아닙니다.');
        replace('/albalist');
      }
    }
  }, [albaData, replace]);

  useEffect(() => {
    if (applicationData?.id) {
      toast.error('이미 지원한 알바폼입니다.');
      replace('/albalist');
    }
  }, [applicationData, replace]);

  if (albaIsLoading || applicationIsLoading)
    return <Loader className="mt-24 lg:mt-32" />;
  return <>{children}</>;
};

export default Layout;
