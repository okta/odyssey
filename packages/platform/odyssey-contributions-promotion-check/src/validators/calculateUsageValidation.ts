import type { ContributionsMetadataEntry } from "../utils/metadata.js";
import type { ComponentUsageSummaryEntry } from "../utils/uiStats.js";
import type { ContributionsPromotionValidation } from "./contributionsPromotionValidation.js";

import { getVersionTagCount as defaultGetVersionTagCount } from "../utils/git.js";

const MIN_VERSION_COUNT = 2;
const MIN_REPO_COUNT = 2;
const MIN_TOTAL_USAGE_COUNT = 6;

export type ValidationArgs = {
  entry: ContributionsMetadataEntry;
  getVersionTagCount?: (args: {
    packageName: string;
    repoRoot: string;
  }) => Promise<number>;
  packageName: string;
  repoRoot: string;
};

export type UiStatsUsageValidationArgs = {
  componentUsageSummary: ComponentUsageSummaryEntry[] | null;
  entry: ContributionsMetadataEntry;
};

export type UsageValidationArgs = {
  componentUsageSummary: ComponentUsageSummaryEntry[] | null;
} & ValidationArgs;

/**
 * Checks whether at least 2 versions of this component exist across
 * Odyssey Contributions.
 *
 * forkedFrom and similarTo are positive signals here: if a component was
 * forked from another, or has a similar counterpart, that constitutes at
 * least 2 versions existing. If neither is set, we fall back to git tag
 * count matching `<packageName>@*`.
 */
export const calculateVariantCountValidation = async ({
  entry,
  getVersionTagCount = defaultGetVersionTagCount,
  packageName,
  repoRoot,
}: ValidationArgs): Promise<ContributionsPromotionValidation> => {
  if ("forkedFrom" in entry && entry.forkedFrom) {
    return {
      isValid: true,
      reason: `${entry.componentName} is forked from ${entry.forkedFrom}, indicating multiple versions exist`,
    };
  }

  if ("similarTo" in entry && entry.similarTo && entry.similarTo.length > 0) {
    return {
      isValid: true,
      reason: `${entry.componentName} has ${entry.similarTo.length} similarTo reference(s), indicating multiple versions exist`,
    };
  }

  try {
    const count = await getVersionTagCount({ packageName, repoRoot });
    const isValid = count >= MIN_VERSION_COUNT;

    return {
      isValid,
      reason: isValid
        ? `${entry.componentName} has ${count} published version(s) (>= ${MIN_VERSION_COUNT} required)`
        : `${entry.componentName} has only ${count} published version(s) (${MIN_VERSION_COUNT} required)`,
    };
  } catch {
    return {
      isValid: false,
      reason: `Could not retrieve version tags for ${entry.componentName} in ${entry.libraryName}`,
    };
  }
};

/**
 * Checks whether the component passes either of two UI Stats criteria:
 *   1. The component is used in at least 2 different repos (usedInRepoCount).
 *   2. The component has more than 6 total usages across the org (totalCount).
 *
 * Expects pre-fetched componentUsageSummary for the package — callers are responsible
 * for fetching once per package rather than once per component.
 */
export const calculateUiStatsUsageValidation = ({
  componentUsageSummary,
  entry,
}: UiStatsUsageValidationArgs): ContributionsPromotionValidation => {
  if (componentUsageSummary === null) {
    return {
      isValid: false,
      reason: `UI Stats unavailable for ${entry.componentName}`,
    };
  }

  const { maxRepoCount, componentTotalCount } = componentUsageSummary.reduce<{
    componentTotalCount: number;
    maxRepoCount: number;
  }>(
    (acc, summaryEntry) => {
      const componentUsage = summaryEntry.components.find(
        (component) => component.name === entry.componentName,
      );
      return {
        maxRepoCount: Math.max(
          acc.maxRepoCount,
          componentUsage?.usedInRepoCount ?? 0,
        ),
        componentTotalCount:
          acc.componentTotalCount + (componentUsage?.totalCount ?? 0),
      };
    },
    { maxRepoCount: 0, componentTotalCount: 0 },
  );

  if (
    maxRepoCount >= MIN_REPO_COUNT ||
    componentTotalCount > MIN_TOTAL_USAGE_COUNT
  ) {
    return {
      isValid: true,
      reason: `${entry.componentName} passes UI Stats checks for either repo count or total usage count`,
    };
  }

  return {
    isValid: false,
    reason:
      `${entry.componentName} does not pass UI Stats checks: ` +
      `used in ${maxRepoCount} repos (${MIN_REPO_COUNT} required); ` +
      `${componentTotalCount} total usages (<= ${MIN_TOTAL_USAGE_COUNT} required)`,
  };
};

/**
 * Runs all usage checks and resolves true if at least one succeeds.
 */
export const calculateUsageValidation = async ({
  componentUsageSummary,
  entry,
  getVersionTagCount,
  packageName,
  repoRoot,
}: UsageValidationArgs): Promise<ContributionsPromotionValidation> => {
  const uiStatsResult = calculateUiStatsUsageValidation({
    entry,
    componentUsageSummary,
  });
  const variantCountResult = await calculateVariantCountValidation({
    entry,
    getVersionTagCount,
    packageName,
    repoRoot,
  });

  const results = [uiStatsResult, variantCountResult];
  const passingResult = results.find((result) => result.isValid);

  if (passingResult) {
    return { isValid: true, reason: passingResult.reason };
  }

  return {
    isValid: false,
    reason: results.map((result) => result.reason).join("; "),
  };
};
