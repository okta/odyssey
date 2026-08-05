# 2026-07-23: Drive reflow logic from a standalone media-query hook, not MUI breakpoints

- **Status:** Accepted
- **Date:** 2026-07-23
- **Author:** Matthew Shortt
- **Source:** `632688e4`, `93d49adc`, `cbf50bb2`, `f765f9cf`, `beb75359` (supersedes the approach in `2c1e4133`)
- **Area:** architecture
- **Tags:** #theming #styling #coding-conventions

## Decision (the rule)

Detect the compact/reflow viewport range with the standalone `useMediaQuery`
hook and the `COMPACT_*` constants in `theme/useMediaQuery.ts`, not with a named
MUI theme breakpoint. `useMediaQuery` reads via `useSyncExternalStore`. For
CSS-in-JS style overrides that cannot call a hook, use the exported
`COMPACT_MEDIA_QUERY` string, not `theme.breakpoints.up/down(...)`.

## What was rejected

The prior fix (`2c1e4133`) registered a custom `reflow` MUI breakpoint: a
`breakpoints.ts` value (`320.05`), a `breakpoints.types.ts` module augmentation
adding `reflow` to `BreakpointOverrides`, wired into the theme, and consumed via
`theme.breakpoints.down("reflow")` in `Dialog` and `theme.breakpoints.up("reflow")`
in the Dialog style override. That approach was reverted: `breakpoints.ts` and
`breakpoints.types.ts` were deleted and the theme no longer registers `reflow`.

The obvious thing a future agent will drift back toward is "add a named MUI
breakpoint for this responsive threshold" — do not. The dimensions live in
`theme/useMediaQuery.ts`.

Also rejected: backing `useMediaQuery` with `useState` + `useEffect` (its
previous implementation). It was replaced with `useSyncExternalStore`.

## Why

We want to minimize coupling to MUI so a future migration away from it is
tractable; responsive logic keyed on `theme.breakpoints` is exactly the kind of
pervasive coupling that makes such a migration expensive. A plain hook plus
constants survives a MUI swap untouched.

`useSyncExternalStore` is React's sanctioned primitive for subscribing to an
external mutable source (here, `MediaQueryList`). It reads the match
synchronously at render time, so concurrent renders never tear and there is no
stale first frame — problems the `useState` + effect version was subject to.

The compact thresholds sit a per-axis activation buffer above the absolute
minimum (320×256, the WCAG 1.4.10 reflow floor) so layout adapts before hitting
the floor rather than snapping exactly at it. The buffers differ by axis: width
uses a small buffer just above the reflow floor, while height uses a larger one
(activating around 500px, where the app starts to feel cramped).

## How to honor it

- Threshold source of truth: `ABSOLUTE_MINIMUM_WIDTH/HEIGHT` and
  `COMPACT_WIDTH_ACTIVATION_BUFFER` / `COMPACT_HEIGHT_ACTIVATION_BUFFER` in
  `packages/core/odyssey-react-mui/src/theme/useMediaQuery.ts`. Change these, not
  a breakpoint value.
- In components, call `useCompactViewportMatches()` and read
  `isWithinCompactWidth` / `isWithinCompactHeight` / `isWithinCompactWidthOrHeight`.
- In style overrides (`theme/components/*.tsx`), use `COMPACT_MEDIA_QUERY`. The
  hook queries and the CSS string derive from shared `COMPACT_MAX_*_CONDITION`
  constants so they cannot drift — do not hand-write a second `@media` string.
- Do not re-add `breakpoints.ts`, a `reflow` `BreakpointOverrides` augmentation,
  or a `breakpoints` key in `createOdysseyMuiTheme`.
- Do not rewrite `useMediaQuery` back to `useState` + effect; keep
  `useSyncExternalStore` with its `getServerSnapshot` returning `false`.

## Related

- [createOdysseyStyledComponent over sx](2026-06-19-createodysseystyledcomponent-over-sx.md)
