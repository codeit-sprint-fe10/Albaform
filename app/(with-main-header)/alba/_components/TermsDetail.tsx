import Image from 'next/image';

type TermsDetailProps = {
  title: string;
  value: string;
  iconUrl: string;
};

const TermsDetail = ({ title, value, iconUrl }: TermsDetailProps) => {
  return (
    <div className="rounded-[8px] border border-line-100 p-[8px] flex gap-[8px]">
      <div className="rounded-full w-[36px] h-[36px] bg-line-100 flex items-center justify-center">
        <div className="relative w-[13px] h-[13px] lg:w-[21px] lg:h-[21px]">
          <Image src={iconUrl} alt="terms icon" fill />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-black-100 font-regular text-xs">{title}</span>
        <span className="text-orange-300 font-semibold text-xs">{value}</span>
      </div>
    </div>
  );
};

export default TermsDetail;
