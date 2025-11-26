import yargs from "yargs";

import {
  buildTranslationsJsonCommand,
  generateI18nCommand,
  initI18nCommand,
} from "./commands";

export const buildParser = (argv: ReadonlyArray<string> | string) =>
  yargs(argv)
    .command(buildTranslationsJsonCommand)
    .command(generateI18nCommand)
    .command(initI18nCommand)
    .demandCommand(1, "You must provide a valid command.")
    .strict()
    .strictCommands()
    .help();
