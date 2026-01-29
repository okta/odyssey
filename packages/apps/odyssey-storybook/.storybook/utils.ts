/**
 * Creates an object composed of the picked object properties.
 */
export const pick = <T, K extends keyof T>(obj: T, keys: K[]) =>
  keys.reduce(
    (acc, key) => ({
      ...acc,
      [key]: obj[key],
    }),
    {} as Pick<T, K>,
  );
