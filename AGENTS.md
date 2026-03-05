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
- Prefer named exports except for Storybook files where there will always be a default export.
- Keep existing code style and patterns in each package.
- Avoid changing public APIs unless required.

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

---

## 6. Testing

- Add/adjust unit tests for behavior changes.
- Add/adjust visual tests or stories if UI changes.
- Keep tests focused and deterministic.
- For button label assertions in unit tests, use `odysseyTranslate` from `i18n.generated/i18n.js` for localized strings (e.g., `odysseyTranslate("topnav.sidenavmenu.toggle")`).
- Avoid `data-testid` queries when testing existing components; prefer accessible queries (`getByRole`, `getByLabelText`, etc.). Using `data-testid` is acceptable when creating test-only elements within the test.
- Use `userEvent` from Testing Library for simulating user interactions (keyboard, clicks, typing). Do not use `fireEvent` directly or native DOM events; `userEvent` provides more realistic user behavior simulation.

---

## 7. Safety & Security

- Do not add secrets, tokens, or credentials.
- Do not log sensitive information.
- Only consider new tooling that is actively maintained and well-supported.

---

## 8. Git Practices

- Use conventional commits for all commit messages.
- Keep commit subject lines under 50 characters (required by bacon implementation).
- Keep commits scoped and descriptive.
- Avoid unrelated changes in a single PR.

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
