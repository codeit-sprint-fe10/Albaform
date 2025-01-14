type ChipProps = {
  value: string;
};

const Badge = ({ value }: ChipProps) => {
  return (
    <span className="rounded-[4px] text-orange-300 bg-orange-50 font-semibold text-xs md:text-md lg:text-lg px-2 py-1 md:px-2.5 lg:px-3 lg:py-1.5">
      {value}
    </span>
  );
};

export default Badge;
