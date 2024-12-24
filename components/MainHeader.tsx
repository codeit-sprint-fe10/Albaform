'use client';

import Link from 'next/link';
import IconMenu from '/public/icons/menu.svg';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const MainHeader = () => {
  const pathname = usePathname();

  return (
    <header className="flex justify-between items-center gap-8 bg-gray-50 py-2.5 md:py-[19px] lg:py-6">
      <div>
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icons/logo.svg"
            alt="albaform logo"
            width={45}
            height={30}
            className="lg:w-[60px] lg:h-10"
          />
          <Image
            src="/icons/albaform.svg"
            alt="albaform text logo"
            width={120}
            height={20}
            className="hidden md:inline lg:w-[212px] lg:h-9"
          />
        </Link>
      </div>
      <nav className="flex-1 flex gap-4 md:gap-4 lg:gap-6 flex-nowrap font-medium text-gray-300 text-md md:text-lg lg:text-xl lg:mt-3">
        <Link
          href="/albalist"
          className={`link ${pathname === '/albalist' ? 'font-bold text-orange-200' : ''}`}
        >
          알바목록
        </Link>
        <Link
          href="/albatalk"
          className={`link ${pathname === '/albatalk' ? 'font-bold text-orange-200' : ''}`}
        >
          알바토크
        </Link>
        <Link
          href="/myalbaform"
          className={`link ${pathname === '/myalbaform' ? 'font-bold text-orange-200' : ''}`}
        >
          내알바폼
        </Link>
      </nav>
      <div>
        <IconMenu />
      </div>
    </header>
  );
};

export default MainHeader;
