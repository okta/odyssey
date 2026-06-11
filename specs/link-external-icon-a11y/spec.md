# Link External Icon Accessibility

**Status:** In Progress
**Last updated:** 2026-06-02

## Summary

Add a visually-hidden text alternative ("opens in a new tab") to the Odyssey Link component's external link icon so screen readers announce the link's behavior.

## Motivation

The Link component renders an `ExternalLinkIcon` when `target="_blank"`, but wraps it in `<span role="presentation">`, hiding it entirely from assistive technologies. Screen reader users have no way to know a link will open in a new tab before activating it. This violates WCAG 2.1 SC 3.2.5 (Change on Request) and was flagged by accessibility audits in OKTA-1164465 and OKTA-1164474.

## Requirements

- When `target="_blank"`, the Link component renders visually-hidden text that reads "Opens in a new tab" (localized via i18n).
- The text is part of the link's accessible name so screen readers announce it naturally (e.g. "Okta Opens in a new tab").
- The external link icon remains visually present but decorative (`role="presentation"`).
- No new required props are introduced (non-breaking change).
- The translation key `link.external.newwindow` is added to the existing `odyssey-react-mui.properties` resource bundle.
- All 28 locale translations are pre-populated from the existing `external.link.aria` key in `okta-signin-widget.i18n` (from the `atko-eng/i18n` repo), ensuring consistency across Okta products.

## Decisions

- **Capital "O" in "Opens"**: Matches the established convention in `okta-signin-widget` (`external.link.aria = Opens in a new tab`) and `enduser-v2` (`link.newTabIcon.Label = Opens in a new tab`). Consistency across Okta products is preferred over sentence-case continuation.
- **Pre-populated translations**: Rather than waiting for the i18n pipeline to translate the new key, we copied the already-approved translations from the sign-in widget to ship fully localized from day one.

## Open questions

None — design team guidance confirmed this approach in the Slack thread linked from OKTA-1175986.

## Out of scope

- Changing the visual appearance of the external link icon.
- Adding a tooltip on hover for the icon.
- Handling `target` values other than `_blank` (e.g. `_parent`, `_top`).
