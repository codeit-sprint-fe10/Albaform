'use client';
import { useState } from 'react';
import CommentForm from './CommentForm';
import useGetComments from '../_hooks/useGetComments';
import CommentItem from './CommentItem';
import InfiniteScroll from '@/components/InfiniteScroll';
import useDeleteComment from '../_hooks/useDeleteComment';
import { EditDropdownAction } from '@/types/albatalk';
import { useUserStore } from '@/store/user';
import EditCommentForm from './EditCommentForm';

type CommentListProps = {
  talkId: number;
};

const CommentList = ({ talkId }: CommentListProps) => {
  const user = useUserStore((state) => state.user);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [initialComment, setInitialComment] = useState('');
  const { mutate: deleteComment } = useDeleteComment();

  const PAGE_LIMIT = 5;
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    totalItemCount,
  } = useGetComments({
    talkId,
    params: { page: 1, pageSize: PAGE_LIMIT },
  });

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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="text-lg font-semibold md:text-xl lg:text-2xl">{`댓글(${totalItemCount})`}</div>
        <div className="w-full border stroke-gray-30"></div>
      </div>
      {editingCommentId ? (
        <EditCommentForm
          id={editingCommentId}
          content={initialComment}
          onCancel={() => setEditingCommentId(null)}
        />
      ) : (
        <CommentForm id={talkId} />
      )}

      <div className="flex flex-col gap-8 mt-4">
        {data?.pages.length ? (
          <InfiniteScroll
            hasNextPage={hasNextPage}
            isLoading={isFetchingNextPage}
            loadNextPage={fetchNextPage}
            loader={<p>Loading comments...</p>}
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
          <div>댓글이 없습니다</div>
        )}
      </div>
    </div>
  );
};

export default CommentList;
