import TermsDetail from '@/app/(with-main-header)/alba/[formId]/_components/TermsDetail';
import { formatDate } from '@/utils/dateFormatter';
import { Recruitment } from '@/types/recruitment';

type SectionTermsProps = Pick<
  Recruitment,
  | 'hourlyWage'
  | 'workStartDate'
  | 'workEndDate'
  | 'isNegotiableWorkDays'
  | 'workDays'
  | 'workStartTime'
  | 'workEndTime'
>;

const TermsSection = ({
  hourlyWage,
  workStartDate,
  workEndDate,
  isNegotiableWorkDays,
  workDays,
  workStartTime,
  workEndTime,
}: SectionTermsProps) => {
  return (
    <section className="grid grid-rows-2 grid-cols-2 gap-2">
      <TermsDetail
        title="시급"
        value={hourlyWage.toLocaleString() + '원'}
        iconUrl={'/icons/money.svg'}
      />
      <TermsDetail
        title="기간"
        value={`${formatDate(workStartDate).slice(2)}~${formatDate(workEndDate).slice(2)}`}
        iconUrl={'/icons/calendar-clock.svg'}
      />
      <TermsDetail
        title="요일"
        value={isNegotiableWorkDays ? '협의가능' : workDays.join(', ')}
        iconUrl={'/icons/calendar.svg'}
      />
      <TermsDetail
        title="시간"
        value={`${workStartTime}~${workEndTime}`}
        iconUrl={'/icons/clock.svg'}
      />
    </section>
  );
};

export default TermsSection;
