import {
  autocompleteMultiselect,
  cancel,
  confirm,
  group,
  intro,
  isCancel,
  note,
  outro,
  spinner,
  text,
} from "@clack/prompts";
import partition from "lodash.partition";
import pc from "picocolors";

import { COMPONENT_MAPPINGS } from "./mappings/index.js";
import { migrate } from "./migrate.js";
import {
  createLogger,
  formatMigrationLabel,
  getEligibleMappings,
  getInstalledDeps,
  ODYSSEY_MUI_PACKAGE,
  updateOdyssey,
} from "./utils.js";

/**
 * Runs the migration wizard in interactive mode.
 */
export const interactiveMigrate = async (): Promise<void> => {
  const logger = createLogger(false);
  intro(pc.bgCyan(pc.black(" odyssey-cli migrate ")));

  const shouldUpdateMui = await confirm({
    message: `Update ${ODYSSEY_MUI_PACKAGE} to latest before migrating?`,
    initialValue: true,
  });

  if (isCancel(shouldUpdateMui)) {
    cancel("Migration cancelled.");
    process.exit(0);
  }

  if (shouldUpdateMui) {
    const updateSpinner = spinner();
    updateSpinner.start(`Updating ${ODYSSEY_MUI_PACKAGE}...`);
    const updated = await updateOdyssey(logger);

    if (updated) {
      updateSpinner.stop(`${ODYSSEY_MUI_PACKAGE} updated to latest.`);
    } else {
      updateSpinner.stop(`Skipping dependency update.`);
    }
  }

  const { eligible, hidden } = getEligibleMappings(getInstalledDeps());

  for (const { key, reason } of hidden) {
    logger({ message: `Hiding migration "${key}": ${reason}`, type: "warn" });
  }

  const migrationOptions = eligible.map(({ key }) => {
    const mapping = COMPONENT_MAPPINGS[key];
    return {
      value: key,
      label: `${mapping.source.component} → ${mapping.target.component}`,
      hint: `${mapping.source.package} → ${mapping.target.package}`,
    };
  });

  if (migrationOptions.length === 0) {
    logger({
      message: "No component mappings found. Nothing to migrate.",
      type: "error",
    });
    outro("Done");
  } else {
    const answers = await group(
      {
        components: () =>
          autocompleteMultiselect({
            message: "Which component migrations do you want to run?",
            options: migrationOptions,
            required: true,
            placeholder: "Type to search...",
            maxItems: 5,
          }),
        paths: () =>
          text({
            message: "File paths or globs to transform (space-separated):",
            placeholder: "src/",
            validate: (answer) =>
              !answer?.trim() ? "At least one path is required." : undefined,
          }),
        dryRun: () =>
          confirm({
            message: "Dry run? (preview changes without writing files)",
            initialValue: true,
          }),
      },
      {
        onCancel: () => {
          cancel("Migration cancelled.");
          process.exit(0);
        },
      },
    );

    // Final confirmation before running migration
    note(
      [
        `Components: ${answers.components.map(formatMigrationLabel).join("\n            ")}`,
        `Paths:      ${pc.dim(answers.paths)}`,
        `Dry run:    ${answers.dryRun ? pc.yellow("yes") : pc.green("no")}`,
      ].join("\n"),
      "Migration plan",
    );

    const confirmed = await confirm({
      message: "Proceed with migration?",
    });

    if (isCancel(confirmed) || !confirmed) {
      cancel("Migration cancelled.");
      process.exit(0);
    }

    const migrationSpinner = spinner();
    migrationSpinner.start("Running codemod…");

    try {
      const result = await migrate({
        components: answers.components.join(","),
        dryRun: answers.dryRun,
        paths: answers.paths.split(/\s+/).filter(Boolean),
        logger,
      });

      if (result.success) {
        migrationSpinner.stop(
          answers.dryRun
            ? "Dry run complete — no files were modified."
            : `Migration complete! ${result.ok} file(s) updated.`,
        );
      } else {
        migrationSpinner.stop(
          `Migration finished with ${result.error} error(s).`,
        );
        process.exitCode = 1;
      }
    } catch (error) {
      logger({
        type: "error",
        message: `Migration failed: ${error instanceof Error ? error.message : String(error)}`,
      });
      migrationSpinner.stop("Migration failed.");
      process.exitCode = 1;
    }

    outro(pc.dim("Happy migrating! 🚀"));
  }
};

/**
 * Runs the migration in non-interactive (CI) mode.
 *
 * Validates the requested component keys, filters by version eligibility,
 * and executes the codemod. Sets `process.exitCode = 1` on any failure
 * (unknown keys, no eligible migrations, codemod errors).
 *
 * @param {object} args - The CI migration arguments.
 * @param {string} args.components - Comma-separated component mapping keys.
 * @param {boolean} args.dryRun - When true, preview changes without writing files.
 * @param {string[]} args.paths - File paths or globs to transform.
 * @param {boolean} args.updateOdyssey - Whether to update @okta/odyssey-react-mui before migrating.
 *
 * @example
 *  await ciMigrate({
 *    components: "DataTable,Uploader",
 *    dryRun: true,
 *    paths: ["src/"],
 *    updateOdyssey: false,
 *  });
 */
export const ciMigrate = async (args: {
  components: string;
  dryRun: boolean;
  paths: string[];
  updateOdyssey: boolean;
}): Promise<void> => {
  const logger = createLogger(true);
  if (args.updateOdyssey) {
    logger({
      type: "info",
      message: `Updating ${ODYSSEY_MUI_PACKAGE} to latest before migrating...`,
    });
    const updated = await updateOdyssey(logger);
    if (!updated) {
      process.exitCode = 1;
      return;
    }
  }

  const requestedKeys = args.components.split(",");

  const [knownKeys, unknownKeys] = partition(requestedKeys, (key) =>
    Boolean(COMPONENT_MAPPINGS[key]),
  );

  if (unknownKeys.length > 0) {
    logger({
      type: "error",
      message: `Unknown migration key(s): ${unknownKeys.join(", ")}`,
    });
    process.exitCode = 1;
    return;
  }

  const { eligible, hidden } = getEligibleMappings(
    getInstalledDeps(),
    knownKeys,
  );

  for (const { key, reason } of hidden) {
    logger({
      type: "warn",
      message: `Skipping "${key}": ${reason}`,
    });
  }

  if (eligible.length === 0) {
    logger({
      type: "error",
      message: "No eligible migrations to run after filtering.",
    });
    process.exitCode = 1;
    return;
  }

  try {
    const result = await migrate({
      components: eligible.map(({ key }) => key).join(","),
      dryRun: args.dryRun,
      paths: args.paths,
      logger,
    });

    if (result.success) {
      logger({
        type: "info",
        message: `Processed ${result.ok + result.nochange} file(s): ${result.ok} updated, ${result.nochange} unchanged, ${result.skip} skipped.`,
      });
    } else {
      logger({
        type: "error",
        message: `Codemod finished with ${result.error} error(s) across ${result.ok + result.nochange + result.error} file(s).`,
      });
      process.exitCode = 1;
    }
  } catch (error) {
    logger({
      type: "error",
      message: `Failed to run codemod: ${error instanceof Error ? error.message : String(error)}`,
    });
    process.exitCode = 1;
  }
};
