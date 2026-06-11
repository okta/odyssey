# Research: Link External Icon Accessibility

## Existing patterns / prior art

Odyssey already uses `ScreenReaderText` (a visually-hidden `<span>` via MUI's `visuallyHidden` utility) in several components to provide accessible labels:

- `packages/core/odyssey-react-mui/src/Banner.tsx` — announces severity level to screen readers.
- `packages/core/odyssey-react-mui/src/FieldLabel.tsx` — provides hidden input labels.

Translation strings are managed via `.properties` files at `packages/core/odyssey-react-mui/src/properties/odyssey-react-mui.properties`. Components call `useTranslation()` from `./i18n.generated/i18n.js` to access them at runtime.

## Data shapes

No API or schema changes. The only new data is a single i18n key:

```
link.external.newwindow = Opens in a new tab
```

Added to `odyssey-react-mui.properties`. The i18n build step (`yarn workspace @okta/odyssey-react-mui build`) regenerates TypeScript translation files from `.properties` sources automatically.

### Existing translations reused

The `atko-eng/i18n` repo already has this exact string translated in two packages:

| Package                   | Key                     |
| ------------------------- | ----------------------- |
| `okta-signin-widget.i18n` | `external.link.aria`    |
| `enduser-v2`              | `link.newTabIcon.Label` |

All 28 locale translations were copied from `okta-signin-widget.i18n/login_<locale>.properties` into our local `properties/translations/` folder to ship fully localized without waiting for the translation pipeline.

## Edge cases

- **Custom `ariaLabel` already provided:** The `ScreenReaderText` is additive — it lives inside the link element, so if a consumer provides `ariaLabel`, that overrides the entire accessible name (including the screen reader text) per the `aria-label` spec. This matches the existing behavior and gives consumers full control.
- **Icon-only links:** If `children` is empty/whitespace and no `ariaLabel` is set, the accessible name would be only "opens in a new tab" which is insufficient. However, this is a pre-existing issue unrelated to this change — the component requires `children: ReactNode` and consumers should always provide meaningful text.
- **Non-`_blank` targets:** No change. The icon and screen reader text only render when `target === "_blank"`.

## Proposed approach

Minimal change to `packages/core/odyssey-react-mui/src/Link.tsx`:

1. Import `useTranslation` and `ScreenReaderText`.
2. Inside the `target === "_blank"` conditional, render `<ScreenReaderText>` with the translated string before the decorative icon span.
3. The icon span retains `role="presentation"` since it's purely decorative — the meaning is now conveyed by the screen reader text.

```tsx
{
  target === "_blank" && (
    <>
      <ScreenReaderText translate={translate}>
        {t("link.external.newwindow")}
      </ScreenReaderText>
      <span className="Link-indicator" role="presentation">
        <ExternalLinkIcon />
      </span>
    </>
  );
}
```

## Open questions for spec

None. The approach aligns with the existing `ScreenReaderText` + i18n pattern used elsewhere in Odyssey, and the design team confirmed the solution direction.
