interface AlbaCardSkeletonProps {
  isPulse?: boolean;
}

const AlbaCardSkeleton = ({ isPulse = true }: AlbaCardSkeletonProps) => {
  const pulseStyle = isPulse ? 'animate-pulse' : '';
  return (
    <div
      className={
        'flex flex-col gap-3 lg:gap-6 rounded-xl lg:rounded-2xl ' + pulseStyle
      }
    >
      <div className="w-full aspect-[3/2] rounded-xl lg:rounded-2xl bg-gray-100 " />
      <div className="flex items-center gap-2 lg:gap-3 h-8 lg:h-[38px] px-1">
        <div className="w-9 h-full rounded bg-gray-100" />
        <div className="w-12 h-full rounded bg-gray-100" />
        <div className="w-[174px] lg:w-[200px] rounded h-6 bg-background-300" />
      </div>
      <div className="px-1">
        <div className={'w-full h-[22px] lg:h-7 mb-2 rounded bg-gray-100'} />
        <div className={'w-1/3 h-[22px] lg:h-7 rounded bg-background-300'} />
      </div>
      <div
        className={
          'flex items-center justify-around h-[40px] lg:h-[60px] ' +
          'rounded-xl lg:rounded-2xl border border-gray-100'
        }
      >
        <div className="w-12 lg:w-16 h-4 lg:h-6 rounded bg-background-300" />
        <div className="w-12 lg:w-16 h-4 lg:h-6 rounded bg-background-300" />
        <div className="w-12 lg:w-16 h-4 lg:h-6 rounded bg-background-300" />
      </div>
    </div>
  );
};

export default AlbaCardSkeleton;
