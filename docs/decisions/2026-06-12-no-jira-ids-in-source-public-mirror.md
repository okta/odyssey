# 2026-06-12 — No Jira ticket IDs in source or comments — public mirror

- **Status:** Accepted
- **Date:** 2026-06-12
- **Author:** Kevin Ghadyani
- **Source:** commit d8eb6b8bf11e367c5afa22ad545addc2748d3f48
- **Supersedes:** [2026-06-08-allow-jira-ids-in-test-comments](2026-06-08-allow-jira-ids-in-test-comments.md)
- **Area:** process
- **Tags:** #process #public-mirror

## Decision (the rule)

Never reference internal Jira ticket IDs (e.g. `OKTA-XXXXXX`) in source code, comments, or test
names. Ticket references belong in the commit message or PR body only. The rare exception is a
`TODO` that genuinely needs a tracking link — and even those should be scarce.

## What was rejected

The decision made four days earlier ([2026-06-08](2026-06-08-allow-jira-ids-in-test-comments.md))
that allowed `// OKTA-…` comments above tests for traceability. This is the natural instinct —
link the code to its ticket — and it is exactly what an agent will re-propose unless the
public-mirror constraint is written down.

## Why

This repo syncs to a **public mirror**. Any `OKTA-…` ID committed to source is published to the
public internet, leaking internal ticket numbers, roadmap hints, and issue-tracker structure.
Traceability is preserved through git (the commit message and PR carry the ticket) without
exposing anything publicly. The four-day flip-flop is itself the lesson: the convenience of
in-code ticket links is not worth the leak.

## How to honor it

- Test names must read the same regardless of which issue tracker is in use — no ticket IDs.
- Comments explaining a past fix describe the _why_ on their own, without the ticket.
- Put the ticket in the commit message / PR body / branch name instead.
- If a `TODO` truly needs a tracking link, that is the only sanctioned exception, and it should
  be rare.

## Related

- [Allow Jira ticket IDs in a comment above a test](2026-06-08-allow-jira-ids-in-test-comments.md) (superseded by this)
