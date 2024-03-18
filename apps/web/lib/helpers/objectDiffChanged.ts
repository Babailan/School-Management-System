/**
 * Returns an object containing the properties that have changed between the original data and the changed data.
 * @param originalData - The original data object.
 * @param changedData - The changed data object.
 * @returns An object containing the properties that have changed.
 */
export function objectDiffChanged(originalData, changedData) {
  return Object.keys(changedData).reduce((acc, key) => {
    if (changedData[key] !== originalData[key]) {
      acc[key] = changedData[key];
    }
    return acc;
  }, {});
  // return Object.entries(changedData).reduce((acc, [key, value]) => {
  //   if (value !== originalData[key]) {
  //     acc[key] = value;
  //   }
  //   return acc;
  // }, {});
}
