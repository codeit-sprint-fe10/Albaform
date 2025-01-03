'use client';

import { useState } from 'react';
import { useUserStore } from '@/store/user';
import { AlbasFilterType } from '@/types/alba';
import { UserRole } from '@/types/user';
import AlbaFilterSection from './_components/AlbaFilterSection';
import AlbaListSection from './_components/AlbaListSection';
import WriteFAB from './_components/WriteFAB';

const initialFilter: AlbasFilterType = {
  orderBy: 'mostRecent',
  keyword: undefined,
  isRecruiting: undefined,
};

const AlbaListPage = () => {
  const user = useUserStore((state) => state.user);
  const [filter, setFilter] = useState<AlbasFilterType>(initialFilter);
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
