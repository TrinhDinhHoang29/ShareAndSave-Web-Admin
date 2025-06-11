// utils/formatDate.ts

export const formatDate = (
  date: string | Date,
  locale: string = "vi-VN",
  options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }
): string => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return "Invalid date";
  return parsedDate.toLocaleString(locale, options);
};
