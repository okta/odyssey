#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { buildTranslationsJsonCommand, generateI18nCommand } from "./commands";

yargs(hideBin(process.argv))
  .command(buildTranslationsJsonCommand)
  .command(generateI18nCommand)
  .demandCommand(1, "You must provide a valid command.")
  .strict()
  .strictCommands()
  .help()
  .parseAsync()
  .catch(console.error);
