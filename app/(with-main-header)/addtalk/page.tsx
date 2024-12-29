'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Textarea from './_components/Textarea';
import Input from './_components/Input';
import FileInput from './_components/FileInput';
import Label from '@/components/Label';
import Button from '@/components/Button';
import { PostTalkBody } from '@/types/albatalk';

interface TalkFormData {
  title: string;
  content: string;
  image: FileList;
}

const AddTalk = () => {
  const router = useRouter();
  const { setValue } = useForm<PostTalkBody>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TalkFormData>({ mode: 'onTouched' });

  const onSubmit: SubmitHandler<TalkFormData> = (data) => {
    console.log('Form Data:', data);
    if (data.image.length > 0) {
      console.log('Uploaded Image:', data.image[0]);
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
        <div className="flex flex-col mt-8 gap-6 lg:gap-10">
          <div>
            <Label id="title" label="제목" className="mb-4" required />
            <Input
              name="title"
              placeholder="제목을 입력해주세요."
              className="p-3.5 lg:py-4"
              register={register('title')}
            />
          </div>
          <div>
            <Label id="content" label="내용" className="mb-4" required />
            <Textarea
              name="description"
              placeholder="내용을 입력해주세요."
              className="h-40"
              register={register('content')}
            />
          </div>
          <FileInput setValue={setValue} />
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:relative md:justify-end md:bottom-[702px] lg:bottom-[870px] ">
          <Button
            design="outlined"
            content="취소"
            onClick={handleCancel}
            className="md:w-[101px] md:h-[46px] md:text-md lg:w-[180px] lg:h-[58px]"
          />
          <Button
            content="등록 하기"
            onClick={handleSubmit(onSubmit)}
            className="md:w-[101px] md:h-[46px] text-md lg:w-[180px] lg:h-[58px]"
          />
        </div>
      </div>
    </div>
  );
};

export default AddTalk;
