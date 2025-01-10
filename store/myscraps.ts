import { create } from 'zustand';
import { MyScrapsFilterType } from '@/types/mypage';

interface MyScrapsState {
  scrapParams: MyScrapsFilterType;
  setScrapParams: (newScrapParams: Partial<MyScrapsFilterType>) => void;
}

const useMyScrapsStore = create<MyScrapsState>((set) => ({
  scrapParams: {
    orderBy: 'mostRecent',
    isPublic: undefined,
    isRecruiting: undefined,
  },
  setScrapParams: (newScrapParams) =>
    set((state) => ({
      scrapParams: { ...state.scrapParams, ...newScrapParams },
    })),
}));

export default useMyScrapsStore;
