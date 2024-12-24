import Image from 'next/image';

type TermsDetailProps = {
  title: string;
  value: string;
  iconUrl: string;
};

const TermsDetail = ({ title, value, iconUrl }: TermsDetailProps) => {
  return (
    <div className="rounded-lg border border-line-100 p-2 flex gap-2">
      <div className="rounded-full w-9 h-9 bg-line-100 flex items-center justify-center">
        <Image
          src={iconUrl}
          alt="terms icon"
          width={13}
          height={13}
          className="lg:w-5 lg:h-5"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-black-100 font-regular text-xs">{title}</span>
        <span className="text-orange-300 font-semibold text-xs">{value}</span>
      </div>
    </div>
  );
};

export default TermsDetail;
