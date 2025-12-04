import yargs from "yargs";

import { i18nCommand } from "./commands";

export const buildParser = (argv: ReadonlyArray<string> | string) =>
  yargs(argv)
    .command(i18nCommand)
    .demandCommand(1, "You must provide a valid command.")
    .strict()
    .strictCommands()
    .help();
