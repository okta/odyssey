# odyssey-contributions-promotion-check

Tooling for tracking Odyssey Contributions components and identifying candidates for promotion to `odyssey-react-mui` core.

The package provides:

- **Two CLIs** — a promotion eligibility checker for all contributions packages, and a targeted usage-detail lookup for a specific component
- **An ESLint plugin** — keeps each contributions package's `contributionsMetadata.json` in sync with its exports
- **A programmatic API** — exports the core check logic and metadata utilities for use in scripts

---

## Quick start

```bash
yarn workspace @okta/odyssey-contributions-promotion-check build:withDeps
yarn workspace @okta/odyssey-contributions-promotion-check check
```

Requires an active `ocm` session. Without one the CLI still runs — it skips UI Stats data and bases eligibility on git history and metadata alone.

---

## Environment setup

The `yarn check` and `yarn usage-detail` scripts set the required environment variables automatically — no setup needed. They use the production UI Stats URL and fetch a fresh `ocm auth aurm` token on every run. You need an active `ocm` session.

> **Without an `ocm` session** both CLIs still run — they skip UI Stats data and print a warning to stderr. Eligibility is then based on git history and metadata references alone.

---

## CLIs

### Promotion eligibility check — `cli.js`

Discovers all contributions packages, runs eligibility checks on every component, and reports which ones are ready to promote.

**Run (interactive terminal output):**

```bash
yarn workspace @okta/odyssey-contributions-promotion-check check
```

**Run (write JSON report to file):**

```bash
yarn workspace @okta/odyssey-contributions-promotion-check check --output-file report.json
```

**Flags:**

| Flag            | Type   | Description                                                                                         |
| --------------- | ------ | --------------------------------------------------------------------------------------------------- |
| `--output-file` | string | Write the full JSON report to this path instead of printing to the terminal. Warnings go to stderr. |

**Eligibility criteria** — a component must pass all three:

1. **Age** — source directory is at least 3 months old
2. **API stability** — no changes to the component's source in the past month
3. **Usage** — at least one of: used in ≥ 2 external repos, > 6 total usages via UI Stats, or has a `forkedFrom` / `similarTo` metadata reference

---

### Component usage detail — `cli-usage-detail.js`

Fetches per-repo, per-package usage data for a single component from UI Stats. Used during the promotion workflow to generate actionable migration tickets.

**Run:**

```bash
yarn workspace @okta/odyssey-contributions-promotion-check usage-detail --package @okta/odyssey-contributions-wp-components --component Typography
```

**Flags:**

| Flag          | Type   | Required | Description                                            |
| ------------- | ------ | -------- | ------------------------------------------------------ |
| `--package`   | string | yes      | The full npm package name of the contributions package |
| `--component` | string | yes      | The exported component name to look up                 |

**Output** — JSON array of repos that use the component, with per-package migration paths:

```json
[
  {
    "repoName": "atko-eng/workload-principal-ui",
    "consumerPackages": [
      {
        "consumerPackage": "@okta/admin.ai-agents",
        "minimumViablePath": "src/",
        "files": [
          {
            "path": "src/components/AIAgents/SourceCell.tsx",
            "version": "1.5.0"
          }
        ]
      }
    ]
  }
]
```

`minimumViablePath` is the longest common directory prefix across all files for that package — use it as the `--paths` argument to `yarn odyssey-cli migrate`.

---

## `contributionsMetadata.json`

Every contributions package (e.g. `packages/contributions/wp-components/`) keeps a `contributionsMetadata.json` file at its root. This file is the source of truth for which components the package owns and their relationship to core.

**Schema** — validated by `contributionsMetadata.schema.json`:

```json
{
  "components": [
    {
      "libraryName": "wp-components",
      "componentName": "Typography",
      "forkedFrom": "odyssey-react-mui::Typography",
      "isIgnoredFromPromotion": true
    }
  ]
}
```

**Fields:**

| Field                        | Required    | Description                                                                                        |
| ---------------------------- | ----------- | -------------------------------------------------------------------------------------------------- |
| `libraryName`                | yes         | Folder name of the contributions package (e.g. `"wp-components"`)                                  |
| `componentName`              | yes         | Exported component name (e.g. `"Typography"`)                                                      |
| `forkedFrom`                 | no          | The component this was copy-pasted from, in `"libraryName::ComponentName"` format                  |
| `similarTo`                  | no          | Array of related components in other packages, same format. Mutually exclusive with `forkedFrom`.  |
| `isIgnoredFromPromotion`     | no          | Set to `true` to exclude this component from promotion reports (e.g. after promotion is complete)  |
| `ignoredFromPromotionReason` | conditional | Required when `isIgnoredFromPromotion` is `true`. Allowed values: `"promoted"` \| `"not feasible"` |

> **Note for contributions package maintainers:** the `metadata-completeness` ESLint rule (see below) will flag any drift between this file and your package's exports automatically.

---

## ESLint rule — `metadata-completeness`

> **Audience: contributions package maintainers.** This rule is meant to be configured in each contributions package's ESLint config, not in `odyssey-react-mui` or consumer apps.

The `metadata-completeness` rule keeps `contributionsMetadata.json` in sync with what a contributions package actually exports. It reports three types of problems:

| Message                                                                         | Cause                                                         |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `'X' is exported from src/index.ts but missing from contributionsMetadata.json` | New export not yet registered in metadata                     |
| `'X' is in contributionsMetadata.json but not exported from src/index.ts`       | Stale metadata entry after a component was removed or renamed |
| `'X' appears more than once in contributionsMetadata.json`                      | Duplicate entry                                               |

### Adding the rule to a contributions package

In the package's `eslint.config.mts`:

```ts
import { contributionsPlugin } from "@okta/odyssey-contributions-promotion-check";

export default [
  {
    plugins: {
      "@okta/odyssey-contributions": contributionsPlugin,
    },
    rules: {
      "@okta/odyssey-contributions/metadata-completeness": "error",
    },
  },
];
```

The rule requires no configuration options. It resolves the `contributionsMetadata.json` and `src/index.ts` paths relative to the file being linted.

---

## How this fits the promotion workflow

This package provides the data layer for tooling that orchestrates the contributions promotion process. A promotion workflow typically:

1. Runs the eligibility CLI to identify candidates
2. Calls `cli-usage-detail.js` for the selected component to get per-repo migration paths
3. Uses that data to generate migration tickets with exact `yarn odyssey-cli migrate` commands per consumer package

---

## Programmatic API

The package exports its core logic for use in other scripts and tools:

```ts
import {
  runPromotionChecks, // runs all checks, returns PromotionCheckReport
  contributionsPlugin, // ESLint plugin
  findContributionsPackages,
  readMetadataFile,
  calculateMetadataCompletenessValidation,
} from "@okta/odyssey-contributions-promotion-check";
```

See `src/index.ts` for the full export surface and TypeScript types.
