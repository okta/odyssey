# 2026-06-11 — Component JSDoc is the single source of truth, consumed by MCP

- **Status:** Accepted
- **Date:** 2026-06-11
- **Author:** Ricardo Joenck
- **Source:** commit a4cc9b2c0216797b40f5a89c234526f788514e73
- **Area:** docs
- **Tags:** #docs #jsdoc #mcp

## Decision (the rule)

The JSDoc in `odyssey-react-mui` component source files is the single source of truth for
component and prop documentation. `packages/platform/odyssey-mcp/scripts/generateMetadata.ts`
reads it to generate MCP metadata. The component-level JSDoc block must sit immediately above
the `const ComponentName = …` declaration — not above the Props type, not above the memoized
re-export. Prop JSDoc goes above each field in the `ComponentNameProps` type. Any component or
prop change updates its JSDoc in the same commit.

## What was rejected

1. **Hand-maintained metadata** — a separate JSON/TS file describing components and props. It
   drifts from the source the moment a prop changes.
2. **A standalone extraction codemod** (a version existed on `origin/caio-updates`) — rejected
   in favor of reading JSDoc directly at generation time.
3. **JSDoc on the memo wrapper** (`export { MemoizedBadge as Badge }`) — the generator resolves
   the component via `getVariableDeclaration("Badge")`, i.e. `const Badge = …`. JSDoc anywhere
   else is silently not picked up.

## Why

The MCP server exposes component docs to agentic consumers. If docs live anywhere other than
the source-of-truth the component is defined in, they rot. Anchoring the generator to the
`const ComponentName = …` declaration makes the placement rule mechanical and checkable.

## How to honor it

- Component description: JSDoc above `const ComponentName = …`.
- Prop descriptions: JSDoc above each field in `type ComponentNameProps`.
- Use `@default`, `@deprecated`, `@see` tags per AGENTS.md §5.
- Boolean props lead with "If \`true\`, …"; wrap prose at 80 chars.
- Never put the component JSDoc on the Props type or the memo re-export.

## Related

- [MDX component docs live in Storybook, not a top-level docs folder](2026-06-24-mdx-docs-in-storybook.md)
