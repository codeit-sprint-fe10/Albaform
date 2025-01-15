import { Dispatch, FormEvent, SetStateAction } from 'react';
import { AlbasFilterType, AlbasOrderBy } from '@/types/alba';
import Dropdown, { Option } from './filter/Dropdown';
import SearchInput from './filter/SearchInput';
import { ALBA_ORDERBY_OPTIONS, RECRUIT_OPTIONS } from '@/constants/dropdown';

interface AlbaFilterSectionProps {
  setFilter: Dispatch<SetStateAction<AlbasFilterType>>;
}

const AlbaFilterSection = ({ setFilter }: AlbaFilterSectionProps) => {
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleInputUpdate = (value: string) => {
    const keyword = value ? value : undefined;
    setFilter((prev) => ({ ...prev, keyword }));
  };

  const handleIsRecruitingSelect = (option: Option) => {
    setFilter((prev) => ({
      ...prev,
      isRecruiting: option.key as boolean | undefined,
    }));
  };

  const handleOrderBySelect = (option: Option) => {
    setFilter((prev) => ({
      ...prev,
      orderBy: option.key as AlbasOrderBy,
    }));
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="fixed top-[50px] z-40 md:top-[69px] lg:top-[92px] left-0 w-full bg-gray-50"
    >
      <div
        className={
          'px-6 md:px-[72px] lg:px-[max(72px,calc((100%-1456px)/2))] ' +
          'border-b border-line-100'
        }
      >
        <SearchInput onUpdate={handleInputUpdate} />
      </div>
      <div
        className={
          'flex items-center justify-between w-full h-14 lg:h-20 px-6 ' +
          'md:px-[72px] lg:px-[max(72px,calc((100%-1456px)/2))]'
        }
      >
        <Dropdown
          type="filter"
          options={RECRUIT_OPTIONS}
          onSelect={handleIsRecruitingSelect}
        />
        <Dropdown
          type="sort"
          options={ALBA_ORDERBY_OPTIONS}
          onSelect={handleOrderBySelect}
        />
      </div>
    </form>
  );
};

export default AlbaFilterSection;
