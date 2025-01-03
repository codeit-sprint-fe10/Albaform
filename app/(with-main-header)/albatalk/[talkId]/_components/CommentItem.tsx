'use client';
import Image from 'next/image';
import EditDropdown from './EditDropdown';
import { formatDate } from '@/utils/dateFormatter';
import { EditDropdownAction } from '@/types/albatalk';
import { Comment } from '@/types/albatalk';

interface CommentItemProps {
  comment: Comment;
  userId: number | null;
  onAction: (action: EditDropdownAction) => void;
}

const CommentItem = ({ comment, userId, onAction }: CommentItemProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-6">
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 items-center">
              <div className="relative w-4 h-4 lg:w-6 lg:h-6">
                <Image
                  src={comment.writer.imageUrl || '/icons/profile.svg'}
                  alt={`${comment.writer.nickname}'s profile`}
                  fill
                  className="border border-none rounded-3xl"
                />
              </div>
              <div className="max-w-40 text-gray-500 text-xs md:text-md lg:text-lg font-regular">
                {comment.writer.nickname}
              </div>
            </div>
            <div className="text-gray-300">|</div>
            <div className="max-w-40 text-gray-500 text-xs md:text-md lg:text-lg font-regular">
              {formatDate(comment.createdAt)}
            </div>
          </div>
          {userId === comment.writer.id && <EditDropdown onAction={onAction} />}
        </div>
        <div className="text-black-400 font-regular text-md md:text-lg lg:text-xl">
          {comment.content}
        </div>
      </div>
      <div className="w-full border stroke-gray-30"></div>
    </div>
  );
};

export default CommentItem;
