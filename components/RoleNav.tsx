'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface RoleNavigationProps {
  isHeader: boolean;
}

const RoleNav = ({ isHeader }: RoleNavigationProps) => {
  const path = usePathname();

  const navStyle = `${isHeader ? 'hidden md:flex' : 'flex md:hidden'} gap-4 md:gap-6`;
  const linkStyle = 'text-lg lg:text-xl transition duration-200';
  const currentStyle = `${linkStyle} font-bold text-orange-300 hover:text-orange-200`;
  const otherStyle = `${linkStyle} font-semibold text-gray-300 hover:text-gray-200`;

  return (
    <nav className={navStyle}>
      <Link
        href={path.replace('applicant', 'owner')}
        replace
        className={path.includes('owner') ? currentStyle : otherStyle}
      >
        사장님 전용
      </Link>
      <Link
        href={path.replace('owner', 'applicant')}
        replace
        className={path.includes('applicant') ? currentStyle : otherStyle}
      >
        지원자 전용
      </Link>
    </nav>
  );
};

export default RoleNav;
