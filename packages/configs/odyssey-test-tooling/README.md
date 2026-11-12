# @okta/odyssey-test-tooling

Shared Vitest config, browser test setup, and Odyssey render helpers for Odyssey packages. It is private to this monorepo and is not published.

Its nx tag is `scope:tools`, because the module-boundary lint lets `scope:core` packages (odyssey-react-mui, odyssey-contribution-tooling) depend only on core and tools. It declares `"implicitDependencies": ["!@okta/odyssey-react-mui"]`: the render helpers import react-mui, and react-mui's tests import the helpers. The pinned published react-mui in `devDependencies` adds no Nx edge today, so the negation guards a later switch to `workspace:*`, which would add the edge and make a cycle. Each consumer resolves react-mui itself.

It has two entry points, because one runs in Node and the other runs in the page:

- `@okta/odyssey-test-tooling`, for `vitest.config.ts`:
  - `createVitestProject({ type: "node", ...testOverrides })`: a project for `*.node.test.{ts,tsx}` files in Node.
  - `createVitestProject({ type: "browser", commands, optimizeDepsInclude, provider, resolve, ...testOverrides })`: a project for `*.browser.test.{ts,tsx}` files in headless Chromium through Playwright, at 1024 by 768. It loads `@okta/odyssey-test-tooling/browser` before the package's own `setupFiles`, registers `parkPointer`, which that setup calls, prebundles the Emotion JSX runtime, React, and `vitest-browser-react` before any extra `optimizeDepsInclude`, and turns off Rolldown's `inlineConst` in the dep optimizer.
  - `createCoverage({ exclude, include })`: the shared coverage options with the 80% floor. `exclude` and `include` are added to the shared lists. The shared `include` is `src/**/*.{ts,tsx}`.
- `@okta/odyssey-test-tooling/browser`, for the browser:
  - Importing it registers the setup: the `toBeAccessible` matcher, and hooks that park the pointer before each test and reset the viewport and clear `sessionStorage` after it. The browser project loads it, so a package does not import it.
  - `renderWithOdysseyProvider(element, { providerProps, ...renderOptions })` and `renderHookWithOdysseyProvider(callback, { providerProps, ...renderHookOptions })`: render inside an `OdysseyProvider` with MUI transitions turned off. A `providerProps.themeOverride` is merged on top of `noTransitionsTheme`. They import `@okta/odyssey-react-mui`, so they render whichever version the package resolves.
  - `noTransitionsTheme`, a `themeOverride` that zeroes MUI transitions.

  A test importing a helper also loads the setup. A module runs once per page, so that is a no-op after the setup file has loaded it.

odyssey-react-mui's `vitest.config.ts` aliases `@okta/odyssey-react-mui` to its `src/index.ts`, so the helpers wrap its tests in the source `OdysseyProvider`. The contributions stack dedupes react-mui, so a contribution renders the version it pins.

Packages provisioned from the contributions stack get both through the stack and need no wiring of their own. Package-specific browser setup goes in their provisioned `vitest-browser-setup.project.ts`.

## Wiring it into a package that does not use the stack

Add `"@okta/odyssey-test-tooling": "workspace:*"` as a `devDependency`, then:

1. In `vitest.config.ts`, add `createVitestProject({ type: "browser" })` to `test.projects`. Pass `setupFiles` only for setup of the package's own.
2. Add `"@okta/odyssey-test-tooling/browser"` and `"@vitest/browser/matchers"` to `compilerOptions.types`.
