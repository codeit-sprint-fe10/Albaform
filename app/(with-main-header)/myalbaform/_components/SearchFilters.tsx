import Dropdown from './Dropdown';
import {
  PUBLIC_OPTIONS,
  RECRUIT_OPTIONS,
  ALBA_ORDERBY_OPTIONS,
} from '@/constants/dropdown';

const SearchFilters = () => {
  return (
    <div className="pt-[70px] md:pt-[86px] lg:pt-28 mb-[9px] md:mb-3.5 lg:mb-14">
      <div className="flex justify-between items-center py-3.5 lg:py-6">
        <div className="flex items-center gap-2.5 lg:gap-4">
          <Dropdown name="isPublic" options={PUBLIC_OPTIONS} />
          <Dropdown name="isRecruiting" options={RECRUIT_OPTIONS} />
        </div>
        <Dropdown name="orderBy" options={ALBA_ORDERBY_OPTIONS} />
      </div>
    </div>
  );
};

export default SearchFilters;
