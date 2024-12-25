import KebabIcon from '@/public/icons/kebab.svg';
import CommentIcon from '@/public/icons/comment.svg';
import LikeIcon from '@/public/icons/like.svg';
import Image from 'next/image';
import { format } from '@/utils/date';

interface AlbatalkCardProps {
  title: string;
  content: string;
  writerNickname: string;
  createdAt: Date;
  commentCount: number;
  likeCount: number;
}

const AlbatalkCard = ({
  title,
  content,
  writerNickname,
  createdAt,
  commentCount,
  likeCount,
}: AlbatalkCardProps) => {
  return (
    <div className="relative w-full h-[180px] lg:h-[280px] p-6 border rounded-2xl">
      <KebabIcon className="absolute right-2 top-4 lg:right-5" />
      <div className="flex flex-col gap-6">
        <div className="flex h-20 lg:h-44 flex-col gap-2">
          <div className="max-w-80 text-black-400 font-semibold text-lg overflow-hidden lg:text-2lg">
            {title}
          </div>
          <div className="max-w-80 text-gray-500 font-regular text-md overflow-hidden lg:text-lg">
            {content}
          </div>
        </div>
        <div className="flex">
          <div className="flex w-full justify-between items-center">
            <div className="flex gap-4 items-center">
              <div className="flex gap-1 items-center">
                <div className="w-6 h-6 lg:w-9 lg:h-9 relative">
                  <Image src="/icons/profile.svg" alt="user profile" fill />
                </div>
                <div className="max-w-40 text-gray-500 text-xs md:text-md lg:text-lg font-regular">
                  {writerNickname}
                </div>
              </div>
              <div className="text-gray-300">|</div>
              <div className="max-w-40 text-gray-500 text-xs md:text-md lg:text-lg font-regular">
                {format(new Date(createdAt), 'yyyy.MM.dd')}
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex gap-1 items-center">
                <CommentIcon className="w-6 h-6 lg:w-9 lg:h-9 " />
                <div className="text-gray-500 text-xs md:text-md lg:text-lg font-regular">
                  {commentCount}
                </div>
              </div>
              <div className="flex gap-1 items-center">
                <LikeIcon className="w-6 h-6 lg:w-9 lg:h-9 " />
                <div className="text-gray-500 text-xs md:text-md lg:text-lg font-regular">
                  {likeCount}
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
