import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";

import { z } from "zod/mini";

import { allTokenEntries, tokensByCategory } from "../tokens.generated.js";
import { registerTool } from "../utils/registration.js";

export const registerTokenTools = (server: McpServer): void => {
  registerTool({
    server,
    name: "list-tokens",
    config: {
      description:
        "Returns Odyssey design tokens. Pass an optional category to filter (e.g. border, spacing, typography). Leave empty to return all tokens.",
      inputSchema: {
        category: z.optional(z.string()).register(z.globalRegistry, {
          description:
            "Token category to filter by (e.g. border, hue, palette, spacing, typography). Leave empty to return all tokens.",
        }),
      },
    },
    handler: ({ category }) => {
      const filtered = category
        ? Object.entries(tokensByCategory[category.toLowerCase()] ?? {})
        : allTokenEntries;

      return Object.fromEntries(filtered);
    },
  });
};
