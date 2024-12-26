import Button from '@/components/Button';
const CommentInput = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <textarea
          className="h-[132px] p-[14px] placeholder:text-md placeholder:text-gray-400 rounded-lg bg-background-200 resize-none"
          placeholder="댓글을 입력해주세요"
        ></textarea>
      </div>
      <div className="flex w-full justify-end">
        <Button className="w-28 h-[50px]" content="등록하기" />
      </div>
    </div>
  );
};

export default CommentInput;
