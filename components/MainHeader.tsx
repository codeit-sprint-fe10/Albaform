'use client';

import Link from 'next/link';
import IconMenu from '/public/icons/menu.svg';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const MainHeader = () => {
  const pathname = usePathname();

  return (
    <header className="flex justify-between items-center gap-8 bg-gray-50 py-[10px] md:py-[19px] lg:py-[24px]">
      <div>
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-[45px] h-[30px] lg:w-[60px] lg:h-[40px]">
            <Image src="/icons/logo.svg" alt="albaform logo" fill />
          </div>
          <div className="hidden md:inline relative w-[120px] h-[20px] lg:w-[212px] lg:h-[36px]">
            <Image src="/icons/albaform.svg" alt="albaform text logo" fill />
          </div>
        </Link>
      </div>
      <nav className="flex-1 flex gap-[16px] md:gap-[16px] lg:gap-[24px] flex-nowrap font-medium text-gray-300 text-md md:text-lg lg:text-xl lg:mt-[12px]">
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
