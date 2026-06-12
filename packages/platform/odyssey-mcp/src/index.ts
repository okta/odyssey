import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";
import { createRequire } from "node:module";

import { registerResources } from "./resources/index.js";
import { registerTools } from "./tools/index.js";

const { version } = createRequire(import.meta.url)("../package.json") as {
  version: string;
};

export const createServer = (): McpServer => {
  const server = new McpServer(
    { name: "odyssey", version },
    {
      instructions: `
When using this MCP:
- Before implementing any component task, call list-guidelines to see available topics. If a topic is relevant to your task, call get-guideline with that topic to fetch the full guide before writing any code.
- Odyssey components have a restricted API that differs from MUI. Always verify accepted props via get-components before using a component. Call get-guideline with topic "odyssey-vs-mui" for known deviations.
- To see what a contributions package exports, call list-components with packageName (e.g. "@okta/odyssey-contributions-iga").
      `.trim(),
    },
  );

  registerResources(server);
  registerTools(server);

  return server;
};

const transport = new StdioServerTransport();
await createServer().connect(transport);
