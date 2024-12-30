'use client';
import { useState } from 'react';
import LikeIcon from '@/public/icons/like.svg';
import { postLike, deleteLike } from '@/services/albatalk';

interface LikeButtonProps {
  postId: number;
  isLiked: boolean;
  likeCount: number;
}

const LikeButton = ({ postId, isLiked, likeCount }: LikeButtonProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [count, setCount] = useState(likeCount);
  const [loading, setLoading] = useState(false);

  const handleLikeToggle = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const newLikeStatus = !liked;
      if (newLikeStatus) {
        await postLike(postId);
      } else {
        await deleteLike(postId);
      }

      setLiked(newLikeStatus);

      const newCount = newLikeStatus ? count + 1 : count - 1;
      setCount(newCount);
    } catch (error) {
      console.error('Failed to update like status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex gap-1 items-center cursor-pointer ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={handleLikeToggle}
    >
      <LikeIcon
        className={`w-6 h-6 lg:w-9 lg:h-9 ${
          liked ? 'text-orange-300' : 'text-gray-100'
        }`}
      />
      <div className="text-gray-500 text-xs md:text-md lg:text-lg font-regular">
        {count}
      </div>
    </div>
  );
};

export default LikeButton;
