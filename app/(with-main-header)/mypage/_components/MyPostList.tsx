import InfiniteScroll from '@/components/InfiniteScroll';
import AlbatalkCard from './AlbatalkCard';
import useGetMyPosts from '../_hooks/useGetMyPosts';
import { SortOrder } from '@/types/albatalk';
import EmptyPosts from './EmptyPosts';

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

  return (
    <div className="flex w-full max-w-container-md">
      {data && (
        <div className="w-full flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:gap-y-12">
          <InfiniteScroll
            hasNextPage={hasNextPage}
            isLoading={isFetchingNextPage}
            loadNextPage={fetchNextPage}
            loader={<p>Loading applications...</p>}
          >
            {data.pages.map(({ data: posts }) =>
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
      <EmptyPosts />
    </div>
  );
};

export default MyPostList;
