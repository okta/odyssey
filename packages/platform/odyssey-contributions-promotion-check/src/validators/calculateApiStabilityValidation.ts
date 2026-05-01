import type { ContributionsMetadataEntry } from "../utils/metadata.js";
import type { ContributionsPromotionValidation } from "./contributionsPromotionValidation.js";

export const STABILITY_WINDOW = "1 month ago";

export type ApiStabilityValidationArgs = {
  changedFiles: string[] | null;
  entry: ContributionsMetadataEntry;
};

/**
 * Checks whether the component's own source file (ComponentName.ts or
 * ComponentName.tsx) has been unchanged for at least 1 month.
 *
 * Note: a more precise check would diff API Extractor's generated `.api.md`
 * reports, but those would need to be committed to the repo first.
 */
export const calculateApiStabilityValidation = ({
  changedFiles,
  entry,
}: ApiStabilityValidationArgs): ContributionsPromotionValidation => {
  if (changedFiles === null) {
    return {
      isValid: false,
      reason: `Could not check git history for ${entry.componentName} in ${entry.libraryName}`,
    };
  }

  const componentChanges = changedFiles.filter(
    (filePath) =>
      filePath.endsWith(`/${entry.componentName}.ts`) ||
      filePath.endsWith(`/${entry.componentName}.tsx`),
  );

  if (componentChanges.length === 0) {
    return {
      isValid: true,
      reason: `${entry.componentName} has had no source file changes in the last month`,
    };
  }

  return {
    isValid: false,
    reason: `${entry.componentName} source file has changed in the last month`,
  };
};
