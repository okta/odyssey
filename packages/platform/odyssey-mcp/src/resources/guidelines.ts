import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";

import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp";

import { findGuideline, guidelineOverviews } from "../guidelines/list.js";
import { registerResource } from "../utils/registration.js";

export const registerGuidelinesResources = (server: McpServer): void => {
  registerResource({
    server,
    name: "odyssey-guidelines",
    config: {
      description:
        "Lists all available Odyssey guideline topics with their slugs and descriptions. Read odyssey://guidelines/{topic} for the full content of a specific topic.",
      mimeType: "application/json",
    },
    route: {
      uri: "odyssey://guidelines",
      handler: () => ({ guidelines: guidelineOverviews }),
    },
  });

  registerResource({
    server,
    name: "odyssey-guidelines-by-topic",
    config: {
      description:
        "Full Markdown guidelines for a specific Odyssey topic. Use odyssey://guidelines to discover available topic slugs.",
      mimeType: "text/markdown",
    },
    route: {
      uri: new ResourceTemplate("odyssey://guidelines/{topic}", {
        list: () => ({
          resources: guidelineOverviews.map((entry) => ({
            name: entry.label,
            uri: `odyssey://guidelines/${entry.topic}`,
            mimeType: "text/markdown",
          })),
        }),
      }),
      handler: ({ topic }) => {
        const topicKey = String(topic);
        const entry = findGuideline(topicKey);

        if (!entry) {
          const available = guidelineOverviews
            .map((guideline) => guideline.topic)
            .join(", ");
          throw new Error(
            `Unknown topic "${topicKey}". Available topics: ${available}`,
          );
        }

        return entry.content;
      },
    },
  });
};
