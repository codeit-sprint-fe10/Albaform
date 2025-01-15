const CommentCardSkeleton = () => {
  return (
    <div className="relative w-full h-[210px] md:h-[184px] lg:h-[264px] p-6 border rounded-2xl bg-gray-100 animate-pulse">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-4 h-[84px] border-b md:h-[64px] lg:h-[116px]">
          <div className="flex gap-[10px] items-center">
            <div className="w-4 h-4 bg-gray-200 rounded-full" />
            <div className="w-3/4 h-4 bg-gray-200 rounded-md" />
          </div>
          <div className="h-10 bg-gray-200 rounded-md md:h-[18px] lg:h-[50px]" />
        </div>

        <div className="flex flex-col justify-between h-[68px] md:h-[62px] lg:h-[84px]">
          <div className="w-3/4 h-6 bg-gray-200 rounded-md lg:h-8" />
          <div className="w-1/4 h-4 bg-gray-200 rounded-md lg:h-6" />
        </div>
      </div>
    </div>
  );
};

export default CommentCardSkeleton;
