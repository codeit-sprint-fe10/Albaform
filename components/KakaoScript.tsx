'use client';

import Script from 'next/script';
import React from 'react';

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      Share: {
        sendDefault: (option: {
          objectType: string;
          content: {
            title: string;
            description: string;
            imageUrl: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          };
        }) => void;
      };
    };
  }
}

const KakaoScript = () => {
  return (
    <>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
        strategy="afterInteractive"
        integrity="sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka"
        crossOrigin="anonymous"
        onLoad={() =>
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_SHARE_API || '')
        }
      />
    </>
  );
};

export default KakaoScript;
