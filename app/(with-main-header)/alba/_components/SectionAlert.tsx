import ApplicantsAlert from '@/app/(with-main-header)/alba/_components/ApplicantsAlert';
import { Recruitment } from '@/types/recruitment';

type SectionAlertProps = Pick<Recruitment, 'applyCount'>;

const SectionAlert = ({ applyCount }: SectionAlertProps) => {
  return (
    <section className="fixed top-[60px] md:top-[80px] lg:top-[110px] left-1/2 transform -translate-x-1/2 z-50 w-[300px] lg:w-[1085px]">
      <ApplicantsAlert count={applyCount} />
    </section>
  );
};

export default SectionAlert;
