import CommentIcon from '@/public/icons/comment.svg';
import LikeIcon from '@/public/icons/like.svg';
import Image from 'next/image';
import { format } from '@/utils/date';
import CommentList from './_components/CommentList';
import { getPostDetail } from '@/services/albatalk';
import { GetPostDetailResponse } from '@/types/albatalk';

const AlbatalkDetail = async ({ params }: { params: { talkId: number } }) => {
  const { talkId } = params;
  const post = await getPostDetail(talkId);

  return (
    <div className="w-full flex flex-col">
      <div className="items-center justify-center mt-4 lg:mt-10">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <div className="text-lg font-semibold">{post?.title}</div>
            <div className="w-full border stroke-gray-30"></div>
            <div className="flex">
              <div className="flex w-full justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className="flex gap-1 items-center">
                    <div className="w-6 h-6 lg:w-9 lg:h-9 relative">
                      <Image
                        src={post?.writer.imageUrl || '/icons/profile.svg'}
                        alt="user profile"
                        fill
                      />
                    </div>
                    <div className="max-w-40 text-gray-500 text-xs md:text-md lg:text-lg font-regular">
                      {post?.writer.nickname}
                    </div>
                  </div>
                  <div className="text-gray-300">|</div>
                  <div className="max-w-40 text-gray-500 text-xs md:text-md lg:text-lg font-regular">
                    {post?.createdAt
                      ? format(new Date(post.createdAt), 'yyyy.MM.dd')
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
          <div className="flex flex-col gap-2">
            <div className="relative w-full h-32">
              {post?.imageUrl && (
                <Image src={post?.imageUrl} alt="post image" fill />
              )}
            </div>
            <div className="text-md font-regular text-gray-500">
              {post?.content}
            </div>
          </div>
          <CommentList id={talkId} commentCount={post.commentCount} />
        </div>
      </div>
    </div>
  );
};

export default AlbatalkDetail;
