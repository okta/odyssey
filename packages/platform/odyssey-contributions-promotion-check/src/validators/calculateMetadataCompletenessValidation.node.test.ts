import { describe, expect, test } from "vitest";

import { calculateMetadataCompletenessValidation } from "./calculateMetadataCompletenessValidation.js";

const PACKAGE_DIR = "/repo/packages/contributions/oin-components";

const makeMetadata = (componentNames: string[]) => ({
  components: componentNames.map((componentName) => ({
    componentName,
    libraryName: "oin-components",
  })),
});

describe(calculateMetadataCompletenessValidation.name, () => {
  test("returns no violations when exports match metadata exactly", () => {
    const violations = calculateMetadataCompletenessValidation({
      getExportedNames: () => new Set(["Button", "TextField"]),
      metadata: makeMetadata(["Button", "TextField"]),
      packageDir: PACKAGE_DIR,
    });
    expect(violations).toEqual([]);
  });

  test("reports exported component missing from metadata", () => {
    const violations = calculateMetadataCompletenessValidation({
      getExportedNames: () => new Set(["Button", "NewComponent"]),
      metadata: makeMetadata(["Button"]),
      packageDir: PACKAGE_DIR,
    });
    expect(violations).toEqual([
      {
        componentName: "NewComponent",
        kind: "exported_but_missing_from_metadata",
        libraryName: "oin-components",
      },
    ]);
  });

  test("reports metadata entry with no matching export", () => {
    const violations = calculateMetadataCompletenessValidation({
      getExportedNames: () => new Set(["Button"]),
      metadata: makeMetadata(["Button", "RemovedComponent"]),
      packageDir: PACKAGE_DIR,
    });
    expect(violations).toEqual([
      {
        componentName: "RemovedComponent",
        kind: "in_metadata_but_not_exported",
        libraryName: "oin-components",
      },
    ]);
  });

  test("reports violations in both directions simultaneously", () => {
    const violations = calculateMetadataCompletenessValidation({
      getExportedNames: () => new Set(["Button", "NewComponent"]),
      metadata: makeMetadata(["Button", "RemovedComponent"]),
      packageDir: PACKAGE_DIR,
    });
    expect(violations).toHaveLength(2);
    expect(violations).toContainEqual({
      componentName: "NewComponent",
      kind: "exported_but_missing_from_metadata",
      libraryName: "oin-components",
    });
    expect(violations).toContainEqual({
      componentName: "RemovedComponent",
      kind: "in_metadata_but_not_exported",
      libraryName: "oin-components",
    });
  });

  test("duplicate componentName entries in metadata", () => {
    const violations = calculateMetadataCompletenessValidation({
      getExportedNames: () => new Set(["Apple", "Button"]),
      metadata: makeMetadata(["Apple", "Button", "Button"]),
      packageDir: PACKAGE_DIR,
    });
    expect(violations).toEqual([
      {
        componentName: "Button",
        kind: "duplicate_entry",
        libraryName: "oin-components",
      },
    ]);
  });

  test("returns no violations for an empty package", () => {
    const violations = calculateMetadataCompletenessValidation({
      getExportedNames: () => new Set(),
      metadata: makeMetadata([]),
      packageDir: PACKAGE_DIR,
    });
    expect(violations).toEqual([]);
  });
});
