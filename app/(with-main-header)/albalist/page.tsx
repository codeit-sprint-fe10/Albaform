'use client';

import { useState } from 'react';
import { useUserStore } from '@/store/user';
import { GetAlbasParameters } from '@/types/alba';
import { UserRole } from '@/types/user';
import AlbaFilterSection from './_components/AlbaFilterSection';
import AlbaListSection from './_components/AlbaListSection';
import WriteFAB from './_components/WriteFAB';

export type FilterProps = Pick<
  GetAlbasParameters,
  'orderBy' | 'keyword' | 'isRecruiting'
>;

const initialFilter: FilterProps = {
  orderBy: 'mostRecent',
  keyword: undefined,
  isRecruiting: undefined,
};

const AlbaListPage = () => {
  const user = useUserStore((state) => state.user);
  const [filter, setFilter] = useState<FilterProps>(initialFilter);
  const [isPublic, setIsPublic] = useState<boolean>();

  return (
    <>
      <h1 className="sr-only">알바폼 목록</h1>
      <AlbaFilterSection setFilter={setFilter} setIsPublic={setIsPublic} />
      <AlbaListSection filter={filter} isPublic={isPublic} />
      {user?.role === UserRole.owner && <WriteFAB />}
    </>
  );
};

export default AlbaListPage;
