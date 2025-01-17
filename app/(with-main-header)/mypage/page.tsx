'use client';

import { useState } from 'react';
import Tab from './_components/Tab';
import { MypageOption, TabKey } from '@/types/mypage';
import MyPostList from './_components/posts/MyPostList';
import MyCommentList from './_components/comments/MyCommentList';
import MyScrapList from './_components/scraps/MyScrapList';
import Dropdown from './_components/Dropdown';
import Button from '@/components/Button';
import useModal from '@/hooks/useModal';
import ProfileModal from './_components/ProfileModal';
import PasswordModal from './_components/PasswordModal';

const Mypage = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('posts');
  const {
    dialogRef: profileModalRef,
    openModal: openProfileModal,
    closeModal: closeProfileModal,
  } = useModal();
  const {
    dialogRef: passwordModalRef,
    openModal: openPasswordModal,
    closeModal: closePasswordModal,
  } = useModal();

  const handleOptionClick = (key: MypageOption) => {
    switch (key) {
      case 'editInfo':
        openProfileModal();
        break;
      case 'updatePassword':
        openPasswordModal();
        break;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return <MyPostList />;
      case 'comments':
        return <MyCommentList />;
      case 'scraps':
        return <MyScrapList />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex flex-col items-center max-w-container lg:px-[72px]">
      <div className="w-full flex flex-col gap-6 items-center justify-center mt-4 lg:mt-10">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-black-500 text-xl lg:text-3xl text-left font-semibold">
            마이페이지
          </h1>
          <div>
            <div className="hidden lg:flex gap-3">
              <Button
                onClick={() => openProfileModal()}
                design="solid"
                content="내 정보 수정"
                sizeClass="w-[180px] h-[58px]"
              />
              <Button
                onClick={() => openPasswordModal()}
                design="outlined"
                content="비밀번호 변경"
                sizeClass="w-[180px] h-[58px]"
              />
            </div>
            <div className="flex lg:hidden gap-3">
              <Dropdown onAction={handleOptionClick} />
            </div>
            <ProfileModal
              dialogRef={profileModalRef}
              closeModal={closeProfileModal}
            />
            <PasswordModal
              dialogRef={passwordModalRef}
              closeModal={closePasswordModal}
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <Tab activeTab={activeTab} onTabChange={setActiveTab} />
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
