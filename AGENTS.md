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

Key top-level files:

- `package.json`, `lerna.json`, `tsconfig.json`
- `eslint.config.mts`

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

- Do not use the MUI `sx` prop in `odyssey-react-mui` component source files. Apply dynamic styles via `styled()` from `@mui/material/styles` with `shouldForwardProp` to filter out non-DOM custom props. The `sx` prop is acceptable in Storybook stories and consumer application code, but must not be used inside the component library itself.

---

## 3. Project Conventions

### Package Structure

- Most feature code lives in `packages/*`.
- Storybook app: `packages/apps/odyssey-storybook`.

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

Before `git push` on a `master`-bound branch, run from the repo root:

```sh
yarn typecheck
yarn lint
yarn test
```

The `lint-staged` pre-commit hook only lints **staged files** and never runs typecheck — a green commit is not a green push to master.

**Worktree gotcha when running `yarn typecheck`:** Bacon CI runs `tsc -p src --emitDeclarationOnly false --noEmit` per package. In a worktree, `<worktree>/node_modules` is symlinked to `<main>/node_modules`, so `@okta/...` imports may resolve to the **main checkout's stale `dist/types/`** and hide a real type error. When iterating on cross-package types in a worktree, after `yarn typecheck` from the worktree root also rebuild the worktree's package types (`yarn tsc --project packages/<path>/tsconfig.production.json`) and re-run `yarn typecheck`.

If you cannot complete `yarn typecheck` cleanly in your environment, do not push to a `master`-targeting branch — stop and tell the user. The user cannot merge a broken PR, and CI cycles are wasted.

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

### Storybook Stories

- **No top-level one-time-use variables.** Storybook's Code tab only shows what is inside the story's `render` function and `args`. Any value extracted to a top-level variable (outside the story object) disappears from the Code tab and is invisible to readers. If a value is used by only one story, define it inline: either as a story `arg` (for data) or inline inside the `render` function body (for functions/loaders that can't be expressed as args). A shared helper is only appropriate when it is genuinely reused by multiple stories.
- Always prefer Odyssey components from `@okta/odyssey-react-mui` over raw HTML elements in stories. Use `Button` not `<button>`, `Link` not `<a>`, `Heading1`–`Heading6` or `Paragraph` not `<h1>`–`<h6>`/`<p>`, `SearchField`/`TextField` not `<input>`, `Surface` or `Box` not unstyled `<div>` wrappers.
- Stories live in `packages/apps/odyssey-storybook/src/`. Use the `OdysseyStorybookThemeDecorator` decorator for all UI Shell and component stories to get the correct Odyssey theme and provider context.
- When a story needs a custom `render` function, always name it `function C()` — this is the established pattern across all Odyssey stories:

  ```tsx
  export const MyStory: Story = {
    render: function C() {
      // hooks and JSX here
    },
  };
  ```

### Storybook Visual Regression Testing (VRT)

Applitools Eyes captures a screenshot of each story after its `play` function completes (Storybook emits `STORY_RENDERED` post-play). Components with transient visual states — dropdowns, menus, dialogs, drawers, toasts, tooltips, calendars — must have a lightweight `play` function that produces the visible state, otherwise Applitools only captures the resting/closed state.

- **When to add a play function**: any story where a meaningful part of the component is hidden until the user interacts (opens a menu, triggers a toast, hovers for a tooltip, toggles password visibility, etc.). Also add play functions to variant stories that render different option layouts in a dropdown (e.g., Picker with descriptions vs. metadata vs. groups).
- **When NOT to add a play function**: static stories (Disabled, ReadOnly, Error) where the visual state is already in the initial render, and components with no hidden transient UI (Banner, Badge, Card layout, etc.).
- **Keep play functions minimal**: one click or hover to produce the visual state. No assertions, no axe checks, no returning to resting state. Import `userEvent` and `within` from `"storybook/test"`.
- **Do not type into controlled inputs** inside play functions — `useArgs` re-renders can swallow keystrokes. Use clicks and hovers only.

  ```tsx
  // Good — opens dropdown for VRT capture
  play: async ({ canvasElement, step }) => {
    await step("Open dropdown", async () => {
      const canvas = within(canvasElement);
      await userEvent.click(canvas.getByRole("combobox"));
    });
  },

  // Good — shows tooltip for VRT capture
  play: async ({ canvasElement, step }) => {
    await step("Show tooltip", async () => {
      const canvas = within(canvasElement);
      await userEvent.hover(canvas.getByRole("button", { name: "Info" }));
    });
  },
  ```

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
- Never put a Jira ticket ID in a test name. Tickets belong in a nearby comment (e.g. `// OKTA-123456` above the test) or in the commit/PR body, not in the test description — test names should read the same regardless of which issue tracker is in use.
- For plain functions/utilities, use `describe(functionName.name, () => { ... })` — links the suite to the function so an IDE rename updates it automatically.
- For React components in `odyssey-react-mui`, use `describe(ComponentName.displayName!, () => { ... })` — exported components are `React.memo()` wrappers, so `.name` returns `"MemoizedX"`. `.displayName` is the human-readable name explicitly set on every exported component.
- No module mocks (`vi.mock`). Design functions with dependency injection (see Coding Standards above) and pass lightweight inline fakes in tests instead.
- Tests must be pure and side-effect-free. Never collect call args via `.push()` or other mutation — express the same assertion through the function's return value instead (e.g. resolve only when the expected args are received, reject otherwise).
- Always assert the **exact** result. Never use partial matchers (`expect.stringContaining`, `expect.objectContaining`, `expect.arrayContaining`) — they hide fields and let regressions through silently. Assert the full object, the full string, the full array.

### Browser tests in odyssey-react-mui

Use `renderWithOdysseyProvider` from `./test-utils/renderWithOdysseyProvider.js` as the default render wrapper — it provides an `OdysseyProvider` context and disables MUI transitions for deterministic tests. Using `render` directly with `OdysseyProvider` is acceptable when `renderWithOdysseyProvider` is not a good fit, but this should be the exception.

All browser tests must include `toBeAccessible` assertions to catch accessibility regressions. The matcher is registered in `vitest-browser-setup.ts` and runs axe-core under the hood.

- **When to assert**: on initial render AND after each meaningful state change (open menu, selected option, focused input, expanded accordion, visible tooltip).
- **`disabledRules`**: pass rule IDs for known false positives or known issues that need to be fixed later (e.g., `"color-contrast"` for overlay components like Toast, Dialog, DatePicker calendar). Always add a comment above explaining what the issue is and whether it's a false positive or a known issue to fix.
- **Scoping**: pass a specific DOM element to scope the check to a region (e.g., an open dialog). Use `expect.element(locator)` for vitest locators.
- **Portal-rendered components**: MUI components that portal to `document.body` (Dialog, Drawer, Toast, Menu, Autocomplete listbox, DatePicker calendar) render **outside** the `container` returned by `renderWithOdysseyProvider`. Using `expect(container).toBeAccessible()` on these will silently scan an empty wrapper and never find violations. Always scope to the actual rendered element: `expect.element(page.getByRole("dialog"))`, `expect.element(page.getByRole("menu"))`, etc.

  ```tsx
  test("menu opened via keyboard", async () => {
    const { container } = await renderWithOdysseyProvider(<MyComponent />);
    // Axe on initial render
    await expect(container).toBeAccessible();
    // Open the menu
    const trigger = page.getByRole("button", { name: "Options" });
    await userEvent.keyboard("{Enter}");
    // Axe scoped to the open menu — color-contrast disabled for overlay backdrop
    const menu = page.getByRole("menu");
    // TODO: fix — overlay has insufficient color contrast
    await expect
      .element(menu)
      .toBeAccessible({ disabledRules: ["button-name"] });
  });
  ```

---

## 7. Safety & Security

- Do not add secrets, tokens, or credentials.
- Do not log sensitive information.
- Only consider new tooling that is actively maintained and well-supported.

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

**Base branch:** always target the branch you forked from, not `master`. Worker branches are created off the current feature branch (e.g. `kg_json-schema-claude_OKTA-1173898`), so the PR must target that same branch. Pass `--base <parent-branch>` explicitly when creating PRs with `gh pr create` — do not rely on the default.

### Worktree setup for workers

See [Worker Task Workflow](#12-worker-task-workflow) for end-to-end worker process rules (commit/push/PR cadence, working directory hygiene, naming patterns).

Workers run in git worktrees under `.claude/worktrees/<branch>/`. Yarn's `node_modules` is installed only in the repo root, not in the worktree, so the pre-commit hook (`yarn lint-staged`) and any `yarn workspace` commands fail out of the box. Fix once after `git worktree add`:

```sh
# 1. Symlink root node_modules into the worktree root
ln -s /path/to/repo/node_modules .claude/worktrees/<branch>/node_modules

# 2. If the storybook stories import from @okta/odyssey-blueprint (newly added
#    exports that haven't shipped in the dist yet), add local overrides so ESLint
#    resolves the worktree's built package instead of the stale dist:
mkdir -p .claude/worktrees/<branch>/packages/apps/odyssey-storybook/node_modules/@okta
ln -sfn /path/to/repo/.claude/worktrees/<branch>/packages/contributions/odyssey-blueprint \
  .claude/worktrees/<branch>/packages/apps/odyssey-storybook/node_modules/@okta/odyssey-blueprint
mkdir -p .claude/worktrees/<branch>/packages/apps/odyssey-storybook/node_modules/@storybook
ln -sfn /path/to/repo/packages/apps/odyssey-storybook/node_modules/@storybook \
  .claude/worktrees/<branch>/packages/apps/odyssey-storybook/node_modules/@storybook

# 3. Build the package's JS and type declarations so ESLint resolves the new types
cd .claude/worktrees/<branch>/packages/contributions/odyssey-blueprint
NODE_ENV=production /path/to/repo/node_modules/.bin/vite build
/path/to/repo/node_modules/.bin/tsc --project tsconfig.production.project.json --noEmit false
```

These symlinks are NOT committed (they live only in the working tree). Worktree tests must be run from inside the package directory (`cd` into it first) so vitest picks up the package's own `vitest.config.ts` rather than the root config.

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

## 10. `odyssey-react-mui` Package — Browser Test Specifics

This package is the only one currently running **vitest 4 browser mode** with the Playwright provider. It has a custom matcher registered in `vitest-browser-setup.ts` that covers a gap in the built-in assertion set.

### `toBeAccessible`

Use `await expect(element).toBeAccessible()` to assert that a DOM element passes axe-core accessibility checks. This is the required accessibility assertion for all browser tests.

```ts
// basic — assert initial render is accessible
const { container } = await renderWithOdysseyProvider(<MyComponent />);
await expect(container).toBeAccessible();

// scoped to a specific region via a Locator — expect.element() resolves it first
const dialog = page.getByRole("dialog");
await expect.element(dialog).toBeAccessible();

// disable known-broken rules (always add a comment explaining why)
// TODO: fix — DatePicker calendar has insufficient color contrast
await expect.element(dialog).toBeAccessible({ disabledRules: ["button-name"] });
```

`toBeAccessible` takes a DOM `Element`. Use `expect.element(locator)` when you have a vitest `Locator` — it pre-resolves the locator to an element before calling the matcher. Use `expect(container)` when you already have a DOM element (e.g. the `container` from `renderWithOdysseyProvider`). `expect.element()` is safe here because the element is always expected to exist.

### Asserting hidden or absent state

- Element removed from DOM (popover unmount, conditional render):
  - `await expect.element(locator).not.toBeInTheDocument()` — async, with retry. Use to assert an element has been removed from the DOM. Pass the `Locator` directly.
  - `await expect.poll(() => locator.query()).toBeNull()` — async with retry. Use when removal may be delayed (e.g. exit animations that keep the element in the DOM briefly before unmounting).
- Element in DOM but not visible (MUI Collapse, CSS height:0, display:none): `await expect.element(locator).not.toBeVisible()`
  - Playwright's `not.toBeVisible()` detects an empty bounding box (height:0, display:none) and `visibility:hidden`. It does **not** detect `opacity:0` — see the note below.
  - `getByText` finds elements regardless of `aria-hidden`, so `expect.element(page.getByText("x")).not.toBeVisible()` works for MUI Collapse (height:0), even though the element has `aria-hidden="true"` set on a parent.
  - For `getByRole` locators: `aria-hidden` prevents them from matching by default. Add `{ includeHidden: true }` so the locator can resolve: `page.getByRole("region", { includeHidden: true })`

**Important — `opacity` does not count as "not visible":** An element is considered visible when it has a non-empty bounding box and does not have `visibility:hidden` computed style. Elements of zero size or with `display:none` are not considered visible. `opacity:0` has no impact on Playwright visibility — elements at `opacity:0` are still announced by screen readers and other assistive technologies, so they are correctly treated as visible. If a component hides content using only `opacity:0`, assert the CSS directly (`toHaveStyle("opacity: 0")`) and add a `// TODO` comment noting that the component should use `visibility:hidden` or remove content from the DOM instead, so assistive technologies do not announce hidden content.

### Import note

Use `"vitest/browser"` for all vitest browser imports — `Locator`, `utils`, `page`, `userEvent`, etc. The older `"@vitest/browser/context"` package is deprecated and will stop working in the next major version.

---

## 11. Package-Specific Instructions

Some packages have their own agent instruction files that extend or override these
repo-wide rules. Only load a package-specific file when you are working in that package.

| Package                                    | Instructions                                                    | When to use                                                                  |
| ------------------------------------------ | --------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `packages/apps/odyssey-prototype`          | [AGENTS.md](packages/apps/odyssey-prototype/AGENTS.md)          | Only when modifying files inside `packages/apps/odyssey-prototype/`          |
| `packages/apps/odyssey-ui-builder`         | [AGENTS.md](packages/apps/odyssey-ui-builder/AGENTS.md)         | Only when modifying files inside `packages/apps/odyssey-ui-builder/`         |
| `packages/contributions/odyssey-blueprint` | [AGENTS.md](packages/contributions/odyssey-blueprint/AGENTS.md) | Only when modifying files inside `packages/contributions/odyssey-blueprint/` |

---

## 12. Worker Task Workflow

Rules for worker tasks (work delegated to a Claude worker running in a worktree). See also [Worktree setup for workers](#worktree-setup-for-workers) for environment setup.

- After completing worker tasks, merge the PR immediately when requested — do NOT set up cron pollers or wait on CI unless explicitly told to.
- Always run git commands from the correct worktree path; verify `pwd` before committing or editing `MANIFEST.md`. Do not edit the main checkout from a worker — the user runs Storybook from it.
- Use the established post-rename clean-name pattern (not legacy `*Node` sections) when adding new components.
- Reference Worker Task Workflow from any worker-doc-related instruction or skill that delegates work to a worktree.

---

## 13. Debugging

### Before Investigating UI Bugs

When a UI bug is reported, launch the browser/Storybook FIRST on a port that you can kill automatically when done fixing, and reproduce the issue visually before exploring source files. Avoid broad codebase exploration when a quick visual reproduction would localize the issue.

- Pick a non-default port (e.g. `--port 6107`) so the user's running Storybook on `:6006` is not disturbed.
- Capture a screenshot of the broken state, then a screenshot of the fixed state — the diff is the strongest evidence the fix works.
- Kill the dev server process when finished.

---

## 14. When in Doubt

- Prefer small, safe changes.
- Ask for clarification only when blocking.
