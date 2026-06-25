---
label: Design tokens
description: Odyssey design tokens — colors, spacing, typography, borders, shadows, focus, depth, motion, and palette.
---

# Design tokens

Odyssey is built on a layered token system. Color flows from raw primitives (`hue`) up into
semantic roles (`palette`); always express intent through the highest semantic layer that
fits, and drop down to a raw primitive only when no semantic token matches. Every value —
color, spacing, type, border, shadow — ships as a named token from
`@okta/odyssey-design-tokens`. Import the token; never hardcode a hex, px, or rem value.

<!-- TODO: expand the overall philosophy paragraph as more groups (typography, spacing, border, shadow, depth, focus, transition) are interviewed. -->

## Which group do I use?

```text
Need a color?
├─ Is there a semantic palette token for this role (text, action, surface, status)?
│  ├─ Yes → use the palette token.            (palette)
│  └─ No  → use a raw hue scale token.         (hue)
│
Need anything else?
├─ Applying spacing / layout distances? → use spacing tokens.         (spacing)
├─ Defining a visual edge or component shape?
│  ├─ Is this a keyboard focus ring (:focus-visible)?
│  │  ├─ Yes → use the focus token group.                             (focus)
│  │  └─ No  → use border color and radius tokens.                    (border)
└─ <!-- TODO: typography / shadow / depth / transition branches
      are added as each group is interviewed. -->
```

## Palette

**Philosophy.** Palette is Odyssey's semantic color layer. Each token maps a named role —
`primary`, `danger`, `warning`, `success`, `neutral` — onto a `hue` primitive, so consumers
express _intent_ (a primary action, a danger state) rather than a raw color. Palette is the
default, preferred way to apply color; raw `hue` is only a fallback when no palette role fits.

Pick the role by meaning, then pick the shade variant by the UI element's job:

- **`main`** — default fill / action color for the role.
- **`dark`** — hover state.
- **`darker`** — active / pressed state.
- **`light` / `lighter`** — disabled states and subtle backgrounds.
- **`text`** — body text rendered in that role's color.
- **`heading`** — headings rendered in that role's color.
- **`highlight`** — selected / highlighted background fills.

Choose by the element's role, not by how light or dark you want it to look.

The `alpha` subset (`PaletteAlphaOpaque` = `FF`, `PaletteAlphaSemi` = `BF`) holds opacity
suffixes for composing translucent color values. It is advanced/internal — most consumers
should never reference it directly.

### Token table

Every palette token resolves to a `hue` primitive (shown in parentheses).

| Token                     | Value                       | Intended use                                               |
| ------------------------- | --------------------------- | ---------------------------------------------------------- |
| `PalettePrimaryLighter`   | `#f2f3fd` (`HueBlue50`)     | Primary: subtle background                                 |
| `PalettePrimaryLight`     | `#9daaf1` (`HueBlue300`)    | Primary: disabled                                          |
| `PalettePrimaryMain`      | `#546be7` (`HueBlue500`)    | Primary: default action fill, focus                        |
| `PalettePrimaryDark`      | `#2e40a5` (`HueBlue700`)    | Primary: hover                                             |
| `PalettePrimaryDarker`    | `#22307c` (`HueBlue800`)    | Primary: active / pressed                                  |
| `PalettePrimaryText`      | `#4C64E1` (`HueBlue600`)    | Primary: body text                                         |
| `PalettePrimaryHeading`   | `#182257` (`HueBlue900`)    | Primary: headings                                          |
| `PalettePrimaryHighlight` | `#dbe0fa` (`HueBlue100`)    | Primary: selected background                               |
| `PaletteDangerLighter`    | `#fff0ee` (`HueRed50`)      | Danger: subtle background                                  |
| `PaletteDangerLight`      | `#fe8f7a` (`HueRed300`)     | Danger: disabled                                           |
| `PaletteDangerMain`       | `#e72500` (`HueRed500`)     | Danger: default fill, error state                          |
| `PaletteDangerDark`       | `#951800` (`HueRed700`)     | Danger: hover                                              |
| `PaletteDangerDarker`     | `#711200` (`HueRed800`)     | Danger: active / pressed                                   |
| `PaletteDangerText`       | `#d92300` (`HueRed600`)     | Danger: body text                                          |
| `PaletteDangerHeading`    | `#500d00` (`HueRed900`)     | Danger: headings                                           |
| `PaletteDangerHighlight`  | `#ffd8d1` (`HueRed100`)     | Danger: selected background                                |
| `PaletteWarningLighter`   | `#fdfad9` (`HueYellow50`)   | Warning: subtle background                                 |
| `PaletteWarningLight`     | `#eb9e05` (`HueYellow300`)  | Warning: disabled                                          |
| `PaletteWarningMain`      | `#a16c03` (`HueYellow500`)  | Warning: default fill, warning state                       |
| `PaletteWarningDark`      | `#664402` (`HueYellow700`)  | Warning: hover                                             |
| `PaletteWarningDarker`    | `#4c3302` (`HueYellow800`)  | Warning: active / pressed                                  |
| `PaletteWarningText`      | `#966603` (`HueYellow600`)  | Warning: body text                                         |
| `PaletteWarningHeading`   | `#352401` (`HueYellow900`)  | Warning: headings                                          |
| `PaletteWarningHighlight` | `#ffe01a` (`HueYellow100`)  | Warning: selected background                               |
| `PaletteSuccessLighter`   | `#defae7` (`HueGreen50`)    | Success: subtle background                                 |
| `PaletteSuccessLight`     | `#59c282` (`HueGreen300`)   | Success: disabled                                          |
| `PaletteSuccessMain`      | `#16884a` (`HueGreen500`)   | Success: default fill, success state                       |
| `PaletteSuccessDark`      | `#0e562f` (`HueGreen700`)   | Success: hover                                             |
| `PaletteSuccessDarker`    | `#0a4023` (`HueGreen800`)   | Success: active / pressed                                  |
| `PaletteSuccessText`      | `#197f48` (`HueGreen600`)   | Success: body text                                         |
| `PaletteSuccessHeading`   | `#072e19` (`HueGreen900`)   | Success: headings                                          |
| `PaletteSuccessHighlight` | `#94f5b3` (`HueGreen100`)   | Success: selected background                               |
| `PaletteNeutralMain`      | `#6e6e6e` (`HueNeutral600`) | Neutral: default secondary fill                            |
| `PaletteNeutralDark`      | `#272727` (`HueNeutral900`) | Neutral: high-contrast text / strong fill                  |
| `PaletteAlphaOpaque`      | `FF`                        | Opacity suffix for composing opaque values (advanced)      |
| `PaletteAlphaSemi`        | `BF`                        | Opacity suffix for composing translucent values (advanced) |

### Composition example

Button maps a semantic role to its shade variants across the interaction lifecycle — `main`
for the resting fill, `dark` on hover, `darker` on active, `light` when disabled:

```tsx
import * as odysseyTokens from "@okta/odyssey-design-tokens";

// theme/components/Button.tsx — primary variant
...(ownerState.variant === "primary" && {
  color: odysseyTokens.HueNeutralWhite,
  backgroundColor: odysseyTokens.PalettePrimaryMain,

  "&:hover:not([aria-disabled='true'])": {
    backgroundColor: odysseyTokens.PalettePrimaryDark,
  },

  "&:active:not([aria-disabled='true'])": {
    backgroundColor: odysseyTokens.PalettePrimaryDarker,
  },

  "&[aria-disabled='true']": {
    color: odysseyTokens.PalettePrimaryLight,
  },
}),
```

### Rules

- IMPORTANT: Use palette for any color that carries meaning. It is the default; drop to raw
  `hue` only when no palette role matches.
- IMPORTANT: Pick the role by meaning, not by color — never use `danger` for a decorative red
  or `success` because green looks nice.
- IMPORTANT: Pick the shade variant by the element's job. Use `text` for text and `heading`
  for headings; do not use `main` as a text color, and do not use `text`/`heading` shades for
  backgrounds.
- IMPORTANT: Do not reference the `alpha` subset (`PaletteAlphaOpaque`, `PaletteAlphaSemi`)
  in component code — it is an internal composition primitive.

## Hue

**Philosophy.** Hue is Odyssey's raw primitive color layer — full tonal scales (50–900) for
neutral, blue, green, red, yellow, and four accent families. It is the foundation that the
semantic `palette` tokens are built on. Always prefer a `palette` token; reach for a raw
`Hue*` token only when no `palette` token semantically matches the need.

Choose the right family by intent:

- **Neutral** (`HueNeutralWhite`, `HueNeutral50–900`) — structural elements: backgrounds,
  surfaces, borders, text, disabled/inactive states.
- **Semantic** (`HueBlue*`, `HueGreen*`, `HueRed*`, `HueYellow*`) — actionable items and
  state feedback. Blue = primary actions/focus/info, green = success, red = error/destructive,
  yellow = warning.
- **Accents** (`HueAccentOne–Four*`) — non-semantic categorization where visual distinction
  is needed without implying state or hierarchy (e.g. Tag category cycling). Last resort
  only: accents are barely used in the codebase.

### Token table

| Token               | Value     | Intended use                                                     |
| ------------------- | --------- | ---------------------------------------------------------------- |
| `HueNeutralWhite`   | `#ffffff` | Structure: backgrounds, surfaces, borders, text, disabled states |
| `HueNeutral50`      | `#f4f4f4` | Structure: backgrounds, surfaces, borders, text, disabled states |
| `HueNeutral100`     | `#ededed` | Structure: backgrounds, surfaces, borders, text, disabled states |
| `HueNeutral200`     | `#e1e1e1` | Structure: backgrounds, surfaces, borders, text, disabled states |
| `HueNeutral300`     | `#cbcbcb` | Structure: backgrounds, surfaces, borders, text, disabled states |
| `HueNeutral400`     | `#aeaeae` | Structure: backgrounds, surfaces, borders, text, disabled states |
| `HueNeutral500`     | `#8d8d8d` | Structure: backgrounds, surfaces, borders, text, disabled states |
| `HueNeutral600`     | `#6e6e6e` | Structure: backgrounds, surfaces, borders, text, disabled states |
| `HueNeutral700`     | `#4b4b4b` | Structure: backgrounds, surfaces, borders, text, disabled states |
| `HueNeutral800`     | `#383838` | Structure: backgrounds, surfaces, borders, text, disabled states |
| `HueNeutral900`     | `#272727` | Structure: backgrounds, surfaces, borders, text, disabled states |
| `HueBlue50`         | `#f2f3fd` | Semantic: primary actions, focus, info                           |
| `HueBlue100`        | `#dbe0fa` | Semantic: primary actions, focus, info                           |
| `HueBlue200`        | `#c1c9f6` | Semantic: primary actions, focus, info                           |
| `HueBlue300`        | `#9daaf1` | Semantic: primary actions, focus, info                           |
| `HueBlue400`        | `#7286eb` | Semantic: primary actions, focus, info                           |
| `HueBlue500`        | `#546be7` | Semantic: primary actions, focus, info                           |
| `HueBlue600`        | `#4C64E1` | Semantic: primary actions, focus, info                           |
| `HueBlue700`        | `#2e40a5` | Semantic: primary actions, focus, info                           |
| `HueBlue800`        | `#22307c` | Semantic: primary actions, focus, info                           |
| `HueBlue900`        | `#182257` | Semantic: primary actions, focus, info                           |
| `HueGreen50`        | `#defae7` | Semantic: success                                                |
| `HueGreen100`       | `#94f5b3` | Semantic: success                                                |
| `HueGreen200`       | `#7be09e` | Semantic: success                                                |
| `HueGreen300`       | `#59c282` | Semantic: success                                                |
| `HueGreen400`       | `#31a061` | Semantic: success                                                |
| `HueGreen500`       | `#16884a` | Semantic: success                                                |
| `HueGreen600`       | `#197f48` | Semantic: success                                                |
| `HueGreen700`       | `#0e562f` | Semantic: success                                                |
| `HueGreen800`       | `#0a4023` | Semantic: success                                                |
| `HueGreen900`       | `#072e19` | Semantic: success                                                |
| `HueRed50`          | `#fff0ee` | Semantic: error / destructive                                    |
| `HueRed100`         | `#ffd8d1` | Semantic: error / destructive                                    |
| `HueRed200`         | `#febbae` | Semantic: error / destructive                                    |
| `HueRed300`         | `#fe8f7a` | Semantic: error / destructive                                    |
| `HueRed400`         | `#fd4e2d` | Semantic: error / destructive                                    |
| `HueRed500`         | `#e72500` | Semantic: error / destructive                                    |
| `HueRed600`         | `#d92300` | Semantic: error / destructive                                    |
| `HueRed700`         | `#951800` | Semantic: error / destructive                                    |
| `HueRed800`         | `#711200` | Semantic: error / destructive                                    |
| `HueRed900`         | `#500d00` | Semantic: error / destructive                                    |
| `HueYellow50`       | `#fdfad9` | Semantic: warning                                                |
| `HueYellow100`      | `#ffe01a` | Semantic: warning                                                |
| `HueYellow200`      | `#f9c503` | Semantic: warning                                                |
| `HueYellow300`      | `#eb9e05` | Semantic: warning                                                |
| `HueYellow400`      | `#bf8004` | Semantic: warning                                                |
| `HueYellow500`      | `#a16c03` | Semantic: warning                                                |
| `HueYellow600`      | `#966603` | Semantic: warning                                                |
| `HueYellow700`      | `#664402` | Semantic: warning                                                |
| `HueYellow800`      | `#4c3302` | Semantic: warning                                                |
| `HueYellow900`      | `#352401` | Semantic: warning                                                |
| `HueAccentOne50`    | `#F5F2FD` | Accent: non-semantic categorization (last resort)                |
| `HueAccentOne100`   | `#E4DFF1` | Accent: non-semantic categorization (last resort)                |
| `HueAccentOne200`   | `#D2C2FF` | Accent: non-semantic categorization (last resort)                |
| `HueAccentOne300`   | `#B89FFE` | Accent: non-semantic categorization (last resort)                |
| `HueAccentOne400`   | `#9777F9` | Accent: non-semantic categorization (last resort)                |
| `HueAccentOne500`   | `#8951FB` | Accent: non-semantic categorization (last resort)                |
| `HueAccentOne600`   | `#6E47C9` | Accent: non-semantic categorization (last resort)                |
| `HueAccentOne700`   | `#5227BE` | Accent: non-semantic categorization (last resort)                |
| `HueAccentOne800`   | `#401895` | Accent: non-semantic categorization (last resort)                |
| `HueAccentOne900`   | `#2B0679` | Accent: non-semantic categorization (last resort)                |
| `HueAccentTwo50`    | `#FCF2E8` | Accent: non-semantic categorization (last resort)                |
| `HueAccentTwo100`   | `#F7DCD6` | Accent: non-semantic categorization (last resort)                |
| `HueAccentTwo200`   | `#F2C299` | Accent: non-semantic categorization (last resort)                |
| `HueAccentTwo300`   | `#ED9B58` | Accent: non-semantic categorization (last resort)                |
| `HueAccentTwo400`   | `#E06C07` | Accent: non-semantic categorization (last resort)                |
| `HueAccentTwo500`   | `#C25608` | Accent: non-semantic categorization (last resort)                |
| `HueAccentTwo600`   | `#964E1E` | Accent: non-semantic categorization (last resort)                |
| `HueAccentTwo700`   | `#964E1E` | Accent: non-semantic categorization (last resort)                |
| `HueAccentTwo800`   | `#50301B` | Accent: non-semantic categorization (last resort)                |
| `HueAccentTwo900`   | `#3E1F09` | Accent: non-semantic categorization (last resort)                |
| `HueAccentThree50`  | `#E1F7F7` | Accent: non-semantic categorization (last resort)                |
| `HueAccentThree100` | `#BCEBEA` | Accent: non-semantic categorization (last resort)                |
| `HueAccentThree200` | `#89D9D9` | Accent: non-semantic categorization (last resort)                |
| `HueAccentThree300` | `#5CBDBD` | Accent: non-semantic categorization (last resort)                |
| `HueAccentThree400` | `#269C9C` | Accent: non-semantic categorization (last resort)                |
| `HueAccentThree500` | `#008585` | Accent: non-semantic categorization (last resort)                |
| `HueAccentThree600` | `#1B6C6C` | Accent: non-semantic categorization (last resort)                |
| `HueAccentThree700` | `#255157` | Accent: non-semantic categorization (last resort)                |
| `HueAccentThree800` | `#1C3D3D` | Accent: non-semantic categorization (last resort)                |
| `HueAccentThree900` | `#12282B` | Accent: non-semantic categorization (last resort)                |
| `HueAccentFour50`   | `#FFF2E6` | Accent: non-semantic categorization (last resort)                |
| `HueAccentFour100`  | `#EBDFCA` | Accent: non-semantic categorization (last resort)                |
| `HueAccentFour200`  | `#D6C9AD` | Accent: non-semantic categorization (last resort)                |
| `HueAccentFour300`  | `#C2AB84` | Accent: non-semantic categorization (last resort)                |
| `HueAccentFour400`  | `#A18A60` | Accent: non-semantic categorization (last resort)                |
| `HueAccentFour500`  | `#87744D` | Accent: non-semantic categorization (last resort)                |
| `HueAccentFour600`  | `#696803` | Accent: non-semantic categorization (last resort)                |
| `HueAccentFour700`  | `#574931` | Accent: non-semantic categorization (last resort)                |
| `HueAccentFour800`  | `#403727` | Accent: non-semantic categorization (last resort)                |
| `HueAccentFour900`  | `#2E2618` | Accent: non-semantic categorization (last resort)                |

### Composition example

Well-built Odyssey components express color intent through a semantic `severity` prop and
never hardcode a raw hue. Toast, Banner, and Status all take `severity` and let the value
resolve to the correct hue scale through `palette` underneath:

```tsx
import { Toast } from "@okta/odyssey-react-mui";

// Components take a semantic `severity`; the underlying hue scale
// (HueGreen*, HueRed*, …) resolves through palette — never hand-pick a hue.
<Toast severity="success" text="Your changes were saved." role="status" />;
```

When no `palette` token covers the need, drop to a raw hue token inside a `styled()` block —
this is the escape hatch, not the default:

```tsx
import styled from "@emotion/styled";
import { HueNeutral100 } from "@okta/odyssey-design-tokens";

// Only because no palette token covers this exact decorative surface.
const DecorativeRule = styled("hr")({ borderColor: HueNeutral100 });
```

### Rules

- IMPORTANT: Prefer a semantic `palette` token. Use a raw `Hue*` token only when no
  `palette` token matches the role.
- IMPORTANT: Never pick a hue shade by eyeballing color to "match" a design. Choose by
  semantic intent.
- IMPORTANT: Use **neutral** for structure (backgrounds, text, borders, disabled states),
  and the **semantic** families (blue, green, red, yellow) for actions and state feedback.
- IMPORTANT: Accents (`HueAccentOne–Four`) are a last resort for non-semantic visual
  distinction only — they are barely used. Do not reach for them when neutral or a semantic
  family will do.

## Typography

<!-- TODO: narrative for typography -->

## Spacing

**Philosophy.** Spacing is Odyssey's single linear scale (`Spacing0`–`Spacing9`) for layout
rhythm. Every gap between elements and every inset within a container draws from this one
scale, so the whole UI breathes on a consistent, harmonious cadence instead of arbitrary
pixel values.

**When to use a spacing token.** Use a spacing token for every property that controls the
distance _between_ or _within_ elements: `padding`, `margin`, `gap`, `rowGap`, `columnGap`,
and layout-driven positioning offsets. Do not use spacing tokens for _sizing_ concerns —
border width (`BorderWidth*`), border radius (`BorderRadius*`), font size/weight/line-height
(`Typography*`), or motion (`TransitionDuration*`) each have their own token family. Raw
px/rem is a last resort, reserved for sub-unit precision (1–3px positioning offsets, 1px
borders) or a per-design value that genuinely is not on the scale — and every raw value must
carry a comment explaining why no token fits.

### Token table

| Token      | Value           | Intended use                               |
| ---------- | --------------- | ------------------------------------------ |
| `Spacing0` | `0`             | Reset / remove inherited spacing           |
| `Spacing1` | `0.28571429rem` | Tightest gap (icon-to-label, dense insets) |
| `Spacing2` | `0.57142857rem` | Compact gap between related elements       |
| `Spacing3` | `0.85714286rem` | Small padding / gap                        |
| `Spacing4` | `1.14285714rem` | Default padding / gap (most common)        |
| `Spacing5` | `1.71428571rem` | Comfortable container padding              |
| `Spacing6` | `2.28571429rem` | Section separation                         |
| `Spacing7` | `2.85714286rem` | Large layout spacing                       |
| `Spacing8` | `3.42857143rem` | Extra-large layout spacing                 |
| `Spacing9` | `4rem`          | Maximum spacing for major layout regions   |

### Composition example

Read spacing tokens from the design-tokens context and apply them inside a `styled()` block —
never hardcode a px/rem for layout:

```tsx
import styled from "@emotion/styled";
import { Spacing4, Spacing5 } from "@okta/odyssey-design-tokens";

const Panel = styled("section")({
  padding: Spacing5,
  display: "flex",
  flexDirection: "column",
  gap: Spacing4,
});
```

`Box` carries no spacing prop — pass a token explicitly through `sx`:

```tsx
import { Box, useOdysseyDesignTokens } from "@okta/odyssey-react-mui";

const odysseyDesignTokens = useOdysseyDesignTokens();

<Box sx={{ marginBlockEnd: odysseyDesignTokens.Spacing2 }}>{children}</Box>;
```

`Stack` abstracts the scale behind a numeric `spacing` prop (`0`–`9`, default `2`) that maps
to the matching `Spacing*` step — think in scale steps, not rem:

```tsx
import { Stack } from "@okta/odyssey-react-mui";

// spacing={4} renders a Spacing4 gap between children.
<Stack direction="row" spacing={4}>
  {children}
</Stack>;
```

### Rules

- IMPORTANT: Use a spacing token (`Spacing0`–`Spacing9`) for every `padding`, `margin`,
  `gap`, `rowGap`, `columnGap`, and layout-driven positioning offset. Never hardcode a px/rem
  value for layout.
- IMPORTANT: Do not use spacing tokens for sizing — border width, border radius, font
  size/weight, line-height, and transitions each have their own token family. Use those.
- IMPORTANT: Do not invent in-between values or do arithmetic on tokens to fake a step
  (`Spacing3 * 1.5`). Pick the nearest existing scale step.
- IMPORTANT: Treat raw px/rem as a last resort. The only acceptable cases are sub-unit
  precision (1–3px) or a per-design value not on the scale — and every raw value must carry a
  comment explaining why no token fits.
- IMPORTANT: Prefer `Stack`'s `spacing` prop for gaps between stacked children, and pass
  spacing tokens through `sx`/`styled()` for `Box` and custom elements.

## Border

**Philosophy.** Border tokens define both the visual edges that separate UI regions and the
corner-radius shape language of every component. Every line drawn around a component and
every rounded corner it shows uses a token from this group.

**When to use border tokens.** Use `BorderColor*` tokens for stroke color on component
edges — not `palette` tokens. Palette drives fills, backgrounds, and text; border drives
lines. Use `border` tokens for structural and presentational edges; use the `focus` token
group for keyboard-interactive outlines. Never use border tokens to style focus rings.

**Choosing a color role.**

- `BorderColorDisplay` → decorative, non-interactive edges: dividers, accordion lines, card
  container borders, menu separators. The component is not a control — it is structure.
- `BorderColorControl` → default edge on interactive controls: inputs, selects, radios,
  checkboxes in their resting state.
- `BorderColorDisabled` → any component in its disabled state, regardless of role.
- `BorderColorDangerLight / BorderColorDangerControl / BorderColorDangerDark` →
  error/validation states, following the same light → control → dark progression as
  `PaletteDanger*`.
- `BorderColorPrimaryControl / BorderColorPrimaryDark` → selected, active, or highlighted
  component borders (e.g. active SideNav item, selected table row indicator).

**Choosing a radius tier.** Match the radius tier of the nearest analogous existing
component. Do not invent new tiers or change an existing component's tier.

- `BorderRadiusTight` (4px) → small inline elements: code blocks, links, pagination inputs,
  app-switcher icons.
- `BorderRadiusMain` (6px) → default for interactive controls: inputs, buttons, menus,
  tab focus rings, nav items.
- `BorderRadiusOuter` (12px) → large container surfaces: cards, dialogs, table containers,
  switch tracks, badge counters with overflow.
- `BorderRadiusRound` (1.5em) → pill shapes only. `Chip` is the only standard Odyssey
  component that uses this tier.

### Token table

| Token                       | Value     | Intended use                                                             |
| --------------------------- | --------- | ------------------------------------------------------------------------ |
| `BorderColorControl`        | `#8d8d8d` | Default edge on interactive controls (input, select, radio)              |
| `BorderColorDisplay`        | `#e1e1e1` | Decorative / structural edges (dividers, card borders, separators)       |
| `BorderColorDisabled`       | `#e1e1e1` | Disabled-state border for any component                                  |
| `BorderColorDangerLight`    | `#fe8f7a` | Danger: light state (subtle error indicator)                             |
| `BorderColorDangerControl`  | `#e72500` | Danger: default error / validation border                                |
| `BorderColorDangerDark`     | `#951800` | Danger: hover over an error-state control                                |
| `BorderColorPrimaryControl` | `#546be7` | Primary: selected or active component border                             |
| `BorderColorPrimaryDark`    | `#2e40a5` | Primary: hover over a selected / active component                        |
| `BorderRadiusTight`         | `4px`     | Small inline elements (code, links, pagination, app-switcher)            |
| `BorderRadiusMain`          | `6px`     | Default interactive controls (inputs, buttons, menus, nav items)         |
| `BorderRadiusOuter`         | `12px`    | Large container surfaces (cards, dialogs, tables, switch track)          |
| `BorderRadiusRound`         | `1.5em`   | Pill shapes — exclusively `Chip` in the standard component set           |
| `BorderStyleMain`           | `solid`   | The only border style in Odyssey — all borders are solid                 |
| `BorderWidthMain`           | `1px`     | All primary borders                                                      |
| `BorderWidthHeavy`          | `1.5px`   | Reserved for emphasis-weight borders when explicitly specified by design |

### Composition example

`TextField` (backed by the `Input` theme override) is the canonical border example — it
exercises all four border sub-groups across its state machine: default resting edge, error
validation, and disabled:

```tsx
import styled from "@emotion/styled";
import {
  BorderWidthMain,
  BorderStyleMain,
  BorderRadiusMain,
  BorderColorDangerControl,
  BorderColorDisabled,
  BorderColorControl,
} from "@okta/odyssey-design-tokens";

// Mirrors how the Input theme override wires border tokens across states.
const ControlField = styled("input")<{
  isError?: boolean;
  isDisabled?: boolean;
}>(({ isError, isDisabled }) => ({
  borderWidth: BorderWidthMain,
  borderStyle: BorderStyleMain,
  borderRadius: BorderRadiusMain,
  borderColor: isError
    ? BorderColorDangerControl
    : isDisabled
      ? BorderColorDisabled
      : BorderColorControl,
}));
```

For a non-interactive structural edge (card container, divider), use `BorderColorDisplay`:

```tsx
import styled from "@emotion/styled";
import {
  BorderWidthMain,
  BorderStyleMain,
  BorderColorDisplay,
  BorderRadiusOuter,
} from "@okta/odyssey-design-tokens";

const ContainerCard = styled("div")({
  border: `${BorderWidthMain} ${BorderStyleMain} ${BorderColorDisplay}`,
  borderRadius: BorderRadiusOuter,
});
```

### Rules

- IMPORTANT: Never use `palette` tokens for `border-color`. Use `BorderColor*` tokens.
  `PaletteDangerMain` and `BorderColorDangerControl` resolve to the same hex, but the
  semantic meaning differs — one signals state feedback, the other signals edge stroke.
- IMPORTANT: Never hardcode a radius value (`px`/`rem`/`%`). Use `BorderRadiusTight`,
  `BorderRadiusMain`, `BorderRadiusOuter`, or `BorderRadiusRound`.
- IMPORTANT: Match the radius tier of the nearest analogous existing component. Do not
  invent new tiers or change an existing component's tier without a design change.
- IMPORTANT: Use `BorderColorDisplay` for decorative, non-interactive edges. Use
  `BorderColorControl` for interactive component borders. Use the `focus` token group for
  keyboard outlines — never use border tokens for focus rings.
- IMPORTANT: Never use `BorderWidthHeavy` as a default. All standard borders use
  `BorderWidthMain`. Only use `BorderWidthHeavy` when design explicitly specifies an
  emphasis-weight border.

## Shadow

`shadow` is a legacy box-shadow token group that predates `depth`. It is being phased out; `depth` is the canonical elevation system for all new work.

### Token table

| Token          | Value                                                                                                         | Status                            |
| -------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `ShadowScale0` | `0px 1px 4px rgba(29, 29, 33, 0.08), 0px 4px 6px rgba(29, 29, 33, 0.01), 0px 5px 15px rgba(29, 29, 33, 0.05)` | Legacy — migrate to `DepthMedium` |
| `ShadowScale1` | `0px 1px 4px rgba(29, 29, 33, 0.08), 0px 4px 10px rgba(29, 29, 33, 0.08), 0px 8px 30px rgba(29, 29, 33, 0.1)` | Legacy — migrate to `DepthHigh`   |

### Rules

- IMPORTANT: Do not use `ShadowScale0` or `ShadowScale1` in any new component. Use `DepthLow`, `DepthMedium`, or `DepthHigh` from the `depth` group instead.
- IMPORTANT: Do not use shadow tokens for focus rings. Focus ring styling belongs to the `focus` token group (`FocusOutline*`).
- IMPORTANT: When migrating existing code away from shadow tokens, replace `ShadowScale0` with `DepthMedium` and `ShadowScale1` with `DepthHigh`.

## Depth

Depth tokens express perceived elevation — how far above the page surface an element appears — through `box-shadow` values. These are the primary shadow tokens in Odyssey; reach for depth first before considering any other shadow approach.

| Token         | Value                                                                                                                      | Intended use                                                                             |
| ------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `DepthLow`    | `0px 1px 2px 0px rgba(39, 39, 39, 0.07)`                                                                                   | Static, always-present raised surfaces that need a subtle lift without drawing attention |
| `DepthMedium` | `0px 1px 4px 0px rgba(39, 39, 39, 0.08), 0px 4px 6px 0px rgba(39, 39, 39, 0.01), 0px 5px 15px 0px rgba(39, 39, 39, 0.05)`  | Interactive elements at rest (Card default, navigation scroll shadow, menus, dropdowns)  |
| `DepthHigh`   | `0px 1px 4px 0px rgba(39, 39, 39, 0.08), 0px 4px 10px 0px rgba(39, 39, 39, 0.08), 0px 8px 30px 0px rgba(39, 39, 39, 0.10)` | Hovered or active state of interactive elements; the most prominent overlay on screen    |

```tsx
import { Card as MuiCard } from "@mui/material";
import styled from "@emotion/styled";
import { DepthMedium, DepthHigh } from "@okta/odyssey-design-tokens";

// Card uses DepthMedium at rest and escalates to DepthHigh on hover (clickable variant)
const StyledCard = styled(MuiCard, {
  shouldForwardProp: (prop) => prop !== "isClickable",
})<{ isClickable?: boolean }>(({ isClickable }) => ({
  boxShadow: DepthMedium,
  ...(isClickable && {
    "&:hover": { boxShadow: DepthHigh },
  }),
}));
```

- IMPORTANT: Use `DepthLow` for static raised surfaces. Use `DepthMedium` for interactive elements at rest. Use `DepthHigh` for the hovered/active state or the most prominent overlay currently on screen.
- IMPORTANT: Never hardcode `box-shadow` rgba values. Always use `DepthLow`, `DepthMedium`, or `DepthHigh` from `@okta/odyssey-design-tokens`.
- IMPORTANT: Prefer depth tokens over `shadow` tokens. The `shadow` group is a legacy artifact scheduled for deprecation; depth is the canonical elevation system.
- IMPORTANT: Depth tokens control visual elevation through `box-shadow` only. For stacking order (z-index), use the constants in `uiShellSharedConstants.ts` — depth tokens have nothing to do with z-index.

## Focus

**Philosophy.** Focus tokens compose the visible `:focus-visible` keyboard ring — the
indicator that signals which element currently holds keyboard focus. This is a dedicated,
accessibility-critical concern, distinct from the decorative edges that `border` tokens
draw.

**When to use focus tokens.** Use focus tokens only inside `:focus-visible` (or `:focus`)
selectors, to build the keyboard focus ring. Use `border` tokens for the always-present
structural edge of a component. Never style a focus ring with `border` tokens, and never use
focus tokens for a resting (non-focus) border.

**Choosing a color.** Default every focus ring to `FocusOutlineColorPrimary`. Reserve
`FocusOutlineColorDanger` for the focus ring of a control that is simultaneously in an
error/invalid state — no Odyssey component does this today, but that is its intended purpose.

**Choosing offset and width.** Match the offset and width tier of the nearest analogous
existing component; never hardcode raw pixels for the ring. `FocusOutlineOffsetMain` (2px gap)
suits standalone elements like `Link`; `FocusOutlineOffsetTight` (0) is for rings that must
sit flush against the element edge, like inputs and chips. Always use `FocusOutlineWidthMain`
(2px); `FocusOutlineWidthTight` (1px) is reserved and currently unused.

### Token table

| Token                      | Value                            | Intended use                                                      |
| -------------------------- | -------------------------------- | ----------------------------------------------------------------- |
| `FocusOutlineColorPrimary` | `#546be7` (`PalettePrimaryMain`) | Default focus ring color                                          |
| `FocusOutlineColorDanger`  | `#e72500` (`PaletteDangerMain`)  | Reserved: focus ring on an error-state control (currently unused) |
| `FocusOutlineOffsetMain`   | `2px`                            | Gap between element and ring for standalone elements (Link)       |
| `FocusOutlineOffsetTight`  | `0`                              | Flush ring for inputs, chips, and tightly-bounded controls        |
| `FocusOutlineStyle`        | `solid`                          | The only focus outline style                                      |
| `FocusOutlineWidthMain`    | `2px`                            | Default (and only active) focus ring width                        |
| `FocusOutlineWidthTight`   | `1px`                            | Reserved: narrow focus ring (currently unused)                    |

### Composition examples

`Link` is the cleanest pure-token outline — all four outline tokens applied directly inside
`:focus-visible`:

```tsx
import styled from "@emotion/styled";
import {
  BorderRadiusTight,
  FocusOutlineColorPrimary,
  FocusOutlineOffsetMain,
  FocusOutlineStyle,
  FocusOutlineWidthMain,
} from "@okta/odyssey-design-tokens";

const FocusableLink = styled("a")({
  "&:focus-visible": {
    borderRadius: BorderRadiusTight,
    outlineColor: FocusOutlineColorPrimary,
    outlineOffset: FocusOutlineOffsetMain,
    outlineStyle: FocusOutlineStyle,
    outlineWidth: FocusOutlineWidthMain,
  },
});
```

`Input` combines a `boxShadow` ring with a **transparent** `outline` — the transparent outline
is the forced-colors / Windows High Contrast Mode fallback. When the OS strips box-shadows in
HCM, the outline becomes the visible focus indicator. Keep it:

```tsx
import styled from "@emotion/styled";
import {
  FocusOutlineColorPrimary,
  FocusOutlineStyle,
  FocusOutlineWidthMain,
  FocusOutlineOffsetTight,
} from "@okta/odyssey-design-tokens";

const FocusableInput = styled("input")({
  "&:focus-visible": {
    borderColor: FocusOutlineColorPrimary,
    boxShadow: `0 0 0 1px ${FocusOutlineColorPrimary}`,
    // Transparent outline is the High Contrast Mode focus indicator — never remove it.
    outline: `${FocusOutlineWidthMain} ${FocusOutlineStyle} transparent`,
    outlineOffset: FocusOutlineOffsetTight,
  },
});
```

### Rules

- IMPORTANT: Use `FocusOutlineColorPrimary` for the focus ring. Never hardcode
  `PalettePrimaryMain` — they resolve to the same hex, but the focus token carries the
  accessibility intent and is the stable API for focus rings.
- IMPORTANT: Always keep the transparent `outline` alongside a `boxShadow` focus ring. It is
  the Windows High Contrast Mode / forced-colors focus indicator. Never drop it.
- IMPORTANT: Apply focus tokens only inside `:focus-visible` / `:focus` selectors. Never use
  them for a resting border, and never style a focus ring with `border` tokens.
- IMPORTANT: Match the offset and width tier of the nearest analogous existing component.
  Never hardcode raw px for the ring's width or offset.

## Transition

Transition tokens are the single source of truth for animation timing across Odyssey — every hover, focus, and state-change animation references the same duration and easing, so the UI feels coherent.

### Token table

| Token                            | Value    | Intended use                                              |
| -------------------------------- | -------- | --------------------------------------------------------- |
| `TransitionDurationMain`         | `100ms`  | CSS transition duration for all state-change animations   |
| `TransitionDurationMainAsNumber` | `100`    | Numeric companion for JS contexts (setTimeout, callbacks) |
| `TransitionTimingMain`           | `linear` | CSS easing curve for state-change animations              |

### Composition example

Button passes both tokens into MUI's `theme.transitions.create()` to animate color, background, border, and shadow together on hover/focus/active:

```tsx
import * as odysseyTokens from "@okta/odyssey-design-tokens";

// theme/components/Button.tsx
theme.transitions.create(
  ["color", "background-color", "border-color", "box-shadow"],
  {
    duration: odysseyTokens.TransitionDurationMain,
    easing: odysseyTokens.TransitionTimingMain,
  },
),
```

For styled components that build the CSS `transition` string directly:

```tsx
import styled from "@emotion/styled";
import {
  TransitionDurationMain,
  TransitionTimingMain,
} from "@okta/odyssey-design-tokens";

const StyledPanel = styled("div")({
  transition: `border ${TransitionDurationMain} ${TransitionTimingMain}`,
});
```

For JS callbacks that must fire after an animation ends:

```tsx
import { TransitionDurationMainAsNumber } from "@okta/odyssey-design-tokens";

setTimeout(() => {
  // post-animation work
}, TransitionDurationMainAsNumber);
```

### Rules

- IMPORTANT: Use `TransitionDurationMain` in all CSS animation code. Never hardcode a raw ms value.
- IMPORTANT: `TransitionTimingMain` is optional. Include it when the easing function matters for the motion (path-tracing transforms, border slides). Duration alone is sufficient for simple color or opacity fades.
- IMPORTANT: Use `TransitionDurationMainAsNumber` only in JavaScript contexts that require a numeric value (setTimeout, requestAnimationFrame). Never use it as a CSS value.
- IMPORTANT: Never hardcode animation timing (`200ms`, `ease-in-out`, `0.1s`). All timing must come from a transition token.

## Final rules

- IMPORTANT: Always import token values from `@okta/odyssey-design-tokens`. Never hardcode a
  hex, px, or rem literal.
- IMPORTANT: Prefer the highest semantic layer that fits — use a `palette` token before a
  raw `hue` token.
- IMPORTANT: Do not rename or remove tokens. Token names are a stable API; deprecate and add,
  never break.
