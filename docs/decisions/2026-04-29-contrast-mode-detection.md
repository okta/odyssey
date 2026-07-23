# 2026-04-29 — Contrast-mode detection runs pre-paint and crosses shadow-DOM boundaries

- **Status:** Accepted
- **Date:** 2026-04-29
- **Author:** Francois Lehoux
- **Source:** commit 7e09c12d1af19fe9a688357e8a6d10cbf53b1b24 ("improve contrast mode detection #222")
- **Area:** architecture
- **Tags:** #architecture #theming

## Decision (the rule)

Detect the parent-background contrast mode with `useLayoutEffect` (before paint), traverse
shadow-DOM boundaries via `getRootNode().host` when walking ancestors, and cache resolved
themes per contrast mode via `useThemeCache`.

## What was rejected

1. **`useEffect`-based detection** — runs after paint, producing a visible color flash on
   Status/Chip components as they corrected their contrast on the next frame.
2. **Ancestor-walking that stops at the shadow-root boundary** — broke detection entirely
   when a component was rendered inside a web component (shadow DOM), because the normal
   `parentElement` walk terminates at the shadow root.

## Why

Odyssey components render both in the light DOM and inside web components (shadow DOM). The
naive `useEffect` + `parentElement` approach passed in Storybook and simple app contexts but
failed in the two environments that matter most: it flickered on first paint, and it silently
gave the wrong contrast mode inside shadow DOM. Both were real, shipped regressions.

## How to honor it

- Contrast/background detection must use `useLayoutEffect`, not `useEffect`.
- Ancestor traversal must hop shadow boundaries with `getRootNode().host`.
- Theme resolution per contrast mode goes through `useThemeCache` (added in this commit) — do
  not recompute a theme object on every render.

## Related

- (none yet)
