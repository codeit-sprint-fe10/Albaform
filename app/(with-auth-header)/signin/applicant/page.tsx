import Link from 'next/link';
import SignInFormSection from '../_components/SignInFormSection';
import SocialSignInSection from '../_components/SocialSignInSection';
import RoleNav from '@/components/RoleNav';

const SignInApplicantPage = () => {
  return (
    <>
      <section className="flex flex-col items-center text-center">
        <RoleNav isHeader={false} />
        <h1 className="mt-10 md:mt-0 mb-4 md:mb-6 lg:mb-8 text-2xl lg:text-3xl font-semibold">
          로그인
        </h1>
        <p className="text-xs md:text-md lg:text-xl text-black-100">
          아직 계정이 없으신가요?&nbsp;
          <Link
            href="/signup/applicant"
            replace
            className="text-black-400 font-semibold underline"
          >
            회원가입 하기
          </Link>
          <br />
          사장님 로그인은 사장님 전용 페이지에서 할 수 있습니다.
        </p>
      </section>
      <SignInFormSection />
      <SocialSignInSection />
    </>
  );
};

export default SignInApplicantPage;
