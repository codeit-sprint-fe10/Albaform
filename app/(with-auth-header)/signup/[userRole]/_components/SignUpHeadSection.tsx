import Link from 'next/link';
import { SIGN_UP_SENTENCE } from '@/constants/account';
import RoleNav from '@/components/RoleNav';
import { UserRoleLowerCase } from '@/types/user';

interface SignUpHeadSectionProps {
  userRole: UserRoleLowerCase;
}

const SignUpHeadSection = ({ userRole }: SignUpHeadSectionProps) => {
  return (
    <section className="flex flex-col items-center text-center">
      <RoleNav isHeader={false} />
      <h1 className="mt-10 md:mt-0 mb-4 md:mb-6 lg:mb-8 text-2xl lg:text-3xl font-semibold">
        회원가입
      </h1>
      <p className="text-xs md:text-md lg:text-xl text-black-100">
        {SIGN_UP_SENTENCE[userRole][0]}
        <Link
          href={`/signin/${userRole}`}
          replace
          className="text-black-400 font-semibold underline"
        >
          로그인 하기
        </Link>
        <br />
        {SIGN_UP_SENTENCE[userRole][1]}
      </p>
    </section>
  );
};
export default SignUpHeadSection;
