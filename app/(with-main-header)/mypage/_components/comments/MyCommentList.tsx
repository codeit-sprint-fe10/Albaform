import { SortOrder } from '@/types/albatalk';
import EmptyPosts from '../EmptyPosts';
import InfiniteScroll from '@/components/InfiniteScroll';
import CommentCard from './CommentCard';

const MyCommentList = ({ sortOrder }: { sortOrder: SortOrder }) => {
  return (
    <div className="flex w-full max-w-container-md">
      <div className="w-full flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:gap-y-12">
        <CommentCard />
      </div>
    </div>
  );
};

export default MyCommentList;
