import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '',
  description: '',
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
};

export default RootLayout;
