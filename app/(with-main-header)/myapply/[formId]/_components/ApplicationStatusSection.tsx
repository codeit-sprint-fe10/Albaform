import { Application, applicationStatus } from '@/types/application';
import { formatDateTimeWithLetters } from '@/utils/dateFormatter';

type ApplicationStatusSectionProps = Pick<Application, 'createdAt' | 'status'>;

const ApplicationStatusSection = ({
  createdAt,
  status,
}: ApplicationStatusSectionProps) => {
  return (
    <section className="font-regular text-md text-black-400 lg:text-xl lg:p-6 lg:bg-background-100 lg:rounded-lg lg:border lg:border-line-100">
      <p className="flex justify-between items-center py-4 border-b border-line-100">
        <span className="text-black-100">지원일시</span>
        <span>{formatDateTimeWithLetters(createdAt)}</span>
      </p>
      <p className="flex justify-between items-center py-4 border-b border-line-100 lg:border-none">
        <span className="text-black-100">진행상태</span>
        <span>{applicationStatus[status]}</span>
      </p>
    </section>
  );
};

export default ApplicationStatusSection;
