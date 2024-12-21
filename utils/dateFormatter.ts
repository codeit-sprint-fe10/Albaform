export function formatFullDateTime(targetDate: string | Date): string {
  if (!targetDate) return '';

  const date =
    typeof targetDate === 'string' ? new Date(targetDate) : targetDate;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const secs = String(date.getSeconds()).padStart(2, '0');

  return `${year}.${month}.${day} ${hours}:${minutes}:${secs}`;
}

export function formatDate(targetDate: string | Date): string {
  if (!targetDate) return '';

  const date =
    typeof targetDate === 'string' ? new Date(targetDate) : targetDate;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
}
