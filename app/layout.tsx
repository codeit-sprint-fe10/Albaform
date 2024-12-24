import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import UserProvider from './UserProvider';
import QueryProvider from './QueryProvider';
import './globals.css';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  weight: '400 700',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://codeit-fe10-albaform.vercel.app'),
  title: '알바폼',
  description: '한 곳에서 관리하는 알바 구인 플랫폼',
  openGraph: {
    type: 'website',
    siteName: '알바폼',
    title: '알바폼',
    description: '한 곳에서 관리하는 알바 구인 플랫폼',
    url: 'https://codeit-fe10-albaform.vercel.app',
    images: {
      url: '/images/opengraph.png',
      alt: '알바폼 - 한 곳에서 관리하는 알바 구인 플랫폼',
      width: 1200,
      height: 630,
    },
  },
};

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <UserProvider>
      <QueryProvider>{children}</QueryProvider>
    </UserProvider>
  );
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="ko">
      <body className={`${pretendard.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
