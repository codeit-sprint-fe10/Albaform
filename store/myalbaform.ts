import { MyAlbasFilterType } from '@/types/alba';
import { create } from 'zustand';

interface MyalbafromState {
  searchParams: MyAlbasFilterType;
  setSearchParams: (newSearchParams: Partial<MyAlbasFilterType>) => void;
}

const useMyalbaformStore = create<MyalbafromState>((set) => ({
  searchParams: {
    keyword: undefined,
    orderBy: 'mostRecent',
    isPublic: undefined,
    isRecruiting: undefined,
  },
  setSearchParams: (newSearchParams) =>
    set((state) => ({
      searchParams: { ...state.searchParams, ...newSearchParams },
    })),
}));

export default useMyalbaformStore;
