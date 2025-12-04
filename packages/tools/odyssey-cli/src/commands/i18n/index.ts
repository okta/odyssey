import type { CommandModule } from "yargs";

import { buildTsI18nCommand } from "./buildTs";
import { generateI18nCommand } from "./generate";
import { generatePseudoLocaleProperties } from "./generatePseudoLocaleProperties";
import { initI18nCommand } from "./init";

export const i18nCommand: CommandModule = {
  command: "i18n",
  describe: "A collection of i18n-related tools",
  builder: (yargs) =>
    yargs
      .command(buildTsI18nCommand)
      .command(generateI18nCommand)
      .command(generatePseudoLocaleProperties)
      .command(initI18nCommand)
      .demandCommand(1),
  handler: () => {
    // This handles the case where `odyssey-cli i18n` is run without a subcommand.
    // demandCommand will display user with the subcommands.
  },
};
