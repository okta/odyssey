import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";

import { COMPONENT_MAPPINGS, migrate } from "@okta/odyssey-cli/migrate";
import { z } from "zod/mini";

import { registerTool } from "../utils/registration.js";

type LogEntry = {
  message: string | { details: string[]; title: string };
  type: string;
};

const stderrLogger = ({ message, type }: LogEntry): void => {
  if (type === "debug") return;
  const text =
    typeof message === "string"
      ? message
      : `${message.title}: ${message.details.join(", ")}`;
  process.stderr.write(`[odyssey-mcp] ${text}\n`);
};

export const registerMigrationTools = (server: McpServer): void => {
  registerTool({
    server,
    name: "list-component-migrations",
    config: {
      description:
        "Returns all available Odyssey component migrations — each entry shows the source component being replaced and its target replacement.",
    },
    handler: () => ({
      migrations: Object.entries(COMPONENT_MAPPINGS).map(([key, mapping]) => ({
        key,
        source: {
          component: mapping.source.component,
          packages: mapping.source.packages,
        },
        target: {
          component: mapping.target.component,
          package: mapping.target.package,
        },
      })),
      howToRun:
        "Use the migrate-component tool with a migration key and file paths to execute a migration.",
      cliAlternative: "yarn odyssey-cli migrate",
    }),
  });

  registerTool({
    server,
    name: "migrate-component",
    config: {
      description: [
        "Migrates Odyssey component usage in the specified files, rewriting imports and remapping props to the new component's API.",
        "Use list-component-migrations first to see available migrations.",
        "",
        "The codemod handles the structural transformation automatically, but migrations between complex components",
        "are rarely perfect. After running, expect to manually fix issues such as: declaration ordering (variables",
        "referenced before they are defined), props placed at the wrong nesting level, dropped props that have no",
        "direct equivalent in the target API, incorrect or extraneous hook dependency arrays, and type mismatches",
        "introduced by the rewrite. Review the output carefully and treat the codemod as a first pass, not a final result.",
      ].join(" "),
      inputSchema: {
        migration: z.string().register(z.globalRegistry, {
          description:
            "The migration key to run (e.g. 'DataTable'). Use list-component-migrations to see available keys.",
        }),
        paths: z.array(z.string()).register(z.globalRegistry, {
          description:
            "File paths or directories to transform, relative to your current working directory (e.g. ['src/components/Table.tsx', 'src/']).",
        }),
        dryRun: z
          .prefault(z.optional(z.boolean()), false)
          .register(z.globalRegistry, {
            description:
              "When true, preview changes without writing files. Defaults to false.",
          }),
      },
    },
    handler: async ({ migration, paths, dryRun }) => {
      if (!(migration in COMPONENT_MAPPINGS)) {
        throw new Error(
          `Unknown migration key: "${migration}". Available: ${Object.keys(COMPONENT_MAPPINGS).join(", ")}`,
        );
      }

      return migrate({
        components: migration,
        dryRun,
        isCI: true,
        logger: stderrLogger,
        paths,
        verbose: false,
      });
    },
  });
};
