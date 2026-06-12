import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";

import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp";

import { contributionsPackages } from "../contributions.generated.js";
import { registerResource } from "../utils/registration.js";

export const registerContributionResources = (server: McpServer): void => {
  registerResource({
    server,
    name: "odyssey-contribution-components-by-package",
    config: {
      description:
        "Components available in an Odyssey contribution package — includes forked-from and similar-to relationships.",
      mimeType: "application/json",
    },
    route: {
      uri: new ResourceTemplate(
        "odyssey://contributions/{packageName}/components",
        {
          list: () => ({
            resources: Object.keys(contributionsPackages).map(
              (packageName) => ({
                name: `Contribution components — ${packageName}`,
                uri: `odyssey://contributions/${encodeURIComponent(packageName)}/components`,
                mimeType: "application/json",
              }),
            ),
          }),
        },
      ),
      handler: ({ packageName }) => {
        const packageNameStr = decodeURIComponent(String(packageName));
        const packageEntry = contributionsPackages[packageNameStr];

        if (!packageEntry) {
          throw new Error(
            `Contribution package "${packageNameStr}" not found. Available: ${Object.keys(contributionsPackages).join(", ")}`,
          );
        }

        return packageEntry;
      },
    },
  });
};
