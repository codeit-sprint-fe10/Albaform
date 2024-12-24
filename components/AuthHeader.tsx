'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const AuthHeader = () => {
  const pathname = usePathname();

  return (
    <header>
      <Link href="/" replace>
        <Image src="/icons/logo.svg" width={0} height={0} alt="albaform logo" />
        <Image
          src="/icons/albaform.svg"
          width={0}
          height={0}
          alt="albaform text logo"
        />
      </Link>
      <nav>
        <Link
          href={pathname.replace('applicant', 'owner')}
          className={` ${pathname.includes('owner') ? 'font-bold text-orange-200' : ''}`}
          replace
        >
          사장님 전용
        </Link>
        <Link
          href={pathname.replace('owner', 'applicant')}
          className={`${pathname.includes('applicant') ? 'font-bold text-orange-200' : ''}`}
          replace
        >
          지원자 전용
        </Link>
      </nav>
    </header>
  );
};

export default AuthHeader;
