import { MyAlbasFilterType } from '@/types/alba';
import { create } from 'zustand';

interface MyScrapsState {
  searchParams: MyAlbasFilterType;
  setSearchParams: (newSearchParams: Partial<MyAlbasFilterType>) => void;
}

const useMyScrapsStore = create<MyScrapsState>((set) => ({
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

export default useMyScrapsStore;
