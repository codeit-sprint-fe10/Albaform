import React from 'react';
import Link from 'next/link';
import IconMenu from '/public/icons/menu.svg';
import IconLogo from '/public/icons/logo.svg';
import IconAlbaform from '/public/icons/albaform.svg';

const MainHeader = () => {
  return (
    <header className="flex justify-between items-center gap-8 bg-background-100 py-[10px] md:py-[19px] lg:py-[26px]">
      <div>
        <Link href="/" className="flex items-center gap-2">
          <IconLogo />
          <span className="hidden md:inline">
            <IconAlbaform />
          </span>
        </Link>
      </div>
      <nav className="flex-1 flex gap-6">
        <Link
          href="/albalist"
          className="text-white hover:text-gray-200 transition-colors"
        >
          알바목록
        </Link>
        <Link
          href="/albatalk"
          className="text-white hover:text-gray-200 transition-colors"
        >
          알바토크
        </Link>
        <Link
          href="/myalbaform"
          className="text-white hover:text-gray-200 transition-colors"
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
