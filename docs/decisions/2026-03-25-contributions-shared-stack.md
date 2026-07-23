# 2026-03-25 — Contributions packages use a shared stack, not isolated deps

- **Status:** Accepted
- **Date:** 2026-03-25
- **Author:** Matthew Shortt
- **Source:** commit 46a81c08495adf6dfcef9b9ca17f6d29766c0d22
- **Area:** architecture
- **Tags:** #architecture #contributions

## Decision (the rule)

All packages under `packages/contributions/**` share a single version-pinned stack
(odyssey-react-mui peer dep, Vite config, TS config, Vitest config). When the stack bumps,
a single "update contributions stack" pass upgrades every package at once.

## What was rejected

Letting each contributions package manage its own dependency versions independently. The natural
AI drift is to update one package's `package.json` and leave the others stale, or to copy-paste
a dependency version without realizing there is a shared-stack contract.

## Why

Contributions packages are authored by multiple teams. Without a shared stack, version skew
accumulates silently: Package A uses odyssey-react-mui@1.50, Package B uses @1.57, and a
consumer that imports both gets two React contexts and broken tokens. The shared stack enforces
that every contributions package ships against the same core version.

## How to honor it

- When bumping odyssey-react-mui in any contributions package, run the `contribution-update-stack`
  skill to sync all packages.
- Never edit a single contributions `package.json` version in isolation without checking whether
  the stack version in `.config/` also needs to move.
- The `build: update contributions stack` commit type is the standard vehicle for these bumps.

## Related

- [contributionsMetadata.json lives in every contributions package](2026-03-25-contributions-metadata-json.md)
- [odyssey-cli owns contribution sync and promotion](2026-04-23-odyssey-cli-contribution-sync.md)
- [contribution-promote skill drives the promotion workflow](2026-05-20-contribution-promote-skill.md)
