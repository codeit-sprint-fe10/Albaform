'use client';

import NoCommentIcon from '@/public/icons/no-comment.svg';

interface EmptyProps {
  type: 'comment' | 'post' | 'scrap';
}

const CONTENT_MESSAGE = {
  comment: {
    message: '등록된 댓글이 없어요.\n댓글을 작성해 의견을 남겨보세요.',
  },
  post: {
    message: '등록한 게시물이 없어요.\n게시물을 등록하고 의견을 공유해보세요.',
  },
  scrap: {
    message: '스크랩한 항목이 없어요.\n관심 있는 알바를 스크랩해보세요.',
  },
};

const Empty = ({ type }: EmptyProps) => {
  const { message } = CONTENT_MESSAGE[type];

  return (
    <div className="mt-20 flex flex-col gap-8 justify-center items-center">
      <div className="w-[80px] h-[80px] flex items-center justify-center lg:w-[120px] lg:h-[120px]">
        <NoCommentIcon />
      </div>
      <div className="text-gray-400 text-md lg:font-medium lg:text-2lg text-center whitespace-pre-line">
        {message}
      </div>
    </div>
  );
};

export default Empty;
