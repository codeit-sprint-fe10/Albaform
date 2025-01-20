'use client';
import LikeIcon from '@/public/icons/like.svg';
import { useCreateLike } from '../_hooks/useCreateLike';

interface LikeButtonProps {
  postId: number;
  isLiked: boolean;
  likeCount: number;
}

const LikeButton = ({ postId, isLiked, likeCount }: LikeButtonProps) => {
  const { liked, count, isPending, toggleLike } = useCreateLike({
    postId,
    initialLiked: isLiked,
    initialCount: likeCount,
  });

  return (
    <button
      className="flex gap-1 items-center cursor-pointer"
      onClick={toggleLike}
      disabled={isPending}
    >
      <LikeIcon
        className={`w-6 h-6 lg:w-9 lg:h-9 ${liked ? 'text-orange-300' : 'text-gray-100'}`}
      />
      <div className="text-gray-500 text-xs md:text-md lg:text-lg font-regular">
        {count}
      </div>
    </button>
  );
};

export default LikeButton;
