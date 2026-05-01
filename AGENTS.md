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

---

## 3. Project Conventions

### Package Structure

- Most feature code lives in `packages/*`.
- Storybook app: `packages/apps/odyssey-storybook`.

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

---

## 4. CLI Commands

### Install

- `yarn install`

### Common Tasks

- Lint: `yarn lint`
- Test: `yarn test`
- Build: `yarn build`
- Run whole project for local development: `yarn start`
- If only working in Storybook and project is already built: `yarn start:storybook`
- Storybook project-specific tasks: `yarn workspace @okta/odyssey-storybook <script>`

### Monorepo

- Prefer running scripts from root unless package-specific.
- Use Lerna only if existing scripts require it.
- Never use `npm run` or `npx`; always use `yarn` or `yarn dlx`.
- Use Yarn v4 (Berry), not Yarn Classic (v1), when executing commands.

---

## 5. Documentation

- Update README or package docs when changing public APIs.
- Add or update Storybook stories for new/changed components.
- Update CHANGELOG when required by project conventions.

### Storybook Stories

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

---

## 6. Testing

- Add/adjust unit tests for behavior changes.
- Name render helper functions `render*` (e.g. `renderSkipToContent`), not `setup*`. The `setup*` prefix implies fixture/state preparation; `render*` makes it clear a React render is performed.
- Add/adjust visual tests or stories if UI changes.
- Keep tests focused and deterministic.
- For button label assertions in unit tests, use `odysseyTranslate` from `i18n.generated/i18n.js` for localized strings (e.g., `odysseyTranslate("topnav.sidenavmenu.toggle")`).
- Only use mocks in tests if absolutely required. Prefer real implementations and real localStorage over mocked modules.
- Avoid `data-testid` queries when testing existing components; prefer accessible queries (`getByRole`, `getByLabelText`, etc.). Using `data-testid` is acceptable when creating test-only elements within the test.
- Use `userEvent` from Testing Library for simulating user interactions (keyboard, clicks, typing). Do not use `fireEvent` directly or native DOM events; `userEvent` provides more realistic user behavior simulation.
- In browser tests (vitest browser mode), import `userEvent` from `@vitest/browser/context`, not from `@testing-library/user-event`.

### Test style (Node/Vitest)

- Use `test()` instead of `it()`.
- Name tests to describe the **scenario**, not the expected outcome — the assertions handle expectations.
  - Wrong: `test("passes when component is older than 3 months")`
  - Right: `test("component source directory older than 3 months")`
- Use `describe(functionName.name, () => { ... })` — pass the imported function's `.name` property, not a string literal. This links the suite to the function so an IDE rename either updates the string automatically or surfaces a TypeScript error.
- No module mocks (`vi.mock`). Design functions with dependency injection (see Coding Standards above) and pass lightweight inline fakes in tests instead.
- Tests must be pure and side-effect-free. Never collect call args via `.push()` or other mutation — express the same assertion through the function's return value instead (e.g. resolve only when the expected args are received, reject otherwise).
- Always assert the **exact** result. Never use partial matchers (`expect.stringContaining`, `expect.objectContaining`, `expect.arrayContaining`) — they hide fields and let regressions through silently. Assert the full object, the full string, the full array.

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

### Branch Naming

- Branch names cannot contain slashes (`/`) — use underscores (`_`) or hyphens (`-`) instead.
- Optionally include your Jira ticket (e.g. `rj_fix_button_spacing_OKTA-123456`).

### Pull Requests

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full PR process (Jira ticket requirement, Bacon CI, Slack notification, and merge steps).

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

## 10. When in Doubt

- Prefer small, safe changes.
- Ask for clarification only when blocking.
