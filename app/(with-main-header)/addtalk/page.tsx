'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Textarea from './_components/Textarea';
import Input from './_components/Input';
import FileInput from './_components/FileInput';
import Label from '@/components/Label';
import Button from '@/components/Button';
import { PostTalkBody } from '@/types/albatalk';
import { postTalk } from '@/services/albatalk';

const AddTalk = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PostTalkBody>({ mode: 'onTouched' });

  const onSubmit: SubmitHandler<PostTalkBody> = async (data, event) => {
    console.log('Form Data:', data);
    event?.preventDefault();
    try {
      const response = await postTalk(data);
      router.push(`/albatalk/${response.id}`);
    } catch (error) {
      console.error('Error posting talk:', error);
    }
  };

  const handleCancel = () => {
    router.push('/albatalk');
  };

  return (
    <div className="flex flex-col gap-9 mt-4 md:mt-6 lg:my-[40px]">
      <div className="flex flex-col gap-4">
        <div className="py-4 md:py-6 lg:py-10 border-b border-gray-400">
          <h1 className="text-black-400 text-2lg md:text-xl lg:text-2xl font-semibold">
            글쓰기
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
            <FileInput setValue={setValue} />
          </div>

          <div className="flex flex-col mt-9 gap-2 md:mt-0 md:flex-row md:relative md:justify-end md:bottom-[702px] lg:bottom-[869px] ">
            <Button
              design="outlined"
              content="취소"
              onClick={handleCancel}
              className="md:w-[101px] md:h-[46px] md:text-md lg:w-[180px] lg:h-[58px]"
            />
            <Button
              type="submit"
              content="등록 하기"
              className="md:w-[101px] md:h-[46px] text-md lg:w-[180px] lg:h-[58px]"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTalk;
