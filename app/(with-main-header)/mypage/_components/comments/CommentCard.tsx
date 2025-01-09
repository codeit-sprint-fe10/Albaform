import DocsIcon from '@/public/icons/docs.svg';
import { Comment } from '@/types/mypage';
import { formatDate } from '@/utils/dateFormatter';
import Link from 'next/link';

const CommentCard = ({ post, content, createdAt }: Comment) => {
  return (
    <Link href={`/albatalk/${post.id}`}>
      <div className="relative w-full h-[210px] md:h-[184px] lg:h-[264px] p-6 border rounded-2xl hover:border-gray-300 transition-colors">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-4 h-[84px] border-b md:h-[64px] lg:h-[116px]">
            <div className="flex gap-[10px] items-center">
              <div className="w-4">
                <DocsIcon />
              </div>
              <div className="text-black-100 text-xs font-medium lg:text-md line-clamp-1">
                {post.title}
              </div>
            </div>
            <div className="h-10 text-gray-500 text-xs font-regular line-clamp-3 md:h-[18px] lg:h-[50px]">
              {post.content}
            </div>
          </div>
          <div className="flex flex-col justify-between h-[68px] md:h-[62px] lg:h-[84px]">
            <div className="text-lg font-semibold text-black-400 lg:text-2lg line-clamp-1">
              {content}
            </div>
            <div className="text-xs text-gray-500 font-regular lg:text-lg">
              {formatDate(createdAt)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CommentCard;
