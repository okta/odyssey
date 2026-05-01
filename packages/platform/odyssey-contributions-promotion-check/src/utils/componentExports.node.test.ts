import { createFsFromVolume, vol } from "memfs";
import ts from "typescript";
import { afterEach, describe, expect, test } from "vitest";

import { getExportedComponentNames } from "./componentExports.js";

const createMemfsCompilerHost = (): ts.CompilerHost => {
  const memFsInstance = createFsFromVolume(vol);
  const host = ts.createCompilerHost({});

  host.fileExists = (filePath) => memFsInstance.existsSync(filePath);

  host.readFile = (filePath) => {
    try {
      return memFsInstance.readFileSync(filePath, "utf8") as string;
    } catch {
      return undefined;
    }
  };

  host.directoryExists = (dirPath) => {
    try {
      return (
        memFsInstance.statSync(dirPath) as { isDirectory(): boolean }
      ).isDirectory();
    } catch {
      return false;
    }
  };

  return host;
};

describe(getExportedComponentNames.name, () => {
  afterEach(() => {
    vol.reset();
  });

  test("collects PascalCase names from named exports in internal files", () => {
    vol.fromJSON({
      "/virtual/index.ts": `export { Button, type ButtonProps } from "./Button.js";`,
      "/virtual/Button.tsx": `export const Button = () => null; export type ButtonProps = {};`,
    });

    expect(
      getExportedComponentNames("/virtual/index.ts", createMemfsCompilerHost()),
    ).toEqual(new Set(["Button"]));
  });

  test("follows `export *` and collects names from the target file", () => {
    vol.fromJSON({
      "/virtual/index.ts": `export * from "./components/index.js";`,
      "/virtual/components/index.ts": `
        export { Button, type ButtonProps } from "./Button.js";
        export { TextField, type TextFieldProps } from "./TextField.js";
      `,
    });

    expect(
      getExportedComponentNames("/virtual/index.ts", createMemfsCompilerHost()),
    ).toEqual(new Set(["Button", "TextField"]));
  });

  test("follows `export *` and collects direct value exports from target tsx file", () => {
    vol.fromJSON({
      "/virtual/index.ts": `export * from "./PageHeader/PageHeader.js";`,
      "/virtual/PageHeader/PageHeader.tsx": `export const PageHeader = () => null;`,
    });

    expect(
      getExportedComponentNames("/virtual/index.ts", createMemfsCompilerHost()),
    ).toEqual(new Set(["PageHeader"]));
  });

  test("skips re-exports from external packages", () => {
    vol.fromJSON({
      "/virtual/index.ts": `
        export { Button } from "./Button.js";
        export { OdysseyProvider as ComponentsProvider } from "@okta/odyssey-react-mui";
      `,
      "/virtual/Button.tsx": ``,
    });

    expect(
      getExportedComponentNames("/virtual/index.ts", createMemfsCompilerHost()),
    ).toEqual(new Set(["Button"]));
  });

  test("skips type-only exports", () => {
    vol.fromJSON({
      "/virtual/index.ts": `
        export { Button } from "./Button.js";
        export type { ButtonProps } from "./Button.js";
      `,
      "/virtual/Button.tsx": ``,
    });

    expect(
      getExportedComponentNames("/virtual/index.ts", createMemfsCompilerHost()),
    ).toEqual(new Set(["Button"]));
  });

  test("skips exports from i18n.generated files", () => {
    vol.fromJSON({
      "/virtual/index.ts": `
        export { Button } from "./Button.js";
        export { TranslationProvider } from "./i18n.generated/i18n.js";
      `,
      "/virtual/Button.tsx": ``,
      "/virtual/i18n.generated/i18n.ts": `export const TranslationProvider = () => null;`,
    });

    expect(
      getExportedComponentNames("/virtual/index.ts", createMemfsCompilerHost()),
    ).toEqual(new Set(["Button"]));
  });

  test("skips lowercase exports", () => {
    vol.fromJSON({
      "/virtual/index.ts": `export { Button, translate } from "./utils.js";`,
      "/virtual/utils.tsx": ``,
    });

    expect(
      getExportedComponentNames("/virtual/index.ts", createMemfsCompilerHost()),
    ).toEqual(new Set(["Button"]));
  });

  test("resolves aliased exports using the consumer-facing name", () => {
    vol.fromJSON({
      "/virtual/index.ts": `export { PatchedButton as Button } from "./Button.js";`,
      "/virtual/Button.tsx": ``,
    });

    expect(
      getExportedComponentNames("/virtual/index.ts", createMemfsCompilerHost()),
    ).toEqual(new Set(["Button"]));
  });

  test("returns empty set when index file does not exist", () => {
    expect(
      getExportedComponentNames(
        "/virtual/nonexistent.ts",
        createMemfsCompilerHost(),
      ),
    ).toEqual(new Set());
  });
});
