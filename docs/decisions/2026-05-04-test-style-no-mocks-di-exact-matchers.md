# 2026-05-04 — Tests use DI over mocks, exact matchers, and displayName suites

- **Status:** Accepted
- **Date:** 2026-05-04
- **Author:** Ricardo Joenck
- **Source:** commit baff3b8d07995859298f5ee9745010064149294e
- **Area:** testing
- **Tags:** #testing #coding-conventions

## Decision (the rule)

- Use `test()`, not `it()`.
- **No module mocks** (`vi.mock`). Design functions with dependency injection and pass
  lightweight inline fakes.
- **Exact matchers only** — never `expect.stringContaining` / `objectContaining` /
  `arrayContaining`. Assert the full object, string, or array.
- For plain functions: `describe(functionName.name, …)`. For React components in
  odyssey-react-mui: `describe(ComponentName.displayName!, …)` — exported components are
  `React.memo()` wrappers, so `.name` returns `"MemoizedX"`.
- Name tests after the **scenario**, not the expected outcome.

## What was rejected

1. **Module mocking (`vi.mock`)** — the React-testing default. Rejected because it couples tests
   to import structure, hides real behavior, and fights the single-object-arg DI convention.
2. **Partial matchers** — convenient but they hide fields and let regressions through silently.
3. **`describe(ComponentName.name)`** — returns `"MemoizedX"` for memo-wrapped exports, so
   suites were mislabeled; `.displayName` is set explicitly on every exported component.

## Why

Mocks and partial matchers both trade correctness for convenience: a mocked dependency can drift
from the real one, and a partial matcher passes even when an unexpected field changes. DI +
exact assertions catch the regressions the log exists to prevent. The `displayName` suite rule
is a direct consequence of the `React.memo()` export pattern.

## How to honor it

- Inject dependencies as optional args (see the functional-conventions record) and pass inline
  fakes; do not `vi.mock`.
- Assert the entire expected value.
- Use `.displayName!` in `describe` for components, `.name` for plain functions.

## Related

- [Functions take one object arg with inline-defaulted DI; types co-locate](2026-04-16-functional-conventions-single-object-arg-di.md)
- [Tests run in vitest 4 browser mode with Playwright, not jsdom](2026-05-04-vitest-4-browser-mode.md)
