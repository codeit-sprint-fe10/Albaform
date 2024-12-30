import { PostFormBody } from '@/types/form';

export const useTemporarySave = () => {
  const getData = (): PostFormBody | null => {
    if (typeof window === 'undefined') return null;
    const storedData = localStorage.getItem('tempData');
    return storedData ? JSON.parse(storedData) : null;
  };

  const saveData = (currentValues: PostFormBody) => {
    localStorage.setItem('tempData', JSON.stringify(currentValues));
  };

  const clearData = () => {
    localStorage.removeItem('tempData');
  };

  return { getData, saveData, clearData };
};
