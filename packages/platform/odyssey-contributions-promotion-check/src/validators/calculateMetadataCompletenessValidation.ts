import { basename, join } from "node:path";

import type {
  ContributionsMetadataEntry,
  ContributionsMetadataFile,
} from "../utils/metadata.js";

import { getExportedComponentNames } from "../utils/componentExports.js";

export type MetadataCompletenessViolationKind =
  | "duplicate_entry"
  | "exported_but_missing_from_metadata"
  | "in_metadata_but_not_exported";

export type MetadataCompletenessViolation = {
  componentName: string;
  kind: MetadataCompletenessViolationKind;
  libraryName: string;
};

export type MetadataCompletenessValidationArgs = {
  getExportedNames?: (indexFilePath: string) => Set<string>;
  metadata: ContributionsMetadataFile;
  packageDir: string;
};

const createViolation =
  ({
    kind,
    libraryName,
  }: {
    kind: MetadataCompletenessViolationKind;
    libraryName: string;
  }) =>
  (componentName: string): MetadataCompletenessViolation => ({
    componentName,
    kind,
    libraryName,
  });

const extractMetadataComponentNames = (
  components: ContributionsMetadataEntry[],
) => {
  const metadataComponentNames = new Set<string>();
  const metadataDuplicateComponentNames = new Set<string>();

  for (const { componentName } of components) {
    if (metadataComponentNames.has(componentName)) {
      metadataDuplicateComponentNames.add(componentName);
    } else {
      metadataComponentNames.add(componentName);
    }
  }

  return {
    metadataComponentNames,
    metadataDuplicateComponentNames,
  };
};

/**
 * Checks that every PascalCase component exported from the package's
 * `src/index.ts` is listed in `contributionsMetadata.json`, and vice versa.
 *
 * Re-exports from external packages and infrastructure files (e.g.
 * i18n.generated) are excluded from the check automatically.
 */
export const calculateMetadataCompletenessValidation = ({
  getExportedNames = getExportedComponentNames,
  metadata,
  packageDir,
}: MetadataCompletenessValidationArgs): MetadataCompletenessViolation[] => {
  const indexFilePath = join(packageDir, "src", "index.ts");
  const libraryName = basename(packageDir);
  const exportedNames = getExportedNames(indexFilePath);

  const { metadataComponentNames, metadataDuplicateComponentNames } =
    extractMetadataComponentNames(metadata.components);

  return [
    ...Array.from(
      metadataDuplicateComponentNames,
      createViolation({ kind: "duplicate_entry", libraryName }),
    ),
    ...Array.from(exportedNames)
      .filter((componentName) => !metadataComponentNames.has(componentName))
      .map(
        createViolation({
          kind: "exported_but_missing_from_metadata",
          libraryName,
        }),
      ),
    ...Array.from(metadataComponentNames)
      .filter((componentName) => !exportedNames.has(componentName))
      .map(
        createViolation({ kind: "in_metadata_but_not_exported", libraryName }),
      ),
  ];
};
