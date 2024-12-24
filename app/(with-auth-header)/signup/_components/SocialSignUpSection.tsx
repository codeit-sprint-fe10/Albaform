import Image from 'next/image';

const SocialSignUpSection = () => {
  return (
    <section>
      <h2>SNS 계정으로 회원가입하기</h2>
      <div>
        <button>
          <Image
            src="/icons/google.svg"
            width={0}
            height={0}
            alt="구글 로그인"
          />
        </button>
        <button>
          <Image
            src="/icons/kakao.svg"
            width={0}
            height={0}
            alt="카카오 로그인"
          />
        </button>
      </div>
    </section>
  );
};

export default SocialSignUpSection;
