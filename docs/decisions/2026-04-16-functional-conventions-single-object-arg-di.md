# 2026-04-16 — Functions take one object arg with inline-defaulted DI; types co-locate

- **Status:** Accepted
- **Date:** 2026-04-16
- **Author:** Kevin Ghadyani
- **Source:** commit f19006445952059b31ea33784a7caa03996bb72f ("add contribution promotion check script #226")
- **Area:** architecture
- **Tags:** #architecture #coding-conventions

## Decision (the rule)

Functions accept a **single object argument** (like React props), never positional args.
Injectable dependencies are **optional fields on that object, defaulted inline in the
destructure** — no separate `defaultDeps` variable. Types **co-locate with the file that
originates the concept**, never a catch-all `types.ts`. `index.ts` is **re-exports only** —
no logic, no type definitions.

## What was rejected

The idiomatic Node conventions the AI reaches for by default:

- Positional arguments (`checkAge(entry, packageDir, repoRoot, deps)`).
- A module-level `const defaultDeps = {...}` passed as a trailing param.
- A shared `types.ts` collecting types from across a package.
- Barrel `index.ts` files containing implementation.

## Why

These conventions were forged writing the contribution-promotion check tooling, which is
heavily dependency-injected for testability (no `vi.mock`). Positional args made call sites
unreadable and refactors dangerous; a `defaultDeps` object was redundant noise once defaults
could live inline; a shared `types.ts` created the same wrong-file confusion that the unique-
filename rule later attacked. Single-object args also make every function's inputs self-
documenting and its args-type exportable for callers.

## How to honor it

- New function: `myFn({ a, b, dep = defaultDep }: MyFnArgs)`, export `MyFnArgs`.
- Import the default dependency `as defaultX` and default it inline; do not create `defaultDeps`.
- Put a type in the file that produces the concept; import it elsewhere from there.
- If you're about to add logic to an `index.ts`, put it in a named file and re-export instead.

## Related

- [Tests use DI over mocks, exact matchers, and displayName suites](2026-05-04-test-style-no-mocks-di-exact-matchers.md)
- [No sub-barrel index.ts files inside packages](2026-06-23-no-sub-barrel-index.md)
- [File and folder names must be unique and descriptive — no generic names](2026-06-23-unique-descriptive-filenames.md)
