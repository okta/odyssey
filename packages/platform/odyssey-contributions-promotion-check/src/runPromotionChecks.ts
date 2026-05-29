import { basename, join, relative } from "node:path";

import type { ComponentUsageSummaryEntry } from "./utils/uiStats.js";
import type { ContributionsPromotionValidation } from "./validators/contributionsPromotionValidation.js";

import { getChangesSince } from "./utils/git.js";
import {
  ContributionsMetadataEntry,
  extractMetadataFlags,
  findContributionsPackages,
  type MetadataFlags,
  readMetadataFile,
} from "./utils/metadata.js";
import { getComponentUsageSummary } from "./utils/uiStats.js";
import { calculateAgeValidation } from "./validators/calculateAgeValidation.js";
import {
  calculateApiStabilityValidation,
  STABILITY_WINDOW,
} from "./validators/calculateApiStabilityValidation.js";
import {
  calculateMetadataCompletenessValidation,
  type MetadataCompletenessViolation,
} from "./validators/calculateMetadataCompletenessValidation.js";
import { calculateUsageValidation } from "./validators/calculateUsageValidation.js";

type ComponentChecks = {
  age: ContributionsPromotionValidation;
  apiStability: ContributionsPromotionValidation;
  usage: ContributionsPromotionValidation;
};

export type ComponentReport = {
  checks: ComponentChecks;
  componentName: string;
  /**
   * Informational flags derived from metadata (e.g. similarTo, forkedFrom)
   * that surface additional context and may warrant manual review of this
   * component's promotion status.
   */
  flags: MetadataFlags;
  /**
   * True only when age, apiStability, and usage all pass.
   */
  isEligibleForPromotion: boolean;
  libraryName: string;
};

export type PromotionCheckReport = {
  /**
   * Components exported from a package's src/index.ts that are missing from
   * contributionsMetadata.json, or listed in metadata but no longer exported.
   * An empty array means all packages are complete.
   */
  completenessViolations: MetadataCompletenessViolation[];
  components: ComponentReport[];
  generatedAt: string;
};

const CONTRIBUTIONS_DIRECTORY_NAME = "packages/contributions";

const toPackageName = (libraryName: string): string =>
  `@okta/odyssey-contributions-${libraryName}`;

type CalculateComponentValidationArgs = {
  changedFiles: string[] | null;
  componentUsageSummary: ComponentUsageSummaryEntry[] | null;
  entry: ContributionsMetadataEntry;
  repoRoot: string;
};

const calculateComponentValidation = async ({
  changedFiles,
  componentUsageSummary,
  entry,
  repoRoot,
}: CalculateComponentValidationArgs): Promise<ComponentReport> => {
  const packageDir = join(
    repoRoot,
    CONTRIBUTIONS_DIRECTORY_NAME,
    entry.libraryName,
  );
  const skippedResult = {
    isValid: false,
    reason: `${entry.componentName} is marked as ignored from promotion${entry.ignoredFromPromotionReason ? ` — ${entry.ignoredFromPromotionReason}` : ""}`,
  };

  if (entry.isIgnoredFromPromotion) {
    return {
      checks: {
        age: skippedResult,
        apiStability: skippedResult,
        usage: skippedResult,
      },
      componentName: entry.componentName,
      flags: extractMetadataFlags(entry),
      isEligibleForPromotion: false,
      libraryName: entry.libraryName,
    };
  }

  const apiStability = calculateApiStabilityValidation({ changedFiles, entry });

  const [age, usage] = await Promise.all([
    calculateAgeValidation({ entry, packageDir, repoRoot }),
    calculateUsageValidation({
      entry,
      packageName: toPackageName(entry.libraryName),
      repoRoot,
      componentUsageSummary,
    }),
  ]);

  return {
    checks: {
      age,
      apiStability,
      usage,
    } satisfies ComponentChecks,
    componentName: entry.componentName,
    flags: extractMetadataFlags(entry),
    isEligibleForPromotion:
      age.isValid && apiStability.isValid && usage.isValid,
    libraryName: entry.libraryName,
  };
};

export type RunPromotionChecksArgs = {
  onWarn?: (message: string) => void;
  repoRoot: string;
};

/**
 * Discovers all contributions packages, runs all promotion checks for every
 * component, and returns a full report.
 */
export const runPromotionChecks = async ({
  onWarn = () => {},
  repoRoot,
}: RunPromotionChecksArgs): Promise<PromotionCheckReport> => {
  const contributionsDirectoryPath = join(
    repoRoot,
    CONTRIBUTIONS_DIRECTORY_NAME,
  );

  const packages = await findContributionsPackages(contributionsDirectoryPath);

  const packageResults = await Promise.all(
    packages.map(async ({ metadataPath, packageDir }) => {
      const [metadata, changedFiles, componentUsageSummary] = await Promise.all(
        [
          readMetadataFile(metadataPath),
          getChangesSince({
            dirPath: relative(repoRoot, join(packageDir, "src")),
            onWarn,
            repoRoot,
            since: STABILITY_WINDOW,
          }),
          getComponentUsageSummary({
            onWarn,
            packageName: toPackageName(basename(packageDir)),
          }),
        ],
      );

      const componentReports = await Promise.all(
        metadata.components.map((entry) =>
          calculateComponentValidation({
            changedFiles,
            componentUsageSummary,
            entry,
            repoRoot,
          }),
        ),
      );

      return {
        componentReports,
        completenessViolations: calculateMetadataCompletenessValidation({
          metadata,
          packageDir,
        }),
      };
    }),
  );

  return {
    generatedAt: new Date().toISOString(),
    components: packageResults.flatMap(
      ({ componentReports }) => componentReports,
    ),
    completenessViolations: packageResults.flatMap(
      ({ completenessViolations }) => completenessViolations,
    ),
  };
};
