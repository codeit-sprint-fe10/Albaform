import Link from 'next/link';
import { signIn } from '@/constants/account';
import RoleNav from '@/components/RoleNav';
import { UserRoleLow } from '@/types/user';

interface SignInHeadSectionProps {
  userRole: UserRoleLow;
}

const SignInHeadSection = ({ userRole }: SignInHeadSectionProps) => {
  return (
    <section className="flex flex-col items-center text-center">
      <RoleNav isHeader={false} />
      <h1 className="mt-10 md:mt-0 mb-4 md:mb-6 lg:mb-8 text-2xl lg:text-3xl font-semibold">
        로그인
      </h1>
      <p className="text-xs md:text-md lg:text-xl text-black-100">
        {signIn[userRole].p1}
        <Link
          href={`/signup/${userRole}`}
          replace
          className="text-black-400 font-semibold underline"
        >
          회원가입 하기
        </Link>
        <br />
        {signIn[userRole].p2}
      </p>
    </section>
  );
};
export default SignInHeadSection;
