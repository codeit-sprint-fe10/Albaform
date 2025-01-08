import InfiniteScroll from '@/components/InfiniteScroll';
import AlbatalkCard from './AlbatalkCard';
import useGetMyPosts from '../../_hooks/useGetMyPosts';
import { SortOrder } from '@/types/albatalk';
import EmptyPosts from '../EmptyPosts';
import Loader from '@/components/Loader';

const PAGE_LIMIT = 6;

const MyPostList = ({ sortOrder }: { sortOrder: SortOrder }) => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetMyPosts({
    pageLimit: PAGE_LIMIT,
    sortOrder: sortOrder,
  });

  const isEmpty = data && data.pages.every((page) => page.data.length === 0);

  if (isLoading) {
    return (
      <div className="flex w-full justify-center items-center min-h-[200px]">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex w-full max-w-container-md">
      {isEmpty ? (
        <EmptyPosts />
      ) : (
        <div className="w-full flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:gap-y-12">
          <InfiniteScroll
            hasNextPage={hasNextPage}
            isLoading={isFetchingNextPage}
            loadNextPage={fetchNextPage}
            loader={<Loader />}
          >
            {data?.pages.map(({ data: posts }) =>
              posts.map(
                ({
                  id,
                  title,
                  content,
                  writer,
                  createdAt,
                  commentCount,
                  likeCount,
                }) => (
                  <AlbatalkCard
                    key={id}
                    title={title}
                    content={content}
                    writer={writer}
                    createdAt={createdAt}
                    commentCount={commentCount}
                    likeCount={likeCount}
                    talkId={id}
                  />
                ),
              ),
            )}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default MyPostList;
