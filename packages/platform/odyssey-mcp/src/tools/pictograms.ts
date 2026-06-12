import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";

import { z } from "zod/mini";

import {
  allPictograms,
  pictogramsByCategory,
} from "../pictograms.generated.js";
import { registerTool } from "../utils/registration.js";

export const registerPictogramTools = (server: McpServer): void => {
  registerTool({
    server,
    name: "list-pictograms",
    config: {
      description:
        "Lists available Odyssey icon and logo component names (collectively called pictograms). Use this to find icon names for Button, IconButton, and other controls, or logo names for brand/authenticator representation. 'icons' are monochrome UI icons; 'logos' are full-color brand assets — do not use logos as UI icons.",
      inputSchema: {
        category: z
          .optional(z.enum(["icons", "logos"]))
          .register(z.globalRegistry, {
            description:
              "Filter by category: 'icons' for UI icons, 'logos' for brand/authenticator logos.",
          }),
        filter: z.optional(z.string()).register(z.globalRegistry, {
          description:
            "Optional substring to filter icon or logo names (case-insensitive). E.g., 'arrow' returns all arrow variants.",
        }),
      },
    },
    handler: ({ category, filter }) => {
      const pictograms = category
        ? pictogramsByCategory[category]
        : allPictograms;

      return filter
        ? pictograms.filter((pictogram) =>
            pictogram.toLowerCase().includes(filter.toLowerCase()),
          )
        : pictograms;
    },
  });
};
