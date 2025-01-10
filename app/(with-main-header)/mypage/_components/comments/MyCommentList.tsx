import Empty from '../Empty';
import InfiniteScroll from '@/components/InfiniteScroll';
import CommentCard from './CommentCard';
import useGetMyComments from '../../_hooks/useGetMyComments';
import Loader from '@/components/Loader';

const PAGE_LIMIT = 6;

const MyCommentList = () => {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    totalItemCount,
  } = useGetMyComments({
    page: 1,
    pageSize: PAGE_LIMIT,
  });

  if (isLoading) {
    return (
      <div className="flex w-full justify-center items-center min-h-[200px]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-container-md mt-8">
      <div className="w-full flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:gap-y-12">
        {totalItemCount ? (
          <InfiniteScroll
            hasNextPage={hasNextPage}
            isLoading={isFetchingNextPage}
            loadNextPage={fetchNextPage}
            loader={<Loader />}
          >
            {data?.pages.map((page) =>
              page.data.map((comment) => (
                <CommentCard key={comment.id} {...comment} />
              )),
            )}
          </InfiniteScroll>
        ) : (
          <Empty type="comment" />
        )}
      </div>
    </div>
  );
};

export default MyCommentList;
