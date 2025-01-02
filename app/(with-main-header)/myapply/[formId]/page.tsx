import { getAlbaDetail } from '@/services/alba';
import Carousel from '@/app/(with-main-header)/alba/[formId]/_components/Carousel';
import SummarySection from '@/app/(with-main-header)/alba/[formId]/_components/SummarySection';
import DescriptionSection from '@/app/(with-main-header)/alba/[formId]/_components/DescriptionSection';
import ApplicationStatusSection from '@/app/(with-main-header)/myapply/[formId]/_components/ApplicationStatusSection';
import { ApplicationStatusType } from '@/types/application';

const mock = {
  applicantId: 0,
  updatedAt: '2025-01-02T07:06:16.590Z',
  createdAt: '2025-01-02T07:06:16.590Z',
  status: 'REJECTED',
  introduction: 'introduction',
  resumeName: 'resumeName',
  resumeId: 266,
  experienceMonths: 13,
  phoneNumber: '01044448888',
  name: '김희진',
  id: 0,
};

const MyApplyPage = async ({
  params,
}: {
  params: Promise<{ formId: number }>;
}) => {
  const { formId } = await params;
  const albaDetail = await getAlbaDetail(formId);

  return (
    <div>
      <div className="-mx-6 md:-mx-[72px] xl:mx-0 flex justify-center">
        {albaDetail.imageUrls?.length && (
          <div className="w-full">
            <Carousel imageUrls={albaDetail.imageUrls} />
          </div>
        )}
      </div>
      <div className="relative mt-8 md:mt-[80px]">
        <div className="lg:hidden font-semibold text-black-500 text-xl ">
          <h2>{albaDetail.title}</h2>
        </div>
        <div className="lg:flex flex-col lg:flex-row justify-between lg:gap-36">
          <div className="hidden lg:block lg:basis-1/2">
            <div>
              <div>
                <SummarySection {...albaDetail} />
              </div>
              <div className="mt-8">
                <DescriptionSection description={albaDetail.description} />
              </div>
            </div>
          </div>
          <div className="lg:basis-1/2">
            <div className="mt-10 lg:mt-0">
              <ApplicationStatusSection
                createdAt={mock.createdAt}
                status={mock.status as ApplicationStatusType}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyApplyPage;
