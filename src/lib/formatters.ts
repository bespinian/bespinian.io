/**
 * Formats a date object to a localized string
 * @param date - The date to format
 * @param locale - The locale to use (default: "en-US")
 * @returns Formatted date string (e.g., "January 15, 2024")
 */
export function formatDate(date: Date, locale = "en-US"): string {
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Sorts an array of items by date in descending order (newest first)
 * @param items - Array of items with a data.date property
 * @returns Sorted array
 */
export function sortByDateDesc<T extends { data: { date: Date } }>(
  items: T[],
): T[] {
  return items.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
