'use client';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import AlbatalkCard from './_components/AlbatalkCard';
import Pagination from './_components/Pagination';
import SearchIcon from '@/public/icons/search.svg';
import { getPosts } from '@/services/albatalk';
import { Post, GetPostsResponse } from '@/types/albatalk';

const Albatalk: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [nextCursor, setNextCursor] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<
    'mostRecent' | 'mostLiked' | 'mostCommented'
  >('mostRecent');
  const PAGE_LIMIT = 6;

  //total count 값 설정 방식 수정 필요
  const TOTAL_COUNT = 10;

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    setNextCursor(0);
  };

  const handleSortOrderChange = (
    order: 'mostRecent' | 'mostLiked' | 'mostCommented',
  ) => {
    setSortOrder(order);
    setCurrentPage(1);
    setNextCursor(0);
  };

  //로딩중일때, 에러처리 필요
  const { data, isLoading, error } = useQuery<GetPostsResponse>({
    queryKey: [
      'posts',
      PAGE_LIMIT,
      currentPage,
      searchTerm,
      sortOrder,
      nextCursor,
    ],
    queryFn: () =>
      getPosts({
        cursor: nextCursor,
        limit: PAGE_LIMIT,
        keyword: searchTerm,
        orderBy: sortOrder,
      }),
    placeholderData: keepPreviousData,
  });

  // const totalPage = data?.totalCount
  //   ? Math.ceil(data.totalCount / PAGE_LIMIT)
  //   : 1;

  useEffect(() => {
    if (data) {
      console.log(data);
      setNextCursor(data.nextCursor);
    }
  }, [currentPage]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full">
      <div className="flex justify-center border-b-2">
        <div className="flex max-w-container-200 w-full h-28 items-center justify-between gap-4">
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
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 ${sortOrder === 'mostRecent' ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => handleSortOrderChange('mostRecent')}
            >
              최신순
            </button>
            <button
              className={`px-4 py-2 ${sortOrder === 'mostLiked' ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => handleSortOrderChange('mostLiked')}
            >
              좋아요순
            </button>
            <button
              className={`px-4 py-2 ${sortOrder === 'mostCommented' ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => handleSortOrderChange('mostCommented')}
            >
              댓글 많은순
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-10">
        <div className="flex w-full max-w-container-200">
          <ul className="w-full grid grid-cols-3 gap-6 gap-y-12">
            {data?.data.map((post: Post) => (
              <AlbatalkCard key={post.id} post={post} />
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={TOTAL_COUNT}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Albatalk;
