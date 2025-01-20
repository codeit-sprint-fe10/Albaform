import { useQuery } from '@tanstack/react-query';
import { getPostDetail } from '@/services/albatalk';
import { GetPostDetailResponse } from '@/types/albatalk';

const useGetPostDetail = (talkId: number) => {
  return useQuery<GetPostDetailResponse>({
    queryKey: ['talk', talkId],
    queryFn: () => getPostDetail(talkId),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export default useGetPostDetail;
