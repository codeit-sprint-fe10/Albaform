'use client';
import { useState } from 'react';
import LikeIcon from '@/public/icons/like.svg';
import { postLike, deleteLike } from '@/services/albatalk';
import { useMutation } from '@tanstack/react-query';

interface LikeButtonProps {
  postId: number;
  isLiked: boolean;
  likeCount: number;
}

const LikeButton = ({ postId, isLiked, likeCount }: LikeButtonProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [count, setCount] = useState(likeCount);

  const { mutate, isPending } = useMutation({
    mutationFn: async (newLikeStatus: boolean) => {
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
      if (context) {
        console.log(error);
        setLiked(context.liked);
        setCount(context.count);
      }
    },
  });

  const handleLikeToggle = async () => {
    if (isPending) return;
    const newLikeStatus = !liked;
    mutate(newLikeStatus);
  };

  return (
    <div
      className={`flex gap-1 items-center cursor-pointer`}
      onClick={handleLikeToggle}
    >
      <LikeIcon
        className={`w-6 h-6 lg:w-9 lg:h-9 ${liked ? 'text-orange-300' : 'text-gray-100'}`}
      />
      <div className="text-gray-500 text-xs md:text-md lg:text-lg font-regular">
        {count}
      </div>
    </div>
  );
};

export default LikeButton;
