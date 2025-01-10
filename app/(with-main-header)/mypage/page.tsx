'use client';

import { useState } from 'react';
import Tab from './_components/Tab';
import { TabKey } from '@/types/mypage';
import MyPostList from './_components/posts/MyPostList';
import MyCommentList from './_components/comments/MyCommentList';
import MyScrapList from './_components/scraps/MyScrapList';
import Dropdown from './_components/Dropdown';
import Button from '@/components/Button';

const Mypage = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('posts');

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
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-container-md flex flex-col gap-6 items-center justify-center mt-4 lg:mt-10">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-black-500 text-xl lg:text-3xl text-left font-semibold">
            마이페이지
          </h1>
          <div>
            <div className="hidden lg:flex gap-3">
              <Button
                design="solid"
                content="내 정보 수정"
                className="lg:w-[150px]"
              />
              <Button
                design="outlined"
                content="비밀번호 변경"
                className="lg:w-[150px]"
              />
            </div>
            <div className="flex lg:hidden">
              {/* TODO: 모달구현 
              <Dropdown />  */}
            </div>
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
