'use client';
import { useState } from 'react';
import Button from '@/components/Button';
import Form from 'next/form';
import useCreateComment from '../_hooks/useCreateComment';
type CommentFormProps = {
  id: number;
};
const CommentForm = ({ id }: CommentFormProps) => {
  const [comment, setComment] = useState('');
  const { mutate, isPending } = useCreateComment();
  const handleSubmit = () => {
    if (!comment.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }
    mutate(
      { id, content: comment },
      {
        onSuccess: () => setComment(''),
      },
    );
  };

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
            <Button type="submit" content={'등록하기'} disabled={isPending} />
          </div>
        </div>
      </div>
    </Form>
  );
};

export default CommentForm;
