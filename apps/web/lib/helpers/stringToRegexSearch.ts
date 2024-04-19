/**
 * Converts a string into a regular expression search pattern.
 * The resulting pattern will match any string that contains all the words in the input string.
 *
 * @param string - The input string to convert into a regular expression search pattern.
 * @returns The regular expression search pattern.
 */
export default function stringToRegexSearch(
  string: string,
  toRegex: boolean = false
): string | RegExp {
  if (toRegex) {
    return string
      ? new RegExp(
          string
            .split(/\s+/)
            .map((word) => `(?=.*\\b${word}.*\\b)`)
            .join(""),
          "i"
        )
      : "";
  }
  return string
    ? string
        .split(/\s+/)
        .map((word) => `(?=.*\\b${word}.*\\b)`)
        .join("")
    : "";
}
