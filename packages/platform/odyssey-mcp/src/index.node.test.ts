// Requires generated files to exist — run `yarn build` or `yarn generate:*` first.
// Verifies the MCP wire protocol: tools are registered, schemas validated,
// and responses correctly formatted as CallToolResult.
//
// JSON.parse returns `any` throughout this file — the no-unsafe-* rules are
// intentionally disabled here. The assertions themselves are the type checks.
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return */
import { Client } from "@modelcontextprotocol/sdk/client";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory";
import {
  type CallToolResult,
  type CompatibilityCallToolResult,
  CompatibilityCallToolResultSchema,
} from "@modelcontextprotocol/sdk/types";

import { createServer } from "./index.js";

// CompatibilityCallToolResult has a [x: string]: unknown index signature that
// makes result.content resolve as unknown even after narrowing. Cast to
// CallToolResult once here — our server never produces the legacy toolResult form.
const toolText = (result: CompatibilityCallToolResult): string => {
  const { content } = result as CallToolResult;
  const item = content[0];
  if (item.type !== "text") throw new Error("Expected text content item");
  return item.text;
};

const callTool = (
  client: Client,
  name: string,
  args: Record<string, unknown> = {},
) =>
  client.callTool({ name, arguments: args }, CompatibilityCallToolResultSchema);

describe("MCP server", () => {
  let client: Client;

  beforeAll(async () => {
    const server = createServer();
    const [serverTransport, clientTransport] =
      InMemoryTransport.createLinkedPair();
    await server.connect(serverTransport);
    client = new Client({ name: "test-client", version: "0.0.0" });
    await client.connect(clientTransport);
  });

  afterAll(async () => {
    await client.close();
  });

  describe("list-components", () => {
    test("returns all components without a filter", async () => {
      const result = await callTool(client, "list-components");
      expect(
        Object.keys(JSON.parse(toolText(result)).components).length,
      ).toBeGreaterThan(0);
    });

    test("filters to a specific package", async () => {
      const result = await callTool(client, "list-components", {
        packageName: "@okta/odyssey-react-mui",
      });
      const { components } = JSON.parse(toolText(result));
      expect(Object.keys(components).length).toBeGreaterThan(0);
      expect(
        Object.keys(components).every(
          (key) => components[key].packageName === "@okta/odyssey-react-mui",
        ),
      ).toBe(true);
    });

    test("returns empty components for an unknown package name", async () => {
      const result = await callTool(client, "list-components", {
        packageName: "@okta/nonexistent-package",
      });
      expect(JSON.parse(toolText(result)).components).toEqual({});
    });

    test("slim result has packageName and description but not props", async () => {
      const result = await callTool(client, "list-components", {
        packageName: "@okta/odyssey-react-mui",
      });
      const firstEntry = Object.values(
        JSON.parse(toolText(result)).components,
      )[0];
      expect(firstEntry).toHaveProperty("packageName");
      expect(firstEntry).toHaveProperty("description");
      expect(firstEntry).not.toHaveProperty("props");
    });

    test("no contributions note when filtering to core package", async () => {
      const result = await callTool(client, "list-components", {
        packageName: "@okta/odyssey-react-mui",
      });
      expect(JSON.parse(toolText(result)).note).toBeUndefined();
    });
  });

  describe("get-components", () => {
    test("returns full prop definitions for a known component name", async () => {
      const { components } = JSON.parse(
        toolText(
          await callTool(client, "get-components", { names: ["Button"] }),
        ),
      );
      expect(Object.keys(components).length).toBeGreaterThan(0);
      const firstKey = Object.keys(components)[0];
      expect(Array.isArray(components[firstKey].props)).toBe(true);
    });

    test("returns empty components for an unknown name", async () => {
      const result = await callTool(client, "get-components", {
        names: ["NonExistentComponent"],
      });
      expect(JSON.parse(toolText(result)).components).toEqual({});
    });

    test("names from list-components work in get-components (data contract)", async () => {
      const listed = JSON.parse(
        toolText(
          await callTool(client, "list-components", {
            packageName: "@okta/odyssey-react-mui",
          }),
        ),
      );
      const firstName = Object.keys(listed.components)[0];
      const fetched = JSON.parse(
        toolText(
          await callTool(client, "get-components", { names: [firstName] }),
        ),
      );
      expect(Object.keys(fetched.components).length).toBeGreaterThan(0);
    });
  });

  describe("search-components", () => {
    test("finds by exact component name", async () => {
      const result = await callTool(client, "search-components", {
        query: "Button",
      });
      expect(
        JSON.parse(toolText(result)).some(
          (entry: { name: string }) => entry.name === "Button",
        ),
      ).toBe(true);
    });

    test("finds by partial name", async () => {
      const result = await callTool(client, "search-components", {
        query: "text",
      });
      expect(JSON.parse(toolText(result)).length).toBeGreaterThan(0);
    });

    test("finds by description keyword", async () => {
      const result = await callTool(client, "search-components", {
        query: "navigation",
      });
      expect(JSON.parse(toolText(result)).length).toBeGreaterThan(0);
    });

    test("slim result has name, description, packageName but not props", async () => {
      const result = await callTool(client, "search-components", {
        query: "Button",
      });
      const firstEntry = JSON.parse(toolText(result))[0];
      expect(firstEntry).toHaveProperty("name");
      expect(firstEntry).toHaveProperty("description");
      expect(firstEntry).toHaveProperty("packageName");
      expect(firstEntry).not.toHaveProperty("props");
    });

    test("returns empty array when nothing matches", async () => {
      const result = await callTool(client, "search-components", {
        query: "zzzyyyxxx",
      });
      expect(JSON.parse(toolText(result))).toEqual([]);
    });
  });

  describe("list-tokens", () => {
    test("returns all tokens without a filter", async () => {
      const result = await callTool(client, "list-tokens");
      expect(Object.keys(JSON.parse(toolText(result))).length).toBeGreaterThan(
        0,
      );
    });

    test("filters to the given category", async () => {
      const all = JSON.parse(toolText(await callTool(client, "list-tokens")));
      const spacing = JSON.parse(
        toolText(
          await callTool(client, "list-tokens", { category: "spacing" }),
        ),
      );
      expect(Object.keys(spacing).length).toBeGreaterThan(0);
      expect(Object.keys(spacing).length).toBeLessThan(Object.keys(all).length);
      expect(
        Object.keys(spacing).every((name) =>
          name.toLowerCase().startsWith("spacing"),
        ),
      ).toBe(true);
    });

    test("category filter is case-insensitive", async () => {
      const lower = toolText(
        await callTool(client, "list-tokens", { category: "spacing" }),
      );
      const upper = toolText(
        await callTool(client, "list-tokens", { category: "SPACING" }),
      );
      expect(lower).toBe(upper);
    });

    test("returns empty object for an unknown category", async () => {
      const result = await callTool(client, "list-tokens", {
        category: "nonexistentcategory",
      });
      expect(JSON.parse(toolText(result))).toEqual({});
    });
  });

  describe("list-guidelines", () => {
    test("returns at least one guideline overview", async () => {
      const result = await callTool(client, "list-guidelines");
      expect(JSON.parse(toolText(result)).guidelines.length).toBeGreaterThan(0);
    });

    test("each overview has topic, label, description but not content", async () => {
      const result = await callTool(client, "list-guidelines");
      for (const overview of JSON.parse(toolText(result)).guidelines) {
        expect(overview).toHaveProperty("topic");
        expect(overview).toHaveProperty("label");
        expect(overview).toHaveProperty("description");
        expect(overview).not.toHaveProperty("content");
      }
    });
  });

  describe("get-guideline", () => {
    test("returns markdown body for contributions topic", async () => {
      const text = toolText(
        await callTool(client, "get-guideline", { topic: "contributions" }),
      );
      expect(text.length).toBeGreaterThan(0);
      expect(text).toContain("#");
    });

    test("all topics from list-guidelines work in get-guideline (data contract)", async () => {
      const { guidelines } = JSON.parse(
        toolText(await callTool(client, "list-guidelines")),
      );
      for (const { topic } of guidelines) {
        const result = await callTool(client, "get-guideline", { topic });
        expect(result.isError).not.toBe(true);
      }
    });

    test("error response for unknown topic includes available topics", async () => {
      const { guidelines } = JSON.parse(
        toolText(await callTool(client, "list-guidelines")),
      );
      const available = guidelines
        .map((g: { topic: string }) => g.topic)
        .join(", ");
      const result = await callTool(client, "get-guideline", {
        topic: "nonexistent-topic",
      });
      expect(result.isError).toBe(true);
      expect(toolText(result)).toBe(
        `Unknown topic "nonexistent-topic". Available topics: ${available}`,
      );
    });
  });

  describe("list-pictograms", () => {
    test("returns all pictograms without a filter", async () => {
      const parsed = JSON.parse(
        toolText(await callTool(client, "list-pictograms")),
      );
      expect(parsed.length).toBeGreaterThan(0);
      expect(parsed.every((name: string) => name.endsWith("Icon"))).toBe(true);
    });

    test("filters to icons category", async () => {
      const all = JSON.parse(
        toolText(await callTool(client, "list-pictograms")),
      );
      const icons = JSON.parse(
        toolText(
          await callTool(client, "list-pictograms", { category: "icons" }),
        ),
      );
      expect(icons.length).toBeGreaterThan(0);
      expect(icons.length).toBeLessThan(all.length);
    });

    test("filters to logos category", async () => {
      const logos = JSON.parse(
        toolText(
          await callTool(client, "list-pictograms", { category: "logos" }),
        ),
      );
      expect(logos.length).toBeGreaterThan(0);
    });

    test("icons and logos combined equal all pictograms", async () => {
      const [all, icons, logos] = await Promise.all([
        callTool(client, "list-pictograms"),
        callTool(client, "list-pictograms", { category: "icons" }),
        callTool(client, "list-pictograms", { category: "logos" }),
      ]).then((results) => results.map((r) => JSON.parse(toolText(r))));
      expect(icons.length + logos.length).toBe(all.length);
    });

    test("substring filter is case-insensitive", async () => {
      const lower = toolText(
        await callTool(client, "list-pictograms", { filter: "arrow" }),
      );
      const upper = toolText(
        await callTool(client, "list-pictograms", { filter: "ARROW" }),
      );
      expect(lower).toBe(upper);
      expect(JSON.parse(lower).length).toBeGreaterThan(0);
    });

    test("substring filter combined with category restricts results", async () => {
      const filtered = JSON.parse(
        toolText(
          await callTool(client, "list-pictograms", {
            category: "icons",
            filter: "arrow",
          }),
        ),
      );
      expect(
        filtered.every((name: string) => name.toLowerCase().includes("arrow")),
      ).toBe(true);
    });

    test("returns empty array when filter matches nothing", async () => {
      const result = await callTool(client, "list-pictograms", {
        filter: "zzzyyyxxx",
      });
      expect(JSON.parse(toolText(result))).toEqual([]);
    });
  });

  describe("list-component-migrations", () => {
    test("returns migrations with key, source, and target", async () => {
      const { migrations } = JSON.parse(
        toolText(await callTool(client, "list-component-migrations")),
      );
      expect(migrations.length).toBeGreaterThan(0);
      expect(migrations[0]).toHaveProperty("key");
      expect(migrations[0]).toHaveProperty("source");
      expect(migrations[0]).toHaveProperty("target");
    });
  });
});
