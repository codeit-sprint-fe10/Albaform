import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postImage } from '@/services/image';

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
    onError: (error) => {
      throw error;
    },
  });
};

export default usePostImage;
