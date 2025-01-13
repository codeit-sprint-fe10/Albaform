const AppliedCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 lg:gap-6 w-[375px] lg:w-[477px] border border-line-100 rounded-lg p-[23px] lg:py-[29px] ">
      <div className="flex h-[18px] lg:h-[26px] justify-between items-center">
        <div className="flex items-center h-full gap-4">
          <div className="w-[42px] lg:w-14 rounded h-full bg-background-300" />
          <div className="w-[94px] lg:w-[131px] h-full rounded bg-background-300" />
        </div>
        <div className="w-[55px] lg:w-[74px] h-full rounded bg-gray-100" />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2 lg:gap-3.5">
          <div className="bg-background-200 w-8 h-8 lg:w-12 lg:h-12 rounded-full" />
          <div className="w-8 h-[18px] lg:w-[42px] lg:h-[26px] rounded bg-gray-100" />
        </div>
        <div className="w-[218px] h-6 rounded lg:w-[311px] lg:h-8 bg-gray-100 mt-2 lg:mt-4 lg:mb-2" />
        <div className="w-[327px] h-[21px] lg:w-[427px] lg:h-[52px] rounded bg-background-300" />
      </div>
      <div className="flex items-center gap-2 h-7 lg:h-[38px]">
        <div className="w-[61px] lg:w-[84px] h-full rounded-[4px] bg-gray-100" />
        <div className="w-[50px] lg:w-[70px] h-full rounded-[4px] bg-gray-100" />
      </div>
    </div>
  );
};

export default AppliedCardSkeleton;
