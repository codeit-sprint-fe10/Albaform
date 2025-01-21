'use client';
import { useState, useEffect, useRef } from 'react';
import CommentForm from './CommentForm';
import useGetComments from '../_hooks/useGetComments';
import CommentItem from './CommentItem';
import InfiniteScroll from '@/components/InfiniteScroll';
import useDeleteComment from '../_hooks/useDeleteComment';
import { EditDropdownAction } from '@/types/albatalk';
import { useUserStore } from '@/store/user';
import EditCommentForm from './EditCommentForm';
import EmptyComment from './EmptyComment';
import Loader from '@/components/Loader';

type CommentListProps = {
  talkId: number;
  totalItemCount: number;
  onUpdateTotalItemCount: (count: number) => void;
};

const PAGE_LIMIT = 5;

const CommentList = ({ talkId, onUpdateTotalItemCount }: CommentListProps) => {
  const user = useUserStore((state) => state.user);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [initialComment, setInitialComment] = useState('');
  const { mutate: deleteComment } = useDeleteComment();

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    totalItemCount,
  } = useGetComments({
    talkId,
    params: { page: 1, pageSize: PAGE_LIMIT },
  });

  const editFormRef = useRef<HTMLDivElement | null>(null); // EditCommentForm 참조용

  useEffect(() => {
    onUpdateTotalItemCount(totalItemCount);
  }, [totalItemCount, onUpdateTotalItemCount]);

  useEffect(() => {
    if (editingCommentId && editFormRef.current) {
      editFormRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [editingCommentId]);

  const handleAction = (
    action: EditDropdownAction,
    commentId: number,
    content: string,
  ) => {
    if (action === 'edit') {
      setInitialComment(content);
      setEditingCommentId(commentId);
    } else if (action === 'delete') {
      deleteComment(commentId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex w-full justify-center items-center min-h-[200px]">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="text-lg font-semibold md:text-xl lg:text-2xl">{`댓글(${totalItemCount})`}</div>
        <div className="w-full border stroke-gray-30"></div>
      </div>
      {editingCommentId ? (
        <div ref={editFormRef}>
          {' '}
          {/* ref를 추가하여 스크롤 위치를 참조 */}
          <EditCommentForm
            id={editingCommentId}
            content={initialComment}
            onCancel={() => setEditingCommentId(null)}
          />
        </div>
      ) : (
        <CommentForm id={talkId} />
      )}
      <div className="flex flex-col gap-8 mt-4">
        {totalItemCount ? (
          <InfiniteScroll
            hasNextPage={hasNextPage}
            isLoading={isFetchingNextPage}
            loadNextPage={fetchNextPage}
            loader={<Loader />}
          >
            {data?.pages.map((page) =>
              page.data.map((comment) => (
                <CommentItem
                  key={comment.id}
                  userId={user?.id || null}
                  comment={comment}
                  onAction={(action) =>
                    handleAction(action, comment.id, comment.content)
                  }
                />
              )),
            )}
          </InfiniteScroll>
        ) : (
          <EmptyComment />
        )}
      </div>
    </div>
  );
};

export default CommentList;
