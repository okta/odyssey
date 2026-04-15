import { describe, expect, test } from "vitest";

import {
  getBackwardsCompatibleColor,
  getContributionColor,
  getOdysseyColor,
} from "./scannerColors.js";

describe(getOdysseyColor.name, () => {
  test("first odyssey gets purple", () => {
    expect(getOdysseyColor(0)).toBe("#9b59b6");
  });

  test("returns different colors for different indices", () => {
    const colors = new Set(
      Array.from({ length: 7 }, (_, i) => getOdysseyColor(i)),
    );
    expect(colors.size).toBe(7);
  });

  test("cycles back to the start when index exceeds palette size", () => {
    expect(getOdysseyColor(7)).toBe(getOdysseyColor(0));
    expect(getOdysseyColor(8)).toBe(getOdysseyColor(1));
  });
});

describe(getBackwardsCompatibleColor.name, () => {
  test("returns pink", () => {
    expect(getBackwardsCompatibleColor()).toBe("#ec008c");
  });
});

describe(getContributionColor.name, () => {
  test("first contribution gets blue", () => {
    expect(getContributionColor(0)).toBe("#0073e6");
  });

  test("returns different colors for different indices", () => {
    const colors = new Set(
      Array.from({ length: 8 }, (_, i) => getContributionColor(i)),
    );
    expect(colors.size).toBe(8);
  });

  test("cycles back to the start when index exceeds palette size", () => {
    expect(getContributionColor(8)).toBe(getContributionColor(0));
    expect(getContributionColor(9)).toBe(getContributionColor(1));
  });
});
