'use client';
import CommentForm from './CommentForm';
import { useState, useEffect } from 'react';
import {
  useQuery,
  keepPreviousData,
  useQueryClient,
} from '@tanstack/react-query';
import { getComments } from '@/services/albatalk';
import { GetCommentsResponse } from '@/types/albatalk';
import { useUserStore } from '@/store/user';
import { EditDropdownAction } from '@/types/albatalk';
import { deleteComment } from '@/services/albatalk';
import CommentItem from './CommentItem';

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
  const user = useUserStore((state) => state.user);
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
    staleTime: 10 * 1000,
    gcTime: 2 * 60 * 1000,
  });

  //TODO: 로딩중일때 UI 필요
  //TODO: 댓글 없을때 UI 추가 필요

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

  const handleAction = async (
    action: EditDropdownAction,
    commentId: number,
  ) => {
    if (action === 'edit') {
    } else if (action === 'delete') {
      try {
        await deleteComment(commentId);
        queryClient.invalidateQueries({
          queryKey: ['comments', { id, page, pageSize }],
        });
      } catch (error) {
        console.error('Error deleting comment', error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="text-lg font-semibold md:text-xl lg:text-2xl">{`댓글(${commentCount})`}</div>
        <div className="w-full border stroke-gray-30"></div>
      </div>
      <CommentForm id={id} onCommentPosted={handleCommentPosted} />
      <div className="flex flex-col gap-8 mt-4">
        {data?.data.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            userId={user?.id ?? null}
            onAction={(action) => handleAction(action, comment.id)}
          />
        ))}
      </div>
      {hasMore && <div id="sentinel" className="h-2 bg-transparent" />}
    </div>
  );
};

export default CommentList;
