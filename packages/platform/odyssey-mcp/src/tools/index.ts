import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";

import { registerComponentTools } from "./components.js";
import { registerGuidelinesTools } from "./guidelines.js";
import { registerMigrationTools } from "./migrations.js";
import { registerPictogramTools } from "./pictograms.js";
import { registerTokenTools } from "./tokens.js";

export const registerTools = (server: McpServer) => {
  registerComponentTools(server);
  registerGuidelinesTools(server);
  registerMigrationTools(server);
  registerPictogramTools(server);
  registerTokenTools(server);
};
