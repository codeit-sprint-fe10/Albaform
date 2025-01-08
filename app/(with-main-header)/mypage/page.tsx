'use client';
import { useState } from 'react';
import { SortOrder } from '@/types/albatalk';
import Tab from './_components/Tab';
import SortDropdown from './_components/SortDropdown';
import { TabKey } from '@/types/mypage';
import KebabIcon from '@/public/icons/kebab.svg';
import MyPostList from './_components/posts/MyPostList';
import MyCommentList from './_components/comments/MyCommentList';

const Mypage = () => {
  const [sortOrder, setSortOrder] = useState<SortOrder>('mostRecent');
  const [activeTab, setActiveTab] = useState<TabKey>('posts');

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return <MyPostList sortOrder={sortOrder} />;
      case 'comments':
        return <MyCommentList />;
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
          <button className="bg-white rounded-md flex items-center justify-between gap-3 cursor-pointer">
            <KebabIcon className="w-6 h-6 lg:w-9 lg:h-9" />
          </button>
        </div>
        <div className="w-full flex flex-col gap-2">
          <Tab activeTab={activeTab} onTabChange={setActiveTab} />
          {activeTab === 'posts' && (
            <div className="w-full flex justify-end">
              <SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
            </div>
          )}
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Mypage;
