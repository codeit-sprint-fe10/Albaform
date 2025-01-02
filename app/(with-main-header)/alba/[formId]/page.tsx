import Requirements from '@/app/(with-main-header)/alba/[formId]/_components/Requirements';
import Location from '@/app/(with-main-header)/alba/[formId]/_components/Location';
import SummarySection from '@/app/(with-main-header)/alba/[formId]/_components/SummarySection';
import TermsSection from '@/app/(with-main-header)/alba/[formId]/_components/TermsSection';
import ContactSection from '@/app/(with-main-header)/alba/[formId]/_components/ContactSection';
import AlertSection from '@/app/(with-main-header)/alba/[formId]/_components/AlertSection';
import DescriptionSection from '@/app/(with-main-header)/alba/[formId]/_components/DescriptionSection';
import FloatingActions from '@/app/(with-main-header)/alba/[formId]/_components/FloatingActions';
import ApplicationActions from '@/app/(with-main-header)/alba/[formId]/_components/ApplicationActions';
import Carousel from '@/app/(with-main-header)/alba/[formId]/_components/Carousel';
import { getAlbaDetail } from '@/services/alba';

const AlbaFormIdPage = async ({
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
        <div className="flex flex-col lg:flex-row justify-between lg:gap-36">
          <div className="lg:basis-1/2">
            <div>
              <AlertSection applyCount={albaDetail.applyCount} />
              <div>
                <SummarySection {...albaDetail} />
              </div>
              <div className="mt-8 md:mt-10 lg:hidden">
                <TermsSection {...albaDetail} />
              </div>
              <div className="mt-8 lg:hidden">
                <ContactSection {...albaDetail} />
              </div>
              <div className="mt-8">
                <DescriptionSection description={albaDetail.description} />
              </div>
            </div>
            <div className="mt-8">
              <Location location={albaDetail.location} />
            </div>
            <FloatingActions isScrapped={albaDetail.isScrapped} id={formId} />
          </div>
          <div className="lg:basis-1/2">
            <div className="lg:flex flex-col">
              <div className="hidden lg:block">
                <TermsSection {...albaDetail} />
              </div>
              <div className="hidden mt-8 lg:block">
                <ContactSection {...albaDetail} />
              </div>
              <div className="mt-8 lg:order-2">
                <Requirements {...albaDetail} />
              </div>
              <div className="mt-10 mb-[30px] lg:order-1">
                <ApplicationActions formId={formId} />
              </div>
              {/*<div>*/}
              {/*  <OwnerSection formId={formId} />*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbaFormIdPage;
