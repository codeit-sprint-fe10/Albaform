import Empty from '../Empty';
import InfiniteScroll from '@/components/InfiniteScroll';
import CommentCard from './CommentCard';
import useGetMyComments from '../../_hooks/useGetMyComments';
import Loader from '@/components/Loader';
import CommentCardSkeleton from './CommentCardSkeleton';

const PAGE_LIMIT = 6;

const CommentCardSkeletons = () =>
  Array(PAGE_LIMIT)
    .fill(0)
    .map((_, idx) => (
      <div key={idx} className="w-full">
        <CommentCardSkeleton />
      </div>
    ));

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

  return (
    <div className="flex w-full flex-col max-w-container mt-8">
      {isLoading ? (
        <div className="w-full flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:gap-y-12">
          <CommentCardSkeletons />
        </div>
      ) : totalItemCount ? (
        <InfiniteScroll
          hasNextPage={hasNextPage}
          isLoading={isFetchingNextPage}
          loadNextPage={fetchNextPage}
          loader={
            <div className="mt-9">
              <Loader />
            </div>
          }
        >
          <div className="w-full flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:gap-y-12">
            {data?.pages.map((page) =>
              page.data.map((comment) => (
                <CommentCard key={comment.id} {...comment} />
              )),
            )}
          </div>
        </InfiniteScroll>
      ) : (
        <Empty type="comment" />
      )}
    </div>
  );
};

export default MyCommentList;
