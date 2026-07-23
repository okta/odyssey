# 2026-06-19 — Use createOdysseyStyledComponent in library source, never sx

- **Status:** Accepted
- **Date:** 2026-06-19
- **Author:** Kevin Ghadyani
- **Source:** commit 3a4fa82ebcee790be3bc339538a2ea88933232e3 ("styled wrapper + codemod #486");
  rule origin b06547ce (2026-05-20); regression 4c4206a (2026-05-06)
- **Area:** styling
- **Tags:** #styling

## Decision (the rule)

In `odyssey-react-mui` component source, never use the MUI `sx` prop. Apply dynamic styles via
`createOdysseyStyledComponent` from `@okta/odyssey-react-mui` — it wraps `@emotion/styled`,
auto-injects design tokens from context, and handles `shouldForwardProp`. Do not import
`styled` directly from `@emotion/styled` or `@mui/material/styles` in component source. Styled
components must be defined at **module scope**, never inside a render. `sx` remains fine in
Storybook stories and consumer app code.

## What was rejected

1. **The `sx` prop in library source** — this caused a real regression: `sx` leaked into the
   `Stack` component's public type (`fix: remove sx prop in Stack component's type`, 4c4206a,
   2026-05-06), exposing an implementation detail as API.
2. **Raw `styled()` + `useOdysseyDesignTokens()` at the call site** — the earlier form (rule
   introduced 2026-05-20). Superseded by the wrapper, which injects tokens automatically so no
   hook call or token prop is needed at the call site.
3. **Defining styled components inside render** — causes React to unmount/remount the element
   every render.

## Why

`sx` objects are re-created every render, can't be statically analyzed, and — as the Stack bug
proved — can leak into public types. A single wrapper (`createOdysseyStyledComponent`) gives
every styled component tokens-from-context and correct prop filtering without boilerplate, and
keeps the "no third-party lib at the call site" contract (consumers never import emotion/MUI
styled directly). A codemod (`yarn workspace @okta/odyssey-cli migrate-styled <path>`) migrates
existing usage.

## How to honor it

- New styled component: `createOdysseyStyledComponent({ tag, shouldForwardProp })(({ odysseyDesignTokens }) => ({…}))`, at module scope.
- Migrate existing `@emotion/styled` / `@mui/material/styles` usage with `migrate-styled`.
- Never add `sx` to a component source file; never re-expose `sx` in a component's props type.

## Related

- [Functions take one object arg with inline-defaulted DI; types co-locate](2026-04-16-functional-conventions-single-object-arg-di.md)
