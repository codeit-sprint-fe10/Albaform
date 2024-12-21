import Chip from '@/components/Chip';
import { formatFullDateTime } from '@/utils/dateFormatter';

const mock = {
  isPublic: true,
  createdAt: '2024-12-21T06:37:44.900Z',
  storeName: '코드잇',
  location: '서울시 종로구',
  scrapCount: 8,
  applyCount: 5,
  title:
    '코드잇 스터디카페 관리 (주말 오전) 모집합니다 서울 종로구 용산구 서대문',
};

const Page = async ({ params }: { params: Promise<{ formId: number }> }) => {
  const { formId } = await params;
  console.log(formId); // TODO api 호출 후 제거

  return (
    <div className="mt-[50px]">
      <div className="flex items-center justify-between">
        <div className="flex gap-[8px]">
          <Chip value={mock.isPublic ? '공개' : '비공개'} />
          <Chip value={'모집중'} />
        </div>
        <span className="text-gray-500 font-regular text-xs lg:text-2lg">
          {formatFullDateTime(mock.createdAt)} 등록
        </span>
      </div>

      <div>
        <span className="text-black-400 font-semibold text-md lg:text-2xl relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1.5px] after:bg-black-400">
          {mock.storeName}
        </span>
        <span className="text-gray-400 font-medium text-sm lg:text-xl ml-[10px] lg:ml-[16px]">
          {mock.location} ・ 경력무관
        </span>
      </div>

      <h2 className="font-semibold text-black-500 text-xl lg:text-3xl">
        {mock.title}
      </h2>
    </div>
  );
};

export default Page;
