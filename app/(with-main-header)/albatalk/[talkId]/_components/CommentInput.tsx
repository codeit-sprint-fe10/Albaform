import React, { useState } from 'react';
import Button from '@/components/Button';
import { postComment } from '@/services/albatalk';

const CommentInput = ({
  id,
  onCommentPosted,
}: {
  id: number;
  onCommentPosted: () => void;
}) => {
  const [comment, setComment] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSubmit = async () => {
    if (!comment.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }
    try {
      setIsLoading(true);
      await postComment(id, { content: comment });
      console.log(id, comment);
      setComment('');
      onCommentPosted();
      setIsLoading(false);
    } catch (error) {
      console.error('댓글 등록 실패:', error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="h-[132px] p-[14px] placeholder:text-md focus:outline-none placeholder:text-gray-400  rounded-lg bg-background-200 resize-none"
          placeholder="댓글을 입력해주세요"
        ></textarea>
      </div>
      <div className="flex justify-end">
        <div className="w-[108px]">
          <Button
            content={'등록하기'}
            onClick={handleSubmit}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
