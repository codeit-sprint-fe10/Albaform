'use client';
import React, { useState } from 'react';
import AlbatalkCard from './_components/AlbatalkCard';
import SearchIcon from '@/public/icons/search.svg';
import Image from 'next/image';

const Albatalk = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('recent');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  // Mock data
  const posts = [
    { id: 1, title: '첫 번째 알바 후기', likes: 10, date: '2024-12-01' },
    { id: 2, title: '알바 팁 공유합니다', likes: 25, date: '2024-12-02' },
    { id: 3, title: '알바 면접 후기', likes: 15, date: '2024-12-03' },
    { id: 4, title: '첫 번째 알바 후기', likes: 10, date: '2024-12-01' },
    { id: 5, title: '알바 팁 공유합니다', likes: 25, date: '2024-12-02' },
    { id: 6, title: '알바 면접 후기', likes: 15, date: '2024-12-03' },
  ];

  // Filtered and sorted posts
  const filteredPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortOrder === 'recent') {
        return new Date(b.date) - new Date(a.date);
      } else {
        return b.likes - a.likes;
      }
    });

  return (
    <div className="w-full">
      <div className="flex justify-center border-b-2">
        <div className="flex max-w-7xl w-full h-28 items-center justify-between">
          <div className="flex w-full">
            <div className="hidden md:inline relative w-[120px] h-[20px] lg:w-[212px] lg:h-[36px]">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchTerm}
              onChange={handleSearch}
              className="w-4/5 h-16 bg-background-200 border-none rounded-3xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => handleSortChange('recent')}
            className={`px-4 py-2 rounded-lg ${
              sortOrder === 'recent'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            최신순
          </button>
        </div>
      </div>

      <div className="w-full flex items-center justify-center mt-10">
        <div className="flex w-full max-w-7xl">
          <ul className="w-full grid grid-cols-3 gap-6 gap-y-12">
            {filteredPosts.map((post) => (
              <AlbatalkCard key={post.id} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Albatalk;
