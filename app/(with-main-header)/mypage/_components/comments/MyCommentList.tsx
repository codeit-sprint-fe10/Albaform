import EmptyPosts from '../EmptyPosts';
import InfiniteScroll from '@/components/InfiniteScroll';
import CommentCard from './CommentCard';
import useGetMyComments from '../../_hooks/useGetMyComments';

const PAGE_LIMIT = 6;

const MyCommentList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    totalItemCount,
  } = useGetMyComments({
    page: 1,
    pageSize: PAGE_LIMIT,
  });
  console.log(data);

  return (
    <div className="flex w-full max-w-container-md">
      <div className="w-full flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:gap-y-12">
        {totalItemCount ? (
          <InfiniteScroll
            hasNextPage={hasNextPage}
            isLoading={isFetchingNextPage}
            loadNextPage={fetchNextPage}
            loader={<p>Loading comments...</p>}
          >
            {data?.pages.map((page) =>
              page.data.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              )),
            )}
          </InfiniteScroll>
        ) : (
          <EmptyPosts />
        )}
      </div>
    </div>
  );
};

export default MyCommentList;
