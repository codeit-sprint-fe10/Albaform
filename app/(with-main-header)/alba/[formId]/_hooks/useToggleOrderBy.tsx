import { useState } from 'react';
import { orderByType, orderByTypes } from '@/types/application';

const useToggleOrderBy = (
  initialValue: orderByType,
): [orderByType, () => void] => {
  const [value, setValue] = useState<orderByType>(initialValue);

  const toggle = () => {
    setValue((prev) =>
      prev === orderByTypes[0] ? orderByTypes[1] : orderByTypes[0],
    );
  };

  return [value, toggle];
};

export default useToggleOrderBy;
