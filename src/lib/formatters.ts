/**
 * Formats a date object to a localized string
 * @param date - The date to format
 * @param locale - The locale to use (default: "en-US")
 * @returns Formatted date string (e.g., "January 15, 2024")
 */
export function formatDate(date: Date, locale: string): string {
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Formats a number to a localized string
 * @param num - The number
 * @param locale - The locale to use (default: "en-US")
 * @returns Formatted number string (e.g., "1,234")
 */
export function formatNumber(num: number, locale: string): string {
  return num.toLocaleString(locale === "en" ? "en-US" : "de-CH");
}

/**
 * Sorts an array of items by date in descending order (newest first)
 * @param items - Array of items with a data.pubDate property
 * @returns Sorted array
 */
export function sortByDateDesc<T extends { data: { pubDate: Date } }>(
  items: T[],
): T[] {
  return items.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );
}
