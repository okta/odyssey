# 2026-06-23 — V1 suffix uses PascalCase (no underscore): WizardV1, not Wizard_v1

- **Status:** Accepted
- **Date:** 2026-06-23
- **Author:** Kevin Ghadyani
- **Source:** commit 6454cb574d78213097f0119311486c30c793624d
- **Area:** naming
- **Tags:** #naming #blueprint

## Decision (the rule)

Versioned component names use the `V1` PascalCase suffix: `WizardV1.tsx`, `displayName = "WizardV1"`.
Never `Wizard_v1.tsx`, never `"Wizard_v1"` in displayName, never `WizardV_1`.

## What was rejected

Snake-case `_v1` suffix (`Wizard_v1.tsx`). This is what cspell and some linters suggest
when they see an unrecognized identifier — they auto-format to snake_case. Every agent
that encounters a warning about `WizardV1` being an unknown word will attempt to rename it
to `Wizard_v1` unless this rule is explicitly documented.

## Why

Okta's convention for component versioning is PascalCase suffixes. `V1` reads as a single
token; `_v1` looks like a private/internal marker in the Python/Ruby convention. The underscore
form has caused confusion in code reviews and in agent-generated code that matches the
snake-case pattern from other languages.

## How to honor it

- File names: `WizardV1.tsx` not `Wizard_v1.tsx`
- `displayName`: `"WizardV1"` not `"Wizard_v1"`
- If cspell warns about `V1`, add it to the allowed-words list. Do not rename.
- "Preserve domain terminology" — this is an Okta convention, not a typo.

## Related

- [File and folder names must be unique and descriptive — no generic names](2026-06-23-unique-descriptive-filenames.md)
- [No sub-barrel index.ts files inside packages](2026-06-23-no-sub-barrel-index.md)
