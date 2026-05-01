import { describe, expect, test } from "vitest";

import { calculateApiStabilityValidation } from "./calculateApiStabilityValidation.js";

const entry = {
  componentName: "Dialog",
  libraryName: "ud-components",
} as const;

describe(calculateApiStabilityValidation.name, () => {
  test("no changed files in the past month", () => {
    const result = calculateApiStabilityValidation({
      changedFiles: [],
      entry,
    });
    expect(result.isValid).toBe(true);
    expect(result.reason).toContain("no source file changes");
  });

  test("component .tsx file changed in the past month", () => {
    const result = calculateApiStabilityValidation({
      changedFiles: [
        "packages/contributions/ud-components/src/Dialog/Dialog.tsx",
      ],
      entry,
    });
    expect(result.isValid).toBe(false);
    expect(result.reason).toContain("Dialog");
  });

  test("component .ts file changed in the past month", () => {
    const result = calculateApiStabilityValidation({
      changedFiles: [
        "packages/contributions/ud-components/src/Dialog/Dialog.ts",
      ],
      entry,
    });
    expect(result.isValid).toBe(false);
  });

  test("only non-component files changed in the past month", () => {
    const result = calculateApiStabilityValidation({
      changedFiles: [
        "packages/contributions/ud-components/src/Dialog/Dialog.test.ts",
        "packages/contributions/ud-components/src/Dialog/Dialog.stories.tsx",
        "packages/contributions/ud-components/src/Dialog/types.ts",
        "packages/contributions/ud-components/src/i18n.generated/index.ts",
      ],
      entry,
    });
    expect(result.isValid).toBe(true);
  });

  test("git history unavailable", () => {
    const result = calculateApiStabilityValidation({
      changedFiles: null,
      entry,
    });
    expect(result.isValid).toBe(false);
    expect(result.reason).toContain("Could not check git history");
    expect(result.reason).toContain("Dialog");
  });
});
