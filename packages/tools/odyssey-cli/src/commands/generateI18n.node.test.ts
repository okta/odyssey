import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { generateI18nCommand } from "./generateI18n";

// --- Mock the File System ---
vi.mock("node:fs/promises");
const mockedMkdir = vi.mocked(mkdir);
const mockedReaddir = vi.mocked<(path: string) => Promise<string[]>>(readdir);
const mockedReadFile = vi.mocked(readFile);
const mockedWriteFile = vi.mocked(writeFile);

const spyOnProcessCwd = vi.spyOn(process, "cwd");

describe("generateI18nCommand", () => {
  beforeEach(() => {
    // Reset all mocks and the captured content before each test
    vi.clearAllMocks();

    spyOnProcessCwd.mockImplementation(
      () => "packages/contributions/my-package",
    );

    mockedReaddir.mockResolvedValue([
      "my-package.ts",
      "my-package_fr.ts",
      "my-package_pt_BR.ts",
    ]);

    mockedReadFile.mockImplementation(async (filePath) => {
      if (typeof filePath !== "string") {
        throw new Error(
          `readFile mock only supports string paths, but received a ${typeof filePath}.`,
        );
      }

      if (filePath.endsWith("package.json")) {
        return Promise.resolve(JSON.stringify({ name: "@okta/my-package" }));
      }
      if (filePath.endsWith("my-package.ts")) {
        return Promise.resolve(
          `export const translation = { hello: "Hello" };`,
        );
      }
      if (filePath.endsWith("my-package_fr.ts")) {
        return Promise.resolve(
          `export const translation = { hello: "Bonjour" };`,
        );
      }
      if (filePath.endsWith("my-package_pt_BR.ts")) {
        return Promise.resolve(`export const translation = { hello: "Olá" };`);
      }

      throw new Error(`readFile mock called with unhandled path: ${filePath}`);
    });
  });

  const getCapturedWrites = () => {
    return mockedWriteFile.mock.calls.reduce(
      (writtenFiles, [path, content]) => {
        const fileName = typeof path === "string" ? path.split("/").pop()! : "";
        const fileContent = typeof content === "string" ? content : "";

        return {
          ...writtenFiles,
          [fileName]: fileContent,
        };
      },
      {} as Record<string, string>,
    );
  };

  const getHandlerArgs = (defaultLanguageCode = "en") => ({
    defaultLanguageCode,
    _: [],
    $0: "test",
  });

  test("generates all i18n files correctly based on a virtual file system as odyssey-react-mui package", async () => {
    spyOnProcessCwd.mockImplementation(() => "packages/core/odyssey-react-mui");

    // --- ACT: Run the actual handler ---
    await generateI18nCommand.handler(getHandlerArgs());

    // --- ASSERT: Check the captured output ---
    expect(mockedMkdir).toHaveBeenCalledWith(
      expect.stringMatching(/src\/i18n\.generated$/),
      { recursive: true },
    );

    // Verify that writeFile was called 3 times
    expect(mockedWriteFile).toHaveBeenCalledTimes(3);

    const capturedWrites = getCapturedWrites();

    // Use snapshots to verify the content of each generated file.
    // Note that the keys should match the filenames created in the handler.
    expect(capturedWrites["i18n.resources.ts"]).toMatchSnapshot(
      "generated odyssey-react-mui variant of i18n.resources.ts file",
    );
    expect(capturedWrites["i18n.types.ts"]).toMatchSnapshot(
      "generated odyssey-react-mui variant of i18n.types.ts file",
    );
    expect(capturedWrites["i18n.ts"]).toMatchSnapshot(
      "generated odyssey-react-mui variant of i18n.ts file",
    );
  });

  test("generates all i18n files correctly based on virtual file system as contribution package", async () => {
    // --- ACT: Run the actual handler ---
    await generateI18nCommand.handler(getHandlerArgs());

    // --- ASSERT: Check the captured output ---
    expect(mockedMkdir).toHaveBeenCalledWith(
      expect.stringMatching(/src\/i18n\.generated$/),
      { recursive: true },
    );

    // Verify that writeFile was called 3 times
    expect(mockedWriteFile).toHaveBeenCalledTimes(3);
    const capturedWrites = getCapturedWrites();

    // Use snapshots to verify the content of each generated file.
    // Note that the keys should match the filenames created in the handler.
    expect(capturedWrites["i18n.resources.ts"]).toMatchSnapshot(
      "generated contributions variant of i18n.resources.ts file",
    );
    expect(capturedWrites["i18n.types.ts"]).toMatchSnapshot(
      "generated contributions variant of i18n.types.ts file",
    );
    expect(capturedWrites["i18n.ts"]).toMatchSnapshot(
      "generated contributions variant of i18n.ts file",
    );
  });

  test("throws error if there are duplicate language codes", async () => {
    try {
      // We expect this call to fail and throw an error
      await generateI18nCommand.handler(getHandlerArgs("fr"));
      // Fail test explicitly if our handler does NOT throw an error
      expect.fail(
        "SHOULD HAVE FAILED! Should have thrown an error but did not.",
      );
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      const message = (error as Error).message;

      expect(message).toContain(
        "Duplicate language codes found. This must be resolved before files can be generated.",
      );
      expect(message).toContain(
        '- Language Code "fr" was found in multiple files:',
      );
      expect(message).toContain("- my-package.ts");
      expect(message).toContain("- my-package_fr.ts");
      expect(message).toContain(
        "This often happens if a file like 'package-name_en.ts' exists and the default language is also 'en'.",
      );
    }
  });

  test("throws an error if there are no translation files", async () => {
    mockedReaddir.mockResolvedValue([]);

    await expect(generateI18nCommand.handler(getHandlerArgs())).rejects.toThrow(
      /No translation files found in/,
    );
  });

  test("throws an error if the package.json name is empty", async () => {
    mockedReadFile.mockImplementation(async (filePath) => {
      if (typeof filePath !== "string") {
        throw new Error(
          `readFile mock only supports string paths, but received a ${typeof filePath}.`,
        );
      }

      if (filePath.endsWith("package.json")) {
        return Promise.resolve(JSON.stringify({ name: "" }));
      }

      throw new Error(`readFile mock called with unhandled path: ${filePath}`);
    });

    await expect(generateI18nCommand.handler(getHandlerArgs())).rejects.toThrow(
      /No package name found in/,
    );
  });
});
