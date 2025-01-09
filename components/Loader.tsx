interface LoaderProps {
  className?: string;
}

const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={
          'w-10 lg:w-20 h-10 lg:h-20 rounded-full border-4 lg:border-8 ' +
          'border-orange-100 border-t-orange-300 animate-spin'
        }
      />
    </div>
  );
};

export default Loader;
