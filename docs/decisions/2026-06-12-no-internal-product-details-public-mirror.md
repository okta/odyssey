# 2026-06-12 — No internal product details (e.g. Monolith) in public-mirror content

- **Status:** Accepted
- **Date:** 2026-06-12
- **Author:** Kevin Ghadyani
- **Source:** chat session, 2026-06-12
- **Area:** process
- **Tags:** #process #public-mirror

## Decision (the rule)

Anything committed to this repo is published to the public mirror, so it must not reference
internal-only product details — internal system/codenames (e.g. Monolith), internal architecture,
or roadmap. Leave that context out of source, comments, and docs.

## What was rejected

Including internal Monolith references in content bound for the repo. The AI includes the internal
name because it's the accurate technical context, not registering that the repo is public.

## Why

The repo syncs to a public mirror; internal codenames and architecture leak competitive and
security-relevant detail. This is the same constraint as the no-Jira-IDs rule, generalized to all
internal product references. The correction: "I don't wanna reveal Monolith stuff. This gets
copied to a public repo, so let's leave that stuff out."

## How to honor it

- Don't name internal systems/codenames or describe internal architecture in committed content.
- Refer to behavior generically ("the upstream service") when context is needed.
- Same test as Jira IDs: would this reveal something internal if seen on the public internet?

## Related

- [No Jira ticket IDs in source or comments — public mirror](2026-06-12-no-jira-ids-in-source-public-mirror.md)
