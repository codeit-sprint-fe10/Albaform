import TermsDetail from '@/app/(with-main-header)/alba/[formId]/_components/TermsDetail';
import { formatDate } from '@/utils/dateFormatter';
import { Alba } from '@/types/alba';

type TermsSectionProps = Pick<
  Alba,
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
}: TermsSectionProps) => {
  return (
    <section className="grid grid-rows-2 grid-cols-2 gap-2 lg:gap-0 lg:rounded-lg lg:bg-background-100 lg:border lg:border-line-100 lg:p-6">
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
