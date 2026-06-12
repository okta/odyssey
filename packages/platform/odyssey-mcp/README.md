# @okta/odyssey-mcp

MCP (Model Context Protocol) server for the Odyssey design system. Exposes component metadata, design tokens, and migration codemods to AI coding assistants via the [Model Context Protocol](https://modelcontextprotocol.io) — no repository access required.

---

## Hosted server (recommended)

> **Note:** The hosted server URL and access provisioning are not yet finalized. This section will be updated when available. If you need the MCP server today, use the [npm package](#npm-package) section below.

Once available, add this to your MCP client config — no local install needed:

```json
{
  "mcpServers": {
    "odyssey": {
      "url": "https://TBD"
    }
  }
}
```

---

## npm package

### Prerequisites

- Node.js >= 22.0.0
- OCM installed and configured (`ocm status` should pass)
- The `@okta` npm scope configured to resolve from the internal Artifactory registry (`https://artifacts.aue1e.internal:443/artifactory/api/npm/npm-okta-master`). If you've worked with any internal `@okta` package before, this is likely already in place — via `.yarnrc.yml`, `.npmrc`, or another method. If not, add the scope to whichever config file your package manager reads:

  `.yarnrc.yml`:

  ```yaml
  npmScopes:
    okta:
      npmRegistryServer: "https://artifacts.aue1e.internal:443/artifactory/api/npm/npm-okta-master"
      npmAlwaysAuth: true
      npmAuthToken: "${NPM_TOKEN}"
  ```

  `.npmrc`:

  ```ini
  @okta:registry=https://artifacts.aue1e.internal:443/artifactory/api/npm/npm-okta-master
  //artifacts.aue1e.internal:443/artifactory/api/npm/npm-okta-master:_authToken=${NPM_TOKEN}
  ```

### Install

yarn (Berry):

```sh
NPM_TOKEN=$(ocm auth artifactory) yarn global add @okta/odyssey-mcp
```

npm:

```sh
NPM_TOKEN=$(ocm auth artifactory) npm install -g @okta/odyssey-mcp
```

pnpm:

```sh
NPM_TOKEN=$(ocm auth artifactory) pnpm add -g @okta/odyssey-mcp
```

### Add to your MCP client config

```json
{
  "mcpServers": {
    "odyssey": {
      "command": "odyssey-mcp"
    }
  }
}
```

### Updating

yarn (Berry):

```sh
NPM_TOKEN=$(ocm auth artifactory) yarn global add @okta/odyssey-mcp@latest
```

npm:

```sh
NPM_TOKEN=$(ocm auth artifactory) npm install -g @okta/odyssey-mcp@latest
```

pnpm:

```sh
NPM_TOKEN=$(ocm auth artifactory) pnpm update -g @okta/odyssey-mcp
```

Then restart your MCP client.

---

### Add a CLAUDE.md rule

Registering the MCP server is not enough on its own. Without explicit guidance, an agent may answer Odyssey questions from general knowledge, dig into compiled output in `node_modules`, or skip the MCP entirely. Add the following rule to instruct it to treat the MCP as the authoritative source for anything Odyssey-related:

```md
## Odyssey MCP

When the topic involves Odyssey — components, design tokens, icons, usage patterns, or
migrations — query the `odyssey` MCP server before looking anywhere else. Use
`list-components`, `search-components`, `get-components`, `list-tokens`, `list-guidelines`,
`get-guideline`, `list-pictograms`, `list-component-migrations`, or `migrate-component`
depending on what is needed. Do not read compiled output or node_modules to answer
Odyssey questions — the MCP exposes curated, up-to-date data specifically for this purpose.
```

Add it to your project's `CLAUDE.md` for project-scoped effect, or to `~/.claude/CLAUDE.md` to apply globally across all projects.

Or run the following to append the rule automatically:

```sh
cat >> ~/.claude/CLAUDE.md << 'EOF'

## Odyssey MCP

When the topic involves Odyssey — components, design tokens, icons, usage patterns, or
migrations — query the `odyssey` MCP server before looking anywhere else. Use
`list-components`, `search-components`, `get-components`, `list-tokens`, `list-guidelines`,
`get-guideline`, `list-pictograms`, `list-component-migrations`, or `migrate-component`
depending on what is needed. Do not read compiled output or node_modules to answer
Odyssey questions — the MCP exposes curated, up-to-date data specifically for this purpose.
EOF
```

---

## Resources

| URI                                                | Description                                                          |
| -------------------------------------------------- | -------------------------------------------------------------------- |
| `odyssey://components`                             | All components — names, descriptions, full prop types                |
| `odyssey://components/{name}`                      | Single component (e.g. `odyssey://components/Button`)                |
| `odyssey://tokens`                                 | All design tokens with values and available categories               |
| `odyssey://tokens/{category}`                      | Tokens by category (e.g. `color`, `spacing`, `typography`, `border`) |
| `odyssey://guidelines`                             | All available guideline topics with slugs and descriptions           |
| `odyssey://guidelines/{topic}`                     | Full Markdown guidelines for a specific topic (e.g. `contributions`) |
| `odyssey://pictograms`                             | All icons and logos with category context and usage guidance         |
| `odyssey://pictograms/{category}`                  | Icons or logos filtered by category (`icons` or `logos`)             |
| `odyssey://contributions/{packageName}/components` | Components in a specific contribution package                        |

---

## Tools

| Tool                        | Inputs                                                        | Description                                            |
| --------------------------- | ------------------------------------------------------------- | ------------------------------------------------------ |
| `list-components`           | `packageName?` (string)                                       | Component names and descriptions; filter by package    |
| `get-components`            | `names` (string[])                                            | Full prop definitions for specific components by name  |
| `search-components`         | `query` (string)                                              | Fuzzy-search components by name or description keyword |
| `list-tokens`               | `category?` (string)                                          | All tokens, optionally filtered by category            |
| `list-guidelines`           | —                                                             | Available guideline topics with slugs and descriptions |
| `get-guideline`             | `topic` (string)                                              | Full Markdown body for a specific guideline topic      |
| `list-pictograms`           | `category?` (`icons` or `logos`), `filter?` (string)          | Icon and logo names, optionally filtered               |
| `list-component-migrations` | —                                                             | Available component migrations with source/target info |
| `migrate-component`         | `migration` (string), `paths` (string[]), `dryRun?` (boolean) | Run a component migration codemod against file paths   |

---

## Structure

```text
packages/platform/odyssey-mcp/
├── scripts/
│   ├── generateMetadata.ts      build-time: parses odyssey-react-mui with ts-morph
│   ├── generateTokens.ts        build-time: extracts values from odyssey-design-tokens
│   ├── generatePictograms.ts    build-time: collects icon/logo component names
│   ├── generateContributions.ts build-time: indexes contribution package components
│   └── generateAllComponents.ts build-time: merges core + contribution metadata
├── src/
│   ├── index.ts              MCP server entry point (stdio transport)
│   ├── resources/
│   │   ├── components.ts     odyssey://components and odyssey://components/{name}
│   │   ├── tokens.ts         odyssey://tokens and odyssey://tokens/{category}
│   │   ├── guidelines.ts     odyssey://guidelines and odyssey://guidelines/{topic}
│   │   ├── pictograms.ts     odyssey://pictograms and odyssey://pictograms/{category}
│   │   └── contributions.ts  odyssey://contributions/{packageName}/components
│   ├── tools/
│   │   ├── components.ts     list-components, get-components, search-components
│   │   ├── tokens.ts         list-tokens
│   │   ├── guidelines.ts     list-guidelines
│   │   ├── pictograms.ts     list-pictograms
│   │   └── migrations.ts     list-component-migrations, migrate-component
│   └── utils/
│       └── registration.ts   custom registerTool / registerResource wrappers
└── dist/                     compiled output — this is what the MCP client runs
```

The build generates several files at build time:

- `src/components.generated.ts` — component prop metadata extracted from `odyssey-react-mui`
- `src/allComponentMetadata.generated.ts` — merged core + contributions metadata
- `src/tokens.generated.ts` — resolved token values from `odyssey-design-tokens`
- `src/pictograms.generated.ts` — icon and logo component names by category
- `src/contributions.generated.ts` — contribution package component indexes

---

## Adding a tool or resource

All tools and resources register through the wrappers in `src/utils/registration.ts`:

- `registerTool({ server, name, config, handler })` — `config` accepts `responseType?: "json" | "markdown"` (default `"json"`) alongside the standard SDK fields (`description`, `inputSchema`, `annotations`, etc.).
- `registerResource({ server, name, config, route })` — `route` is `{ uri: string, handler }` for a static resource or `{ uri: ResourceTemplate, handler }` for a templated resource. Static handlers receive no arguments; template handlers receive the URI template variables as a `Record<string, string | string[]>`.

The handler returns plain data; the wrapper formats the MCP response automatically. Throw on any failure — the MCP SDK converts thrown errors into the right protocol shape (`isError: true` for tools, JSON-RPC error for resources).

**Tool example:**

```ts
import { z } from "zod/mini";
import { registerTool } from "../utils/registration.js";

registerTool({
  server,
  name: "get-guideline",
  config: {
    description: "Returns the full Markdown body for a guideline topic.",
    responseType: "markdown",
    inputSchema: {
      topic: z
        .string()
        .register(z.globalRegistry, { description: "Topic slug." }),
    },
  },
  handler: ({ topic }) => {
    const entry = findGuideline(topic);
    if (!entry) throw new Error(`Unknown topic "${topic}".`);
    return entry.content;
  },
});
```

**Static resource example:**

```ts
import { registerResource } from "../utils/registration.js";

registerResource({
  server,
  name: "odyssey-guidelines",
  config: {
    description: "All guideline topics.",
    mimeType: "application/json",
  },
  route: {
    uri: "odyssey://guidelines",
    handler: () => ({ guidelines: guidelineOverviews }),
  },
});
```

**Templated resource example:**

```ts
import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp";
import { registerResource } from "../utils/registration.js";

registerResource({
  server,
  name: "odyssey-guidelines-by-topic",
  config: { description: "Guidelines for a topic.", mimeType: "text/markdown" },
  route: {
    uri: new ResourceTemplate("odyssey://guidelines/{topic}", {
      list: () => ({ resources: guidelineOverviews.map(...) }),
    }),
    handler: ({ topic }) => {
      const entry = findGuideline(String(topic));
      if (!entry) throw new Error(`Unknown topic "${String(topic)}".`);
      return entry.content;
    },
  },
});
```

The handler's last parameter (typed as `RequestHandlerExtra` from the SDK) carries per-request runtime context — auth, abort signal, session id. Thread it through if you need it; ignore it otherwise.

---

## Local development

```sh
# Full build including all workspace dependencies (first time, or after token/component changes)
yarn workspace @okta/odyssey-mcp build:deps

# Quick rebuild of only this package
yarn workspace @okta/odyssey-mcp build

# Build and open the MCP inspector
yarn workspace @okta/odyssey-mcp inspect
```

Requires Node.js >= 22.0.0.
