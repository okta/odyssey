# 2026-07-29 — Import React-18-only hooks via a shim or the in-repo hook, not from `react`

- **Status:** Accepted
- **Date:** 2026-07-29
- **Author:** Matthew Shortt
- **Source:** chat session, 2026-07-29
- **Area:** architecture
- **Tags:** #react-compatibility #coding-conventions

## Decision (the rule)

Do not import React-18-only hooks (`useSyncExternalStore`, `useId`) directly
from `react` in `odyssey-react-mui` source. Get `useSyncExternalStore` from the
`use-sync-external-store/shim` package, and generate ids with the in-repo
`useUniqueId` hook. Both resolve on React 16.8+/17/18 and keep identical
behavior on React 18.

## What was rejected

- **Importing `useSyncExternalStore` and `useId` straight from `react`.** This
  is what the code did and it is the regression: `theme/useMediaQuery.ts`
  imported `useSyncExternalStore` from `react`, and `labs/DataView/DataCard.tsx`
  and `ui-shell/NarrowUiShellContent.tsx` imported `useId` from `react`. Both
  APIs were added in React 18 and are `undefined` on React 17, so a React 17
  consumer crashes with `(0, _react.useSyncExternalStore) is not a function` the
  moment a `Dialog` (via `useMediaQuery`) or those components render.
- **Adding `@mui/utils/useId` for the `useId` case.** Redundant — the package
  already has `useUniqueId` (`src/useUniqueId.ts`, backed by `createUniqueId`),
  used by 13 components (Dialog, Field, Switch, Accordion, …) and exported from
  the barrel. The two offending files had simply diverged from that convention.
- **Broadening the peer range to `^17 || ^18` to advertise React 17 support.**
  We do not test on React 17, so we do not claim it. The peer range stays
  `^18.3.1`; the shims are best-effort defensive compat for consumers
  mid-migration, nothing more.

## Why

React and react-dom are `peerDependencies`, never bundled, so Odyssey runs
against the consumer's React. A consumer app on React 17.0.2 pulled the latest
`odyssey-react-mui` and hard-crashed in a test suite. `useMediaQuery` was
deliberately written on `useSyncExternalStore` to avoid tearing and a stale
first frame (see [Drive reflow logic from a standalone media-query
hook](2026-07-23-reflow-media-query-hook-over-mui-breakpoint.md)), so the fix
had to preserve that semantics — the official backport shim does exactly that,
delegating to the native hook on React 18. For ids, `useUniqueId` was already
the answer everywhere else in the package.

## How to honor it

- `useSyncExternalStore`: import from `use-sync-external-store/shim`, never from
  `react`. The package is a direct `dependency` of `odyssey-react-mui` with
  `@types/use-sync-external-store` in `devDependencies`.
- ids: call `useUniqueId()` from `src/useUniqueId.js`, never `useId` from
  `react`.
- Note the still-unshimmed 18-only surface, out of scope for this decision:
  `createRoot` from `react-dom/client` in
  `web-component/renderReactInWebComponent.ts`. `react-dom/client` does not
  exist on React 17, so a barrel import that reaches it (via
  `createShadowDomElements`) will fail to resolve on React 17 until it grows a
  legacy `ReactDOM.render` fallback.

## Related

- [Drive reflow logic from a standalone media-query hook, not MUI breakpoints](2026-07-23-reflow-media-query-hook-over-mui-breakpoint.md)
