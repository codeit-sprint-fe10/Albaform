'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface RoleNavigationProps {
  isHeader: boolean;
}

const RoleNav = ({ isHeader }: RoleNavigationProps) => {
  const path = usePathname();
  const navStyle =
    `${isHeader ? 'hidden md:flex' : 'flex md:hidden'} gap-4 md:gap-6 ` +
    'text-lg lg:text-xl font-semibold text-gray-300';
  const linkStyle = 'font-bold text-orange-300';

  return (
    <nav className={navStyle}>
      <Link
        href={path.replace('applicant', 'owner')}
        className={path.includes('owner') ? linkStyle : ''}
        replace
      >
        사장님 전용
      </Link>
      <Link
        href={path.replace('owner', 'applicant')}
        className={path.includes('applicant') ? linkStyle : ''}
        replace
      >
        지원자 전용
      </Link>
    </nav>
  );
};

export default RoleNav;
