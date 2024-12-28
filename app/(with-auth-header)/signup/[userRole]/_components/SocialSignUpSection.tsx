import Image from 'next/image';

const SocialSignUpSection = () => {
  const lineStyle =
    "before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-20 lg:before:w-44 before:h-[1px] before:bg-gray-100 " +
    "after:content-[''] after:absolute after:right-0 after:top-1/2 after:w-20  lg:after:w-44 after:h-[1px] after:bg-gray-100";
  const buttonStyle =
    'flex items-center justify-center w-12 lg:w-[72px] h-12 lg:h-[72px] ' +
    'rounded-full border border-line-100 hover:shadow-md hover:shadow-orange-100 transition duration-200';

  return (
    <section>
      <h2
        className={`relative mb-6 lg:mb-10 text-center text-md lg:text-xl text-gray-300 ${lineStyle}`}
      >
        SNS 계정으로 회원가입하기
      </h2>
      <div className="flex justify-center gap-4 lg:gap-5">
        <button type="button" className={buttonStyle}>
          <Image
            src="/icons/google.svg"
            width={0}
            height={0}
            alt="구글 회원가입"
            className="w-[18px] h-[18px] lg:w-[27px] lg:h-[27px]"
          />
        </button>
        <button type="button" className={buttonStyle}>
          <Image
            src="/icons/kakao.svg"
            width={0}
            height={0}
            alt="카카오 회원가입"
            className="w-5 h-[18px] lg:w-[30px] lg:h-[27px]"
          />
        </button>
      </div>
    </section>
  );
};

export default SocialSignUpSection;
