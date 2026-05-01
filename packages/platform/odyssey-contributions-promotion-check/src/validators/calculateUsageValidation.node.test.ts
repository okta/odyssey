import { describe, expect, test } from "vitest";

import type { ContributionsMetadataEntry } from "../utils/metadata.js";
import type { ComponentUsageSummaryEntry } from "../utils/uiStats.js";

import {
  calculateUiStatsUsageValidation,
  calculateUsageValidation,
  calculateVariantCountValidation,
} from "./calculateUsageValidation.js";

const plainEntry: ContributionsMetadataEntry = {
  componentName: "Stepper",
  libraryName: "oin-components",
};

const forkedEntry: ContributionsMetadataEntry = {
  componentName: "Dialog",
  forkedFrom: "odyssey-react-mui::Dialog",
  libraryName: "ud-components",
};

const similarEntry: ContributionsMetadataEntry = {
  componentName: "PageHeader",
  libraryName: "workflows-components",
  similarTo: [
    "wp-components::PageHeader",
    "resource-access-policy-components::PageHeader",
  ],
};

const PACKAGE_NAME = "@okta/odyssey-contributions-oin-components";
const REPO_ROOT = "/repo";

const makeSummaryEntry = (
  overrides: Partial<ComponentUsageSummaryEntry> = {},
): ComponentUsageSummaryEntry => ({
  name: PACKAGE_NAME,
  version: "1.0.0",
  totalCount: 20,
  repoCount: 2,
  packageCount: 5,
  components: [],
  ...overrides,
});

const makeComponentUsage = (
  overrides: Partial<ComponentUsageSummaryEntry["components"][number]> = {},
): ComponentUsageSummaryEntry["components"][number] => ({
  name: "Stepper",
  totalCount: 1,
  usedInRepoCount: 1,
  usedInPackageCount: 1,
  ...overrides,
});

describe(calculateVariantCountValidation.name, () => {
  test("component with forkedFrom metadata", async () => {
    const result = await calculateVariantCountValidation({
      entry: forkedEntry,
      packageName: PACKAGE_NAME,
      repoRoot: REPO_ROOT,
    });
    expect(result.isValid).toBe(true);
    expect(result.reason).toContain("odyssey-react-mui::Dialog");
  });

  test("component with similarTo metadata", async () => {
    const result = await calculateVariantCountValidation({
      entry: similarEntry,
      packageName: PACKAGE_NAME,
      repoRoot: REPO_ROOT,
    });
    expect(result.isValid).toBe(true);
    expect(result.reason).toContain("2 similarTo reference(s)");
  });

  test("component with 3 version tags and no metadata", async () => {
    const result = await calculateVariantCountValidation({
      entry: plainEntry,
      getVersionTagCount: () => Promise.resolve(3),
      packageName: PACKAGE_NAME,
      repoRoot: REPO_ROOT,
    });
    expect(result.isValid).toBe(true);
    expect(result.reason).toContain("3 published version(s)");
  });

  test("component with exactly 2 version tags and no metadata", async () => {
    const result = await calculateVariantCountValidation({
      entry: plainEntry,
      getVersionTagCount: () => Promise.resolve(2),
      packageName: PACKAGE_NAME,
      repoRoot: REPO_ROOT,
    });
    expect(result.isValid).toBe(true);
  });

  test("component with 1 version tag and no metadata", async () => {
    const result = await calculateVariantCountValidation({
      entry: plainEntry,
      getVersionTagCount: () => Promise.resolve(1),
      packageName: PACKAGE_NAME,
      repoRoot: REPO_ROOT,
    });
    expect(result.isValid).toBe(false);
    expect(result.reason).toContain("only 1 published version(s)");
  });

  test("git tags unavailable and no metadata", async () => {
    const result = await calculateVariantCountValidation({
      entry: plainEntry,
      getVersionTagCount: () => Promise.reject(new Error("git error")),
      packageName: PACKAGE_NAME,
      repoRoot: REPO_ROOT,
    });
    expect(result.isValid).toBe(false);
    expect(result.reason).toContain("Could not retrieve version tags");
  });
});

describe(calculateUiStatsUsageValidation.name, () => {
  test("component used in 2 or more repos", () => {
    const result = calculateUiStatsUsageValidation({
      entry: plainEntry,
      componentUsageSummary: [
        makeSummaryEntry({
          components: [makeComponentUsage({ usedInRepoCount: 2 })],
        }),
      ],
    });
    expect(result.isValid).toBe(true);
  });

  test("component used more than 6 times total", () => {
    const result = calculateUiStatsUsageValidation({
      entry: plainEntry,
      componentUsageSummary: [
        makeSummaryEntry({
          components: [
            makeComponentUsage({ totalCount: 7, usedInRepoCount: 1 }),
          ],
        }),
      ],
    });
    expect(result.isValid).toBe(true);
  });

  test("neither repo count nor total usage meets threshold", () => {
    const result = calculateUiStatsUsageValidation({
      entry: plainEntry,
      componentUsageSummary: [
        makeSummaryEntry({
          components: [
            makeComponentUsage({ totalCount: 3, usedInRepoCount: 1 }),
          ],
        }),
      ],
    });
    expect(result.isValid).toBe(false);
    expect(result.reason).toContain("1 repos");
    expect(result.reason).toContain("3 total usages");
  });

  test("empty summary — both counts are zero", () => {
    const result = calculateUiStatsUsageValidation({
      entry: plainEntry,
      componentUsageSummary: [],
    });
    expect(result.isValid).toBe(false);
    expect(result.reason).toContain("0 repos");
    expect(result.reason).toContain("0 total usages");
  });

  test("multiple version entries — uses max repo count and aggregates total usage", () => {
    const result = calculateUiStatsUsageValidation({
      entry: plainEntry,
      componentUsageSummary: [
        makeSummaryEntry({
          version: "1.0.0",
          components: [
            makeComponentUsage({ totalCount: 3, usedInRepoCount: 1 }),
          ],
        }),
        makeSummaryEntry({
          version: "1.1.0",
          components: [
            makeComponentUsage({ totalCount: 4, usedInRepoCount: 3 }),
          ],
        }),
      ],
    });
    expect(result.isValid).toBe(true);
  });

  test("component not found in summary entries counts as zero usage", () => {
    const result = calculateUiStatsUsageValidation({
      entry: plainEntry,
      componentUsageSummary: [
        makeSummaryEntry({
          components: [
            makeComponentUsage({ name: "OtherComponent", totalCount: 20 }),
          ],
        }),
      ],
    });
    expect(result.isValid).toBe(false);
    expect(result.reason).toContain("0 total usages");
  });
});

describe(calculateUsageValidation.name, () => {
  test("component with forkedFrom metadata meets usage criteria", async () => {
    const result = await calculateUsageValidation({
      entry: forkedEntry,
      packageName: PACKAGE_NAME,
      repoRoot: REPO_ROOT,
      componentUsageSummary: [],
    });
    expect(result.isValid).toBe(true);
    expect(result.reason).toContain("odyssey-react-mui::Dialog");
  });

  test("component with similarTo metadata meets usage criteria", async () => {
    const result = await calculateUsageValidation({
      entry: similarEntry,
      packageName: PACKAGE_NAME,
      repoRoot: REPO_ROOT,
      componentUsageSummary: [],
    });
    expect(result.isValid).toBe(true);
  });

  test("at least one usage criterion met via version count", async () => {
    const result = await calculateUsageValidation({
      entry: plainEntry,
      getVersionTagCount: () => Promise.resolve(2),
      packageName: PACKAGE_NAME,
      repoRoot: REPO_ROOT,
      componentUsageSummary: [],
    });
    expect(result.isValid).toBe(true);
    expect(result.reason).toContain("2 published version(s)");
  });

  test("at least one usage criterion met via UI Stats", async () => {
    const result = await calculateUsageValidation({
      entry: plainEntry,
      getVersionTagCount: () => Promise.resolve(0),
      packageName: PACKAGE_NAME,
      repoRoot: REPO_ROOT,
      componentUsageSummary: [
        makeSummaryEntry({
          components: [makeComponentUsage({ usedInRepoCount: 2 })],
        }),
      ],
    });
    expect(result.isValid).toBe(true);
  });

  test("all usage criteria unmet", async () => {
    const result = await calculateUsageValidation({
      entry: plainEntry,
      getVersionTagCount: () => Promise.resolve(0),
      packageName: PACKAGE_NAME,
      repoRoot: REPO_ROOT,
      componentUsageSummary: [],
    });
    expect(result.isValid).toBe(false);
    expect(result.reason).toContain("0 published version(s)");
    expect(result.reason).toContain("0 repos");
    expect(result.reason).toContain("0 total usages");
  });
});
