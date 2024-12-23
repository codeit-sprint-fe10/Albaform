type ChipProps = {
  value: string;
};

const Badge = ({ value }: ChipProps) => {
  return (
    <span className="rounded-[4px] text-orange-300 bg-orange-50 font-semibold text-xs md:text-md lg:text-lg px-[8px] py-[4px] md:px-[10px] lg:px-[12px] lg:py-[6px]">
      {value}
    </span>
  );
};

export default Badge;
