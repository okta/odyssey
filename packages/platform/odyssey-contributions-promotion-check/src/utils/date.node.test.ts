import { describe, expect, test } from "vitest";

import { subtractMonths } from "./date.js";

describe(subtractMonths.name, () => {
  test("subtracts months within the same year", () => {
    const result = subtractMonths({ date: new Date(2024, 5, 15), months: 2 });
    expect(result).toEqual(new Date(2024, 3, 15));
  });

  test("handles month underflow into the previous year", () => {
    const result = subtractMonths({ date: new Date(2024, 1, 10), months: 3 });
    expect(result).toEqual(new Date(2023, 10, 10));
  });

  test("clamps day to the last day of the target month", () => {
    // March 31 minus 1 month → Feb has no 31st
    const result = subtractMonths({ date: new Date(2024, 2, 31), months: 1 });
    expect(result).toEqual(new Date(2024, 1, 29)); // 2024 is a leap year
  });

  test("clamps day in a non-leap year", () => {
    // March 31 minus 1 month in a non-leap year → Feb 28
    const result = subtractMonths({ date: new Date(2023, 2, 31), months: 1 });
    expect(result).toEqual(new Date(2023, 1, 28));
  });

  test("subtracting 0 months returns a date equal to the input", () => {
    const date = new Date(2024, 6, 4);
    const result = subtractMonths({ date, months: 0 });
    expect(result).toEqual(date);
  });

  test("does not mutate the input date", () => {
    const date = new Date(2024, 6, 4);
    const original = date.getTime();
    subtractMonths({ date, months: 3 });
    expect(date.getTime()).toBe(original);
  });
});
