import * as contributionsCheck from "@okta/odyssey-contributions-promotion-check";
import * as prompts from "@okta/odyssey-prompts";
import { vol } from "memfs";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { sync } from "./sync.js";

vi.mock("@okta/odyssey-contributions-promotion-check", () => ({
  calculateMetadataCompletenessValidation: vi.fn(),
  findContributionsPackages: vi.fn(),
  getExportedComponentNames: vi.fn(),
  METADATA_FILENAME: "contributionsMetadata.json",
  readMetadataFile: vi.fn(),
}));

vi.mock("@okta/odyssey-prompts", () => ({
  autocomplete: vi.fn(),
  autocompleteMultiselect: vi.fn(),
  cancel: vi.fn(),
  confirm: vi.fn(),
  group: vi.fn(),
  intro: vi.fn(),
  isCancel: vi.fn(() => false),
  log: { info: vi.fn(), warn: vi.fn() },
  note: vi.fn(),
  outro: vi.fn(),
  select: vi.fn(),
}));

const mockedContributions = vi.mocked(contributionsCheck);
const mockedPrompts = vi.mocked(prompts);

const testPackagePath = "/test-pkg";

describe(sync.name, () => {
  beforeEach(() => {
    vol.mkdirSync(testPackagePath, { recursive: true });
    vi.clearAllMocks();
    mockedContributions.findContributionsPackages.mockResolvedValue([
      {
        packageDir: testPackagePath,
        metadataPath: `${testPackagePath}/contributionsMetadata.json`,
      },
    ]);
    mockedPrompts.select.mockResolvedValue(testPackagePath);
  });

  test("all exported components already in metadata", async () => {
    mockedContributions.readMetadataFile.mockResolvedValue({
      components: [{ componentName: "ButtonA", libraryName: "test-pkg" }],
    });
    mockedContributions.getExportedComponentNames.mockReturnValueOnce(
      new Set(),
    ); // core index
    mockedContributions.calculateMetadataCompletenessValidation.mockReturnValue(
      [],
    );

    await sync();

    expect(mockedPrompts.note).toHaveBeenCalledWith(
      "All exported components are already in metadata.",
    );
    expect(mockedPrompts.outro).toHaveBeenCalledWith("Nothing to update.");
    expect(vol.toJSON()).toEqual({ [testPackagePath]: null });
  });

  test("missing components triggers prompts and writes updated file", async () => {
    mockedContributions.readMetadataFile.mockResolvedValue({
      components: [],
    });
    mockedContributions.getExportedComponentNames.mockReturnValueOnce(
      new Set(),
    ); // core index
    mockedContributions.calculateMetadataCompletenessValidation.mockReturnValue(
      [
        {
          kind: "exported_but_missing_from_metadata",
          componentName: "ButtonA",
          libraryName: "test-pkg",
        },
      ],
    );
    mockedPrompts.group.mockResolvedValue({
      isIgnored: false,
      isForked: false,
      forkedFrom: undefined,
      hasSimilar: false,
      similarTo: undefined,
    });

    await sync();

    expect(mockedPrompts.group).toHaveBeenCalledTimes(1);
    expect(vol.toJSON()).toEqual({
      [`${testPackagePath}/contributionsMetadata.json`]: `${JSON.stringify(
        { components: [{ componentName: "ButtonA", libraryName: "test-pkg" }] },
        null,
        2,
      )}\n`,
    });
    expect(mockedPrompts.outro).toHaveBeenCalledWith(
      "contributionsMetadata.json updated with 1 new entry.",
    );
  });
});
