import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { beforeEach, describe, expect, vi } from "vitest";

import { buildTranslationsJsonCommand } from "./buildTranslationsJson";

// --- Mock the File System ---
vi.mock("node:fs/promises");
const mockedMkdir = vi.mocked(mkdir);
const mockedReaddir = vi.mocked<(path: string) => Promise<string[]>>(readdir);
const mockedReadFile = vi.mocked(readFile);
const mockedWriteFile = vi.mocked(writeFile);
const mockedRm = vi.mocked(rm);

vi.mock("node:fs");
const mockedExistsSync = vi.mocked(existsSync);

const spyOnProcessCwd = vi.spyOn(process, "cwd");

describe("buildTranslationsJsonCommand", () => {
  const basePropertiesFile = "my-package.properties";
  const frPropertiesFile = "translations/my-package_fr.properties";
  const testPackagePath = "packages/contributions/my-package";

  beforeEach(() => {
    vi.clearAllMocks();

    spyOnProcessCwd.mockImplementation(() => testPackagePath);

    mockedReaddir.mockResolvedValue([
      basePropertiesFile,
      "translations",
      frPropertiesFile,
    ]);

    mockedReadFile.mockImplementation(async (filePath) => {
      if (typeof filePath !== "string") {
        throw new Error(
          `readFile mock only supports string paths, but received a ${typeof filePath}.`,
        );
      }

      if (filePath.endsWith(basePropertiesFile)) {
        return Promise.resolve(`test.label = Hello\ntest.ariaLabel = my-label`);
      }

      if (filePath.endsWith(frPropertiesFile)) {
        return Promise.resolve(
          `test.label = Bonjour\ntest.ariaLabel = my-label-fr`,
        );
      }

      throw new Error(`readFile mock called with unhandled path: ${filePath}`);
    });

    mockedExistsSync.mockReturnValue(true);
  });

  const getHandlerArgs = ({
    propertiesFilesPath = "src/properties",
    jsonOutputPath = "src/properties/ts",
  } = {}) => ({
    propertiesFilesPath,
    jsonOutputPath,
    _: [],
    $0: "test",
  });

  test("converts .properties files to translation files", async () => {
    await buildTranslationsJsonCommand.handler(getHandlerArgs());

    const outputDir = `${testPackagePath}/src/properties/ts`;
    expect(mockedRm).toHaveBeenCalledWith(outputDir, {
      recursive: true,
      force: true,
    });
    expect(mockedMkdir).toHaveBeenCalledWith(outputDir, { recursive: true });

    expect(mockedWriteFile).toHaveBeenCalledTimes(2);
    expect(mockedWriteFile).toHaveBeenCalledWith(
      "packages/contributions/my-package/src/properties/ts/my-package.ts",
      'export const translation = {"test.label":"Hello","test.ariaLabel":"my-label"} as const;',
    );
    expect(mockedWriteFile).toHaveBeenCalledWith(
      "packages/contributions/my-package/src/properties/ts/my-package_fr.ts",
      'export const translation = {"test.label":"Bonjour","test.ariaLabel":"my-label-fr"} as const;',
    );
  });

  test("throws an error if the source directory does not exist", async () => {
    mockedExistsSync.mockReturnValue(false);

    const propertiesFilesPath = "fake/source/path";
    await expect(
      buildTranslationsJsonCommand.handler(
        getHandlerArgs({ propertiesFilesPath }),
      ),
    ).rejects.toThrow(
      `Source directory does not exist: ${testPackagePath}/${propertiesFilesPath}`,
    );
  });

  test("throws an error if the source directory does not contain any properties files", async () => {
    mockedReaddir.mockResolvedValue(["translations", "ts"]);

    await expect(
      buildTranslationsJsonCommand.handler(getHandlerArgs()),
    ).rejects.toThrow("No `.properties` files found to convert.");
  });
});
