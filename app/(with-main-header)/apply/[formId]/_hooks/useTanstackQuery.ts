import { useMutation, useQuery } from '@tanstack/react-query';
import { getAlbaDetail } from '@/services/alba';
import { getMyApplication, postApplication } from '@/services/application';
import { PostApplicationBody } from '@/types/application';

export const useGetAlbaDetail = (formId: number) =>
  useQuery({
    queryKey: ['forms', formId],
    queryFn: () => getAlbaDetail(formId),
    retry: 1,
  });

export const useGetMyApplication = (formId: number) =>
  useQuery({
    queryKey: ['my-application', formId],
    queryFn: () => getMyApplication({ formId }),
    retry: 1,
  });

export const usePostApplication = () =>
  useMutation({
    mutationFn: ({
      formId,
      body,
    }: {
      formId: number;
      body: PostApplicationBody;
    }) => postApplication({ formId, body }),
  });
