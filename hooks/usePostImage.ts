import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postImage } from '@/services/image';
import { toast } from 'react-toastify';

const usePostImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: File) => {
      return postImage(data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['image'] });
      return data;
    },
    onError: () => {
      toast.error('오류가 발생했습니다.');
    },
  });
};

export default usePostImage;
