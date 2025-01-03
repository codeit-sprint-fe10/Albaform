'use client';
import { useState, useEffect } from 'react';
import AlbatalkCard from './_components/AlbatalkCard';
import Pagination from './_components/Pagination';
import SearchBar from './_components/SearchBar';
import WriteButton from './_components/WriteButton';
import useGetPosts from './_hooks/useGetPosts';
import { SortOrder } from '@/types/albatalk';

const Albatalk = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cursorHistory, setCursorHistory] = useState([0]);
  const [sortOrder, setSortOrder] = useState<SortOrder>('mostRecent');
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

  const {
    data,
    isLoading,
    error,
    isFirstPage,
    hasNextPage,
    handleLoadPrev,
    handleLoadMore,
  } = useGetPosts({
    pageLimit,
    searchTerm,
    sortOrder,
  });

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
