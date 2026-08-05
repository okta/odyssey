# External links announce new-tab behavior with hidden text

- **Status:** Accepted
- **Date:** 2026-06-03
- **Author:** Nikhil Venkatraman
- **Source:** 256b78cf595b97610142562645acc15354d8dd19,
  882c852021007e545376bb88c9eb6b486a582577
- **Area:** architecture
- **Tags:** #icons #i18n

## Decision (the rule)

When an Odyssey link opens with `target="_blank"`, include localized visually
hidden text that announces the new-tab behavior. Keep the visible external-link
icon decorative.

Apply the same rule to equivalent link implementations, including SideNav links.

## What was rejected

We rejected relying on the visible icon because it is intentionally hidden from
assistive technology. We also rejected exposing the icon itself as the
announcement, adding a required prop, or adding a tooltip. Those alternatives
either fail to communicate the behavior reliably or expand the public API for a
behavior the component can provide automatically.

Targets other than `_blank` were left unchanged because they do not represent the
new-tab behavior this decision addresses.

## Why

The external-link icon previously used `role="presentation"`, so screen-reader
users received no warning before a link opened a new tab. Odyssey already had a
`ScreenReaderText` pattern for accessible text and an i18n pipeline for localized
component strings.

The `link.external.newwindow` translation key uses the established wording
"Opens in a new tab." Existing approved translations were reused so the
accessibility behavior shipped consistently across supported locales.

## How to honor it

- Render `ScreenReaderText` inside a link when `target === "_blank"`.
- Use the generated translation for `link.external.newwindow`.
- Keep the visible external-link icon wrapper presentational.
- Apply the pattern to new link implementations rather than duplicating a
  different announcement.
- Add browser-mode accessibility coverage that asserts the complete accessible
  name.
- Remember that an explicit `ariaLabel` overrides the accessible name assembled
  from link contents.

## Related

- [i18n is generated from .properties into typed files, not hand-written](2026-05-28-i18n-generated-not-handwritten.md)

## Superseding this decision

When a later decision reverses this one, do not delete this file. Instead:

1. Change this file's Status to `Superseded by [new title](YYYY-MM-DD-new-slug.md)`.
2. Add a `> [!WARNING]` callout at the very top of this file pointing to the new
   record.
3. In the new record, add a `Supersedes:` line.

This keeps the decision history intact.
