# YYYY-MM-DD — Short imperative title

- **Status:** Accepted
- **Date:** YYYY-MM-DD
- **Author:** the person who made the decision (commit author, or you if newly decided)
- **Source:** the full commit hash(es) that made the change. For a decision made in chat with
  no accompanying commit, write `chat session, YYYY-MM-DD` — the Author field already names who
  decided it, so no further evidence is needed.
- **Area:** tooling | testing | architecture | styling | naming | docs | process | ai-workflow
- **Tags:** #kebab-case #tags for grepping (see README.md's tag index)

(Status is one of: `Accepted`, or `Superseded by [YYYY-MM-DD-slug](link.md)`.)

## Decision (the rule)

Always… / Never… / Use X, not Y — one or two imperative sentences.

## What was rejected

What the AI did, what the obvious alternative was, or what we tried and reverted.
This is the load-bearing section — it names what a future agent will drift back toward.

## Why

Rationale in the decider's terms. The constraint, bug, or hard-won lesson.

## How to honor it

Concrete guardrails: which files/symbols are involved, what an agent would naively do to violate this.
When citing a source inline here or in "What was rejected", use the commit hash (`git show <hash>`),
not a PR number or title — hashes are verifiable; a paraphrased PR title can drift from the truth.

## Related

- [Other decision title](YYYY-MM-DD-other-slug.md)

## Superseding this decision

When a later decision reverses this one, do not delete this file. Instead:

1. Change this file's Status to `Superseded by [new title](YYYY-MM-DD-new-slug.md)`.
2. Add a `> [!WARNING]` callout at the very top of this file pointing to the new record.
3. In the new record, add a `**Supersedes:** [this title](this-file.md)` line.

This keeps the backflow trail intact so a reader can trace why the decision changed.
