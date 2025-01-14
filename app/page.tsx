import Image from 'next/image';
import Link from 'next/link';
import MainHeader from '@/components/MainHeader';
import AnimatedItem from '@/components/AnimatedItem';
import mainImage from '@/public/images/landing-main.png';
import card0101Image from '@/public/images/landing-card-0101.png';
import card0102Image from '@/public/images/landing-card-0102.png';
import card0201Image from '@/public/images/landing-card-0201.png';
import card0202Image from '@/public/images/landing-card-0202.png';
import card0301Image from '@/public/images/landing-card-0301.png';
import card0302Image from '@/public/images/landing-card-0302.png';
import card0401Image from '@/public/images/landing-card-0401.png';
import card0402Image from '@/public/images/landing-card-0402.png';

const LandingPage = () => {
  const cardStyle =
    'flex flex-col md:flex-row justify-between w-full max-w-[1140px] h-[80dvh] max-h-[344px] md:max-h-80 lg:max-h-[640px] rounded-2xl pt-6 pl-6 md:pt-9 md:pl-9 lg:pl-[70px] lg:pt-[73px]';

  return (
    <>
      <div className="fixed top-0 w-full border-b border-solid border-line-100 bg-gray-50 z-50">
        <div className="px-6 md:px-[72px] lg:max-w-container m-auto">
          <MainHeader />
        </div>
      </div>
      <main className="bg-gray-50 mt-[50px] md:mt-[68px] lg:mt-[92px] overflow-hidden">
        <section className="bg-black-400 h-[calc(100dvh-50px)] md:h-[calc(100dvh-68px)] lg:h-[calc(100dvh-92px)] ">
          <div className="flex flex-col justify-end items-center w-[386px] h-full lg:w-[964px] mx-auto ">
            <AnimatedItem
              delay={100}
              direction="bottom"
              className="m-6 lg:mb-8"
            >
              <Image
                src="/icons/albaform.svg"
                alt="albaform text logo"
                width={124}
                height={24}
                className="lg:w-[248px] lg:h-12"
              />
            </AnimatedItem>
            <AnimatedItem
              delay={100}
              direction="bottom"
              className="mb-12 lg:mb-10"
            >
              <p className="font-regular text-xl lg:text-4xl text-gray-50">
                한 곳에서 관리하는 알바 구인 플랫폼
              </p>
            </AnimatedItem>
            <AnimatedItem
              delay={200}
              direction="bottom"
              className="mb-[43px] lg:mb-[30px]"
            >
              <Link
                href="/albalist"
                className="bg-blue-300 rounded-full font-bold text-lg lg:text-2xl text-gray-50 py-4 px-6 lg:py-6 lg:px-9"
              >
                알바폼 시작하기
              </Link>
            </AnimatedItem>
            <AnimatedItem delay={300} direction="bottom">
              <div className="relative w-[100dvh] h-[30dvh] lg:h-[40dvh]">
                <Image
                  src={mainImage}
                  alt="메인 이미지"
                  fill
                  quality={100}
                  className="object-contain object-bottom"
                />
              </div>
            </AnimatedItem>
          </div>
        </section>
        <section className="max-w-[1140px] px-6 md:px-[87px] lg:px-0 mx-auto">
          <div className="flex justify-center items-center h-dvh">
            <div className={`${cardStyle} bg-blue-50`}>
              <div>
                <AnimatedItem delay={200} direction="left">
                  <h3 className="font-bold text-xl md:text-2xl lg:text-[48px] lg:leading-[58px] text-blue-80 mb-2 md:mb-5 lg:mb-10 whitespace-nowrap">
                    어디서든 지원받으세요
                  </h3>
                </AnimatedItem>
                <AnimatedItem delay={300} direction="left">
                  <p className="text-blue-60 lg:text-[28px] lg:leading-[46px] whitespace-nowrap">
                    다양한 사이트, SNS, 문자까지
                    <br />
                    언제 어디서든 알바생을 구해보세요.
                  </p>
                </AnimatedItem>
              </div>
              <div className="relative flex justify-end md:justify-normal md:items-end pr-2">
                <div className="absolute bottom-5 right-52 md:bottom-24 md:right-full lg:bottom-36 z-10">
                  <AnimatedItem delay={300} direction="top">
                    <div className="relative w-[73px] h-[120px] md:w-[91px] md:h-[150px] lg:w-[182px] lg:h-[299px]">
                      <Image
                        src={card0102Image}
                        fill
                        alt="card image"
                        quality={100}
                      />
                    </div>
                  </AnimatedItem>
                </div>
                <AnimatedItem delay={100} direction="right">
                  <div className="relative w-[203px] h-[223px] lg:w-[372px] lg:h-[416px] ">
                    <Image
                      src={card0101Image}
                      fill
                      alt="card image"
                      quality={100}
                    />
                  </div>
                </AnimatedItem>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center h-dvh">
            <div className={`${cardStyle} bg-blue-70`}>
              <div>
                <AnimatedItem delay={200} direction="left">
                  <h3 className="font-bold text-xl md:text-2xl lg:text-[48px] lg:leading-[58px] text-gray-50 mb-2 md:mb-5 lg:mb-10 whitespace-nowrap">
                    쉽고 빨라요
                  </h3>
                </AnimatedItem>
                <AnimatedItem delay={300} direction="left">
                  <p className="text-gray-100 lg:text-[28px] lg:leading-[46px] whitespace-nowrap">
                    1분만에 알바폼을 만들어 보세요!
                    <br />
                    링크를 복사하여 어디서든지 사용하세요.
                  </p>
                </AnimatedItem>
              </div>
              <div className="relative flex justify-end md:justify-normal md:items-end">
                <div className="absolute bottom-1 right-0 md:bottom-14 md:right-2 lg:bottom-5 z-10">
                  <AnimatedItem delay={500} direction="right">
                    <div className="relative w-[247px] h-[203px] md:w-[325px] md:y-[248px] lg:w-[651px] lg:h-[496px]">
                      <Image
                        src={card0202Image}
                        fill
                        alt="card image"
                        quality={100}
                      />
                    </div>
                  </AnimatedItem>
                </div>
                <AnimatedItem delay={100} direction="right">
                  <div className="relative w-[220px] h-[196px] md:w-[267px] md:h-[232px] lg:w-[533px] lg:h-[463px]">
                    <Image
                      src={card0201Image}
                      fill
                      alt="card image"
                      quality={100}
                    />
                  </div>
                </AnimatedItem>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center h-dvh">
            <div className={`${cardStyle} bg-orange-50`}>
              <div>
                <AnimatedItem delay={200} direction="left">
                  <h3 className="font-bold text-xl md:text-2xl lg:text-[48px] lg:leading-[58px] text-orange-300 mb-2 md:mb-5 lg:mb-10 whitespace-nowrap">
                    한 곳에서 쉽게 관리하세요
                  </h3>
                </AnimatedItem>
                <AnimatedItem delay={300} direction="left">
                  <p className="text-orange-100 lg:text-[28px] lg:leading-[46px] whitespace-nowrap">
                    알바폼 관리 페이지에서
                    <br />
                    지원 현황을 확인하고
                    <br />
                    지원자별 상태를 관리할 수 있습니다.
                  </p>
                </AnimatedItem>
              </div>
              <div className="relative flex justify-end md:justify-normal md:items-end pr-4">
                <div className="absolute bottom-20 right-11 md:bottom-24 md:right-12 lg:bottom-40 lg:right-24 z-10">
                  <AnimatedItem delay={300} direction="top">
                    <div className="relative w-[170px] h-[65px] md:w-[215px] md:h-[81px] lg:w-[430px] lg:h-[162px]">
                      <Image
                        src={card0302Image}
                        fill
                        alt="card image"
                        quality={100}
                      />
                    </div>
                  </AnimatedItem>
                </div>
                <AnimatedItem delay={100} direction="right">
                  <div className="relative w-[180px] h-[188px] md:w-[225px] md:h-[235px] lg:w-[449px] lg:h-[470px]">
                    <Image
                      src={card0301Image}
                      fill
                      alt="card image"
                      quality={100}
                    />
                  </div>
                </AnimatedItem>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center h-dvh">
            <div className={`${cardStyle} bg-orange-300`}>
              <div>
                <AnimatedItem delay={200} direction="left">
                  <h3 className="font-bold text-xl md:text-2xl lg:text-[48px] lg:leading-[58px] text-orange-50 mb-2 md:mb-5 lg:mb-10 whitespace-nowrap">
                    쉽고 빠르게 알바 지원
                  </h3>
                </AnimatedItem>
                <AnimatedItem delay={300} direction="left">
                  <p className="text-orange-50 lg:text-[28px] lg:leading-[46px] whitespace-nowrap">
                    간단한 정보만 입력해도
                    <br />
                    알바 지원 가능합니다.
                  </p>
                </AnimatedItem>
              </div>
              <div className="relative flex justify-end md:justify-normal md:items-end pr-6">
                <div className="absolute bottom-36 right-16 md:bottom-48 md:right-20 lg:bottom-96 lg:right-32 z-10">
                  <AnimatedItem delay={200} direction="top">
                    <div className="relative w-[133px] h-[50px] md:w-[166px] md:h-[62px] lg:w-[332px] lg:h-[125px]">
                      <Image
                        src={card0402Image}
                        fill
                        alt="card image"
                        quality={100}
                      />
                    </div>
                  </AnimatedItem>
                </div>
                <AnimatedItem delay={200} direction="right">
                  <div className="relative w-[222px] h-[144px] md:w-[278px] md:h-[180px] lg:w-[555px] lg:h-[360px]">
                    <Image
                      src={card0401Image}
                      fill
                      alt="card image"
                      quality={100}
                    />
                  </div>
                </AnimatedItem>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center h-dvh">
            <div className="flex flex-col justify-center items-center">
              <AnimatedItem delay={100} direction="bottom">
                <p className="font-bold text-2xl md:text-3xl lg:text-[48px] lg:leading-[68px] text-black-400 text-center mb-14 lg:mb-20">
                  한 곳에서 관리하는
                  <br />
                  알바 구인 플랫폼
                </p>
              </AnimatedItem>
              <AnimatedItem delay={200} direction="bottom">
                <Link
                  href="/albalist"
                  className="bg-blue-300 rounded-full font-bold text-lg lg:text-2xl text-gray-50 py-4 px-6 lg:py-6 lg:px-9 mb-[43px] lg:mb-[30px]"
                >
                  알바폼 시작하기
                </Link>
              </AnimatedItem>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default LandingPage;
