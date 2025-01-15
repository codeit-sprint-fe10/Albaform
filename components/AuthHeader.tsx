import Link from 'next/link';
import Image from 'next/image';
import RoleNav from './RoleNav';

const AuthHeader = () => {
  const headerStyle =
    'fixed top-0 z-50 flex items-center justify-center md:justify-between ' +
    'w-full h-[54px] md:h-[60px] lg:h-[88px] md:px-[max(72px,calc((100%-1600px)/2))] ' +
    'bg-gray-50 border-b border-line-100';

  return (
    <header className={headerStyle}>
      <Link
        href="/"
        replace
        className="flex items-center gap-2"
        aria-label="랜딩 페이지 바로가기"
      >
        <Image
          src="/icons/logo.svg"
          width={0}
          height={0}
          alt="알바폼 로고"
          className="w-[45px] lg:w-15 h-[30px] lg:h-10"
        />
        <Image
          src="/icons/albaform.svg"
          width={0}
          height={0}
          alt="알바폼 문자 로고"
          className="w-[122px] lg:w-[212px] h-[21px] lg:h-9"
        />
      </Link>
      <RoleNav isHeader={true} />
    </header>
  );
};

export default AuthHeader;
