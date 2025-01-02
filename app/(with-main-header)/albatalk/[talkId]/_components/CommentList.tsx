'use client';
import CommentForm from './CommentForm';
import useGetComments from '../_hooks/useGetComments';
import CommentItem from './CommentItem';
import InfiniteScroll from '@/components/InfiniteScroll';
import { deleteComment } from '@/services/albatalk';
import { EditDropdownAction } from '@/types/albatalk';
import { useUserStore } from '@/store/user';

type CommentProps = {
  talkId: number;
};

const CommentList = ({ talkId }: CommentProps) => {
  const user = useUserStore((state) => state.user);
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

  const handleAction = async (
    action: EditDropdownAction,
    commentId: number,
  ) => {
    if (action === 'edit') {
      // TODO: 수정하기 로직 추가
    } else if (action === 'delete') {
      try {
        await deleteComment(commentId);
      } catch (error) {
        console.error('Error deleting comment', error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="text-lg font-semibold md:text-xl lg:text-2xl">{`댓글(${totalItemCount})`}</div>
        <div className="w-full border stroke-gray-30"></div>
      </div>
      <CommentForm id={talkId} />

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
                  onAction={(action) => handleAction(action, comment.id)}
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
