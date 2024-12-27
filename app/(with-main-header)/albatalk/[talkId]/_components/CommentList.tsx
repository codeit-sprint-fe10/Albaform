'use client';
import CommentInput from './CommentInput';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import Image from 'next/image';
import { format } from '@/utils/date';
import KebabIcon from '@/public/icons/kebab.svg';
import { getComments } from '@/services/albatalk';
import { GetCommentsResponse } from '@/types/albatalk';

const CommentList = ({
  id,
  commentCount,
}: {
  id: number;
  commentCount: number;
}) => {
  const pageSize = 10;
  const page = 1;

  const { data, isLoading, error } = useQuery<GetCommentsResponse>({
    queryKey: ['comments', { id, page, pageSize }],
    queryFn: () =>
      getComments({
        id: id,
        page: page,
        pageSize: pageSize,
      }),

    placeholderData: keepPreviousData,
  });
  console.log(data);
  if (isLoading) return <div>Loading comments...</div>;
  if (error) return <div>Error loading comments</div>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="text-lg font-semibold">{`댓글(${commentCount})`}</div>
        <div className="w-full border stroke-gray-30"></div>
      </div>
      <CommentInput />
      <div className="flex flex-col gap-8 mt-4">
        {data?.data.map((comment) => (
          <div key={comment.id} className="flex flex-col gap-4">
            <div className="flex flex-col gap-6">
              <div className="flex w-full justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className="flex gap-1 items-center">
                    <div className="w-6 h-6 lg:w-9 lg:h-9 relative">
                      <Image
                        src={comment.writer.imageUrl || '/icons/profile.svg'}
                        alt="user profile"
                        fill
                      />
                    </div>
                    <div className="max-w-40 text-gray-500 text-xs md:text-md lg:text-lg font-regular">
                      {comment.writer.nickname}
                    </div>
                  </div>
                  <div className="text-gray-300">|</div>
                  <div className="max-w-40 text-gray-500 text-xs md:text-md lg:text-lg font-regular">
                    {format(new Date(comment.createdAt), 'yyyy.MM.dd')}
                  </div>
                </div>
                <KebabIcon className="w-6 h-6" />
              </div>
              <div className="text-black-400 font-regular text-md">
                {comment.content}
              </div>
            </div>
            <div className="w-full border stroke-gray-30"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
