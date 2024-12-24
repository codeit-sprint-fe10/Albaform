import ApplicantsAlert from '@/app/(with-main-header)/alba/[formId]/_components/ApplicantsAlert';
import { Recruitment } from '@/types/recruitment';

type SectionAlertProps = Pick<Recruitment, 'applyCount'>;

const AlertSection = ({ applyCount }: SectionAlertProps) => {
  return (
    <section className="fixed top-[60px] md:top-20 lg:top-[110px] left-1/2 transform -translate-x-1/2 z-50 w-[300px] lg:w-[1085px]">
      <ApplicantsAlert count={applyCount} />
    </section>
  );
};

export default AlertSection;
