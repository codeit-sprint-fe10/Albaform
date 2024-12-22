export const calculateDDay = (targetDate: string | Date): number => {
  const currentDate = new Date();
  const target = new Date(targetDate);

  const timeDifference = target.getTime() - currentDate.getTime();
  return Math.floor(timeDifference / (1000 * 3600 * 24));
};
