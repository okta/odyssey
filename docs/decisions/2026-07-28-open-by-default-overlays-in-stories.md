# 2026-07-28 — Render overlay stories open by default instead of using a play function

- **Status:** Accepted
- **Date:** 2026-07-28
- **Author:** Kevin Ghadyani
- **Source:** chat session, 2026-07-28
- **Area:** testing
- **Tags:** #storybook #testing

## Decision (the rule)

For a Storybook story whose only reason for a `play` function is to reveal an
open or expanded state controlled by a boolean prop or arg (Dialog, Drawer,
Toast, Accordion), render it open by default (set the arg to `true`, or seed the
render's initial `useState`) and delete the `play`. Pair each converted overlay
with a manual `Component.mdx` docs page so the open backdrop does not render
inline on the Docs page.

## What was rejected

The prior convention required every transient-state overlay story to carry a
lightweight `play` function that clicked a trigger button so Applitools would
capture the open state. That is the pattern a future agent will drift back
toward, because the old AGENTS.md text said such components "must have a
lightweight play function." A `play` that only opens the component is redundant
when the same state can be the story's initial render.

## Why

Applitools screenshots each story after its `play` completes, so a play was the
only way to capture an open overlay when the story rendered closed. But the open
state is expressible as an initial prop, so the play adds friction to every new
overlay story with no VRT benefit. Rendering open by default captures the same
screenshot with less code, and the trigger button stays for human interaction in
Canvas.

The catch: `autodocs` is enabled globally in
`packages/apps/odyssey-storybook/.storybook/preview.ts`, so an open Dialog or
Drawer would render its full-viewport backdrop inline on the component's Docs
page and stack backdrops. A manual MDX docs page attached via `<Meta of={...} />`
overrides the generated autodocs page for that component, letting us document the
API with `<Controls />` and a closed, controlled example while keeping the open
stories off the Docs page.

## How to honor it

- Set the open arg to `true` in the story or meta `args` (Dialog `isOpen`, Toast
  `isVisible`, Accordion `isExpanded`), or seed the render's initial
  `useState(true)` (Drawer). Keep the state controlled so the arg still drives it:
  wire `onChange` back to the arg (or to local state on the Docs page). Delete the
  `play` and any now-unused `userEvent` / `within` imports.
- Add a `Component.mdx` next to the stories. For backdrop overlays (Dialog,
  Drawer, Toast) use `<Meta>` / `<Title>` / `<Subtitle>` / `<Description>` +
  prose + a fenced code example + `<Controls />`. Do not use `<Primary />` or
  `<Stories />`, which render the open story and reintroduce the backdrop.
  Accordions have no backdrop, so their MDX may use `<Primary />` / `<Stories />`.
- Keep the `play` for states that cannot be an initial prop: hover-revealed
  tooltips, focus-revealed content (SkipToContent), menus with no force-open
  prop, dropdowns opened via interaction, row selection or expansion, multi-step
  navigation, and any story whose interaction is the behavior under test.
- Field dropdowns (Autocomplete, Select, Picker, DatePicker) are out of scope
  here: their Odyssey wrappers do not expose an `open` / `defaultOpen` prop, so
  they still need a `play` until such a prop is added.

## Related

- [MDX component docs live in Storybook, not a top-level docs folder](2026-06-24-mdx-docs-in-storybook.md)

## Superseding this decision

When a later decision reverses this one, do not delete this file. Instead:

1. Change this file's Status to `Superseded by [new title](YYYY-MM-DD-new-slug.md)`.
2. Add a `> [!WARNING]` callout at the very top of this file pointing to the new record.
3. In the new record, add a `**Supersedes:** [this title](this-file.md)` line.
