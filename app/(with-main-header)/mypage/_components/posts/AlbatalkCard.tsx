'use client';

import CommentIcon from '@/public/icons/comment.svg';
import LikeIcon from '@/public/icons/like.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Writer } from '@/types/albatalk';
import { formatDate } from '@/utils/dateFormatter';
import EditDropdown from './EditDropdown';
import { EditDropdownAction } from '@/types/albatalk';
import { useRouter } from 'next/navigation';
import useDeleteTalk from '../../_hooks/useDeleteTalk';
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
  const router = useRouter();
  const { mutate: deleteMutation } = useDeleteTalk(talkId);

  const handleAction = async (action: EditDropdownAction) => {
    if (action === 'edit') {
      router.push(`/edittalk/${talkId}`);
    } else if (action === 'delete') {
      deleteMutation();
    }
  };

  return (
    <div className="relative w-full h-[210px] lg:h-[280px] p-6 border rounded-2xl hover:border-gray-300 transition-colors">
      <div className="absolute right-6">
        <EditDropdown onAction={handleAction} />
      </div>
      <Link href={`/albatalk/${talkId}`} className="block">
        <div className="flex flex-col h-[162px] lg:h-[232px] gap-6">
          <div className="flex lg:h-44 flex-col gap-2">
            <div className="max-w-80 text-black-400 font-semibold text-lg lg:text-2lg line-clamp-1">
              {title}
            </div>
            <div className="max-w-80 h-[78px] text-gray-500 font-regular text-md lg:text-lg line-clamp-3 md:h-[77px]">
              {content}
            </div>
          </div>

          <div className="flex">
            <div className="flex w-full justify-between items-center">
              <div className="flex gap-4 items-center">
                <div className="flex gap-2 items-center">
                  <div className="w-6 h-6 rounded-3xl relative overflow-hidden">
                    <Image
                      src={writer?.imageUrl || '/icons/profile.svg'}
                      alt={`${writer?.nickname}'s profile`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="max-w-container-xs lg:max-w-container-xxs text-gray-500 text-xs md:text-md lg:text-lg font-regular truncate">
                    {writer?.nickname}
                  </span>
                </div>
                <span className="text-gray-300">|</span>
                <time className="max-w-40 text-gray-500 text-xs md:text-md lg:text-lg font-regular">
                  {formatDate(createdAt)}
                </time>
              </div>

              <div className="flex gap-3">
                <div className="flex gap-1 items-center">
                  <CommentIcon className="w-6 h-6 lg:w-9 lg:h-9" />
                  <span className="text-gray-500 text-xs md:text-md lg:text-lg font-regular">
                    {formatCount(commentCount)}
                  </span>
                </div>
                <div className="flex gap-1 items-center">
                  <LikeIcon className="w-6 h-6 lg:w-9 lg:h-9 text-gray-100" />
                  <span className="text-gray-500 text-xs md:text-md lg:text-lg font-regular">
                    {formatCount(likeCount)}
                  </span>
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
