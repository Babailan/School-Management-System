/**
 * Converts a string into a regular expression search pattern.
 * The resulting pattern will match any string that contains all the words in the input string.
 *
 * @param string - The input string to convert.
 * @returns The regular expression search pattern.
 */
/**
 * Converts a string into a regular expression search pattern.
 * The resulting pattern will match any string that contains all the words in the input string.
 *
 * @param {string} string - The input string to convert.
 * @returns {RegExp} The regular expression search pattern.
 *
 * @remarks
 * This function is not recommended for use with large data sets, as it may result in performance issues.
 */
export default function stringToRegexSearch(string: string) {
  return string
    .split(/\s+/)
    .map((word) => `(?=.*\\b${word}.*\\b)`)
    .join("");
}
