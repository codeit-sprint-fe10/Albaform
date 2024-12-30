import type { ReactNode } from 'react';
import Script from 'next/script';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="lazyOnload"
      />
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services&autoload=false`}
        strategy="lazyOnload"
      />
      {children}
    </>
  );
};

export default Layout;
