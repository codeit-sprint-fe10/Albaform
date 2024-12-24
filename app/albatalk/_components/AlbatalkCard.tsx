import KebabIcon from '@/public/icons/kebab.svg';
import CommentIcon from '@/public/icons/comment.svg';
import LikeIcon from '@/public/icons/like.svg';
import Image from 'next/image';
import { Post } from '@/types/albatalk';
import { format } from '@/utils/date';

interface AlbatalkCardProps {
  post: Post;
}

const AlbatalkCard = ({ post }: AlbatalkCardProps) => {
  return (
    <div className="relative w-full h-72 p-6 border rounded-2xl">
      <KebabIcon className="absolute right-5" />
      <div className="flex flex-col gap-6">
        <div className="flex h-44 flex-col gap-2">
          <div className="max-w-80 text-black-400 font-semibold text-lg">
            {post.title}
          </div>
          <div className="max-w-80 text-gray-500 font-regular text-lg">
            {post.content}
          </div>
        </div>
        <div className="flex">
          <div className="flex w-full justify-between items-center">
            <div className="flex gap-4 items-center">
              <div className="flex gap-1 items-center">
                <div className="w-9 h-9 relative">
                  <Image src="/icons/profile.svg" alt="user profile" fill />
                </div>
                <div className="max-w-40 text-gray-500 text-lg font-regular">
                  {post.writer.nickname}
                </div>
              </div>
              <div className="text-gray-300">|</div>
              <div className="max-w-40 text-gray-500 text-lg font-regular">
                {format(new Date(post.createdAt), 'yyyy-MM-dd')}
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex gap-1 items-center">
                <CommentIcon />
                <div className="text-gray-500 text-lg font-regular">
                  {post.commentCount}
                </div>
              </div>
              <div className="flex gap-1 items-center">
                <LikeIcon />
                <div className="text-gray-500 text-lg font-regular">
                  {post.likeCount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbatalkCard;
