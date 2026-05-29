import { access, readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

export type ContributionsMetadataEntry = {
  componentName: string;
  /**
   * Why this component is excluded from promotion recommendations.
   * Required when `isIgnoredFromPromotion` is `true`.
   */
  ignoredFromPromotionReason?: "promoted" | "not feasible";
  /**
   * When `true`, this component is excluded from Odyssey Core promotion
   * recommendations. Omit this field entirely for components that are
   * eligible for promotion.
   */
  isIgnoredFromPromotion?: true;
  libraryName: string;
} & (
  | {
      forkedFrom?: never;
      /**
       * Components with different requirements but matching designs to
       * existing ones. References use the format "libraryName::ComponentName".
       */
      similarTo: string[];
    }
  | {
      /**
       * The component this was copy-pasted (forked) from. A code diff can be
       * run against the source to patch in upstream changes. References use
       * the format "libraryName::ComponentName".
       */
      forkedFrom: string;
      similarTo?: never;
    }
  | {
      forkedFrom?: never;
      similarTo?: never;
    }
);

export type ContributionsMetadataFile = {
  components: ContributionsMetadataEntry[];
};

export type ContributionsPackage = {
  /** Absolute path to the contributionsMetadata.json file */
  metadataPath: string;
  /** Absolute path to the package directory (e.g. .../packages/contributions/oin-components) */
  packageDir: string;
};

export type MetadataFlags = {
  forkedFrom?: string;
  similarTo?: string[];
};

/**
 * Returns the structured metadata flags for inclusion in the report's
 * `flags` object, regardless of whether the component is eligible.
 */
export const extractMetadataFlags = (
  entry: ContributionsMetadataEntry,
): MetadataFlags => ({
  ...("forkedFrom" in entry && entry.forkedFrom
    ? { forkedFrom: entry.forkedFrom }
    : undefined),
  ...("similarTo" in entry && entry.similarTo
    ? { similarTo: entry.similarTo }
    : undefined),
});

export const METADATA_FILENAME = "contributionsMetadata.json";

/**
 * Finds all contributionsMetadata.json files one level under `contributionsDirectoryPath`
 * and returns their package info.
 *
 * Uses `access()` rather than `readFile()` for the existence check to avoid
 * reading and immediately discarding file contents.
 */
export const findContributionsPackages = (
  contributionsDirectoryPath: string,
): Promise<ContributionsPackage[]> =>
  readdir(contributionsDirectoryPath, { withFileTypes: true }).then(
    (entries) => {
      const subdirectories = entries.filter((directoryEntry) =>
        directoryEntry.isDirectory(),
      );

      return Promise.all(
        subdirectories.map((directory) => {
          const packageDir = join(contributionsDirectoryPath, directory.name);
          const metadataPath = join(packageDir, METADATA_FILENAME);

          return access(metadataPath).then(
            () => ({ metadataPath, packageDir }),
            () => null,
          );
        }),
      ).then((packageResults) =>
        packageResults.filter(
          (packageOrNull): packageOrNull is ContributionsPackage =>
            packageOrNull !== null,
        ),
      );
    },
  );

/**
 * Reads and parses a contributionsMetadata.json file.
 */
export const readMetadataFile = (
  filePath: string,
): Promise<ContributionsMetadataFile> =>
  readFile(filePath, "utf8").then(
    (content) => JSON.parse(content) as ContributionsMetadataFile,
  );
