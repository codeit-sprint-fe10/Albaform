'use client';

import Link from 'next/link';
import IconMenu from '/public/icons/menu.svg';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/store/user';
import SlideMenu from '@/components/SlideMenu';
import useSideMenu from '@/hooks/useSideMenu';

const NAV_LINKS = [
  { href: '/albalist', label: '알바목록' },
  { href: '/albatalk', label: '알바토크' },
  { href: '/myalbaform', label: '내알바폼' },
];

const MainHeader = () => {
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);
  const { isSideMenuOpen, toggleSideMenu, closeSideMenu } = useSideMenu();

  return (
    <header className="flex justify-between items-center gap-8 bg-gray-50 py-2.5 md:py-[19px] lg:py-6">
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
      <nav className="flex-1 flex gap-4 md:gap-4 lg:gap-6 flex-nowrap font-medium text-gray-300 text-md md:text-lg lg:text-xl lg:mt-3">
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`link ${pathname === href ? 'font-bold text-orange-200' : ''}`}
          >
            {label}
          </Link>
        ))}
      </nav>
      {user !== undefined &&
        (user ? (
          <>
            <button
              type="button"
              aria-label="사이드 메뉴 버튼"
              onClick={toggleSideMenu}
            >
              <IconMenu />
            </button>
            <SlideMenu isOpen={isSideMenuOpen} onClose={closeSideMenu} />
          </>
        ) : (
          <Link
            href="/signin/applicant"
            className={
              'px-3 lg:px-4 py-[2px] lg:py-1 rounded-md lg:rounded-lg ' +
              'bg-orange-300 hover:bg-orange-200 text-md md:text-lg lg:text-xl ' +
              'font-medium text-gray-50 transition duration-200'
            }
          >
            로그인
          </Link>
        ))}
    </header>
  );
};

export default MainHeader;
