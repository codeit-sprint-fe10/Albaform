import { Dispatch, FormEvent, SetStateAction } from 'react';
import { AlbasFilterType, AlbasOrderBy } from '@/types/alba';
import Dropdown, { Option } from './filter/Dropdown';
import SearchInput from './filter/SearchInput';
import {
  ALBA_ORDERBY_OPTIONS,
  PUBLIC_OPTIONS,
  RECRUIT_OPTIONS,
} from '@/constants/dropdown';

interface AlbaFilterSectionProps {
  setFilter: Dispatch<SetStateAction<AlbasFilterType>>;
  setIsPublic: Dispatch<SetStateAction<boolean | undefined>>;
}

const AlbaFilterSection = ({
  setFilter,
  setIsPublic,
}: AlbaFilterSectionProps) => {
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleInputUpdate = (value: string) => {
    const keyword = value ? value : undefined;
    setFilter((prev) => ({ ...prev, keyword }));
  };

  const handleIsPublicSelect = (option: Option) => {
    setIsPublic(option.key as boolean | undefined);
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
      className="fixed top-[50px] z-50 md:top-[69px] lg:top-[92px] left-0 w-full bg-gray-50"
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
        <div className="flex items-center gap-3 lg:gap-4">
          <Dropdown
            type="filter"
            options={PUBLIC_OPTIONS}
            onSelect={handleIsPublicSelect}
          />
          <Dropdown
            type="filter"
            options={RECRUIT_OPTIONS}
            onSelect={handleIsRecruitingSelect}
          />
        </div>
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
