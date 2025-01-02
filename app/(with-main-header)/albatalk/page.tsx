'use client';
import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import AlbatalkCard from './_components/AlbatalkCard';
import Pagination from './_components/Pagination';
import SearchBar from './_components/SearchBar';
import { getPosts } from '@/services/albatalk';
import { GetPostsResponse } from '@/types/albatalk';
import WriteButton from './_components/WriteButton';

const Albatalk = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cursorHistory, setCursorHistory] = useState([0]);
  const [sortOrder, setSortOrder] = useState<
    'mostRecent' | 'mostLiked' | 'mostCommented'
  >('mostRecent');
  const [pageLimit, setPageLimit] = useState(6);

  useEffect(() => {
    const updatePageLimit = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setPageLimit(3);
      } else if (width < 1280) {
        setPageLimit(4);
      } else {
        setPageLimit(6);
      }
    };

    updatePageLimit();
    window.addEventListener('resize', updatePageLimit);

    return () => window.removeEventListener('resize', updatePageLimit);
  }, []);

  const currentCursor = cursorHistory.at(-1) ?? 0;

  const { data, isLoading, error } = useQuery<GetPostsResponse>({
    queryKey: ['posts', { pageLimit, searchTerm, sortOrder, currentCursor }],
    queryFn: () =>
      getPosts({
        cursor: currentCursor,
        limit: pageLimit,
        keyword: searchTerm,
        orderBy: sortOrder,
      }),
    placeholderData: keepPreviousData,
    enabled: !!cursorHistory.length,
    staleTime: 20 * 1000,
    gcTime: 3 * 60 * 1000,
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
  //TODO: 게시물 로딩중일때 UI 추가 필요
  return (
    <div className="w-full flex flex-col">
      <SearchBar
        searchTerm={searchTerm}
        sortOrder={sortOrder}
        cursorHistory={cursorHistory}
        setSearchTerm={setSearchTerm}
        setSortOrder={setSortOrder}
        setCursorHistory={setCursorHistory}
      />
      <div className="w-full flex flex-col items-center justify-center mt-4 lg:mt-10">
        <div className="flex w-full max-w-container-md">
          <div className="w-full flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:gap-y-12">
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
                  writer={writer}
                  createdAt={createdAt}
                  commentCount={commentCount}
                  likeCount={likeCount}
                  talkId={id}
                />
              ),
            )}
          </div>
        </div>
        <Pagination
          isFirstPage={isFirstPage}
          hasNextPage={hasNextPage}
          handleLoadPrev={handleLoadPrev}
          handleLoadMore={handleLoadMore}
        />
      </div>
      <WriteButton />
    </div>
  );
};

export default Albatalk;
