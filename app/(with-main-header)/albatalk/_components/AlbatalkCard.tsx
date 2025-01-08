'use client';
import CommentIcon from '@/public/icons/comment.svg';
import LikeIcon from '@/public/icons/like.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Writer } from '@/types/albatalk';
import { formatDate } from '@/utils/dateFormatter';
import { formatCount } from '@/utils/count';

interface AlbatalkCardProps {
  title: string;
  content: string;
  writer: Writer;
  createdAt: string;
  commentCount: number;
  likeCount: number;
  talkId: number;
}

const AlbatalkCard = ({
  title,
  content,
  writer,
  createdAt,
  commentCount,
  likeCount,
  talkId,
}: AlbatalkCardProps) => {
  return (
    <div className="relative w-full h-[210px] lg:h-[280px] p-6 border rounded-2xl">
      <Link href={`/albatalk/${talkId}`}>
        <div className="flex flex-col h-[162px] lg:h-[232px] gap-6">
          <div className="flex lg:h-44 flex-col gap-2">
            <div className="max-w-80 text-black-400 font-semibold text-lg lg:text-2lg line-clamp-1">
              {title}
            </div>
            <div className="max-w-80 h-[78px] text-gray-500 font-regular text-md line-clamp-3  md:h-[77px] lg:text-lg">
              {content}
            </div>
          </div>
          <div className="flex">
            <div className="flex w-full justify-between items-center">
              <div className="flex gap-4 items-center">
                <div className="flex gap-2 items-center">
                  <div className="w-6 h-6 rounded-3xl relative">
                    <Image
                      src={
                        writer && writer.imageUrl
                          ? writer.imageUrl
                          : '/icons/profile.svg'
                      }
                      alt="user profile"
                      fill
                      className="border border-none rounded-3xl"
                    />
                  </div>
                  <div className="max-w-container-xs text-gray-500 text-xs md:text-md lg:text-lg font-regular line-clamp-1 lg:max-w-container-xxs">
                    {writer?.nickname}
                  </div>
                </div>
                <div className="text-gray-300">|</div>
                <div className="max-w-40 text-gray-500 text-xs md:text-md lg:text-lg font-regular">
                  {formatDate(createdAt)}
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex gap-1 items-center">
                  <CommentIcon className="w-6 h-6 lg:w-9 lg:h-9 " />
                  <div className="text-gray-500 text-xs md:text-md lg:text-lg font-regular">
                    {formatCount(commentCount)}
                  </div>
                </div>
                <div className="flex gap-1 items-center">
                  <LikeIcon className="w-6 h-6 lg:w-9 lg:h-9 text-gray-100" />
                  <div className="text-gray-500 text-xs md:text-md lg:text-lg font-regular">
                    {formatCount(likeCount)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AlbatalkCard;
