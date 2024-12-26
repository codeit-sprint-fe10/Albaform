import CommentIcon from '@/public/icons/comment.svg';
import LikeIcon from '@/public/icons/like.svg';
import Image from 'next/image';
import { format } from '@/utils/date';
import CommentList from './_components/CommentList';
import { getPostDetail } from '@/services/albatalk';
const AlbatalkDetail = async ({
  params,
}: {
  params: Promise<{ talkId: number }>;
}) => {
  const { talkId } = await params;
  console.log(talkId);

  return (
    <div className="w-full flex flex-col">
      <div className="items-center justify-center mt-4 lg:mt-10">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-6">
            <div className="text-lg font-semibold">알바 추천해주세요</div>
            <div className="w-full border stroke-gray-30"></div>
            <div className="flex">
              <div className="flex w-full justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className="flex gap-1 items-center">
                    <div className="w-6 h-6 lg:w-9 lg:h-9 relative">
                      <Image src="/icons/profile.svg" alt="user profile" fill />
                    </div>
                    <div className="max-w-40 text-gray-500 text-xs md:text-md lg:text-lg font-regular">
                      {/* {writerNickname} */}
                    </div>
                  </div>
                  <div className="text-gray-300">|</div>
                  <div className="max-w-40 text-gray-500 text-xs md:text-md lg:text-lg font-regular">
                    {/* {format(new Date(createdAt), 'yyyy.MM.dd')} */}
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex gap-1 items-center">
                    <CommentIcon className="w-6 h-6 lg:w-9 lg:h-9 " />
                    <div className="text-gray-500 text-xs md:text-md lg:text-lg font-regular">
                      {/* {commentCount} */}
                    </div>
                  </div>
                  <div className="flex gap-1 items-center">
                    <LikeIcon className="w-6 h-6 lg:w-9 lg:h-9 " />
                    <div className="text-gray-500 text-xs md:text-md lg:text-lg font-regular">
                      {/* {likeCount} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-md font-regular text-gray-500 ">
            알바 추천해주세요 알바 추천해주세요 알바 추천해주세요 알바
            추천해주세요 알바 추천해주세요 알바 추천해주세요 알바 추천해주세요
            알바 추천해주세요 알바 추천해주세요 알바 추천해주세요 알바
            추천해주세요 알바 추천해주세요 알바 추천해주세요 알바 추천해주세요
            알바 추천해주세요 알바 추천해주세요 알바 추천해주세요 알바
            추천해주세요 알바 추천해주세요 알바 추천해주세요 알바 추천해주세요
            알바 추천해주세요
          </div>
          <CommentList />
        </div>
      </div>
    </div>
  );
};

export default AlbatalkDetail;
