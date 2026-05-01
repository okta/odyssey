import { join, relative } from "node:path";

import type { ContributionsMetadataEntry } from "../utils/metadata.js";
import type { ContributionsPromotionValidation } from "./contributionsPromotionValidation.js";

import { subtractMonths } from "../utils/date.js";
import { getFirstCommitDate as defaultGetFirstCommitDate } from "../utils/git.js";

export const AGE_THRESHOLD_MONTHS = 3;

export type AgeValidationArgs = {
  entry: ContributionsMetadataEntry;
  getFirstCommitDate?: (args: {
    filePath: string;
    repoRoot: string;
  }) => Promise<Date>;
  packageDir: string;
  repoRoot: string;
};

/**
 * Tries each file path in sequence, resolving with the first commit date
 * found. Short-circuits on the first success via `.catch` chaining so that
 * subsequent paths are only tried when the previous one yields no history.
 */
export const NO_FILE_PATHS_ERROR = "No file paths provided";

export const findFirstCommitDate = ({
  filePaths,
  getFirstCommitDate,
  repoRoot,
}: {
  filePaths: string[];
  getFirstCommitDate: (args: {
    filePath: string;
    repoRoot: string;
  }) => Promise<Date>;
  repoRoot: string;
}): Promise<Date> =>
  filePaths.reduce(
    (matchingDatePromise: Promise<Date>, filePath) =>
      matchingDatePromise.catch(() =>
        getFirstCommitDate({ filePath, repoRoot }),
      ),
    Promise.reject<Date>(new Error(NO_FILE_PATHS_ERROR)),
  );

/**
 * Checks whether a component has been a Contribution for at least 3 months.
 *
 * We inspect the git history of the component's source file or directory
 * (`src/<ComponentName>/`, `src/<ComponentName>.tsx`, or
 * `src/<ComponentName>.ts`) rather than contributionsMetadata.json, since all
 * metadata files were added in a single bulk commit.
 *
 * Both directory-per-component and flat-file structures are handled by trying
 * each file path in order.
 */
export const calculateAgeValidation = ({
  entry,
  getFirstCommitDate = defaultGetFirstCommitDate,
  packageDir,
  repoRoot,
}: AgeValidationArgs): Promise<ContributionsPromotionValidation> => {
  const componentBase = join(packageDir, "src", entry.componentName);
  const relativeBase = relative(repoRoot, componentBase);

  const filePaths = [relativeBase, `${relativeBase}.tsx`, `${relativeBase}.ts`];

  return findFirstCommitDate({
    filePaths,
    getFirstCommitDate,
    repoRoot,
  }).then(
    (firstCommitDate) => {
      const thresholdDate = subtractMonths({
        date: new Date(),
        months: AGE_THRESHOLD_MONTHS,
      });
      const isValid = firstCommitDate <= thresholdDate;
      const dateString = firstCommitDate.toISOString().split("T")[0];

      return {
        isValid,
        reason: isValid
          ? `${entry.componentName} has been a contribution since ${dateString} (>= ${AGE_THRESHOLD_MONTHS} months)`
          : `${entry.componentName} was added on ${dateString}, which is less than ${AGE_THRESHOLD_MONTHS} months ago`,
      };
    },
    () => ({
      isValid: false,
      reason: `Could not determine git history for ${entry.componentName} in ${entry.libraryName}`,
    }),
  );
};
