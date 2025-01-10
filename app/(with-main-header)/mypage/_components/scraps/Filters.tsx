'use client';

import ScrapsSortDropdown from './ScrapsSortDropdown';
import {
  PUBLIC_OPTIONS,
  RECRUIT_OPTIONS,
  ALBA_ORDERBY_OPTIONS,
} from '@/constants/dropdown';

const Filters = () => {
  return (
    <div className="flex justify-between items-center py-3.5 lg:py-6">
      <div className="flex items-center gap-2.5 lg:gap-4">
        <ScrapsSortDropdown name="isPublic" options={PUBLIC_OPTIONS} />
        <ScrapsSortDropdown name="isRecruiting" options={RECRUIT_OPTIONS} />
      </div>
      <ScrapsSortDropdown name="orderBy" options={ALBA_ORDERBY_OPTIONS} />
    </div>
  );
};

export default Filters;
