'use client';

import { useState } from 'react';
import CommentIcon from '@/public/icons/comment.svg';
import Image from 'next/image';
import CommentList from './_components/CommentList';
import { formatDate } from '@/utils/dateFormatter';
import { useParams } from 'next/navigation';
import LikeButton from './_components/LikeButton';
import { useUserStore } from '@/store/user';
import EditDropdown from './_components/EditDropdown';
import { useRouter } from 'next/navigation';
import { EditDropdownAction } from '@/types/albatalk';
import useGetPostDetail from './_hooks/useGetPostDetail';
import useDeleteTalk from './_hooks/useDeleteTalk';
import Loader from '@/components/Loader';

const AlbatalkDetail = () => {
  const { talkId: talkIdStr } = useParams();
  const talkId = Number(talkIdStr);
  const router = useRouter();
  if (isNaN(talkId)) router.replace('/404');
  const { mutate: deleteMutation } = useDeleteTalk(talkId);
  const { data: post, isLoading } = useGetPostDetail(talkId);
  const user = useUserStore((state) => state.user);
  const [totalItemCount, setTotalItemCount] = useState(post?.commentCount || 0);

  const handleTotalItemCountUpdate = (count: number) => {
    setTotalItemCount(count);
  };

  const handleAction = async (action: EditDropdownAction) => {
    if (action === 'edit') {
      router.push(`/albatalk/${talkId}/edit`);
    } else if (action === 'delete') {
      deleteMutation();
    }
  };

  const scrollToComments = () => {
    const commentList = document.getElementById('comment-list');
    if (commentList) {
      commentList.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="w-full flex flex-col max-w-container lg:px-[72px]">
      {isLoading && (
        <div className="flex h-screen items-center justify-center ">
          <Loader />
        </div>
      )}
      {post && (
        <div className="items-center justify-center mt-4 lg:mt-10">
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center text-lg font-semibold md:text-xl lg:text-2xl">
                {post.title}
                {user?.id === post.writer.id && (
                  <EditDropdown onAction={handleAction} />
                )}
              </div>
              <div className="w-full border stroke-gray-30" />
              <div className="flex">
                <div className="flex w-full justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <div className="flex gap-2 items-center">
                      <div className="w-[20px] h-[20px] lg:w-9 lg:h-9 relative ">
                        <Image
                          src={post.writer.imageUrl || '/icons/profile.svg'}
                          alt="user profile"
                          fill
                          className="border border-none rounded-3xl"
                        />
                      </div>
                      <div className="max-w-40 text-gray-500 text-xs md:text-md lg:text-lg font-regular">
                        {post.writer.nickname}
                      </div>
                    </div>
                    <div className="text-gray-300">|</div>
                    <div className="max-w-40 text-gray-500 text-xs md:text-md lg:text-lg font-regular">
                      {formatDate(post.createdAt)}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex gap-1 items-center">
                      <button
                        onClick={scrollToComments}
                        aria-label="댓글로 이동"
                      >
                        <CommentIcon className="w-6 h-6 lg:w-9 lg:h-9" />
                      </button>
                      <div className="text-gray-500 text-xs md:text-md lg:text-lg font-regular">
                        {totalItemCount}
                      </div>
                    </div>
                    <LikeButton
                      postId={post.id}
                      isLiked={post.isLiked}
                      likeCount={post.likeCount}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 md:gap-10">
              {post.imageUrl && (
                <div className="flex justify-start items-center">
                  <div className="relative flex w-64 h-40 lg:w-100 lg:h-70">
                    <Image
                      src={post.imageUrl}
                      alt="post image"
                      fill
                      className="rounded-lg object-contain"
                    />
                  </div>
                </div>
              )}
              <div className="text-md font-regular whitespace-pre-line text-gray-500 md:text-lg lg:text-xl ">
                {post.content}
              </div>
            </div>
            <div id="comment-list">
              <CommentList
                talkId={talkId}
                totalItemCount={totalItemCount}
                onUpdateTotalItemCount={handleTotalItemCountUpdate}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbatalkDetail;
