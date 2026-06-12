import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";

import Fuse from "fuse.js";
import { z } from "zod/mini";

import type { AllComponentEntry } from "../metadata-types.js";

import { allComponentMetadata } from "../allComponentMetadata.generated.js";
import { registerTool } from "../utils/registration.js";

const CONTRIBUTIONS_NOTE =
  'Response includes components from contribution packages. Call get-guideline with topic "contributions" for required setup and usage guidelines.';

const componentSearchIndex = new Fuse(Object.values(allComponentMetadata), {
  keys: [
    { name: "name", weight: 2 },
    { name: "description", weight: 1 },
    { name: "packageName", weight: 0.5 },
  ],
});

type ComponentEntry = [string, AllComponentEntry];

type ComponentSummary = Pick<AllComponentEntry, "packageName" | "description">;
type ComponentDetail = Pick<
  AllComponentEntry,
  "packageName" | "description" | "props"
>;

const toComponentSummary = ([
  key,
  { packageName, description },
]: ComponentEntry): [string, ComponentSummary] => [
  key,
  { packageName, description },
];

const toComponentDetail = ([
  key,
  { packageName, description, props },
]: ComponentEntry): [string, ComponentDetail] => [
  key,
  { packageName, description, props },
];

const contributionsNote = (
  entries: readonly ComponentEntry[],
): string | undefined =>
  entries.some(([, entry]) => entry.isContribution)
    ? CONTRIBUTIONS_NOTE
    : undefined;

export const registerComponentTools = (server: McpServer): void => {
  registerTool({
    server,
    name: "list-components",
    config: {
      description:
        "Returns Odyssey React component names, descriptions, and packages in slim format (no props). " +
        'Pass packageName to filter by package (e.g. "@okta/odyssey-contributions-iga"). ' +
        "Use get-components to fetch full prop definitions for specific components.",
      inputSchema: {
        packageName: z.optional(z.string()).register(z.globalRegistry, {
          description:
            'Filter results to components from this package only (e.g. "@okta/odyssey-react-mui" or "@okta/odyssey-contributions-iga").',
        }),
      },
    },
    handler: ({ packageName }) => {
      const entries = Object.entries(allComponentMetadata).filter(
        ([, entry]) => !packageName || entry.packageName === packageName,
      );
      return {
        note: contributionsNote(entries),
        components: Object.fromEntries(entries.map(toComponentSummary)),
      };
    },
  });

  registerTool({
    server,
    name: "get-components",
    config: {
      description:
        "Returns full prop definitions for specific Odyssey components by name. " +
        "Use this after list-components or search-components to get the complete API for components you have identified.",
      inputSchema: {
        names: z.array(z.string()).register(z.globalRegistry, {
          description:
            'Component names to fetch (e.g. ["Button", "TextField"]). Matches by component name across all packages.',
        }),
      },
    },
    handler: ({ names }) => {
      const entries = Object.entries(allComponentMetadata).filter(
        ([key, entry]) => names.includes(entry.name) || names.includes(key),
      );
      return {
        note: contributionsNote(entries),
        components: Object.fromEntries(entries.map(toComponentDetail)),
      };
    },
  });

  registerTool({
    server,
    name: "search-components",
    config: {
      description:
        "Fuzzy-searches Odyssey components by name or description keyword. " +
        "Use this first when you need to discover which component fits a UI need — " +
        "returns slim results (name, description, packageName, no props). " +
        "Follow up with get-components to fetch full prop definitions for the components you identify.",
      inputSchema: {
        query: z.string().register(z.globalRegistry, {
          description:
            "Keyword to search in component names and descriptions (case-insensitive).",
        }),
      },
    },
    handler: ({ query }) =>
      componentSearchIndex.search(query).map((result) => ({
        name: result.item.name,
        description: result.item.description,
        packageName: result.item.packageName,
        ...(result.item.isContribution && {
          note: 'Note: This component is from a contributions package. Call get-guideline with topic "contributions" for required setup and usage guidelines.',
        }),
      })),
  });
};
