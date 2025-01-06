export const addMonths = (date: Date, months: number): Date => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
};

export const format = (date: Date, formatStr: string): string => {
  const map: { [key: string]: string } = {
    yyyy: date.getFullYear().toString(),
    MM: String(date.getMonth() + 1).padStart(2, '0'),
    dd: String(date.getDate()).padStart(2, '0'),
  };
  return formatStr.replace(/yyyy|MM|dd/g, (matched) => map[matched]);
};

export const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const isSameDay = (date1: Date | null, date2: Date | null): boolean => {
  if (!date1 || !date2) return false;
  return date1.toDateString() === date2.toDateString();
};

export const isWithinInterval = (
  date: Date,
  { start, end }: { start: Date; end: Date },
): boolean => {
  return date >= start && date <= end;
};

export const isBeforeToday = (date: string) => {
  return new Date(date).getTime() < new Date().getTime();
};
