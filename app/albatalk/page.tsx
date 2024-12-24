'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import AlbatalkCard from './_components/AlbatalkCard';
import SearchBar from './_components/SearchBar';
import Pagination from './_components/Pagination';
import { getPosts } from '@/services/albatalk';
import { GetPostsResponse } from '@/types/albatalk';

const Albatalk = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [nextCursor, setNextCursor] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<
    'mostRecent' | 'mostLiked' | 'mostCommented'
  >('mostRecent');
  const PAGE_LIMIT = 6;

  //TODO: total count 값 설정 방식 수정 필요
  const TOTAL_COUNT = 10;

  //TODO: 로딩중일때, 에러처리 필요
  const { data, isLoading, error } = useQuery<GetPostsResponse>({
    queryKey: [
      'posts',
      {
        PAGE_LIMIT,
        currentPage,
        searchTerm,
        sortOrder,
        nextCursor,
      },
    ],
    queryFn: () =>
      getPosts({
        cursor: nextCursor,
        limit: PAGE_LIMIT,
        keyword: searchTerm,
        orderBy: sortOrder,
      }),
    placeholderData: keepPreviousData,
    enabled: nextCursor !== null,
  });

  // const totalPage = data?.totalCount
  //   ? Math.ceil(data.totalCount / PAGE_LIMIT)
  //   : 1;

  useEffect(() => {
    if (data) {
      setNextCursor(data.nextCursor);
    }
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setCurrentPage={setCurrentPage}
        setNextCursor={setNextCursor}
        setSortOrder={setSortOrder}
        sortOrder={sortOrder}
      />
      <div className="w-full flex items-center justify-center mt-10">
        <div className="flex w-full max-w-container-200">
          <ul className="w-full grid grid-cols-3 gap-6 gap-y-12">
            {data?.data.map(
              ({
                id,
                title,
                content,
                writer,
                createdAt,
                commentCount,
                likeCount,
              }) => (
                <AlbatalkCard
                  key={id}
                  title={title}
                  content={content}
                  writerNickname={writer.nickname}
                  createdAt={createdAt}
                  commentCount={commentCount}
                  likeCount={likeCount}
                />
              ),
            )}
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
