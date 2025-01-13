import { isWithinInterval } from './date';

export const getRecruitingStatus = (startDate: string, EndDate: string) => {
  return isWithinInterval(new Date(), {
    start: new Date(startDate),
    end: new Date(EndDate),
  })
    ? '모집 중'
    : '마감';
};
