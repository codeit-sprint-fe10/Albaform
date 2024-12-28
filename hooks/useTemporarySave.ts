import { PostFormBody } from '@/types/form';
import { useEffect, useState } from 'react';

export const useTemporarySave = () => {
  const [formData, setFormData] = useState({});

  const saveData = (currentValues: PostFormBody) => {
    setFormData(currentValues);
    localStorage.setItem('tempData', JSON.stringify(currentValues));
  };

  const clearData = () => {
    localStorage.removeItem('tempData');
  };

  useEffect(() => {
    const savedData =
      typeof window !== 'undefined' ? localStorage.getItem('tempData') : null;
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  return { formData, saveData, clearData };
};
