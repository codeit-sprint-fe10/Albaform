import Image from 'next/image';

type TermsDetailProps = {
  title: string;
  value: string;
  iconUrl: string;
};

const TermsDetail = ({ title, value, iconUrl }: TermsDetailProps) => {
  return (
    <div className="rounded-lg border border-line-100 lg:border-none p-2 lg:p-6 flex gap-2 lg:gap-6">
      <div className="rounded-full w-9 h-9 bg-line-100 flex items-center justify-center lg:w-[56px] lg:h-[56px]">
        <Image
          src={iconUrl}
          alt="terms icon"
          width={13}
          height={13}
          className="lg:w-5 lg:h-5"
        />
      </div>
      <div className="flex flex-col text-xs lg:text-xl">
        <span className="text-black-100 font-regular">{title}</span>
        <span className="text-orange-300 font-semibold">{value}</span>
      </div>
    </div>
  );
};

export default TermsDetail;
