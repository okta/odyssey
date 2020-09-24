#!/usr/bin/env node

const commandDir = process.env.COMMAND_DIR || '../commands';

require('yargs')
  .usage('Usage: $0 <command> [options]')
  .demandCommand(1)
  .commandDir(commandDir)
  .help()
  .argv;
