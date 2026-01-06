/**
 * Normalize a string for consistent comparisons and storage.
 *
 * This function:
 * - Trims leading and trailing whitespace,
 * - Converts the string to lower case,
 * - Collapses any consecutive whitespace characters (spaces, tabs, newlines, etc.) into a single space,
 * - Optionally replaces spaces with underscores.
 *
 * @param str - The input string to normalize.
 * @param replaceSpaces - If true, replaces spaces with underscores after normalization. Default: false.
 * @returns The normalized string.
 *
 * @example
 * // Returns: "hello world"
 * normalizeString("  Hello   World\n")
 *
 * @example
 * // Returns: "hello_world"
 * normalizeString("  Hello   World\n", true)
 */
export const normalizeString = (str: string, replaceSpaces = false): string => {
  const normalized = str.trim().toLowerCase().replace(/\s+/g, ' ');
  return replaceSpaces ? normalized.replace(/ /g, '_') : normalized;
};
