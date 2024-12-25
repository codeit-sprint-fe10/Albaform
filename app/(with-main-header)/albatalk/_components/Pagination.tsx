'use client';

import PrevIcon from '@/public/icons/prev.svg';

interface PaginationProps {
  isFirstPage: boolean;
  hasNextPage: boolean;
  handleLoadPrev: () => void;
  handleLoadMore: () => void;
}

const Pagination = ({
  isFirstPage,
  hasNextPage,
  handleLoadPrev,
  handleLoadMore,
}: PaginationProps) => {
  return (
    <div className="w-full flex items-center justify-between mt-14 max-w-container-md mb-6">
      <button
        onClick={handleLoadPrev}
        disabled={isFirstPage}
        className={`btn ${isFirstPage ? 'btn-disabled opacity-50' : ''} flex text-black-400`}
      >
        <PrevIcon className="stroke-black-400" />
        이전
      </button>
      <button
        onClick={handleLoadMore}
        disabled={!hasNextPage}
        className={`btn ${!hasNextPage ? 'btn-disabled opacity-50' : ''} flex text-black-400`}
      >
        다음
        <PrevIcon className="stroke-black-400 rotate-180" />
      </button>
    </div>
  );
};

export default Pagination;
