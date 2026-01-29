import { ArgTypes } from "@storybook/react-vite";

/**
 * This utility ensures that every key in `T` exists in the object.
 * We use `-?` to make sure even optional props must be documented.
 */
export type StrictArgTypes<T> = {
  [K in keyof T]-?: ArgTypes<T>[K];
};
