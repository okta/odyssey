# 2026-05-20 — contribution-promote skill drives the promotion workflow

- **Status:** Accepted
- **Date:** 2026-05-20
- **Author:** Matthew Shortt
- **Source:** commit b06547ce6d30bc0cf5f2e5ac13645273ce0c30a3
- **Area:** process
- **Tags:** #process #contributions #skills

## Decision (the rule)

Moving a component from `packages/contributions/**` to `packages/core/odyssey-react-mui` is
done through the `contribution-promote` Claude skill, which orchestrates: delta analysis,
Jira ticket creation, deprecation notices in the contributions package, codemod generation,
migration mapping updates, and PR creation. This is not done by hand.

## What was rejected

Ad-hoc promotion: copy-pasting source files, manually updating imports, and filing a Jira
ticket from scratch. The natural AI drift is to start moving files when asked to "promote"
a component, without running the full promotion checklist. This reliably misses the deprecation
notice, the codemod migration, or the AGENTS.md update.

## Why

Promotion is a multi-step process with several failure modes that have caused regressions in
the past (missing deprecation notices, consumers importing from the contributions package after
the core version shipped, codemods that don't cover all import patterns). The skill encodes the
checklist so it cannot be skipped.

## How to honor it

- When asked to promote a contributions component, invoke the `contribution-promote` skill.
  Do not start moving files manually.
- The skill calls odyssey-cli commands — if those commands fail, fix them before proceeding.
- See `packages/platform/odyssey-cli/README.md` for the underlying CLI documentation.

## Related

- [odyssey-cli owns contribution sync and promotion](2026-04-23-odyssey-cli-contribution-sync.md)
- [contributionsMetadata.json lives in every contributions package](2026-03-25-contributions-metadata-json.md)
