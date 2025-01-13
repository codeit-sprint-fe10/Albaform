'use client';

const ScrapCardSkeleton = () => {
  const rightBarStyle =
    'after:absolute after:top-1/2 after:-translate-y-1/2 after:right-0 after:w-[1px] after:h-3.5 after:bg-line-100';

  return (
    <div className="w-full lg:max-w-[477px] relative animate-pulse">
      <div className="lg:w-[384px] lg:h-[304px] aspect-video rounded-xl lg:rounded-2xl bg-gray-200 mb-6" />
      <div className="flex justify-between items-center mb-4 lg:mb-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-6 bg-gray-200 rounded-md" />
          <div className="w-12 h-6 bg-gray-200 rounded-md" />
          <div className="w-32 h-4 bg-gray-200 rounded-md lg:ml-3" />
        </div>
      </div>
      <div className="h-[52px] lg:h-16 bg-gray-200 rounded-md mb-6 lg:mb-8" />
      <div className="flex border border-line-100 rounded-xl lg:rounded-2xl font-regular text-xs lg:text-lg text-black-200 py-2.5 lg:py-3">
        <div
          className={`relative flex-1 flex justify-center bg-gray-200 rounded-md h-4 lg:h-6 ${rightBarStyle}`}
        />
        <div
          className={`relative flex-1 flex justify-center bg-gray-200 rounded-md h-4 lg:h-6 ${rightBarStyle}`}
        />
        <div className="flex-1 flex justify-center bg-gray-200 rounded-md h-4 lg:h-6" />
      </div>
    </div>
  );
};

export default ScrapCardSkeleton;
