'use client';
import React, { useState, ChangeEvent } from 'react';
import AlbatalkCard from './_components/AlbatalkCard';
import SearchIcon from '@/public/icons/search.svg';

interface Post {
  id: number;
  title: string;
  likes: number;
  date: string;
}

const Albatalk: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const postsPerPage = 6;
  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  // Mock data
  const posts: Post[] = [
    { id: 1, title: '첫 번째 알바 후기', likes: 10, date: '2024-12-01' },
    { id: 2, title: '알바 팁 공유합니다', likes: 25, date: '2024-12-02' },
    { id: 3, title: '알바 면접 후기', likes: 15, date: '2024-12-03' },
    { id: 4, title: '첫 번째 알바 후기', likes: 10, date: '2024-12-01' },
    { id: 5, title: '알바 팁 공유합니다', likes: 25, date: '2024-12-02' },
    { id: 6, title: '알바 면접 후기', likes: 15, date: '2024-12-03' },
    { id: 7, title: '알바 면접 후기', likes: 15, date: '2024-12-03' },
    { id: 8, title: '첫 번째 알바 후기', likes: 10, date: '2024-12-01' },
    { id: 9, title: '알바 팁 공유합니다', likes: 25, date: '2024-12-02' },
    { id: 10, title: '알바 면접 후기', likes: 15, date: '2024-12-03' },
    { id: 11, title: '알바 면접 후기', likes: 15, date: '2024-12-03' },
    { id: 12, title: '첫 번째 알바 후기', likes: 10, date: '2024-12-01' },
    { id: 13, title: '알바 팁 공유합니다', likes: 25, date: '2024-12-02' },
    { id: 14, title: '알바 면접 후기', likes: 15, date: '2024-12-03' },
  ];

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage,
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="w-full">
      <div className="flex justify-center border-b-2">
        <div className="flex max-w-7xl w-full h-28 items-center justify-between gap-4">
          <div className="flex w-full max-w-6xl bg-background-200 border-none rounded-3xl px-6 py-4 justify-center items-center">
            <div className="flex items-center justify-center w-8 h-8">
              <SearchIcon className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-2 bg-background-200 focus:outline-none"
            />
          </div>
          <button>최신순</button>
        </div>
      </div>

      <div className="w-full flex items-center justify-center mt-10">
        <div className="flex w-full max-w-7xl">
          <ul className="w-full grid grid-cols-3 gap-6 gap-y-12">
            {currentPosts.map((post: Post) => (
              <AlbatalkCard key={post.id} />
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <div className="flex space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? 'text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white'
            }`}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === index + 1 ? 'text-black-400' : 'text-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? 'text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white'
            }`}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Albatalk;
