# Architectural Decision Records

This log captures every notable architectural, process, and tooling decision made in Odyssey since Claude AI collaboration began in February 2026.

**If you are an agent:** skim this index at the start of any non-trivial task. The "What was rejected" sections name what you will naively drift back toward.

## Rules

- **Append-only.** Never delete or rewrite a past decision.
- **Supersede, never delete.** Update the old file's Status and add a `> [!WARNING]` callout; the new file adds a `Supersedes:` line.
- **One decision per file**, named `YYYY-MM-DD-kebab-slug.md`.
- **Date = when the decision was made**, recovered from the commit/PR/chat if backfilled.
- See [TEMPLATE.md](TEMPLATE.md) for the full format.

## Tags

Each record carries `#kebab-case` tags in its header for grepping, e.g.
`grep -rl '#blueprint' docs/decisions/`. Current tags in use:

`#agents-md` `#ai-workflow` `#architecture` `#blueprint` `#coding-conventions`
`#contributions` `#dataview` `#docs` `#i18n` `#icons` `#jsdoc` `#mcp`
`#naming` `#odyssey-cli` `#process` `#public-mirror` `#release` `#skills`
`#storybook` `#styling` `#superseded` `#testing` `#theming` `#tooling`
`#vite` `#vitest` `#wp-components`

## Index

| Date       | Decision                                                                                                                             | Area         | Tags                        | Status        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------ | --------------------------- | ------------- |
| 2026-02-20 | [AGENTS.md is the canonical AI instruction file](2026-02-20-agents-md-canonical-ai-instructions.md)                                  | ai-workflow  | #agents-md                  | Accepted      |
| 2026-03-25 | [Contributions packages use a shared stack, not isolated deps](2026-03-25-contributions-shared-stack.md)                             | architecture | #contributions              | Accepted      |
| 2026-03-25 | [contributionsMetadata.json lives in every contributions package](2026-03-25-contributions-metadata-json.md)                         | architecture | #contributions              | Accepted      |
| 2026-04-16 | [Functions take one object arg with inline-defaulted DI; types co-locate](2026-04-16-functional-conventions-single-object-arg-di.md) | architecture | #coding-conventions         | Accepted      |
| 2026-04-23 | [odyssey-cli owns contribution sync and promotion](2026-04-23-odyssey-cli-contribution-sync.md)                                      | tooling      | #contributions #odyssey-cli | Accepted      |
| 2026-04-28 | [DataView forked into wp-components, not shared from odyssey-react-mui](2026-04-28-dataview-forked-wp-components.md)                 | architecture | #dataview #wp-components    | Accepted      |
| 2026-04-29 | [Contrast-mode detection runs pre-paint and crosses shadow-DOM boundaries](2026-04-29-contrast-mode-detection.md)                    | architecture | #theming                    | Accepted      |
| 2026-05-04 | [Tests run in vitest 4 browser mode with Playwright, not jsdom](2026-05-04-vitest-4-browser-mode.md)                                 | testing      | #vitest                     | Accepted      |
| 2026-05-04 | [Tests use DI over mocks, exact matchers, and displayName suites](2026-05-04-test-style-no-mocks-di-exact-matchers.md)               | testing      | #coding-conventions         | Accepted      |
| 2026-05-04 | [Vite pinned to 7.x — rolldown binaries excluded](2026-05-04-vite-pinned-7x-no-rolldown.md)                                          | tooling      | #vite                       | Accepted      |
| 2026-05-05 | [Icons and logos live in separate subfolders, not a single flat directory](2026-05-05-icons-logos-split-folders.md)                  | architecture | #icons                      | Accepted      |
| 2026-05-20 | [contribution-promote skill drives the promotion workflow](2026-05-20-contribution-promote-skill.md)                                 | process      | #contributions #skills      | Accepted      |
| 2026-05-28 | [i18n is generated from .properties into typed files, not hand-written](2026-05-28-i18n-generated-not-handwritten.md)                | tooling      | #i18n                       | Accepted      |
| 2026-05-29 | [Commit type controls publishing for Semantic Release packages](2026-05-29-semantic-release-commit-type-publishing.md)               | process      | #release                    | Accepted      |
| 2026-06-08 | [Allow Jira ticket IDs in a comment above a test](2026-06-08-allow-jira-ids-in-test-comments.md)                                     | process      | #public-mirror #superseded  | ⚠️ Superseded |
| 2026-06-11 | [Component JSDoc is the single source of truth, consumed by MCP](2026-06-11-jsdoc-single-source-of-truth-mcp.md)                     | docs         | #jsdoc #mcp                 | Accepted      |
| 2026-06-12 | [No Jira ticket IDs in source or comments — public mirror](2026-06-12-no-jira-ids-in-source-public-mirror.md)                        | process      | #public-mirror              | Accepted      |
| 2026-06-12 | [No internal product details (e.g. Monolith) in public-mirror content](2026-06-12-no-internal-product-details-public-mirror.md)      | process      | #public-mirror              | Accepted      |
| 2026-06-19 | [Use createOdysseyStyledComponent in library source, never sx](2026-06-19-createodysseystyledcomponent-over-sx.md)                   | styling      |                             | Accepted      |
| 2026-06-22 | [Reuse established libraries and in-repo patterns, don't hand-roll](2026-06-22-reuse-libraries-over-hand-rolling.md)                 | architecture | #coding-conventions         | Accepted      |
| 2026-06-23 | [Blueprint uses a JSON UI renderer, not React-authored page shells](2026-06-23-blueprint-json-renderer.md)                           | architecture | #blueprint                  | Accepted      |
| 2026-06-23 | [No sub-barrel index.ts files inside packages](2026-06-23-no-sub-barrel-index.md)                                                    | naming       | #coding-conventions         | Accepted      |
| 2026-06-23 | [File and folder names must be unique and descriptive — no generic names](2026-06-23-unique-descriptive-filenames.md)                | naming       |                             | Accepted      |
| 2026-06-23 | [V1 suffix uses PascalCase (no underscore): WizardV1, not Wizard_v1](2026-06-23-v1-suffix-pascalcase.md)                             | naming       | #blueprint                  | Accepted      |
| 2026-06-23 | [Blueprint legacy kind-based form-field system retired](2026-06-23-blueprint-retire-kind-fields.md)                                  | architecture | #blueprint                  | Accepted      |
| 2026-06-23 | [Re-export a scoped API surface, not a third-party catch-all namespace](2026-06-23-scoped-reexport-not-catchall.md)                  | architecture | #blueprint                  | Accepted      |
| 2026-06-23 | [Project-shared config goes in the repo, not the user's local-global settings](2026-06-23-shared-config-in-repo-not-local-global.md) | process      | #tooling                    | Accepted      |
| 2026-06-24 | [MDX component docs live in Storybook, not a top-level docs folder](2026-06-24-mdx-docs-in-storybook.md)                             | docs         | #storybook                  | Accepted      |
| 2026-06-25 | [Read the current file before editing; revert only your own last change](2026-06-25-read-current-state-before-editing.md)            | process      | #ai-workflow                | Accepted      |
| 2026-06-25 | [Prefer structured/data-driven transforms over string replacement](2026-06-25-structured-editing-over-string-replacement.md)         | architecture | #ai-workflow                | Accepted      |
| 2026-06-29 | [Removing code means removing every trace, including schemas and docs](2026-06-29-remove-all-traces-of-deleted-code.md)              | process      | #ai-workflow                | Accepted      |
| 2026-06-30 | [Fix the root cause, not the symptom; verify the real cause first](2026-06-30-root-cause-over-symptom-patch.md)                      | process      | #ai-workflow                | Accepted      |
| 2026-07-01 | [odyssey-blueprint-core is a separate package from odyssey-blueprint](2026-07-01-blueprint-core-package-split.md)                    | architecture | #blueprint                  | Accepted      |
| 2026-07-02 | [Fix the failing tool, don't delete the file it chokes on](2026-07-02-fix-the-tool-not-delete-the-file.md)                           | process      | #ai-workflow                | Accepted      |
| 2026-07-02 | [Embed React in web components via renderReactInWebComponent](2026-07-02-render-react-in-web-component.md)                           | architecture |                             | Accepted      |
| 2026-07-06 | [Blueprint v3 schema uses versioned identifiers and an inputs/events envelope](2026-07-06-blueprint-v3-versioned-envelope.md)        | architecture | #blueprint                  | Accepted      |
| 2026-07-06 | [RTK (Rust Token Killer) filters Bacon/git output to cut token cost](2026-07-06-rtk-token-filtering.md)                              | ai-workflow  | #tooling                    | Accepted      |
| 2026-07-08 | [Don't create files or directories to satisfy an error-message path](2026-07-08-no-paths-from-error-messages.md)                     | process      | #ai-workflow                | Accepted      |
