import { Alba } from '@/types/alba';
import { calculateDDay } from '@/utils/dDayCalculator';
import { formatDateWithSpace } from '@/utils/dateFormatter';

type ContactSectionProps = Pick<
  Alba,
  | 'recruitmentEndDate'
  | 'recruitmentStartDate'
  | 'storePhoneNumber'
  | 'phoneNumber'
>;

const ContactSection = ({
  recruitmentEndDate,
  recruitmentStartDate,
  storePhoneNumber,
  phoneNumber,
}: ContactSectionProps) => {
  return (
    <section className="lg:p-6 lg:bg-background-100 lg:rounded-lg lg:border border-line-100">
      <div className="border-b border-line-100 flex items-center justify-between py-3.5 font-regular text-xs lg:text-xl">
        <span className="text-black-100 ">
          모집기간
          <span className="ml-1.5 text-orange-300 font-semibold">{`D-${calculateDDay(recruitmentEndDate)}`}</span>
        </span>
        <span className="text-black-400 ">{`${formatDateWithSpace(recruitmentStartDate)} ~ ${formatDateWithSpace(recruitmentEndDate)}`}</span>
      </div>
      <div className="border-b border-line-100 flex items-center justify-between py-3.5 font-regular text-xs lg:text-xl">
        <span className="text-black-100 ">가게 전화번호</span>
        <span className="text-black-400 ">{storePhoneNumber}</span>
      </div>
      <div className="border-b border-line-100 flex items-center justify-between py-3.5 font-regular text-xs lg:text-xl lg:border-none">
        <span className="text-black-100 ">사장님 전화번호</span>
        <span className="text-black-400 ">{phoneNumber}</span>
      </div>
    </section>
  );
};

export default ContactSection;
