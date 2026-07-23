# 2026-06-08 — Allow Jira ticket IDs in a comment above a test

> [!WARNING]
> This decision has been superseded. See
> [No Jira ticket IDs in source or comments — public mirror](2026-06-12-no-jira-ids-in-source-public-mirror.md).
> Jira IDs in source/comments leak internal details to the public mirror.

- **Status:** Superseded by [2026-06-12-no-jira-ids-in-source-public-mirror](2026-06-12-no-jira-ids-in-source-public-mirror.md)
- **Date:** 2026-06-08
- **Author:** Kevin Ghadyani
- **Source:** commit 5d6a62be53a8832b4dea713eb4dd6570d1085e24
- **Area:** process
- **Tags:** #process #public-mirror #superseded

## Decision (the rule)

A Jira ticket ID (e.g. `// OKTA-XXXXXX`) may be placed in a comment above a test to link the
test to its tracking ticket.

## What was rejected

Keeping ticket references out of code entirely. At the time, the argument for allowing them was
traceability — a reader could jump from a test to its ticket.

## Why

Short-lived rationale: linking tests to tickets seemed to aid navigation and context. This held
for only four days before the public-mirror consequence was recognized (see the superseding
record).

## How to honor it

Do not follow this record. It is retained only to preserve the decision trail. Follow the
superseding record instead.

## Related

- [No Jira ticket IDs in source or comments — public mirror](2026-06-12-no-jira-ids-in-source-public-mirror.md) (supersedes this)
