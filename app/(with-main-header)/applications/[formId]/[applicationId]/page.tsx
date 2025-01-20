import { getAlbaDetail } from '@/services/alba';
import Carousel from '@/app/(with-main-header)/alba/[formId]/_components/Carousel';
import SummarySection from '@/app/(with-main-header)/alba/[formId]/_components/SummarySection';
import DescriptionSection from '@/app/(with-main-header)/alba/[formId]/_components/DescriptionSection';
import ApplicationStatusSection from '@/app/(with-main-header)/applications/[formId]/[applicationId]/_components/ApplicationStatusSection';
import ApplicationDetail from '@/app/(with-main-header)/applications/[formId]/[applicationId]/_components/ApplicationDetail';

const ApplicationPage = async ({
  params,
}: {
  params: Promise<{ applicationId: number; formId: number }>;
}) => {
  const { applicationId, formId } = await params;
  const albaDetail = await getAlbaDetail(formId);

  return (
    <div>
      {albaDetail.imageUrls?.length > 0 && (
        <div className="-mx-6 md:-mx-[72px] xl:mx-0 flex justify-center">
          <div className="w-full hidden lg:block">
            <Carousel imageUrls={albaDetail.imageUrls} />
          </div>
        </div>
      )}
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
                formId={formId}
                applicationId={applicationId}
              />
            </div>
          </div>
        </div>
      </div>
      <section className="relative mt-10 before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:w-screen before:h-2 before:bg-line-100">
        <div className="lg:w-[45%]">
          <ApplicationDetail applicationId={applicationId} />
        </div>
      </section>
    </div>
  );
};

export default ApplicationPage;
