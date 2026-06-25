import type { FileInfo, API as JSCodeshiftAPI } from "jscodeshift";

import { type Logger } from "@okta/odyssey-prompts";
import jscodeshift from "jscodeshift";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

import transformer from "./transformer.js";

export { COMPONENT_MAPPINGS } from "./mappings/index.js";

const require = createRequire(import.meta.url);
type RunResult = {
  error: number;
  nochange: number;
  ok: number;
  skip: number;
  stats: Record<string, number>;
  timeElapsed: string;
};

type RunFn = (
  transformFile: string,
  paths: string[],
  options?: Record<string, unknown>,
) => Promise<RunResult>;

/**
 * jscodeshift doesn't expose its Runner from the package's public API or types
 * we have to use `require` to import it and assert the type.
 */
const { run } = require("jscodeshift/src/Runner") as { run: RunFn };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRANSFORMER_PATH = path.resolve(__dirname, "./transformer-bridge.cjs");

export type MigrationOptions = {
  components: string;
  dryRun: boolean;
  isCI?: boolean;
  logger: Logger;
  paths: string[];
  verbose: boolean;
};

export type MigrationResult = {
  error: number;
  nochange: number;
  ok: number;
  skip: number;
  success: boolean;
  timeElapsed: string;
};

const JSCODESHIFT_DEFAULTS = {
  extensions: "tsx,ts,jsx,js",
  gitignore: false,
  ignorePattern: [
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/coverage/**",
    "**/.next/**",
    "**/.cache/**",
  ],
  parser: "tsx",
  runInBand: true,
  silent: false,
  verbose: 0,
} as const;

/**
 * Runs jscodeshift against local file paths. Use when the caller has direct
 * filesystem access (CLI, local tooling). For hosted or remote contexts where
 * the filesystem is unavailable, use {@link migrateContent} instead.
 */
export const migrate = async ({
  dryRun,
  paths,
  components,
  isCI,
  logger,
  verbose,
}: MigrationOptions): Promise<MigrationResult> => {
  const { error, nochange, ok, skip, timeElapsed } = await run(
    TRANSFORMER_PATH,
    paths,
    {
      ...JSCODESHIFT_DEFAULTS,
      dry: dryRun,
      print: dryRun,
      components,
      isCI,
      logger,
      odysseyVerbose: verbose,
    },
  );

  return {
    error,
    nochange,
    ok,
    skip,
    success: error === 0,
    timeElapsed,
  };
};

export type MigrateSourceArgs = {
  components: string;
  filename?: string;
  logger: Logger;
  sourceCode: string;
};

export type MigrateSourceResult = {
  hasChanges: boolean;
  transformedCode: string;
};

/**
 * Transforms source code in memory without reading or writing files.
 * Intended for hosted/HTTP environments where the server has no access to
 * the caller's filesystem. The caller reads the file, passes its content here,
 * and writes the result back.
 *
 * @example
 * const { transformedCode } = migrateSource({
 *   components: "DataTable",
 *   sourceCode: fs.readFileSync("src/Table.tsx", "utf-8"),
 *   logger: myLogger,
 * });
 * fs.writeFileSync("src/Table.tsx", transformedCode);
 */
export const migrateSource = ({
  components,
  filename = "component.tsx",
  logger,
  sourceCode,
}: MigrateSourceArgs): MigrateSourceResult => {
  const j = jscodeshift.withParser("tsx");
  const fileInfo: FileInfo = { source: sourceCode, path: filename };
  const syntheticApi: JSCodeshiftAPI = {
    j,
    jscodeshift: j,
    stats: () => {},
    report: () => {},
  };
  const result = transformer(fileInfo, syntheticApi, { components, logger });
  return {
    transformedCode: result,
    hasChanges: result !== sourceCode,
  };
};
