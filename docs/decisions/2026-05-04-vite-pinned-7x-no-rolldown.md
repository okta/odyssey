# 2026-05-04 — Vite pinned to 7.x — rolldown binaries excluded

- **Status:** Accepted
- **Date:** 2026-05-04
- **Author:** Ricardo Joenck
- **Source:** commit a51a959e7802c7ab1e6422b662d36e74e76532a4
- **Area:** tooling
- **Tags:** #tooling #vite

## Decision (the rule)

Vite is pinned to `^7.x` in all packages. Vite 8 (which ships rolldown as the default bundler)
must not be adopted until rolldown's binary compatibility is verified across all CI environments.

## What was rejected

Allowing `^latest` or `^8.x`. Vite 8 downloads rolldown native binaries at install time.
Those binaries are platform-specific (macOS arm64, Linux x64, etc.) and have caused install
failures and CI cache mismatches in the Okta infrastructure.

## Why

Rolldown binaries added unexpected CI failures: installs that worked locally failed on CI nodes
with a different libc version. The binary download also broke reproducible installs (violates
the immutable-install contract Bacon CI enforces). Pinning to 7.x restores predictable,
binary-free installs.

## How to honor it

- When upgrading Vite, confirm rolldown binary behavior is resolved before moving to 8.x.
- Do not `yarn add vite@latest` without checking whether 8.x is now the latest.
- The pin lives in root `package.json` resolutions and in individual package `package.json` files.

## Related

- [Tests run in vitest 4 browser mode with Playwright, not jsdom](2026-05-04-vitest-4-browser-mode.md)
