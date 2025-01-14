'use client';

import Image from 'next/image';
import MypageIcon from '@/public/icons/mypage.svg';
import LogoutIcon from '@/public/icons/logout.svg';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useUserStore } from '@/store/user';

interface SlideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SlideMenu = ({ isOpen, onClose }: SlideMenuProps) => {
  const user = useUserStore((state) => state.user);

  const { push } = useRouter();
  const { signOut } = useAuth();

  const handleMyPageClick = () => {
    push('/mypage');
    onClose();
  };

  const handleLoginClick = () => {
    push('/signin/applicant');
  };

  const handleLogoutClick = async () => {
    await signOut();
    onClose();
    alert('로그아웃 성공');
    document.location.reload();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black-500 bg-opacity-50 z-50 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 right-0 w-3/5 md:w-2/5 lg:w-3/12 h-full bg-gray-50 p-5 z-50 
        transform transition-transform duration-300 ease
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="text-right">
          <button aria-label="메뉴 닫기" onClick={onClose}>
            <Image
              src="/icons/x.svg"
              width={24}
              height={24}
              alt="닫기"
              className="lg:w-9 lg:h-9"
            />
          </button>
        </div>
        <nav>
          <ul className="font-medium text-black-400 text-lg lg:text-xl">
            <li className="px-4 py-6">
              <button
                type="button"
                className="flex items-center gap-4"
                onClick={handleMyPageClick}
              >
                <MypageIcon className="w-6 lg:w-9 h-6 lg:h-9" />
                마이페이지
              </button>
            </li>
            <li className="px-4 py-6">
              <button
                type="button"
                className="flex items-center gap-3"
                onClick={user ? handleLogoutClick : handleLoginClick}
              >
                <div className="m-1.5 lg:m-2">
                  <LogoutIcon className="w-4 lg:w-6 h-4 lg:h-6" />
                </div>
                {user ? '로그아웃' : '로그인'}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default SlideMenu;
