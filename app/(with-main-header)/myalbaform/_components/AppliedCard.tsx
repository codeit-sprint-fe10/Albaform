import { MouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Badge from '@/components/Badge';
import { getResumeFile } from '@/services/resumeFile';
import { getRecruitingStatus } from '@/utils/card';
import { format } from '@/utils/date';
import { applicationStatus, ApplicationCardType } from '@/types/application';
import { toast } from 'react-toastify';

const AppliedCard = ({
  resumeId,
  resumeName,
  status,
  createdAt,
  form,
}: ApplicationCardType) => {
  const recruitingStatus = getRecruitingStatus(
    form.recruitmentStartDate,
    form.recruitmentEndDate,
  );

  const rightBarStyle =
    'after:absolute after:top-1/2 after:-translate-y-1/2 after:-right-2 after:w-[1px] after:h-2 lg:after:h-3 after:bg-line-200';

  const handleDownloadClick = async (event: MouseEvent) => {
    event.preventDefault();
    try {
      await getResumeFile(resumeId, resumeName);
    } catch {
      toast.error('이력서 다운로드에 실패했습니다');
    }
  };

  return (
    <Link
      href={`alba/${form.id}`}
      className="flex flex-col gap-5 lg:gap-6 w-[375px] lg:w-[477px] border border-line-100 rounded-lg p-[23px] lg:py-[29px] hover:-translate-y-2.5 transition duration-200 group"
    >
      <div className="flex justify-between items-center text-xs lg:text-lg">
        <div className="flex items-center gap-4 text-gray-400">
          <span className={`relative ${rightBarStyle}`}>지원일시</span>
          <span>{format(new Date(createdAt), 'yyyy-MM-dd hh:mm')}</span>
        </div>
        <button
          type="button"
          className="text-black-400 underline hover:scale-105"
          onClick={handleDownloadClick}
        >
          이력서 보기
        </button>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2 lg:gap-3.5">
          <div className="relative bg-background-200 w-8 h-8 lg:w-12 lg:h-12 rounded-full">
            <Image
              src={form.owner.imageUrl || '/icons/profile.svg'}
              fill
              alt={`${form.owner.storeName} 프로필`}
              className="object-cover"
            />
          </div>
          <div className="text-xs lg:text-lg">{form.owner.storeName}</div>
        </div>
        <h3 className="font-medium text-md lg:text-xl text-black-400 mt-2 lg:mt-4 lg:mb-2 truncate group-hover:underline">
          {form.title}
        </h3>
        <p className="lg:h-[52px] font-medium text-sm lg:text-2lg text-gray-400 line-clamp-2">
          {form.description}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Badge value={applicationStatus[status]} />
        <Badge value={recruitingStatus} />
      </div>
    </Link>
  );
};

export default AppliedCard;
