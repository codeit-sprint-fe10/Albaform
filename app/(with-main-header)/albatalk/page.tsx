'use client';

import { useState, useEffect } from 'react';
import AlbatalkCard from './_components/AlbatalkCard';
import Pagination from './_components/Pagination';
import SearchBar from './_components/SearchBar';
import WriteButton from './_components/WriteButton';
import useGetPosts from './_hooks/useGetPosts';
import { SortOrder } from '@/types/albatalk';
import AlbatalkCardSkeleton from './_components/AlbatalkCardSkeleton';

const Albatalk = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cursorHistory, setCursorHistory] = useState([0]);
  const [sortOrder, setSortOrder] = useState<SortOrder>('mostRecent');
  const [pageLimit, setPageLimit] = useState(6);

  const AlbatalkCardSkeletons = () =>
    Array(pageLimit)
      .fill(0)
      .map((_, idx) => (
        <div key={idx} className="w-full lg:w-[384px]">
          <AlbatalkCardSkeleton />
        </div>
      ));

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
            {isLoading ? (
              <AlbatalkCardSkeletons />
            ) : (
              data?.data.map((post) => <AlbatalkCard key={post.id} {...post} />)
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
