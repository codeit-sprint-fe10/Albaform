const WritingChip = ({ isSelected }: { isSelected: boolean }) => {
  const selectedStyle = isSelected
    ? 'border-gray-50 bg-orange-200 text-gray-50'
    : 'border-gray-100 bg-background-100 text-gray-300';

  return (
    <div
      className={`border rounded-[100px] font-semibold lg:font-bold text-2sm lg:text-lg py-[3px] px-[7px] lg:py-[5px] lg:px-[11px] ${selectedStyle}`}
    >
      작성중
    </div>
  );
};

export default WritingChip;
