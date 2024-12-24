import Link from 'next/link';
import SignUpFormSection from '../_components/SignUpFormSection';
import SocialSignUpSection from '../_components/SocialSignUpSection';

const SignUpOwnerPage = () => {
  return (
    <main>
      <section>
        <h1>회원가입</h1>
        <p>
          이미 사장님 계정이 있으신가요?
          <Link href="/signin/owner" replace>
            로그인 하기
          </Link>
          <br />
          지원자 회원가입은 지원자 전용 페이지에서 할 수 있습니다.
        </p>
      </section>
      <SignUpFormSection />
      <span>
        가입 시
        <Link href="/" replace>
          이용약관
        </Link>
        에 동의한 것으로 간주됩니다.
      </span>
      <SocialSignUpSection />
    </main>
  );
};

export default SignUpOwnerPage;
