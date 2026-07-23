# 2026-05-04 — Tests run in vitest 4 browser mode with Playwright, not jsdom

- **Status:** Accepted
- **Date:** 2026-05-04
- **Author:** Ricardo Joenck
- **Source:** commit baff3b8d07995859298f5ee9745010064149294e
- **Area:** testing
- **Tags:** #testing #vitest

## Decision (the rule)

`packages/core/odyssey-react-mui` runs all component tests in **vitest 4 browser mode** with
the Playwright provider. jsdom is not used. Storybook interaction tests (`play` functions that
were previously tested via `@storybook/test-runner`) are migrated into `*.browser.test.tsx`
files.

## What was rejected

1. **jsdom** — the obvious default for React testing. jsdom fakes enough of the DOM to run
   component code but does not run a real layout engine, so accessibility checks (`toBeVisible`,
   bounding-box queries, Playwright actionability checks) give wrong answers. A component can
   pass jsdom tests and fail in a real browser.
2. **Storybook interaction tests as the a11y harness** — `@storybook/test-runner` ran axe
   inside story `play` functions. This coupled test logic to Storybook's rendering pipeline and
   made tests slow and flaky. Moving to vitest browser mode decoupled the test from Storybook.

## Why

MUI components use real DOM measurements for transitions, focus management, and layout. axe-core
accessibility checks require a real layout engine for bounding-box and visibility queries.
A real browser (Playwright-driven Chromium) gives accurate results; jsdom gives false positives
that hide accessibility regressions until they reach production.

The `toBeAccessible` custom matcher (registered in `vitest-browser-setup.ts`) runs axe-core in
the real browser. It is required on every component test.

## How to honor it

- Import `userEvent` from `"vitest/browser"` (not `@testing-library/user-event`).
- Use `renderWithOdysseyProvider` as the default render wrapper.
- Portal-rendered components (Dialog, Toast, Menu, DatePicker) escape the `container` — always
  scope `toBeAccessible` to `page.getByRole("dialog")` etc., never to `container`.
- Never reintroduce jsdom as the test environment for odyssey-react-mui.

## Related

- [Vite pinned to 7.x — rolldown binaries excluded](2026-05-04-vite-pinned-7x-no-rolldown.md)
