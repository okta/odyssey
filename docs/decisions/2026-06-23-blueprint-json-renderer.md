# 2026-06-23 — Blueprint uses a JSON UI renderer, not React-authored page shells

- **Status:** Accepted
- **Date:** 2026-06-23
- **Author:** Kevin Ghadyani
- **Source:** commit 1b0aa0d8c42a1b18d152f6060d7fdfbb1866c2b1
- **Area:** architecture
- **Tags:** #architecture #blueprint

## Decision (the rule)

Blueprint pages are defined as JSON/YAML configuration objects that drive a runtime React
renderer. Product teams author pages declaratively in YAML; the renderer hydrates them.
Blueprint does not export React page shell components that teams import and render directly.

## What was rejected

React-authored page shells: teams write `<MyPage />` which internally imports Blueprint layout
components. The natural first instinct is to provide a `<Dashboard />` or `<AdminPage />`
component. This was rejected because it couples the page shape to a specific React component
hierarchy, makes AI-assisted page generation harder (a generator must understand the React
component tree, not a schema), and prevents runtime-switchable layouts.

## Why

The JSON renderer approach allows:

1. AI agents to generate pages from a schema without understanding React internals.
2. Pages to be described in YAML next to product configuration without a frontend build step.
3. The renderer to validate pages against a JSON Schema before hydration (compile-time safety).
4. A/B testing of page layouts without shipping new React code.

## How to honor it

- New Blueprint pages are authored in YAML with `source` + `rowTemplate` bindings.
  Never hardcode list items in JSX.
- The renderer in `packages/contributions/odyssey-blueprint` and the core package in
  `packages/core/odyssey-blueprint-core` own the hydration logic.
- Do not add a React page-shell component to Blueprint as a shortcut — write a schema type and
  renderer support instead.
- Jotai atoms (Blueprint's Jotai store) handle cross-component state. Never use
  `window.dispatchEvent` / `CustomEvent`.

## Related

- [Blueprint legacy kind-based form-field system retired](2026-06-23-blueprint-retire-kind-fields.md)
- [odyssey-blueprint-core is a separate package from odyssey-blueprint](2026-07-01-blueprint-core-package-split.md)
