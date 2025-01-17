import NoCommentIcon from '@/public/icons/no-comment.svg';

const EmptyComment = () => {
  return (
    <div className="mt-16 flex flex-col gap-8 justify-center items-center mb-20">
      <div className="w-[80px] h-[80px] flex items-center justify-center lg:w-[120px] lg:h-[120px]">
        <NoCommentIcon />
      </div>
      <div className="text-gray-400 text-md lg:font-medium lg:text-2lg text-center">
        등록된 댓글이 없어요.
        <br />
        댓글을 등록하고 의견을 공유해보세요
      </div>
    </div>
  );
};

export default EmptyComment;
