const AlbatalkCardSkeleton = () => {
  return (
    <div className="relative w-full h-[210px] lg:h-[280px] p-6 border rounded-2xl bg-gray-100 animate-pulse">
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col gap-4 justify-center">
          <div className="flex justify-between">
            <div className="w-3/4 h-6 bg-gray-200 rounded-md" />

            <div className="w-6 bg-gray-200 rounded-md" />
          </div>

          <div className="w-full h-[70px] lg:h-[120px] bg-gray-200 rounded-md" />
        </div>

        <div className="flex h-6 justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-300" />

            <div className="w-10 lg:w-12 h-6 bg-gray-200 rounded-md" />

            <span className="text-gray-200">|</span>

            <div className="w-10 lg:w-14 h-6 bg-gray-200 rounded-md" />
          </div>

          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-200 rounded-md" />

              <div className="w-6 h-6 lg:w-8 lg:h-6 bg-gray-200 rounded-md" />
            </div>

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-200 rounded-md" />

              <div className="w-8 h-6 bg-gray-200 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbatalkCardSkeleton;
