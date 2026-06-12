import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";

import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp";

import {
  allTokenEntries,
  availableCategories,
  tokensByCategory,
} from "../tokens.generated.js";
import { registerResource } from "../utils/registration.js";

export const registerTokenResources = (server: McpServer): void => {
  registerResource({
    server,
    name: "odyssey-tokens",
    config: {
      description:
        "All Odyssey design tokens — names, values, and categories. Use odyssey://tokens/{category} to filter by category.",
      mimeType: "application/json",
    },
    route: {
      uri: "odyssey://tokens",
      handler: () => ({
        categories: availableCategories,
        tokens: Object.fromEntries(allTokenEntries),
      }),
    },
  });

  registerResource({
    server,
    name: "odyssey-tokens-by-category",
    config: {
      description:
        "Odyssey design tokens filtered by category (e.g. border, color, spacing, typography).",
      mimeType: "application/json",
    },
    route: {
      uri: new ResourceTemplate("odyssey://tokens/{category}", {
        list: () => ({
          resources: availableCategories.map((category) => ({
            name: `Odyssey tokens — ${category}`,
            uri: `odyssey://tokens/${category}`,
            mimeType: "application/json",
          })),
        }),
      }),
      handler: ({ category }) => {
        const categoryKey = String(category).toLowerCase();
        const tokens = tokensByCategory[categoryKey];

        if (!tokens) {
          throw new Error(
            `Token category "${categoryKey}" not found. Available: ${availableCategories.join(", ")}`,
          );
        }

        return tokens;
      },
    },
  });
};
