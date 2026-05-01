import { describe, expect, test } from "vitest";

import { subtractMonths } from "../utils/date.js";
import {
  calculateAgeValidation,
  findFirstCommitDate,
  NO_FILE_PATHS_ERROR,
} from "./calculateAgeValidation.js";

describe(findFirstCommitDate.name, () => {
  const date = new Date("2024-01-01");
  const REPO_ROOT = "/repo";

  test("rejects when no file paths are provided", async () => {
    await expect(
      findFirstCommitDate({
        filePaths: [],
        getFirstCommitDate: () => Promise.resolve(date),
        repoRoot: REPO_ROOT,
      }),
    ).rejects.toThrow(NO_FILE_PATHS_ERROR);
  });

  test("resolves with date from the first successful path", async () => {
    const result = await findFirstCommitDate({
      filePaths: ["src/Stepper", "src/Stepper.tsx"],
      getFirstCommitDate: () => Promise.resolve(date),
      repoRoot: REPO_ROOT,
    });
    expect(result).toEqual(date);
  });

  test("tries subsequent paths when earlier ones fail", async () => {
    const result = await findFirstCommitDate({
      filePaths: ["src/Stepper", "src/Stepper.tsx"],
      getFirstCommitDate: ({ filePath }) =>
        filePath.endsWith(".tsx")
          ? Promise.resolve(date)
          : Promise.reject(new Error("no history")),
      repoRoot: REPO_ROOT,
    });
    expect(result).toEqual(date);
  });

  test("rejects when all file paths fail", async () => {
    await expect(
      findFirstCommitDate({
        filePaths: ["src/Stepper", "src/Stepper.tsx"],
        getFirstCommitDate: () => Promise.reject(new Error("no history")),
        repoRoot: REPO_ROOT,
      }),
    ).rejects.toThrow("no history");
  });

  test("passes filePath and repoRoot to getFirstCommitDate", async () => {
    const result = await findFirstCommitDate({
      filePaths: ["src/Stepper"],
      getFirstCommitDate: ({ filePath, repoRoot }) =>
        filePath === "src/Stepper" && repoRoot === REPO_ROOT
          ? Promise.resolve(date)
          : Promise.reject(
              new Error(`unexpected args: ${filePath}, ${repoRoot}`),
            ),
      repoRoot: REPO_ROOT,
    });
    expect(result).toEqual(date);
  });
});

describe(calculateAgeValidation.name, () => {
  const entry = {
    componentName: "Stepper",
    libraryName: "oin-components",
  } as const;
  const now = new Date();
  const PACKAGE_DIR = "/repo/packages/contributions/oin-components";
  const REPO_ROOT = "/repo";

  test("component source directory older than 3 months", async () => {
    const fourMonthsAgo = subtractMonths({ date: now, months: 4 });
    const result = await calculateAgeValidation({
      entry,
      getFirstCommitDate: () => Promise.resolve(fourMonthsAgo),
      packageDir: PACKAGE_DIR,
      repoRoot: REPO_ROOT,
    });
    expect(result.isValid).toBe(true);
    expect(result.reason).toContain("Stepper");
  });

  test("component source directory added exactly 3 months ago today", async () => {
    const exactlyThreeMonthsAgo = subtractMonths({ date: now, months: 3 });
    const result = await calculateAgeValidation({
      entry,
      getFirstCommitDate: () => Promise.resolve(exactlyThreeMonthsAgo),
      packageDir: PACKAGE_DIR,
      repoRoot: REPO_ROOT,
    });
    expect(result.isValid).toBe(true);
  });

  test("component source directory added less than 3 months ago", async () => {
    const twoMonthsAgo = subtractMonths({ date: now, months: 2 });
    const result = await calculateAgeValidation({
      entry,
      getFirstCommitDate: () => Promise.resolve(twoMonthsAgo),
      packageDir: PACKAGE_DIR,
      repoRoot: REPO_ROOT,
    });
    expect(result.isValid).toBe(false);
    expect(result.reason).toContain("Stepper");
    expect(result.reason).toContain("less than 3 months ago");
  });

  test("flat .tsx file found when directory has no git history", async () => {
    const fourMonthsAgo = subtractMonths({ date: now, months: 4 });
    const result = await calculateAgeValidation({
      entry,
      getFirstCommitDate: ({ filePath }) =>
        filePath.endsWith(".tsx")
          ? Promise.resolve(fourMonthsAgo)
          : Promise.reject(new Error("no history for directory")),
      packageDir: PACKAGE_DIR,
      repoRoot: REPO_ROOT,
    });
    expect(result.isValid).toBe(true);
  });

  test("flat .ts file found when directory and .tsx have no git history", async () => {
    const fourMonthsAgo = subtractMonths({ date: now, months: 4 });
    const result = await calculateAgeValidation({
      entry,
      getFirstCommitDate: ({ filePath }) =>
        filePath.endsWith(".ts")
          ? Promise.resolve(fourMonthsAgo)
          : Promise.reject(new Error("no history")),
      packageDir: PACKAGE_DIR,
      repoRoot: REPO_ROOT,
    });
    expect(result.isValid).toBe(true);
  });

  test("git history unavailable for all file paths", async () => {
    const result = await calculateAgeValidation({
      entry,
      getFirstCommitDate: () => Promise.reject(new Error("git error")),
      packageDir: PACKAGE_DIR,
      repoRoot: REPO_ROOT,
    });
    expect(result.isValid).toBe(false);
    expect(result.reason).toContain("Could not determine git history");
    expect(result.reason).toContain("Stepper");
  });
});
