import { PostFormBody } from '@/types/form';
import { useState } from 'react';

export const useTemporarySave = () => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('tempData');
    return savedData ? JSON.parse(savedData) : {};
  });

  const saveData = (currentValues: PostFormBody) => {
    setFormData(currentValues);
    localStorage.setItem('tempData', JSON.stringify(currentValues));
  };

  const clearData = () => {
    localStorage.removeItem('tempData');
  };

  return { formData, saveData, clearData };
};
