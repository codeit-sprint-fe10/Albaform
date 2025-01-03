'use client';
import { useState } from 'react';
import Button from '@/components/Button';
import Form from 'next/form';
import usePatchComment from '../_hooks/usePatchComment';

type CommentFormProps = {
  id: number;
  content: string;
  onCancel?: () => void;
};

const EditCommentForm = ({ id, content, onCancel }: CommentFormProps) => {
  const [comment, setComment] = useState(content);
  const { mutate, isPending } = usePatchComment();
  const handleSubmit = () => {
    if (!comment.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }
    mutate(
      { id, content: comment },
      {
        onSuccess: () => {
          onCancel?.();
        },
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
          <div className="flex gap-4 w-[214px]">
            <Button type="submit" content={'등록하기'} disabled={isPending} />
            <Button
              type="button"
              design="outlined"
              content={'취소하기'}
              disabled={isPending}
              onClick={onCancel}
            />
          </div>
        </div>
      </div>
    </Form>
  );
};

export default EditCommentForm;
