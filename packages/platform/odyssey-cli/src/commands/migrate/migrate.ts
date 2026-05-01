import { type Logger } from "@okta/odyssey-prompts";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

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
 * Entry point that runs jscodeshift.
 *
 * @param {MigrationOptions} options - The migration configuration.
 * @param {string} options.components - Comma-separated component mapping keys to apply.
 * @param {boolean} options.dryRun - When true, preview changes without writing files.
 * @param {string[]} options.paths - File paths or directories to transform.
 * @returns {Promise<MigrationResult>} The result of the migration, including
 *   file counts (`ok`, `nochange`, `error`, `skip`), a `success` flag, and
 *   the elapsed time.
 *
 * @example
 * Dry run — preview DataTable migration without writing files
 * const result = await migrate({
 *   components: "DataTable",
 *   dryRun: true,
 *   paths: ["src/"],
 * });
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
