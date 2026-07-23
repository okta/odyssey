# 2026-04-23 — odyssey-cli owns contribution sync and promotion

- **Status:** Accepted
- **Date:** 2026-04-23
- **Author:** Ricardo Joenck
- **Source:** commit d6fdfc81596680c7762de1361312aa090492da2d
- **Area:** tooling
- **Tags:** #tooling #contributions #odyssey-cli

## Decision (the rule)

All contribution lifecycle operations (syncing a contributions package to the latest stack,
promoting a contribution to core, generating migration codemods) are implemented as commands
inside `packages/platform/odyssey-cli`. They are not ad-hoc scripts, GitHub Actions, or
Claude skills that shell out to inline code.

## What was rejected

One-off shell scripts checked into `scripts/` or `.claude/commands/`. The natural AI drift is to
write a quick bash script or inline the logic into a skill prompt. This produces logic that is
untested, hard to type-check, and impossible to call from other tools.

## Why

odyssey-cli is already the monorepo's programmatic entry point for build tooling. Centralizing
contribution operations there means they get TypeScript types, unit tests, and can be invoked
from skills, CI, and the terminal uniformly. The `contribution-promote` and `contribution-setup`
Claude skills invoke odyssey-cli under the hood — they are UX wrappers, not reimplementations.

Note: contribution _sync_ is one of several CLI responsibilities, not the first. i18n
generation (see the related record) was an earlier odyssey-cli/contribution-tooling
responsibility — the CLI has been the home for contribution build operations from before the
sync command existed.

## How to honor it

- When a new contribution lifecycle operation is needed, add it to odyssey-cli first.
- The Claude skill for that operation should call `yarn workspace @okta/odyssey-cli <command>`,
  not reimplement the logic in the skill's markdown.

## Related

- [Contributions packages use a shared stack, not isolated deps](2026-03-25-contributions-shared-stack.md)
- [contributionsMetadata.json lives in every contributions package](2026-03-25-contributions-metadata-json.md)
- [contribution-promote skill drives the promotion workflow](2026-05-20-contribution-promote-skill.md)
