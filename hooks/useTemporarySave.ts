import { PostAlbaBody } from '@/types/alba';

export const useTemporarySave = () => {
  const getData = (): PostAlbaBody | null => {
    if (typeof window === 'undefined') return null;
    const storedData = localStorage.getItem('tempData');
    return storedData ? JSON.parse(storedData) : null;
  };

  const saveData = (currentValues: PostAlbaBody) => {
    localStorage.setItem('tempData', JSON.stringify(currentValues));
  };

  const clearData = () => {
    localStorage.removeItem('tempData');
  };

  return { getData, saveData, clearData };
};
