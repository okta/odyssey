#!/usr/bin/env node

// To extend the default commands or create new commands, use the COMMAND_DIR
// environment variable to use a different directory.
const commandDir = process.env.COMMAND_DIR || '../commands';

require('yargs')
  .usage('Usage: $0 <command> [options]')
  .demandCommand(1)
  .commandDir(commandDir)
  .help()
  .argv;
