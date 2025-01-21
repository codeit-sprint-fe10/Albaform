import { useCallback } from 'react';
import { toast } from 'react-toastify';

export const useTemporarySave = <T>() => {
  const getData = useCallback((): T | null => {
    if (typeof window === 'undefined') return null;
    const storedData = localStorage.getItem('tempData');
    return storedData ? JSON.parse(storedData) : null;
  }, []);

  const saveData = (currentValues: T) => {
    localStorage.setItem('tempData', JSON.stringify(currentValues));
    toast.info('임시 저장되었습니다.');
  };

  const clearData = () => {
    localStorage.removeItem('tempData');
  };

  return { getData, saveData, clearData };
};
