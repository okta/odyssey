import type { CommandModule } from "yargs";

import { sync } from "./sync.js";

const syncCommand: CommandModule = {
  command: "sync",
  describe: "Sync contributionsMetadata.json with exported components",
  handler: async () => {
    await sync();
  },
};

export const contributionsCommand: CommandModule = {
  command: "contributions <command>",
  describe: "Tools for managing Contributions packages",
  builder: (yargs) => yargs.command(syncCommand).demandCommand(1),
  handler: () => {},
};
