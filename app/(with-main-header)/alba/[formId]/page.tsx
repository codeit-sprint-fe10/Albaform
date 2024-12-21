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
        <span className="text-gray-500 font-regular text-xs">
          {formatFullDateTime(mock.createdAt)} 등록
        </span>
      </div>
    </div>
  );
};

export default Page;
