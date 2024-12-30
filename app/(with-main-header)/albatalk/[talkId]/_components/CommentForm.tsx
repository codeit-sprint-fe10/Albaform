'use client';
import React, { useState } from 'react';
import Button from '@/components/Button';
import { postComment } from '@/services/albatalk';
import Form from 'next/form';

const CommentForm = ({
  id,
  onCommentPosted,
}: {
  id: number;
  onCommentPosted: () => void;
}) => {
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await postComment(id, { content: comment });
      console.log(id, comment);
      setComment('');
      onCommentPosted();
      setIsLoading(false);
    } catch (error) {
      console.error('댓글 등록 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };
  //TODO: 등록하고, 리스트에 반영되기까지 시간이 걸림 .. 이때도 로딩중인거 표시해줄 필요 있을듯?

  return (
    <Form action={handleSubmit}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="h-[132px] p-[14px] md:text-lg lg:text-xl placeholder:text-md focus:outline-none placeholder:text-gray-400  placeholder:md:text-lg placeholder:lg:text-xl rounded-lg bg-background-200 resize-none"
            placeholder="댓글을 입력해주세요"
          ></textarea>
        </div>
        <div className="flex justify-end">
          <div className="w-[108px] lg:w-[214px]">
            <Button type="submit" content={'등록하기'} disabled={isLoading} />
          </div>
        </div>
      </div>
    </Form>
  );
};

export default CommentForm;
