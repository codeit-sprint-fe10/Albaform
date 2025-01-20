'use client';
import { useParams } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/user';
import Textarea from './_components/Textarea';
import Input from './_components/Input';
import FileInput from './_components/FileInput';
import Label from '@/components/Label';
import Button from '@/components/Button';
import { PostTalkBody } from '@/types/albatalk';
import { useEffect } from 'react';
import usePatchTalk from './_hooks/usePatchTalk';
import useGetPostDetail from '../_hooks/useGetPostDetail';

const Edit = () => {
  const { talkId: talkIdStr } = useParams();
  const talkId = Number(talkIdStr);
  const { data: post } = useGetPostDetail(talkId);
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  if (isNaN(talkId)) router.replace('/404');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PostTalkBody>({ mode: 'onTouched' });

  useEffect(() => {
    if (post) {
      setValue('title', post.title);
      setValue('content', post.content);
      setValue('imageUrl', post.imageUrl);
    }
  }, [post]);

  const { mutate } = usePatchTalk();
  const onSubmit: SubmitHandler<PostTalkBody> = (data) => {
    mutate(
      { talkId, data },
      {
        onSuccess: () => router.push(`/albatalk/${talkId}`),
      },
    );
  };

  const handleCancel = () => {
    router.push(`/albatalk/${talkId}`);
  };

  useEffect(() => {
    if (post && user) {
      if (post?.writer.id !== user?.id) {
        router.replace('/404');
      }
    }
  }, [post, user]);

  return (
    <div className="flex max-w-container flex-col gap-9 mt-4 md:mt-6 lg:my-[40px] lg:px-[72px]">
      <div className="flex flex-col gap-4">
        <div className="py-4 md:py-6 lg:py-10 border-b border-gray-400">
          <h1 className="text-black-400 text-2lg md:text-xl lg:text-2xl font-semibold">
            수정하기
          </h1>
        </div>
        <form method="post" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mt-8 gap-6 lg:gap-10">
            <div>
              <Label id="title" label="제목" className="mb-4" required />
              <Input
                id="title"
                name="title"
                placeholder="제목을 입력해주세요."
                className="p-3.5 lg:py-4"
                register={register('title', {
                  required: '제목을 입력해주세요',
                })}
              />
            </div>
            <div>
              <Label id="content" label="내용" className="mb-4" required />
              <Textarea
                id="content"
                name="content"
                placeholder="내용을 입력해주세요."
                className="h-40"
                register={register('content', {
                  required: '내용을 입력해주세요',
                })}
              />
            </div>
            <FileInput setValue={setValue} imageUrl={post?.imageUrl} />
          </div>

          <div className="flex flex-col mt-9 gap-2 md:mt-0 md:flex-row md:relative md:justify-end md:bottom-[685px] lg:bottom-[855px]">
            <Button
              design="outlined"
              content="취소"
              onClick={handleCancel}
              sizeClass={
                'w-full md:w-[101px] lg:w-[180px] h-[58px] md:h-[46px] lg:h-[58px] ' +
                'text-lg md:text-md lg:text-xl'
              }
            />
            <Button
              type="submit"
              content="수정 하기"
              sizeClass={
                'w-full md:w-[101px] lg:w-[180px] h-[58px] md:h-[46px] lg:h-[58px] ' +
                'text-lg md:text-md lg:text-xl'
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
