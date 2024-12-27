import Link from 'next/link';
import SignUpFormSection from '../_components/SignUpFormSection';
import SocialSignUpSection from '../_components/SocialSignUpSection';
import RoleNav from '@/components/RoleNav';

const SignUpApplicantPage = () => {
  return (
    <>
      <section className="flex flex-col items-center text-center">
        <RoleNav isHeader={false} />
        <h1 className="mt-10 md:mt-0 mb-4 md:mb-6 lg:mb-8 text-2xl lg:text-3xl font-semibold">
          회원가입
        </h1>
        <p className="text-xs md:text-md lg:text-xl text-black-100">
          이미 계정이 있으신가요?&nbsp;
          <Link
            href="/signin/applicant"
            replace
            className="text-black-400 font-semibold underline"
          >
            로그인 하기
          </Link>
          <br />
          사장님 회원가입은 사장님 전용 페이지에서 할 수 있습니다.
        </p>
      </section>
      <SignUpFormSection />
      <span className="text-center text-xs lg:text-lg text-black-100">
        가입 시&nbsp;
        <Link
          href="/"
          replace
          className="text-orange-300 font-semibold underline"
        >
          이용약관
        </Link>
        에 동의한 것으로 간주됩니다.
      </span>
      <SocialSignUpSection />
    </>
  );
};

export default SignUpApplicantPage;
