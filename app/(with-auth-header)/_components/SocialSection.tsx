import Link from 'next/link';
import Image from 'next/image';
import { OAUTH_KAKAO_URL } from '@/constants/api';
import { UserRoleLowerCase } from '@/types/user';

interface SocialSectionProps {
  userRole: UserRoleLowerCase;
  type: '로그인' | '회원가입';
}

const SocialSection = ({ userRole, type }: SocialSectionProps) => {
  const lineStyle =
    "before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-20 lg:before:w-44 before:h-[1px] before:bg-gray-100 " +
    "after:content-[''] after:absolute after:right-0 after:top-1/2 after:w-20  lg:after:w-44 after:h-[1px] after:bg-gray-100";
  const linkStyle =
    'flex items-center justify-center w-12 lg:w-[72px] h-12 lg:h-[72px] ' +
    'rounded-full border border-line-100 hover:shadow-md hover:shadow-orange-100 transition duration-200';

  return (
    <section>
      <h2
        className={`relative mb-6 lg:mb-10 text-center text-md lg:text-xl text-gray-300 ${lineStyle}`}
      >
        {`SNS 계정으로 ${type}하기`}
      </h2>
      <div className="flex justify-center gap-4 lg:gap-5">
        <Link href="" className={linkStyle}>
          <Image
            src="/icons/google.svg"
            width={18}
            height={18}
            alt={`구글 ${type}`}
            className="lg:w-[27px] lg:h-[27px]"
          />
        </Link>
        <Link
          href={`${OAUTH_KAKAO_URL}&state=${userRole}`}
          className={linkStyle}
        >
          <Image
            src="/icons/kakao.svg"
            width={20}
            height={18}
            alt={`카카오 ${type}`}
            className="lg:w-[30px] lg:h-[27px]"
          />
        </Link>
      </div>
    </section>
  );
};

export default SocialSection;
