import type { CommandModule } from "yargs";

import { ciMigrate, interactiveMigrate } from "./init.js";

type MigrateArgs = {
  components?: string;
  dryRun?: boolean;
  paths?: string[];
  updateOdyssey?: boolean;
};

const ODYSSEY_REACT_MUI_PACKAGE = "@okta/odyssey-react-mui";

export const migrateCommand: CommandModule<object, MigrateArgs> = {
  command: "migrate",
  describe:
    "Migrate contribution components to their Odyssey equivalents via codemods",
  builder: (yargs) =>
    yargs
      .option("paths", {
        describe: "File paths or globs to transform",
        type: "string",
        array: true,
      })
      .option("components", {
        describe:
          "Comma-separated component mapping keys (e.g. DataTable,Uploader)",
        type: "string",
      })
      .option("dryRun", {
        describe: "Preview changes without writing files",
        type: "boolean",
        default: false,
      })
      .option("updateOdyssey", {
        describe: `Update ${ODYSSEY_REACT_MUI_PACKAGE} to latest before running migrations`,
        type: "boolean",
        default: false,
      })
      .example(
        "$0 migrate src/ --components DataTable --dry-run",
        "Run DataTable migration in dry-run mode",
      )
      .example("$0 migrate", "Launch interactive migration wizard"),

  handler: async (args) => {
    if (args.components && args.paths?.length) {
      await ciMigrate({
        components: args.components,
        dryRun: args.dryRun ?? false,
        paths: args.paths,
        updateOdyssey: args.updateOdyssey ?? false,
      });
    } else {
      await interactiveMigrate();
    }
  },
};
