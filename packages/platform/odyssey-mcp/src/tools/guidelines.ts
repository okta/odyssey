import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";

import { z } from "zod/mini";

import { findGuideline, guidelineOverviews } from "../guidelines/list.js";
import { registerTool } from "../utils/registration.js";

export const registerGuidelinesTools = (server: McpServer): void => {
  registerTool({
    server,
    name: "list-guidelines",
    config: {
      description:
        "Returns the list of available Odyssey guideline topics — slugs and descriptions only. " +
        "Call this first to discover topics; then call get-guideline with a specific topic to read the full Markdown body.",
    },
    handler: () => ({ guidelines: guidelineOverviews }),
  });

  registerTool({
    server,
    name: "get-guideline",
    config: {
      description:
        "Returns the full Markdown body of a specific Odyssey guideline topic. " +
        "Use list-guidelines first to discover available topic slugs.",
      responseType: "markdown",
      inputSchema: {
        topic: z.string().register(z.globalRegistry, {
          description:
            'Topic slug to retrieve (e.g. "contributions"). Use list-guidelines to see all available slugs.',
        }),
      },
    },
    handler: ({ topic }) => {
      const entry = findGuideline(topic);

      if (!entry) {
        const available = guidelineOverviews
          .map((guideline) => guideline.topic)
          .join(", ");
        throw new Error(
          `Unknown topic "${topic}". Available topics: ${available}`,
        );
      }

      return entry.content;
    },
  });
};
