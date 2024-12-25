'use client';

import React, { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import AlbatalkCard from './_components/AlbatalkCard';
import Pagination from './_components/Pagination';
import SearchBar from './_components/SearchBar';
import { getPosts } from '@/services/albatalk';
import { GetPostsResponse } from '@/types/albatalk';

const Albatalk = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cursorHistory, setCursorHistory] = useState<number[]>([0]);
  const [sortOrder, setSortOrder] = useState<
    'mostRecent' | 'mostLiked' | 'mostCommented'
  >('mostRecent');
  const PAGE_LIMIT = 6;

  const currentCursor = cursorHistory[cursorHistory.length - 1];

  const { data, isLoading, error } = useQuery<GetPostsResponse>({
    queryKey: ['posts', { PAGE_LIMIT, searchTerm, sortOrder, currentCursor }],
    queryFn: () =>
      getPosts({
        cursor: currentCursor,
        limit: PAGE_LIMIT,
        keyword: searchTerm,
        orderBy: sortOrder,
      }),
    placeholderData: keepPreviousData,
    enabled: !!cursorHistory.length,
  });

  const isFirstPage = cursorHistory.length === 1;
  const hasNextPage = data?.nextCursor !== null;

  const handleLoadMore = () => {
    if (data?.nextCursor) {
      setCursorHistory((prev) => [...prev, data.nextCursor]);
    }
  };

  const handleLoadPrev = () => {
    if (cursorHistory.length > 1) {
      setCursorHistory((prev) => prev.slice(0, -1));
    }
  };

  return (
    <div className="w-full">
      <SearchBar
        searchTerm={searchTerm}
        sortOrder={sortOrder}
        cursorHistory={cursorHistory}
        setSearchTerm={setSearchTerm}
        setSortOrder={setSortOrder}
        setCursorHistory={setCursorHistory}
      />
      <div className="w-full flex flex-col items-center justify-center mt-10">
        <div className="flex w-full max-w-container-md">
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
        <Pagination
          isFirstPage={isFirstPage}
          hasNextPage={hasNextPage}
          handleLoadPrev={handleLoadPrev}
          handleLoadMore={handleLoadMore}
        />
      </div>
    </div>
  );
};

export default Albatalk;
