import { create } from 'zustand';
import { MyCreatedAlbasFilterType } from '@/types/alba';
import { MyAppliedAlbasFilterType } from '@/types/application';

interface searchParamsState<T> {
  searchParams: T;
  setSearchParams: (newSearchParams: Partial<T>) => void;
}

const createSearchParamsStore = <T>(initialParams: T) =>
  create<searchParamsState<T>>((set) => ({
    searchParams: initialParams,
    setSearchParams: (newSearchParams) =>
      set((state) => ({
        searchParams: { ...state.searchParams, ...newSearchParams },
      })),
  }));

export const useMyCreatedAlbaformStore =
  createSearchParamsStore<MyCreatedAlbasFilterType>({
    keyword: undefined,
    orderBy: 'mostRecent',
    isPublic: undefined,
    isRecruiting: undefined,
  });

export const useMyAppliedAlbaformStore =
  createSearchParamsStore<MyAppliedAlbasFilterType>({
    keyword: undefined,
    status: undefined,
  });
