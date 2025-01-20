import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { postLike, deleteLike } from '@/services/albatalk';

interface UseCreateLikeProps {
  postId: number;
  initialLiked: boolean;
  initialCount: number;
}

export const useCreateLike = ({
  postId,
  initialLiked,
  initialCount,
}: UseCreateLikeProps) => {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    setLiked(initialLiked);
    setCount(initialCount);
  }, [initialLiked, initialCount]);

  const { mutate, isPending } = useMutation<
    void,
    unknown,
    boolean,
    { liked: boolean; count: number }
  >({
    mutationFn: async (newLikeStatus) => {
      if (newLikeStatus) {
        await postLike(postId);
      } else {
        await deleteLike(postId);
      }
    },
    onMutate: async (newLikeStatus) => {
      const previousState = { liked, count };
      setLiked(newLikeStatus);
      setCount((prevCount) => (newLikeStatus ? prevCount + 1 : prevCount - 1));
      return previousState;
    },
    onError: (error, newLikeStatus, context) => {
      console.error('Like mutation error:', error);
      if (context) {
        setLiked(context.liked);
        setCount(context.count);
      }
    },
  });

  const toggleLike = () => {
    mutate(!liked);
  };

  return {
    liked,
    count,
    isPending,
    toggleLike,
  };
};
