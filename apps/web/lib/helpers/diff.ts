import { diff as _diff } from "deep-object-diff";

/**
 * Calculates the difference between two objects.
 * @param obj1 - The first object.
 * @param obj2 - The second object.
 * @returns An object representing the difference between `obj1` and `obj2`.
 */
export function diff(obj1, obj2) {
  const arrays = Object.keys(obj1).filter((k) => Array.isArray(obj1[k]));
  const res = _diff(obj1, obj2);
  Object.keys(res)
    .filter((k) => arrays.includes(k))
    .forEach((k) => (res[k] = obj2[k]));
  return res;
}
