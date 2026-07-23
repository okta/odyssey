# 2026-05-05 — Icons and logos live in separate subfolders, not a single flat directory

- **Status:** Accepted
- **Date:** 2026-05-05
- **Author:** Ricardo Joenck
- **Source:** commit 2457134a3c49f77505712ad566f3a2fb5caa5799
- **Area:** architecture
- **Tags:** #architecture #icons

## Decision (the rule)

Inside `packages/core/odyssey-react-mui/src/`, icons live in `icons/` and logos live in
`logos/`. They are separate named sub-exports (`@okta/odyssey-react-mui/icons` and
`@okta/odyssey-react-mui/logos`). They must not be merged back into a single flat directory.

## What was rejected

A single flat `icons/` directory containing both icon and logo SVG components. The natural
grouping assumption is "they're all SVG assets, put them together." But logos are licensed
assets with different update cadences, different sizing semantics (logos are not square), and
different token usage than icons.

## Why

Consumers need to import icons and logos separately for tree-shaking to work effectively.
A unified directory prevents the bundler from knowing which assets a consumer actually uses.
Separating them also clarified the ownership contract: the design team owns logos; the
engineering team owns icons.

## How to honor it

- New icon components go in `src/icons/`.
- New logo components go in `src/logos/`.
- The sub-export map in `package.json` must have separate entries for each.
- Do not add a `src/assets/` or `src/svgs/` umbrella directory.

## Related

- [File and folder names must be unique and descriptive — no generic names](2026-06-23-unique-descriptive-filenames.md)
