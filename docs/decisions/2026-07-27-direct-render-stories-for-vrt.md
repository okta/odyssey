# Direct-render Storybook states for VRT

- **Status:** Accepted
- **Date:** 2026-07-27
- **Author:** Ricardo Joenck
- **Source:** chat session, 2026-07-27
- **Area:** testing
- **Tags:** #storybook #testing

## Decision (the rule)

Render each visual state directly in Storybook for visual regression testing.
Keep interaction behavior in browser tests, and use Storybook `play` functions
only when the interaction itself must be captured and direct rendering is not
practical.

## What was rejected

We rejected using `play` functions as the normal way to open menus, dialogs,
drawers, tooltips, calendars, and other transient states for VRT. That pattern
adds runtime, timing sensitivity, and interaction setup to every visual capture
even when story args or a dedicated story can represent the same state directly.

We also rejected treating Storybook interaction scripts as substitutes for
browser tests. A screenshot can verify appearance after an interaction, but it
does not provide the focused behavioral and accessibility assertions expected
from browser tests.

## Why

VRT should capture deterministic component states with as little setup as
possible. Direct-rendered stories are faster, easier to understand, and less
likely to fail because of animation or interaction timing. Browser tests are the
appropriate place to verify how a user reaches those states.

Some visual behavior exists only during an interaction and cannot reasonably be
represented through args or direct rendering. A minimal `play` function remains
available for those exceptional cases.

## How to honor it

- Create a dedicated story or use args to render each state Applitools should
  capture.
- Put clicks, keyboard input, focus transitions, and other interaction assertions
  in browser tests.
- Do not add a `play` function solely to expose a state that can be rendered
  directly.
- When a `play` function is unavoidable, keep it minimal and deterministic.
- Keep the handbook VRT guidance and the Storybook section of `AGENTS.md` aligned
  with this rule.

## Related

- [Tests run in vitest 4 browser mode with Playwright, not jsdom](2026-05-04-vitest-4-browser-mode.md)

## Superseding this decision

When a later decision reverses this one, do not delete this file. Instead:

1. Change this file's Status to `Superseded by [new title](YYYY-MM-DD-new-slug.md)`.
2. Add a `> [!WARNING]` callout at the very top of this file pointing to the new
   record.
3. In the new record, add a `Supersedes:` line.

This keeps the decision history intact.
