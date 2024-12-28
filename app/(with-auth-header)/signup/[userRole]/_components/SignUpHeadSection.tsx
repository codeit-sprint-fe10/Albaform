import Link from 'next/link';
import { signUp } from '@/constants/account';
import RoleNav from '@/components/RoleNav';
import { UserRoleLow } from '@/types/user';

interface SignUpHeadSectionProps {
  userRole: UserRoleLow;
}

const SignUpHeadSection = ({ userRole }: SignUpHeadSectionProps) => {
  return (
    <section className="flex flex-col items-center text-center">
      <RoleNav isHeader={false} />
      <h1 className="mt-10 md:mt-0 mb-4 md:mb-6 lg:mb-8 text-2xl lg:text-3xl font-semibold">
        회원가입
      </h1>
      <p className="text-xs md:text-md lg:text-xl text-black-100">
        {signUp[userRole].p1}
        <Link
          href={`/signin/${userRole}`}
          replace
          className="text-black-400 font-semibold underline"
        >
          로그인 하기
        </Link>
        <br />
        {signUp[userRole].p2}
      </p>
    </section>
  );
};
export default SignUpHeadSection;
