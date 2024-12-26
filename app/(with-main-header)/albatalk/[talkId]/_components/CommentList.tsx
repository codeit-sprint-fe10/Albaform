import CommentInput from './CommentInput';
import CommentIcon from '@/public/icons/comment.svg';
import LikeIcon from '@/public/icons/like.svg';
import Image from 'next/image';
import { format } from '@/utils/date';
import KebabIcon from '@/public/icons/kebab.svg';

const CommentList = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="text-lg font-semibold">댓글(12)</div>
        <div className="w-full border stroke-gray-30"></div>
      </div>
      <CommentInput />
      <div className="flex flex-col gap-8 mt-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-6">
            <div className="flex w-full justify-between items-center">
              <div className="flex gap-4 items-center">
                <div className="flex gap-1 items-center">
                  <div className="w-6 h-6 lg:w-9 lg:h-9 relative">
                    <Image src="/icons/profile.svg" alt="user profile" fill />
                  </div>
                  <div className="max-w-40 text-gray-500 text-xs md:text-md lg:text-lg font-regular">
                    {/* {writerNickname} */} 김코드
                  </div>
                </div>
                <div className="text-gray-300">|</div>
                <div className="max-w-40 text-gray-500 text-xs md:text-md lg:text-lg font-regular">
                  {/* {format(new Date(createdAt), 'yyyy.MM.dd')} */} 2024.01.01
                </div>
              </div>
              <KebabIcon className="w-6 h-6" />
            </div>
            <div className="text-black-400 font-regular text-md">
              댓글입니다. 댓글입니다. 댓글입니다. 댓글입니다.댓글입니다.
              댓글입니다. 댓글입니다.
            </div>
          </div>
          <div className="w-full border stroke-gray-30"></div>
        </div>
      </div>
    </div>
  );
};

export default CommentList;
