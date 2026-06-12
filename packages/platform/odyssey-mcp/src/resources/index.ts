import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";

import { registerComponentResources } from "./components.js";
import { registerContributionResources } from "./contributions.js";
import { registerGuidelinesResources } from "./guidelines.js";
import { registerPictogramResources } from "./pictograms.js";
import { registerTokenResources } from "./tokens.js";

export const registerResources = (server: McpServer) => {
  registerTokenResources(server);
  registerComponentResources(server);
  registerContributionResources(server);
  registerGuidelinesResources(server);
  registerPictogramResources(server);
};
