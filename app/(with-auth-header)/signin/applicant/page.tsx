import Link from 'next/link';
import SignInFormSection from '../_components/SignInFormSection';
import SocialSignInSection from '../_components/SocialSignInSection';

const SignInApplicantPage = () => {
  return (
    <main>
      <section>
        <h1>로그인</h1>
        <p>
          아직 계정이 없으신가요?
          <Link href="/signup/applicant" replace>
            회원가입 하기
          </Link>
          <br />
          사장님 로그인은 사장님 전용 페이지에서 할 수 있습니다.
        </p>
      </section>
      <SignInFormSection />
      <SocialSignInSection />
    </main>
  );
};

export default SignInApplicantPage;
