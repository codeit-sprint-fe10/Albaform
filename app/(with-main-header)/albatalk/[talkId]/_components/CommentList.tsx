'use client';
import CommentInput from './CommentInput';
import { useState, useEffect } from 'react';
import {
  useQuery,
  keepPreviousData,
  useQueryClient,
} from '@tanstack/react-query';
import Image from 'next/image';
import { format } from '@/utils/date';
import KebabIcon from '@/public/icons/kebab.svg';
import { getComments } from '@/services/albatalk';
import { GetCommentsResponse } from '@/types/albatalk';

const CommentList = ({
  id,
  commentCount,
}: {
  id: number;
  commentCount: number;
}) => {
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery<GetCommentsResponse>({
    queryKey: ['comments', { id, page, pageSize }],
    queryFn: () =>
      getComments({
        id: id,
        page: page,
        pageSize: pageSize,
      }),
    placeholderData: keepPreviousData,
  });
  //TODO: 로딩중일때 표시
  const handleCommentPosted = () => {
    queryClient.invalidateQueries({
      queryKey: ['comments', { id, page, pageSize }],
    });
  };
  useEffect(() => {
    if (data) {
      if (data.totalItemCount === 0 || data.totalPages === 0) {
        setHasMore(false);
      } else if (data.currentPage >= data.totalPages) {
        setHasMore(false);
      }
    }
  }, [data]);
  const loadMoreComments = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          loadMoreComments();
        }
      },
      { threshold: 1.0 },
    );

    const sentinel = document.getElementById('sentinel');
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [hasMore]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="text-lg font-semibold">{`댓글(${commentCount})`}</div>
        <div className="w-full border stroke-gray-30"></div>
      </div>
      <CommentInput id={id} onCommentPosted={handleCommentPosted} />
      <div className="flex flex-col gap-8 mt-4">
        {data?.data.map((comment) => (
          <div key={comment.id} className="flex flex-col gap-4">
            <div className="flex flex-col gap-6">
              <div className="flex w-full justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className="flex gap-2 items-center">
                    <div className="relative w-4 h-4 lg:w-6 lg:h-6 ">
                      <Image
                        src={comment.writer.imageUrl || '/icons/profile.svg'}
                        alt="user profile"
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
                    {format(new Date(comment.createdAt), 'yyyy.MM.dd')}
                  </div>
                </div>
                <KebabIcon className="w-6 h-6" />
              </div>
              <div className="text-black-400 font-regular text-md">
                {comment.content}
              </div>
            </div>
            <div className="w-full border stroke-gray-30"></div>
          </div>
        ))}
      </div>
      {hasMore && <div id="sentinel" className="h-2 bg-transparent" />}
    </div>
  );
};

export default CommentList;
