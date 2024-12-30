'use client';
import CommentIcon from '@/public/icons/comment.svg';
import LikeIcon from '@/public/icons/like.svg';
import Image from 'next/image';
import CommentList from './_components/CommentList';
import { getPostDetail } from '@/services/albatalk';
import { formatDate } from '@/utils/dateFormatter';
import { GetPostDetailResponse } from '@/types/albatalk';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

// TODO: RSC 대응하도록 API 고쳐지면 수정!
// const AlbatalkDetail = async ({
//   params,
// }: {
//   params: Promise<{ talkId: number }>;
// }) => {
//   const { talkId } = await params;
//   const post = await getPostDetail(talkId);

const AlbatalkDetail = () => {
  const { talkId: talkIdStr } = useParams();
  const talkId = Number(talkIdStr);
  const { data: post } = useQuery<GetPostDetailResponse>({
    queryKey: ['comments', talkId],
    queryFn: () => getPostDetail(talkId),
  });

  return (
    <div className="w-full flex flex-col">
      <div className="items-center justify-center mt-4 lg:mt-10">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <div className="text-lg font-semibold md:text-xl lg:text-2xl">
              {post?.title}
            </div>
            <div className="w-full border stroke-gray-30" />
            <div className="flex">
              <div className="flex w-full justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className="flex gap-2 items-center">
                    <div className="w-[20px] h-[20px] lg:w-9 lg:h-9 relative ">
                      <Image
                        src={post?.writer.imageUrl || '/icons/profile.svg'}
                        alt="user profile"
                        fill
                        className="border border-none rounded-3xl"
                      />
                    </div>
                    <div className="max-w-40 text-gray-500 text-xs md:text-md lg:text-lg font-regular">
                      {post?.writer.nickname}
                    </div>
                  </div>
                  <div className="text-gray-300">|</div>
                  <div className="max-w-40 text-gray-500 text-xs md:text-md lg:text-lg font-regular">
                    {post?.createdAt
                      ? formatDate(new Date(post.createdAt))
                      : ''}
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex gap-1 items-center">
                    <CommentIcon className="w-6 h-6 lg:w-9 lg:h-9 " />
                    <div className="text-gray-500 text-xs md:text-md lg:text-lg font-regular">
                      {post?.commentCount}
                    </div>
                  </div>
                  <div className="flex gap-1 items-center">
                    {post?.isLiked ? (
                      <LikeIcon className="w-6 h-6 lg:w-9 lg:h-9 text-orange-300" />
                    ) : (
                      <LikeIcon className="w-6 h-6 lg:w-9 lg:h-9 text-gray-100" />
                    )}
                    <div className="text-gray-500 text-xs md:text-md lg:text-lg font-regular">
                      {post?.likeCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:gap-5">
            <div className="flex justify-center items-center">
              <div className="relative flex w-64 h-40 md:w-80 md:h-80">
                {post?.imageUrl && (
                  <Image src={post?.imageUrl} alt="post image" fill />
                )}
              </div>
            </div>
            <div className="text-md font-regular text-gray-500 md:text-lg lg:text-xl ">
              {post?.content}
            </div>
          </div>
          <CommentList id={talkId} commentCount={post?.commentCount || 0} />
        </div>
      </div>
    </div>
  );
};

export default AlbatalkDetail;
