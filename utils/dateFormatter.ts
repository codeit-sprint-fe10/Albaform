function formatDateParts(date: string | Date) {
  const targetDate = typeof date === 'string' ? new Date(date) : date;

  const year = String(targetDate.getFullYear());
  const month = String(targetDate.getMonth() + 1).padStart(2, '0');
  const day = String(targetDate.getDate()).padStart(2, '0');
  const hours = String(targetDate.getHours()).padStart(2, '0');
  const minutes = String(targetDate.getMinutes()).padStart(2, '0');
  const seconds = String(targetDate.getSeconds()).padStart(2, '0');

  return { year, month, day, hours, minutes, seconds };
}

export function formatFullDateTime(targetDate: string | Date): string {
  if (!targetDate) return '';

  const { year, month, day, hours, minutes, seconds } =
    formatDateParts(targetDate);

  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
}

export function formatDate(targetDate: string | Date): string {
  if (!targetDate) return '';

  const { year, month, day } = formatDateParts(targetDate);

  return `${year}.${month}.${day}`;
}

export function formatDateWithSpace(targetDate: string | Date): string {
  if (!targetDate) return '';

  const { year, month, day } = formatDateParts(targetDate);

  return `${year}. ${month}. ${day}`;
}

export function convertMonthsToYearsAndMonths(months: number): string {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const yearPart = years > 0 ? `${years}년` : '';
  const monthPart = remainingMonths > 0 ? `${remainingMonths}개월` : '';

  return `${yearPart} ${monthPart}`.trim();
}
