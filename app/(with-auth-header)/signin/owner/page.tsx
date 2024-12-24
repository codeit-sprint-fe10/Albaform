import Link from 'next/link';
import SignInFormSection from '../_components/SignInFormSection';
import SocialSignInSection from '../_components/SocialSignInSection';

const SignInOwnerPage = () => {
  return (
    <main>
      <section>
        <h1>로그인</h1>
        <p>
          사장님 계정이 없으신가요?
          <Link href="/signup/owner" replace>
            회원가입 하기
          </Link>
          <br />
          지원자 로그인은 지원자 전용 페이지에서 할 수 있습니다.
        </p>
      </section>
      <SignInFormSection />
      <SocialSignInSection />
    </main>
  );
};

export default SignInOwnerPage;
