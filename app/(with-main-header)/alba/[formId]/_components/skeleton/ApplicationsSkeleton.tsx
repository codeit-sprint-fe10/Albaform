const ApplicationsSkeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-4 border-b border-line-100 py-6 animate-pulse">
      <div className="w-14 h-6 bg-gray-200 rounded-md"></div>
      <div className="w-24 h-6 bg-gray-200 rounded-md"></div>
      <div className="w-20 h-6 bg-gray-200 rounded-md"></div>
      <div className="w-10 h-6 bg-gray-200 rounded-md"></div>
    </div>
  );
};

export default ApplicationsSkeleton;
