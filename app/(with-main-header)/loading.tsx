import LogoIcon from '@/public/icons/logo.svg';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-dvh bg-background-100">
      <LogoIcon className="w-28 h-28 lg:w-40 lg:h-40 animate-ping" />
    </div>
  );
};

export default Loading;
