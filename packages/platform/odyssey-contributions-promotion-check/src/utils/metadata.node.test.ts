import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, test } from "vitest";

import {
  type ContributionsMetadataEntry,
  extractMetadataFlags,
  findContributionsPackages,
  METADATA_FILENAME,
  readMetadataFile,
} from "./metadata.js";

describe(readMetadataFile.name, () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await mkdtemp(join(tmpdir(), "metadata-test-"));
  });

  afterEach(async () => {
    await rm(tempDir, { recursive: true });
  });

  test("reads and parses a valid metadata file", async () => {
    const metadata = {
      components: [{ componentName: "Stepper", libraryName: "oin-components" }],
    };
    const filePath = join(tempDir, METADATA_FILENAME);
    await writeFile(filePath, JSON.stringify(metadata));

    const result = await readMetadataFile(filePath);
    expect(result).toEqual(metadata);
  });
});

describe(findContributionsPackages.name, () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await mkdtemp(join(tmpdir(), "metadata-test-"));
  });

  afterEach(async () => {
    await rm(tempDir, { recursive: true });
  });

  test("returns packages whose subdirectory contains a metadata file", async () => {
    const packageDir = join(tempDir, "oin-components");
    await mkdir(packageDir);
    await writeFile(join(packageDir, METADATA_FILENAME), "{}");

    const result = await findContributionsPackages(tempDir);
    expect(result).toEqual([
      { metadataPath: join(packageDir, METADATA_FILENAME), packageDir },
    ]);
  });

  test("skips subdirectories without a metadata file", async () => {
    await mkdir(join(tempDir, "no-metadata"));

    const result = await findContributionsPackages(tempDir);
    expect(result).toEqual([]);
  });

  test("returns multiple packages when multiple subdirectories have metadata files", async () => {
    const packageDirA = join(tempDir, "pkg-a");
    const packageDirB = join(tempDir, "pkg-b");
    await mkdir(packageDirA);
    await mkdir(packageDirB);
    await writeFile(join(packageDirA, METADATA_FILENAME), "{}");
    await writeFile(join(packageDirB, METADATA_FILENAME), "{}");

    const result = await findContributionsPackages(tempDir);
    expect(result).toHaveLength(2);
    expect(result.map((pkg) => pkg.packageDir).sort()).toEqual(
      [packageDirA, packageDirB].sort(),
    );
  });
});

describe(extractMetadataFlags.name, () => {
  test("component with no flags", () => {
    const entry: ContributionsMetadataEntry = {
      componentName: "Stepper",
      libraryName: "oin-components",
    };

    expect(extractMetadataFlags(entry)).toEqual({});
  });

  test("component with forkedFrom", () => {
    const entry: ContributionsMetadataEntry = {
      componentName: "Dialog",
      forkedFrom: "odyssey-react-mui::Dialog",
      libraryName: "ud-components",
    };

    expect(extractMetadataFlags(entry).forkedFrom).toBe(
      "odyssey-react-mui::Dialog",
    );
  });

  test("component with multiple similarTo references", () => {
    const entry: ContributionsMetadataEntry = {
      componentName: "PageHeader",
      libraryName: "workflows-components",
      similarTo: [
        "resource-access-policy-components::PageHeader",
        "wp-components::PageHeader",
      ],
    };

    expect(extractMetadataFlags(entry).similarTo).toEqual([
      "resource-access-policy-components::PageHeader",
      "wp-components::PageHeader",
    ]);
  });
});
