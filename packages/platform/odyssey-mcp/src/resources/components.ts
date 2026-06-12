import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";

import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp";

import { componentMetadata } from "../components.generated.js";
import { registerResource } from "../utils/registration.js";

const componentNames = Object.keys(componentMetadata).toSorted();

export const registerComponentResources = (server: McpServer): void => {
  registerResource({
    server,
    name: "odyssey-components",
    config: {
      description:
        "All Odyssey React components — names, descriptions, prop types, and variant values. Use odyssey://components/{name} for a single component.",
      mimeType: "application/json",
    },
    route: {
      uri: "odyssey://components",
      handler: () => ({
        components: componentNames,
        metadata: componentMetadata,
      }),
    },
  });

  registerResource({
    server,
    name: "odyssey-component-by-name",
    config: {
      description:
        "A single Odyssey component's description, props, and variant values.",
      mimeType: "application/json",
    },
    route: {
      uri: new ResourceTemplate("odyssey://components/{name}", {
        list: () => ({
          resources: componentNames.map((componentName) => ({
            name: `Odyssey component — ${componentName}`,
            uri: `odyssey://components/${componentName}`,
            mimeType: "application/json",
          })),
        }),
      }),
      handler: ({ name }) => {
        const componentName = String(name);
        const component = componentMetadata[componentName];

        if (!component) {
          throw new Error(`Component "${componentName}" not found.`);
        }

        return { name: componentName, ...component };
      },
    },
  });
};
