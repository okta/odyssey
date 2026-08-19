# AI Agent Instructions (AGENTS.md)

This file is the canonical, repo-wide instruction set for AI agents.

If your AI tool supports linking to a base instruction file, point it to this file.
Examples:

- .claude/ai.md → include/link to this file
- .gemini/ai.md → include/link to this file
- .github/copilot-instructions.md → include/link to this file

---

## 1. Repo Overview

- Monorepo with multiple packages under `packages/`.
- Uses TypeScript, React, Vite, Storybook, Lerna.
- A **contribution** is a home-team-owned package under
  `packages/contributions/`. Changes elsewhere in the repository are
  Odyssey-owned maintenance. See
  [CONTRIBUTING.md](CONTRIBUTING.md) for ownership and workflow.

Key top-level files:

- `package.json`, `lerna.json`, `tsconfig.json`
- `eslint.config.mts`

Documentation is organized by purpose:

- Start with [docs/handbook/README.md](docs/handbook/README.md) for current
  cross-package contribution, design, and testing guidance.
- Use [docs/decisions/README.md](docs/decisions/README.md) for accepted and
  superseded rationale. Read relevant decisions before non-trivial work.
- Use `docs/runbooks/` for repeatable operational procedures.
- Use package `README.md` and `docs/` directories for package-owned API,
  integration, and operational guidance.
- Load a package-specific `AGENTS.md` when working in a package that has one.

---

## 2. Coding Standards

### Language & Style

- Prefer TypeScript over JavaScript where feasible.
- Prefer functional code over imperative (e.g. use `map`, `filter`, `reduce` and expressions over `for` loops and mutable variables).
- Use descriptive, domain-specific names; avoid generic names like `child`, `children`, `item`, or `data` for props, variables, and types.
- Prefer expression-bodied functions and method chaining over intermediate variables when the chain is readable.
- Prefer non-mutating array methods (`.toSorted()`, `.toReversed()`) over their mutating counterparts (`.sort()`, `.reverse()`).
- When accessing or mutating DOM elements directly, always use the method-based API over property access: `element.getAttribute("tabindex")` not `element.tabIndex`; `element.setAttribute("tabindex", "-1")` not `element.tabIndex = -1`; `element.style.getPropertyValue("outline")` not `element.style.outline`; `element.style.setProperty("outline", "none")` not `element.style.outline = "none"`. Use `removeAttribute` and `style.removeProperty` for cleanup.
- Extract small pure helper functions rather than inlining complex transformations in components or large functions.
- Compute derived data at the source (where it's produced) rather than recomputing it downstream in consumers.
- Prefer named exports except for Storybook files where there will always be a default export.
- Boolean variables and props should use `is` or `has` prefixes (e.g. `isDisabled`, `isVisible`, `hasError`), not bare adjectives like `disabled` or `visible`, and not past-tense forms like `hadError`.
- Comments must explain _why_ a decision was made, not _what_ the code does. What the code does is visible in the code — restating it adds noise and can mask unreadable code. A comment is only warranted when the reasoning behind a choice isn't recoverable from the code alone (e.g., a non-obvious config value, a browser quirk, a constraint from an upstream dependency). Do not write comments that describe behavior; write comments that document intent.
- Combine imports from the same module into a single import statement. Never split imports from the same source across multiple lines (e.g. `import { Box as MuiBox, type SxProps } from "@mui/material"`, not two separate `import` statements for `@mui/material`).
- Keep existing code style and patterns in each package.
- Avoid changing public APIs unless required.
- Preserve domain terminology like `enduser` (Okta convention) — do not auto-rename based on cspell warnings without confirming intent. Other Okta-specific terms (e.g. component naming with `V1` suffix in `displayName`, not `_v1`) follow the same rule: respect existing conventions in the codebase over generic linting suggestions.
- For optional properties in types and interfaces, always use the `?` modifier — never `prop: Type | undefined`.
  - Wrong: `docsUrls: DocsUrls | undefined`
  - Right: `docsUrls?: DocsUrls`

### `index.ts` is for re-exports only

- `index.ts` files must only contain re-exports — no logic, no type definitions, no function implementations.
- Move all logic and type definitions into named files, then re-export from `index.ts`:

  ```ts
  // Wrong — logic in index.ts
  export const runPromotionChecks = (repoRoot: string) => { ... };

  // Right — logic in runPromotionChecks.ts, re-exported via index.ts
  export { runPromotionChecks } from "./runPromotionChecks.js";
  ```

### Type location — co-locate with the originating file

- Types belong in the file where the concept they describe **originates**, not in a catch-all `types.ts`. If another file needs that type, import it from its originating file.
  - Wrong: define `ComponentReport` in `types.ts` even though it is produced and owned by `index.ts`
  - Right: define `ComponentReport` in `index.ts`; any file that needs it imports from there
- A shared `types.ts` is only appropriate for types that are pure cross-cutting utilities with no single originating file. In practice this is rare — default to co-location.

### Function signatures — single object argument

- Functions should accept a **single object argument** (like React component props), not multiple positional arguments.
  - Wrong: `checkAge(entry, packageDir, repoRoot, deps)`
  - Right: `checkAge({ entry, packageDir, repoRoot })`
- Export the args type so callers have full type information.

### Dependency injection — no `defaultDeps` variable

- Injectable dependencies are **optional fields on the args object**, defaulted inline in the destructure. Do not create a separate `defaultDeps` variable — it is redundant noise.
  - Wrong:
    ```ts
    const defaultDeps = { getFirstCommitDate };
    export const checkAge = (..., deps = defaultDeps) => { ... }
    ```
  - Right:

    ```ts
    import { getFirstCommitDate as defaultGetFirstCommitDate } from "../utils/git.js";

    export const checkAge = ({
      getFirstCommitDate = defaultGetFirstCommitDate,
      ...
    }: CheckAgeArgs) => { ... }
    ```

### Immutability — no array mutation

- Never mutate arrays with `.push()`, `.pop()`, `.splice()`, etc. Use spread and functional methods instead.
  - Wrong: `const flags = []; flags.push("x");`
  - Right: `const flags = [...existingFlags, "x"];`

### Immutability — no Date mutation

- Never mutate `Date` objects via `.setMonth()`, `.setDate()`, etc. Use the `Date` constructor to produce new instances.
  - Wrong: `const d = new Date(); d.setMonth(d.getMonth() - 3);`
  - Right: `new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())`
- Name date variables after what they **actually are** at assignment time, not after future operations.

### Function naming — reflect the return value, not the action

- Name functions after what they **return**, not what they do. A function named `checkX` is ambiguous — it sounds like it performs a check but doesn't tell you what comes back.
  - Wrong: `checkAge`, `checkVersionsExist` (tells you the action, not the result)
  - Right: `calculateAgeValidation`, `calculateVariantCountValidation` (tells you what is returned)
- Functions returning a validation/result object: use `calculate*Validation`.
- Functions returning extracted data: use `get*` or `extract*`.

### Variable naming — be verbose

- Use full, descriptive names everywhere. Never use single-letter or abbreviated names, including inside callbacks.
  - Wrong: `ref`, `r`, `e`, `err`, `fn`, `cb`, `val`, `obj`, `idx`, `dir`
  - Right: `componentReference`, `result`, `error`, `callback`, `value`, `packageEntry`, `index`, `directory`
- In `reduce` callbacks, name the accumulator parameter after what it is building, not `accumulator`.
  - Wrong: `(accumulator, item) => ({ ...accumulator, [item.key]: item.value })`
  - Right: `(itemsByKey, item) => ({ ...itemsByKey, [item.key]: item.value })`

### API Stability

- Keep component APIs backward compatible across releases.
- Prefer deprecation over removal or breaking changes.
- Do not introduce new required props to existing components.
- Adding optional props is fine; creating new components is fine.
- Avoid API churn without a strong reason and migration plan.
- Apply the same stability rules to design tokens: do not rename or remove tokens; deprecate and add new tokens instead.

### Formatting

- Follow existing formatting in the edited file.
- Avoid reformatting unrelated code.

### Accessibility & UX

- Follow existing accessibility patterns (ARIA, labels, keyboard support).
- Maintain current visual design and token usage.
- Ensure interactive buttons have accessible labels (e.g., `ariaLabel`/`aria-label`) when the visible text is not sufficient.

### React component styling

- Do not use the MUI `sx` prop in `odyssey-react-mui` component source files. Apply dynamic styles via `createOdysseyStyledComponent` from `@okta/odyssey-react-mui` — it wraps `@emotion/styled`, auto-injects design tokens from context, and handles `shouldForwardProp`. Do not import `styled` directly from `@emotion/styled` or `@mui/material/styles` in component source. Define styled components at module scope, never inside a render. The `sx` prop is acceptable in Storybook stories and consumer application code, but must not be used inside the component library itself. See [decision record](docs/decisions/2026-06-19-createodysseystyledcomponent-over-sx.md).

### Additional coding rules (from decision records)

Each links to the decision record that explains why and what was rejected.

- No em-dashes or en-dashes in prose (commit messages, PR bodies, review replies, human-facing docs) — they read as AI-authored. Use a period or comma. In human docs, prefer "not" over "never" and drop AI-scaffolding sentences.
- Avoid the TypeScript non-null assertion `!`; guard with an explicit `if` condition instead.
- Do not use `for await` loops; sequence async work with a `reduce` chaining `.then`.
- Generated files use the `.generated.js` suffix to match the existing scheme.
- Filter out invalid entries (e.g. an icon missing its `displayName`) rather than emitting broken ones downstream.
- Reuse established libraries and existing in-repo patterns (e.g. `yargs` for CLI parsing) instead of hand-rolling infrastructure. See [decision record](docs/decisions/2026-06-22-reuse-libraries-over-hand-rolling.md).
- When wrapping a third-party library in a public package, re-export a curated set of functions or require a `peerDependency` — never re-export the library's catch-all namespace. See [decision record](docs/decisions/2026-06-23-scoped-reexport-not-catchall.md).
- Read the current state of a file immediately before editing it; when reverting, restore only your own most recent changes. See [decision record](docs/decisions/2026-06-25-read-current-state-before-editing.md).
- Fix the root cause, not the symptom; verify the real cause (e.g. a provider/config setting) before patching component code. See [decision record](docs/decisions/2026-06-30-root-cause-over-symptom-patch.md).
- When a tool fails on a file, fix the tool (upstream, as its own PR) — never delete the file to make the tool pass. See [decision record](docs/decisions/2026-07-02-fix-the-tool-not-delete-the-file.md).
- Do not create files or directories to satisfy a path in an error message; confirm the location first. See [decision record](docs/decisions/2026-07-08-no-paths-from-error-messages.md).
- Removing a component means removing every associated file (schemas, docs, stories, metadata) in the same pass. See [decision record](docs/decisions/2026-06-29-remove-all-traces-of-deleted-code.md).
- Do not modify a line the user has fenced off; on revert, restore its exact original value.
- Verify tool/config behavior before asserting it as fact (e.g. whether `*` wildcards work in a config).
- Project-shared config belongs in the repo's checked-in settings, not the user's local-global settings. See [decision record](docs/decisions/2026-06-23-shared-config-in-repo-not-local-global.md).
- Keep a PR's diff scoped to the files the task requires; do not sweep in unrelated packages, components, or stories.
- Do not reference internal product details (internal system codenames, architecture) in committed content — this repo syncs to a public mirror. See [decision record](docs/decisions/2026-06-12-no-internal-product-details-public-mirror.md).
- Never make a build a side effect of `yarn install`. The root `postinstall` only installs husky's git hooks and bootstraps `@okta/odyssey-contributions-promotion-check`; the blanket `yarn build` lives in `scripts/setup.sh`, and anything else that needs a built tree runs `yarn build` itself. See [decision record](docs/decisions/2026-08-10-build-in-setup-not-postinstall.md).
- Install husky from `postinstall`, not `prepare`. Yarn 4 never runs a root `prepare` script, so the recipe in husky's own docs silently installs nothing and leaves every clone with no pre-commit hook. See [decision record](docs/decisions/2026-08-18-husky-hooks-via-postinstall-not-prepare.md).
- Do not set `changelogPreset` in `lerna.json`. Lerna uses the changelog preset that ships in its own dependency tree, so upgrading Lerna upgrades the preset with it. A separately versioned preset, custom or third-party, has to move in lockstep with Lerna majors, and nothing in CI catches the drift because no test generates a changelog. See [decision record](docs/decisions/2026-08-19-lerna-builtin-changelog-preset.md).

---

## 3. Project Conventions

### Package Structure

- Most feature code lives in `packages/*`.
- Storybook app: `packages/apps/odyssey-storybook`.

### Reference fixtures are not style exemplars

`packages/apps/extractor-fixture/**` is a deliberately non-Odyssey, plain-MUI
React app. It exists only as a migration _source_: a realistic "legacy" target
the `@okta/extractor` pipeline is calibrated against, and the "before" that
Blueprint reproduces with Odyssey components. Its patterns (plain MUI, the `sx`
prop, a home-rolled auth context and fetch client, no react-query) are
intentional and are not how Odyssey UI should be written.

Two rules follow, and they point in opposite directions:

- **Do not copy its patterns out.** When writing or generating any
  Odyssey-owned code, never reuse a pattern because you found it in
  `extractor-fixture/`. Follow the handbook and the styling and component rules
  above (Odyssey components, `createOdysseyStyledComponent`, design tokens)
  regardless of what grep surfaces there.
- **Do not "align" it in.** Do not convert this package to Odyssey conventions
  as drive-by cleanup or to satisfy a lint rule. Its non-Odyssey shape is the
  point, and changing it also churns the extractor's golden snapshot.

This does not fence off the package: when a task explicitly targets
`extractor-fixture` (for example, fixing its own behavior), edit it normally.
The Odyssey and Backbone re-implementations of this app are tracked as separate
work and live as their own packages, not as edits that "upgrade" this one.

### MUI Theme Component Overrides

MUI component style overrides for `odyssey-react-mui` live in `packages/core/odyssey-react-mui/src/theme/components/`. Each component has its own file (e.g. `Button.tsx`, `Input.tsx`), and they are all imported and composed in a single entry point. When looking up or modifying a specific component's CSS overrides, go directly to its named file — do not look for a monolithic `components.tsx`.

### Design System

- Use existing design tokens and components.
- Do not duplicate token definitions; reuse from `packages/core/odyssey-design-tokens`.

### Design Tokens & Figma

- **Token changes require Figma sync**: Never modify, add, or deprecate design tokens without ensuring corresponding changes are made in Figma libraries.
- **Bidirectional consistency**: Design tokens in code and Figma must remain unified. Changes to either require updates to both.
- **Use tokens, not hardcoded values**: When implementing designs from Figma, always use the actual token variables from code rather than hardcoded values extracted from Figma inspection.
- **Token naming alignment**: Token names should match between Figma and code wherever possible to reduce confusion during handoff.
- **Deprecation coordination**: When deprecating tokens in code (per API Stability guidelines), coordinate with design team to deprecate or update corresponding Figma library tokens.
- **Design review for token changes**: Token modifications should be reviewed against Figma designs to ensure visual consistency is maintained.
- **Documentation parity**: Token usage guidelines and descriptions should be consistent between code documentation and Figma library descriptions.

### Patterns to Follow

State these architectural preferences upfront in each session to reduce rework. Pick the right pattern on the first try; don't wait to be redirected.

- Avoid inline `sx` prop objects — use `styled()` components or extracted style objects. This rule applies in app source files too, not only in the `odyssey-react-mui` library.
- Don't extract inline Storybook loaders or one-time-use values to top-level variables — Storybook's Code tab only shows what's inside `args` and `render`. Top-level extraction breaks the Code tab. Inline these values; only extract when genuinely shared across multiple stories.

#### Styling with Odyssey design tokens

When a component needs Odyssey design tokens for its styles, use `createOdysseyStyledComponent` from `@okta/odyssey-react-mui`. It wraps `@emotion/styled` and automatically injects tokens from context — no `useOdysseyDesignTokens()` call or token prop needed at the call site.

```tsx
import { createOdysseyStyledComponent } from "@okta/odyssey-react-mui";

// Basic usage — tokens injected automatically
const StyledCard = createOdysseyStyledComponent({ tag: "div" })(
  ({ odysseyDesignTokens }) => ({
    padding: odysseyDesignTokens.Spacing4,
    borderRadius: odysseyDesignTokens.BorderRadiusTight,
  }),
);

// With custom props — use shouldForwardProp to block non-DOM props
const StyledButton = createOdysseyStyledComponent({
  tag: "button",
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>(({ odysseyDesignTokens, isActive }) => ({
  backgroundColor: isActive
    ? odysseyDesignTokens.PalettePrimaryMain
    : "transparent",
}));
```

Styled components **must be defined at module scope**, never inside render functions or component bodies — defining them inside a render causes React to unmount and remount the element on every render.

To migrate existing `@emotion/styled` or `@mui/material/styles` usage, run:

```sh
yarn workspace @okta/odyssey-cli migrate-styled <path>
```

The codemod handles `styled.tag(styles)`, `styled("tag")(styles)`, and `styled("tag", opts)(styles)`. Files using tagged template literals are skipped with a warning and require manual migration.

#### Blueprint-specific patterns

These apply only when working in `packages/contributions/odyssey-blueprint`. Blueprint is not yet published, so they are unlikely to be relevant to other packages.

- Prefer Jotai atoms over window events for cross-component state. Use Blueprint's Jotai store for cross-component coordination — never `window.dispatchEvent` / `CustomEvent`.
- Use data-driven building blocks; do not hardcode lists. YAML pages and similar config-driven UIs must drive content from `source` + `rowTemplate` (or equivalent data binding), never from hardcoded item arrays in JSX.
- Use the `V1` (no underscore) suffix in component `displayName` values, e.g. `"AppLaunchGridV1"` not `"AppLaunchGrid_v1"`.

---

## 4. CLI Commands

### Install

- `yarn install`

### Common Tasks

- Lint: `yarn lint`
- Test: `yarn test`
- Typecheck: `yarn typecheck` (root) — runs Bacon's exact `tsc -p src --noEmit` per package
- Build: `yarn build`
- Run whole project for local development: `yarn start`
- If only working in Storybook and project is already built: `yarn start:storybook`
- Storybook project-specific tasks: `yarn workspace @okta/odyssey-storybook <script>`

### Pre-push gate for `master`-targeting PRs

This gate applies **only** when the branch you are pushing will open (or has open) a PR with `master` as its base. For worker branches and other intermediate feature branches, the project's separate worker/branch instructions apply — do not run this gate there.

**Do not run `yarn lint`, `yarn typecheck`, or `yarn test` repo-wide.** The worktree has a real per-package install, so cross-package resolution is correct, but typechecking and testing every package on every push wastes minutes for no benefit. The `lint-staged` pre-commit hook already ran prettier on every staged file (its glob is `*`, so markdown and JSON are covered too) and eslint on every staged `*.{ts,tsx,js,jsx}` file at commit time. That hook only runs if husky is installed, which the root `postinstall` handles; if `git config --get core.hooksPath` prints nothing, the hook is silently doing nothing and you need `yarn install` (or `yarn husky`) before trusting it.

Instead, run typecheck and test only for the packages affected by your changes:

```sh
bash scripts/pre-push-gate.sh
```

The script uses `nx affected` to detect which packages your changes touch and runs their `typecheck` and `test` targets. If typecheck or test fails for an affected package, stop and surface the failure — do not push.

### Monorepo

- Prefer running scripts from root unless package-specific.
- Use Lerna only if existing scripts require it.
- Never use `npm run` or `npx`; always use `yarn` or `yarn dlx`. When a binary is installed locally (e.g. `eslint`, `tsc`, `vitest`), invoke it directly via `yarn <bin>` (e.g. `yarn eslint`, not `yarn dlx eslint`) — `yarn dlx` is only for packages not installed in the project.
- Use Yarn v4 (Berry), not Yarn Classic (v1), when executing commands.

---

## 5. Documentation

- Update README or package docs when changing public APIs.
- Add or update Storybook stories for new/changed components.
- Update CHANGELOG when required by project conventions.

### Documentation Map

- `docs/handbook/` contains current cross-package guidance for contributors,
  design, and testing. Start with its [index](docs/handbook/README.md).
- `docs/decisions/` contains append-only rationale for accepted and superseded
  decisions. Skim its [index](docs/decisions/README.md) before non-trivial work.
- `docs/runbooks/` contains repeatable procedures for specific operational tasks.
- `packages/*/README.md` and `packages/*/docs/` contain package-owned API,
  integration, and operational guidance.
- Package-specific `AGENTS.md` files extend or override this file only for their
  package. Load one when working in that package.

Keep machine constraints in this file. Do not copy handbook workflows, decision
rationale, runbooks, or package documentation here; link to the owning document.

### JSDoc for Components (`odyssey-react-mui`)

Component source files are the single source of truth for documentation, and JSDoc must be updated in the same commit as any component or prop change. See [odyssey-react-mui AGENTS.md](packages/core/odyssey-react-mui/AGENTS.md) for the full conventions (component/prop placement, `@default`/`@deprecated`/`@see` tags, boolean/enum prop phrasing, line-wrap rule). Only load that file when editing component source in that package.

### Architectural Decision Records (`docs/decisions/`)

`docs/decisions/` is an append-only log of every notable architectural, tooling, naming, and process decision. Its purpose is to stop regressions where an agent re-litigates a decision that was already made and paid for — the reasoning lives here, not just the rule.

- **Read it first.** At the start of any non-trivial task, skim `docs/decisions/README.md`. The "What was rejected" section of each record names exactly what you will naively drift back toward.
- **When you make a notable decision** (a point where an alternative was rejected for a reason — especially one that fixes a regression or reverses a prior choice), add a record. Copy `docs/decisions/TEMPLATE.md`, name it `YYYY-MM-DD-kebab-slug.md` (date = when the decision was made), fill in every section, and add a row to the README index table.
- **Never delete or rewrite** a past record. To reverse a decision, supersede it: set the old record's Status to `Superseded by [...]`, add a `> [!WARNING]` callout at its top linking forward, and add a `Supersedes:` line to the new record. This preserves the backflow trail.
- **A rule in AGENTS.md and its decision record are complementary**: AGENTS.md states the rule tersely; the decision record explains why and what was rejected. When you add a load-bearing rule here, add its decision record too.

### Storybook Stories & VRT

See [docs/agents/storybook-and-vrt.md](docs/agents/storybook-and-vrt.md) for story-writing conventions (no top-level one-time-use variables, prefer Odyssey components, `render: function C()`). Only load that file when writing or editing Storybook stories.

For VRT, render the visual state Applitools should capture directly; interaction behavior belongs in browser tests. Overlays with a boolean open prop (Dialog, Drawer, Toast, Accordion) render open by default, paired with a manual `Component.mdx` docs page (see [decision record](docs/decisions/2026-07-28-open-by-default-overlays-in-stories.md)). Seed date and time args with a fixed past date and no UTC offset (`"2024-07-15T14:30:00"`, not `"2024-07-15T14:30:00.000Z"`) so neither the runner's clock nor its time zone shifts the capture (see [decision record](docs/decisions/2026-08-18-fixed-past-offsetless-dates-in-stories.md)). Full VRT authoring guidance lives in [docs/handbook/testing/visual-regression-testing.md](docs/handbook/testing/visual-regression-testing.md).

---

## 6. Testing

- Add/adjust unit tests for behavior changes.
- Name render helper functions `render*` (e.g. `renderSkipToContent`), not `setup*`. The `setup*` prefix implies fixture/state preparation; `render*` makes it clear a React render is performed.
- Add/adjust visual tests or stories if UI changes.
- Keep tests focused and deterministic.
- For button label assertions in unit tests, use `odysseyTranslate` from `i18n.generated/i18n.js` for localized strings (e.g., `odysseyTranslate("topnav.sidenavmenu.toggle")`).
- Only use mocks in tests if absolutely required. Prefer real implementations and real localStorage over mocked modules.
- Avoid `data-testid` queries when testing existing components; prefer accessible queries (`getByRole`, `getByLabelText`, etc.). Using `data-testid` is acceptable when creating test-only elements within the test.
- Prefer `toBeVisible()` over `toBeInTheDocument()` when asserting that an element is accessible or interactable by the user. `toBeInTheDocument` only checks DOM presence — it passes for hidden, aria-hidden, or zero-size elements. `toBeVisible` asserts the element is actually visible. Reserve `toBeInTheDocument` (and `not.toBeInTheDocument`) for cases where DOM presence or absence is the specific concern, independent of visibility (e.g. confirming an element unmounts from the DOM after a transition).
- Use `userEvent` from Testing Library for simulating user interactions (keyboard, clicks, typing). Do not use `fireEvent` directly or native DOM events; `userEvent` provides more realistic user behavior simulation. When Playwright's actionability checks block interaction (e.g. `aria-disabled` elements), use `userEvent.click(locator, { force: true })` — not `element().click()`. Do not use `{ force: true }` when the test is validating that an element becomes visible or enabled before interaction — that explicit setup step is the behavior under test (e.g. SkipToContent calls `locator.element().focus()` to reveal the sr-only button, asserts `toBeVisible()`, then clicks normally; collapsing that into a force-click removes the visibility assertion).
- In browser tests (vitest browser mode), import `userEvent` from `"vitest/browser"` (vitest 4+) or `"@vitest/browser/context"` (vitest 3), not from `@testing-library/user-event`.

### Test style (Node/Vitest)

- Use `test()` instead of `it()`.
- Name tests to describe the **scenario**, not the expected outcome — the assertions handle expectations.
  - Wrong: `test("passes when component is older than 3 months")`
  - Right: `test("component source directory older than 3 months")`
- Never put a Jira ticket ID in a test name — or in any comment. Ticket IDs belong in the commit message or PR body only (see [Safety & Security](#7-safety--security) on not leaking internal ticket references to the public mirror). Test names should read the same regardless of which issue tracker is in use.
- For plain functions/utilities, use `describe(functionName.name, () => { ... })` — links the suite to the function so an IDE rename updates it automatically.
- For React components in `odyssey-react-mui`, use `describe(ComponentName.displayName!, () => { ... })` — exported components are `React.memo()` wrappers, so `.name` returns `"MemoizedX"`. `.displayName` is the human-readable name explicitly set on every exported component.
- No module mocks (`vi.mock`). Design functions with dependency injection (see Coding Standards above) and pass lightweight inline fakes in tests instead.
- Tests must be pure and side-effect-free. Never collect call args via `.push()` or other mutation — express the same assertion through the function's return value instead (e.g. resolve only when the expected args are received, reject otherwise).
- Always assert the **exact** result. Never use partial matchers (`expect.stringContaining`, `expect.objectContaining`, `expect.arrayContaining`) — they hide fields and let regressions through silently. Assert the full object, the full string, the full array.

---

## 7. Safety & Security

- Do not add secrets, tokens, or credentials.
- Do not log sensitive information.
- Only consider new tooling that is actively maintained and well-supported.
- Do not reference internal Jira ticket IDs (e.g. `OKTA-123456`) in source code or comments — this repo syncs to a public mirror, and ticket IDs leak internal details. The ticket belongs in the commit message or PR body instead. The only exception is a `TODO` comment that genuinely needs a tracking link, and even those should be rare; a comment explaining a past fix should describe the _why_ on its own, without the ticket.

---

## 8. Git Practices

### Commit Messages

- Use [Conventional Commits](https://conventionalcommits.org/) for all commit messages.
- Keep commit subject lines under 50 characters (required by Bacon).
- The first letter after the `:` must be lowercase (e.g. `feat: add button variant`, not `feat: Add button variant`).
- Keep commits scoped and descriptive.
- Avoid unrelated changes in a single PR.

#### Allowed commit types

- `feat`: a new feature
- `fix`: a bug fix
- `build`: changes to the build process or auxiliary tools and libraries
- `docs`: documentation-only changes
- `perf`: a code change that improves performance
- `refactor`: a code change that neither fixes a bug nor adds a feature
- `style`: changes that do not affect the meaning of the code (whitespace, formatting, etc.)
- `test`: adding missing tests or correcting existing tests

> **Note:** `chore` is not allowed — Bacon's validation will reject it.

#### Semantic Release packages — commit type determines whether a package publishes

Packages under `packages/contributions/**` and `packages/platform/**` are managed by Semantic Release (configured in `.config/releaserc.json`). For these packages, the commit type on the merge commit directly controls whether a new version is published:

| Commit type                                                | Effect                                      |
| ---------------------------------------------------------- | ------------------------------------------- |
| `feat:`                                                    | publishes — minor version bump              |
| `fix:`                                                     | publishes — patch version bump              |
| `build:`, `docs:`, `test:`, `style:`, `perf:`, `refactor:` | **does not publish** — no version increment |
| `BREAKING CHANGE` footer                                   | publishes — major version bump              |

If you need a package in these paths to be published and the change doesn't naturally fit `feat:` or `fix:`, use `fix:` — it is the minimum type that triggers a release. Never use `build:` or `docs:` when the goal is to ship a new version.

### Branch Naming

- Branch names cannot contain slashes (`/`) — use underscores (`_`) or hyphens (`-`) instead.
- Optionally include your Jira ticket (e.g. `rj_fix_button_spacing_OKTA-123456`).

### Pull Requests

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full PR process (Jira ticket requirement, Bacon CI, Slack notification, and merge steps).

**Base branch:** every PR targets `master`. Pass `--base master` explicitly when creating PRs with `gh pr create` rather than relying on the default.

**Stacked PRs are not supported.** Bacon cannot merge a PR whose base is another open PR's branch, because the sync endpoint Bacon calls to request the merge has no GitHub API support for it. A stacked PR will run CI and then be unmergeable, so do not open one. Split the work into changes that each stand on their own against `master`, and land them in sequence. If a later change genuinely depends on an earlier one, wait for the earlier PR to merge to `master`, rebase, then open the next PR. See [decision record](docs/decisions/2026-08-14-no-stacked-prs-bacon-cannot-merge.md).

**Before and after screenshots.** Every PR that changes rendered output carries before and after screenshots in its description, and the "before" has to be captured before any source is edited. GitHub has no API for uploading PR attachments, so commit the images to the `odyssey-pr-assets` side branch via the contents API and embed them with a commit-SHA-pinned `https://github.com/<owner>/<repo>/blob/<sha>/...?raw=true` URL. GitHub serves same-origin `github.com` URLs directly instead of through its unauthenticated image proxy, which is what makes them render in a private repo. Follow [docs/runbooks/pr-review-screenshots.md](docs/runbooks/pr-review-screenshots.md); the [decision record](docs/decisions/2026-08-17-pr-screenshots-via-assets-branch.md) lists the alternatives that do not work, including `raw.githubusercontent.com`, release assets, and public gists.

### AI-authored PR and issue comments

Comments the agent posts to GitHub (PR review replies, PR comments, issue comments) authenticate as the human user's `gh` token, so GitHub attributes them to that person with no built-in signal that an agent wrote them. To keep authorship honest, every comment the agent posts must end with an attribution footer:

```
---
🤖 Posted by Claude Code
```

This applies to all outward-facing comment bodies the agent authors; it does not apply to the PR description itself or to commit messages.

### Worktree setup for workers

See [Worker Task Workflow](#11-worker-task-workflow) for end-to-end worker process rules (commit/push/PR cadence, working directory hygiene, naming patterns).

Workers run in git worktrees under `.claude/worktrees/<branch>/`. The `WorktreeCreate` hook runs a real `yarn install` in the worktree automatically (reusing the main checkout's cache and running the build), so `@okta/*` resolve to the worktree's own packages and no manual linking is needed. See [docs/agents/worker-worktree-setup.md](docs/agents/worker-worktree-setup.md) for the lockfile-update step when a task bumps package versions. Only load that file when a worker task needs to install dependencies inside a worktree.

---

## 9. How to Reference This File

If your AI system supports includes, place a small file that points here, e.g.

- `.claude/ai.md`:
  - “Use AGENTS.md as canonical instructions.”
- `.gemini/ai.md`:
  - “Use AGENTS.md as canonical instructions.”
- `.github/copilot-instructions.md`:
  - “Use AGENTS.md as canonical instructions.”

---

## 10. Package-Specific Instructions

Some packages have their own agent instruction files that extend or override these
repo-wide rules. Only load a package-specific file when you are working in that package.

| Package                                    | Instructions                                                    | When to use                                                                          |
| ------------------------------------------ | --------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `packages/apps/odyssey-prototype`          | [AGENTS.md](packages/apps/odyssey-prototype/AGENTS.md)          | Only when modifying files inside `packages/apps/odyssey-prototype/`                  |
| `packages/apps/odyssey-ui-builder`         | [AGENTS.md](packages/apps/odyssey-ui-builder/AGENTS.md)         | Only when modifying files inside `packages/apps/odyssey-ui-builder/`                 |
| `packages/contributions/odyssey-blueprint` | [AGENTS.md](packages/contributions/odyssey-blueprint/AGENTS.md) | Only when modifying files inside `packages/contributions/odyssey-blueprint/`         |
| `packages/core/odyssey-react-mui`          | [AGENTS.md](packages/core/odyssey-react-mui/AGENTS.md)          | Only when modifying JSDoc or browser tests inside `packages/core/odyssey-react-mui/` |

---

## 11. Worker Task Workflow

Rules for worker tasks (work delegated to a Claude worker running in a worktree). See also [Worktree setup for workers](#worktree-setup-for-workers) for environment setup.

- After completing worker tasks, merge the PR immediately when requested — do NOT set up cron pollers or wait on CI unless explicitly told to.
- Always run git commands from the correct worktree path; verify `pwd` before committing or editing `MANIFEST.md`. Do not edit the main checkout from a worker — the user runs Storybook from it.
- Use the established post-rename clean-name pattern (not legacy `*Node` sections) when adding new components.
- Reference Worker Task Workflow from any worker-doc-related instruction or skill that delegates work to a worktree.
- Worker PRs target `master` like every other PR. Do not base a worker PR on another open PR's branch; see [Pull Requests](#pull-requests) for why Bacon cannot merge a stacked PR.

---

## 12. Debugging

### Before Investigating UI Bugs

When a UI bug is reported, launch the browser/Storybook FIRST on a port that you can kill automatically when done fixing, and reproduce the issue visually before exploring source files. Avoid broad codebase exploration when a quick visual reproduction would localize the issue.

- Pick a non-default port (e.g. `--port 6107`) so the user's running Storybook on `:6006` is not disturbed.
- Capture a screenshot of the broken state, then a screenshot of the fixed state — the diff is the strongest evidence the fix works.
- Kill the dev server process when finished.

---

## 13. When in Doubt

- Prefer small, safe changes.
- Ask for clarification only when blocking.
