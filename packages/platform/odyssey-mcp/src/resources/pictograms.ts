import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";

import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp";

import {
  allPictograms,
  pictogramsByCategory,
} from "../pictograms.generated.js";
import { registerResource } from "../utils/registration.js";

const isValidCategory = (
  category: string,
): category is keyof typeof pictogramsByCategory =>
  category in pictogramsByCategory;

const CATEGORY_CONTEXT = {
  icons: {
    description:
      "UI icons — monochrome SVGs that inherit color via currentColor. Intended for functional use inside UI controls: Button startIcon/endIcon, IconButton, IconWithTooltip, navigation items, status indicators, etc. Import from @okta/odyssey-react-mui.",
    usage: "functional UI controls",
  },
  logos: {
    description:
      "Brand/authenticator logos (Duo, Google Authenticator, Okta Verify, Persona, etc.) — full-color SVGs that preserve original brand colors. Intended to represent external services or authenticator apps, NOT to be used as decorative or functional icons inside UI controls.",
    usage: "external service or authenticator brand representation only",
  },
};

export const registerPictogramResources = (server: McpServer): void => {
  registerResource({
    server,
    name: "odyssey-pictograms",
    config: {
      description:
        "All Odyssey icons and logos (collectively called pictograms) — component names, categories, and usage guidance. Icons and logos serve different purposes and must not be used interchangeably.",
      mimeType: "application/json",
    },
    route: {
      uri: "odyssey://pictograms",
      handler: () => ({
        categories: CATEGORY_CONTEXT,
        pictograms: allPictograms,
      }),
    },
  });

  registerResource({
    server,
    name: "odyssey-pictograms-by-category",
    config: {
      description:
        "Odyssey icons or logos filtered by category. Use 'icons' for monochrome UI icons, 'logos' for brand/authenticator logos.",
      mimeType: "application/json",
    },
    route: {
      uri: new ResourceTemplate("odyssey://pictograms/{category}", {
        list: () => ({
          resources: Object.keys(pictogramsByCategory).map((category) => ({
            name: `Odyssey ${category}`,
            uri: `odyssey://pictograms/${category}`,
            mimeType: "application/json",
          })),
        }),
      }),
      handler: ({ category }) => {
        const categoryKey = String(category);

        if (!isValidCategory(categoryKey)) {
          throw new Error(
            `Pictogram category "${categoryKey}" not found. Available: ${Object.keys(pictogramsByCategory).join(", ")}`,
          );
        }

        return { pictograms: pictogramsByCategory[categoryKey] };
      },
    },
  });
};
