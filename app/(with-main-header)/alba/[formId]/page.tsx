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
import RecruitmentClosedModal from '@/app/(with-main-header)/alba/[formId]/_components/RecruitmentClosedModal';
import { isBeforeToday } from '@/utils/date';
import OwnerSection from '@/app/(with-main-header)/alba/[formId]/_components/OwnerSection';
import WithFormIdValidation from '@/components/WithFormIdValidation';

const AlbaFormIdPage = async ({ formId }: { formId: number }) => {
  const albaDetail = await getAlbaDetail(formId);

  return (
    <div>
      {albaDetail.imageUrls?.length > 0 && (
        <div className="-mx-6 md:-mx-[72px] xl:mx-0 flex justify-center">
          <div className="w-full">
            <Carousel imageUrls={albaDetail.imageUrls} />
          </div>
        </div>
      )}
      <div className="relative mt-8 md:mt-[100px]">
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
            <FloatingActions {...albaDetail} id={formId} />
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
            </div>
          </div>
        </div>
      </div>
      <OwnerSection formId={formId} />
      {isBeforeToday(albaDetail.recruitmentEndDate) && (
        <RecruitmentClosedModal />
      )}
    </div>
  );
};

export default WithFormIdValidation(AlbaFormIdPage);
