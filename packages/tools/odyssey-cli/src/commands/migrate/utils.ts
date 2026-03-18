import { log } from "@clack/prompts";
import partition from "lodash.partition";
import { existsSync } from "node:fs";
import path from "node:path";
import { styleText } from "node:util";
import readPackageUp from "read-pkg-up";
import { coerce, gte } from "semver";

import { execAsync } from "../../utils.js";
import { COMPONENT_MAPPINGS } from "./mappings/index.js";

export const ODYSSEY_MUI_PACKAGE = "@okta/odyssey-react-mui";

/**
 * Checks whether a declared package version satisfies a minimum version requirement.
 *
 * Both versions are coerced via `semver.coerce` to handle range specifiers
 * like `^2.0.0` or `~1.5.3`. Returns `false` if either version cannot be
 * parsed.
 *
 * @param declaredVersion - The version string from package.json (e.g. "^3.1.0").
 * @param minimumVersion - The minimum required version (e.g. "2.0.0").
 * @returns Whether the declared version is greater than or equal to the minimum.
 *
 * @example
 *  isSupportedVersion("^3.1.0", "2.0.0") // → true
 *  isSupportedVersion("^1.0.0", "2.0.0") // → false
 *  isSupportedVersion("not-a-version", "2.0.0") // → false
 */
const isSupportedVersion = (
  declaredVersion: string,
  minimumVersion: string,
): boolean => {
  if (declaredVersion.startsWith("workspace:")) {
    return true;
  }

  const coercedDeclared = coerce(declaredVersion) ?? false;
  const coercedRequired = coerce(minimumVersion) ?? false;
  return (
    coercedDeclared && coercedRequired && gte(coercedDeclared, coercedRequired)
  );
};

type MappingEntry = {
  key: string;
  reason?: string;
};

type EligibilityResult = {
  eligible: MappingEntry[];
  hidden: MappingEntry[];
};

/**
 * Filters component migration mappings by installed dependencies.
 *
 * @param installedDeps - A record of package names to version strings.
 * @param keys - Optional subset of mapping keys to evaluate.
 * @returns Eligible mapping keys and hidden mappings with their exclusion reasons.
 *
 * @example
 *  const deps = { "@okta/odyssey-react-mui": "^3.0.0" };
 *
 *  getEligibleMappings(deps, ["DataTable"])
 *  → { eligible: [{ key: "DataTable" }], hidden: [] }
 *
 *  getEligibleMappings({}, ["DataTable"])
 *  → { eligible: [], hidden: [{ key: "DataTable", reason: "..." }] }
 */
export const getEligibleMappings = (
  installedDeps: Record<string, string>,
  keys?: string[],
): EligibilityResult => {
  const entries = keys ?? Object.keys(COMPONENT_MAPPINGS);

  const results = entries.map((key) => {
    const mapping = COMPONENT_MAPPINGS[key];
    const { minimumVersion, package: targetPackage } = mapping.target;
    const declaredVersion =
      installedDeps[targetPackage] ??
      (targetPackage.startsWith(`${ODYSSEY_MUI_PACKAGE}/`)
        ? installedDeps[ODYSSEY_MUI_PACKAGE]
        : undefined);

    const isEligible =
      declaredVersion &&
      (!minimumVersion || isSupportedVersion(declaredVersion, minimumVersion));

    if (isEligible) {
      return { key };
    }

    const reason = !declaredVersion
      ? `${targetPackage} not installed${minimumVersion ? ` (requires >= ${minimumVersion})` : ""}`
      : !coerce(declaredVersion)
        ? `${targetPackage} version "${declaredVersion}" could not be parsed`
        : `${targetPackage} ${declaredVersion} < required ${minimumVersion}`;

    return { key, reason };
  });

  const [eligible, hidden] = partition(results, (entry) => !entry.reason);
  return { eligible, hidden };
};

/**
 * Detects the package manager used in the current working directory.
 *
 * Checks for lock files first (yarn.lock, pnpm-lock.yaml, package-lock.json,
 * npm-shrinkwrap.json), then falls back to the `npm_config_user_agent`
 * environment variable. Defaults to "npm" when nothing matches.
 *
 * @returns {"yarn" | "pnpm" | "npm"} The detected package manager.
 *
 * @example
 *  In a directory with yarn.lock:
 *  getPackageManager() // → "yarn"
 *
 */
export const getPackageManager = (): "yarn" | "pnpm" | "npm" => {
  const cwd = process.cwd();
  if (existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  if (existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (
    existsSync(path.join(cwd, "package-lock.json")) ||
    existsSync(path.join(cwd, "npm-shrinkwrap.json"))
  ) {
    return "npm";
  }

  const userAgent = process.env.npm_config_user_agent ?? "";
  if (userAgent.startsWith("yarn/")) return "yarn";
  if (userAgent.startsWith("pnpm/")) return "pnpm";

  return "npm";
};

/**
 * Updates the Odyssey React MUI package to its latest version.
 *
 * Fetches the latest published version from the npm registry first, then
 * installs it with a caret range (`^x.y.z`). This avoids workspace-protocol
 * resolution (`workspace:*`) that can occur in monorepo setups when using
 * `@latest`.
 *
 * Detects the current package manager and runs the appropriate install
 * command. Returns `true` on success, `false` on failure (with an error
 * logged to stderr).
 *
 * @returns {Promise<boolean>} Whether the update succeeded.
 */
export const updateOdyssey = async (logger: Logger): Promise<boolean> => {
  let latestVersion: string;
  try {
    const { stdout } = await execAsync(
      `npm view ${ODYSSEY_MUI_PACKAGE} version`,
      { stdio: "pipe" },
    );
    latestVersion = stdout.trim();
    if (!latestVersion) {
      throw new Error(`No version returned`);
    }
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    logger({
      type: "error",
      message: `Failed to fetch latest version of ${ODYSSEY_MUI_PACKAGE}:\n${detail}`,
    });
    return false;
  }

  logger({
    type: "info",
    message: `Updating ${ODYSSEY_MUI_PACKAGE} to latest version ${latestVersion}...`,
  });

  const versionSpec = `${ODYSSEY_MUI_PACKAGE}@^${latestVersion}`;
  const packageManager = getPackageManager();
  const installCommand = {
    yarn: `yarn add ${versionSpec}`,
    pnpm: `pnpm add ${versionSpec}`,
    npm: `npm install ${versionSpec}`,
  } as const;

  const command = installCommand[packageManager];

  try {
    await execAsync(command, { stdio: "pipe" });
    return true;
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    logger({
      type: "error",
      message: `Failed to update ${ODYSSEY_MUI_PACKAGE}:\n${detail}`,
    });
    return false;
  }
};

/**
 * Reads the nearest package.json and returns a flat map of all declared dependencies.
 *
 * @returns {Record<string, string>} A record of package names to version strings.
 */
export const getInstalledDeps = (): Record<string, string> => {
  const pkg = readPackageUp.sync({
    cwd: process.cwd(),
    normalize: false,
  })?.packageJson;

  return {
    ...pkg?.dependencies,
    ...pkg?.devDependencies,
    ...pkg?.optionalDependencies,
    ...pkg?.peerDependencies,
  };
};

/**
 * Formats a component mapping key into a colorized migration label.
 *
 * @param {string} key - The component mapping key (e.g. "DataTable").
 * @returns {string} A colorized string like "DataTable → DataView (source-pkg → target-pkg)".
 */
export const formatMigrationLabel = (key: string): string => {
  const { source, target } = COMPONENT_MAPPINGS[key];
  return `${styleText("cyan", source.component)} → ${styleText("green", target.component)} ${styleText("dim", `(${source.package} → ${target.package})`)}`;
};

type LogType = "warn" | "info" | "error";

type LogLevel = LogType | "debug";

type Message = string | { details: string[]; title: string };

type EmitLog = {
  message: Message;
  options?: {
    indentation?: number;
  };
  type: LogLevel;
};

export type Logger = (args: EmitLog) => void;

const logColor = {
  warn: (message: string) => styleText("yellow", message),
  info: (message: string) => styleText("cyan", message),
  error: (message: string) => styleText("red", message),
  debug: (message: string) => styleText("dim", message),
} as const;

/**
 * Creates a logger function that emits colorized messages.
 *
 * @param isCI - Whether running in CI mode (affects formatting).
 * @param verbose - When false, suppresses debug-level messages.
 */
export const createLogger = (isCI: boolean, verbose = false): Logger => {
  return ({ message, type, options: { indentation = 0 } = {} }: EmitLog) => {
    const isDebug = type === "debug";
    const indent = " ".repeat(indentation);

    // Filter debug messages unless verbose is enabled
    if (isDebug && !verbose) {
      return;
    }

    const formattedMessage =
      typeof message === "string"
        ? message
        : `${styleText("bold", message.title)}\n${message.details.map((line) => styleText("yellow", `${indent} - ${line}`)).join("\n")}`;

    if (isCI) {
      console[type](`[migrateComponent] ${formattedMessage}`);
    } else {
      const colored = logColor[type](`${indent}${formattedMessage}`);

      if (isDebug) {
        log.message(colored, { symbol: styleText("dim", "○") });
      } else {
        log[type](colored);
      }
    }
  };
};
