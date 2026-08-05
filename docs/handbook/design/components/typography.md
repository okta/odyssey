---
label: Typography
description: Text rendering components for headings, body copy, labels, and supporting text. All are fixed-variant wrappers over the base Typography component.
---

# Typography

Odyssey provides a base `Typography` component and eleven semantic wrappers. Use a semantic wrapper for every statically known variant; use the base `Typography` only when the variant must be resolved at runtime.

The system pairs Aeonik (headings, Legend) with Inter (body, labels, Subordinate, Support, Overline). Sizes follow a major-second scale relative to the 14 px body base — code values are in `rem`; pixel equivalents in the tables below are calculated at that 14 px base.

## When to use

### Heading1–Heading6

- Use to title pages and structure sections according to document hierarchy.
- Use `Heading1` for the primary page title — at most one per page.
- Use `Heading2`–`Heading6` for nested sections in hierarchical order.

### Paragraph

- Use for body copy: explanatory prose, descriptions, and multi-sentence content in a normal text flow.

### Legend

- Use exclusively as the visible label for a `<fieldset>` group. `Legend` renders a `<legend>` element and is styled identically to `Heading5`.

### Overline

- Use for short category labels or section identifiers that appear above a heading or content block (e.g. "Step 2 of 4", "Settings"). Content should be 1–3 words. Overline is uppercased automatically — pass lowercase strings.

### Subordinate

- Use for secondary or supplemental text that should recede visually: captions, metadata, timestamps, and hints adjacent to primary content. Renders at 0.857 rem (~12 px), Neutral 600.

### Support

- Use for helper text, notes, or contextual explanations that accompany primary content at body size but should be visually secondary. Renders at 1 rem (14 px), Neutral 700.

## When NOT to use

### Heading1–Heading6

- Do not choose a heading level for its visual size when it does not fit document hierarchy — use `Paragraph` or `Subordinate` with a `color` override instead.
- Do not use headings for non-title content.

### Legend

- Do not use `Legend` outside a `<fieldset>`. For section headings above non-form content, use `Heading5`.

### Overline

- Do not use for multi-sentence or long descriptive text — use `Paragraph` or `Subordinate`.
- Do not pass pre-uppercased strings; the component applies `text-transform: uppercase` automatically, resulting in double processing visually and in AT announcements.

### Subordinate

- Do not use `Subordinate` when the text is the primary content — use `Paragraph`.

### Support

- Do not use `Support` for inline hints inside a form field — use the `hint` prop on the field component instead.
- Do not use `Support` when the content should be as prominent as body copy — use `Paragraph`.

## Variants

All semantic wrappers are fixed-variant shortcuts for `Typography`. The variant determines the HTML element, visual style, and semantic role.

````
Which component should I use?

Is this a page or section title?
  ├─ Yes → Heading1–6 (match level to document hierarchy)
  └─ No
       ├─ Is it a fieldset group label? → Legend
       ├─ Is it a short category label above content? → Overline
       ├─ Is it secondary/smaller text (captions, metadata)? → Subordinate
       ├─ Is it helper/muted text at body size? → Support
       └─ Otherwise (body copy, prose) → Paragraph
```txt

| Component | Variant | Default element | Font | Weight | Size (rem) | Size (px @ 14 px) | Color token |
|---|---|---|---|---|---|---|---|
| `Heading1` | `h1` | `<h1>` | Aeonik | 500 | 2.571 rem | ~36 px | `TypographyColorHeading` (Neutral 900) |
| `Heading2` | `h2` | `<h2>` | Aeonik | 500 | 2.286 rem | ~32 px | `TypographyColorHeading` (Neutral 900) |
| `Heading3` | `h3` | `<h3>` | Aeonik | 500 | 2 rem | 28 px | `TypographyColorHeading` (Neutral 900) |
| `Heading4` | `h4` | `<h4>` | Aeonik | 500 | 1.571 rem | ~22 px | `TypographyColorHeading` (Neutral 900) |
| `Heading5` | `h5` | `<h5>` | Aeonik | 500 | 1.286 rem | ~18 px | `TypographyColorHeading` (Neutral 900) |
| `Heading6` | `h6` | `<h6>` | Aeonik | 500 | 1.143 rem | ~16 px | `TypographyColorHeading` (Neutral 900) |
| `Paragraph` | `body` | `<p>` | Inter | 400 | 1 rem | 14 px | `TypographyColorBody` (Neutral 900) |
| `Legend` | `legend` | `<legend>` | Aeonik | 500 | 1.286 rem | ~18 px | `TypographyColorHeading` (Neutral 900) |
| `Overline` | `overline` | `<p>` | Inter | 700 | 0.714 rem | 10 px | inherits context color |
| `Subordinate` | `subordinate` | `<p>` | Inter | 400 | 0.857 rem | ~12 px | `TypographyColorSubordinate` (Neutral 600) |
| `Support` | `support` | `<p>` | Inter | 400 | 1 rem | 14 px | `TypographyColorSupport` (Neutral 700) |

**Legend vs Heading5**: Both use Aeonik 500 at ~18 px. The only difference is the rendered HTML element — `<legend>` vs `<h5>`. Use `Legend` inside a fieldset; use `Heading5` everywhere else.

## Props

### Shared props — all components

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | **Required.** Text content. |
| `color` | `"primary" \| "textPrimary" \| "secondary" \| "textSecondary" \| "error"` | — | Override text color. Omit unless you need semantic coloring. |
| `component` | `ElementType` | See Variants table | Override the rendered HTML element. |
| `id` | `string` | — | Sets the `id` attribute on the rendered element. |
| `testId` | `string` | — | Sets a `data-se` attribute for legacy test selectors. |
| `translate` | `"yes" \| "no"` | — | Controls machine translation via the HTML `translate` attribute. |
| `ariaLabel` | `string` | — | ARIA label for the element. |
| `ariaLabelledBy` | `string` | — | ID of the element that labels this component. |
| `ariaDescribedBy` | `string` | — | ID of the element that describes this component. |

### Additional props — Heading1–Heading6 only

| Prop | Type | Default | Description |
|---|---|---|---|
| `ariaCurrent` | `"false" \| "page" \| "step" \| "location" \| "date" \| "time" \| "true"` | — | Sets `aria-current` to mark the active item in a related set (e.g. current step in a wizard). Not available on `Paragraph`, `Subordinate`, `Support`, `Legend`, or `Overline`. |
| `isPresentational` | `boolean` | — | **`Heading1` only.** Renders with `role="presentation"` so screen readers skip the element. Not forwarded by `Heading2`–`Heading6`. |

### Additional props — base `Typography` only

The base `Typography` component exposes every prop above plus:

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "body" \| "legend" \| "overline" \| "subordinate" \| "support"` | `"body"` | Which typography style to apply. Prefer semantic wrappers when the variant is statically known. |
| `ariaCurrent` | `"false" \| "page" \| "step" \| "location" \| "date" \| "time" \| "true"` | — | Sets `aria-current`. |
| `isPresentational` | `boolean` | — | Renders with `role="presentation"`. |
| `typographyRef` | `React.RefObject<FocusHandle>` | — | Ref for programmatically focusing the element. Not available on semantic wrappers. |

## Examples

### Correct

```tsx
import { Heading1, Heading2, Paragraph, Subordinate } from "@okta/odyssey-react-mui";

// Page structure with semantic wrappers
<Heading1>Users</Heading1>
<Paragraph>
  Manage identities, assign roles, and configure multi-factor authentication for your
  organization.
</Paragraph>
<Heading2>Active users</Heading2>
<Paragraph>Showing 24 of 1 024 users.</Paragraph>
<Subordinate>Last updated 2 minutes ago</Subordinate>
````

```tsx
import { Legend } from "@okta/odyssey-react-mui";

// Legend as the label for a fieldset
<fieldset>
  <Legend>Authentication methods</Legend>
  {/* Checkbox or RadioGroup children */}
</fieldset>;
```

```tsx
import { Overline, Heading3 } from "@okta/odyssey-react-mui";

// Overline labelling a content section
<Overline>Step 2 of 4</Overline>
<Heading3>Configure your app</Heading3>
```

```tsx
import { Paragraph, Support } from "@okta/odyssey-react-mui";

// Support text below a primary paragraph
<Paragraph>Sync is enabled and running.</Paragraph>
<Support>Changes take effect within 15 minutes.</Support>
```

```tsx
import { Typography } from "@okta/odyssey-react-mui";

// Base Typography — use only when variant is resolved at runtime
const variantByRole = record.isTitle ? "h2" : "body";
<Typography variant={variantByRole}>{record.label}</Typography>;
```

```tsx
import { Heading2, Heading1 } from "@okta/odyssey-react-mui";

// ariaCurrent on a heading in a step indicator
<Heading2 ariaCurrent="step">Identity provider</Heading2>;
```

### Incorrect

```tsx
// Wrong — raw HTML heading instead of the Odyssey wrapper
<h1>Users</h1>

// Right
<Heading1>Users</Heading1>
```

```tsx
// Wrong — heading level chosen for visual size, not document hierarchy
<Heading4>Page title</Heading4>  // "looked about right"

// Right — use the semantically correct level; adjust color via color prop if needed
<Heading1>Page title</Heading1>
```

```tsx
// Wrong — Legend used outside a fieldset
<Legend>Section title</Legend>

// Right
<Heading5>Section title</Heading5>
```

```tsx
// Wrong — pre-uppercased string passed to Overline (double uppercasing in display)
<Overline>CATEGORY LABEL</Overline>

// Right — Overline applies text-transform: uppercase automatically
<Overline>Category label</Overline>
```

```tsx
// Wrong — Support for inline form field hints
<Support>Must be at least 8 characters.</Support>

// Right — use the hint prop on the field component
<TextField hint="Must be at least 8 characters." label="Password" />
```

```tsx
// Wrong — base Typography with a static variant
<Typography variant="h1">Page title</Typography>

// Right — use the semantic wrapper
<Heading1>Page title</Heading1>
```

## Rules

- Use `Heading1` exactly once per page. Multiple `Heading1` elements break document hierarchy for screen readers.
- Preserve heading order. Never skip levels (e.g. `Heading2` → `Heading5`) to achieve a smaller visual size.
- Use `Legend` only inside a `<fieldset>`. Outside a fieldset, use `Heading5`.
- Never pass pre-uppercased strings to `Overline`. The component applies `text-transform: uppercase` itself.
- Use semantic wrappers (`Heading1`–`Heading6`, `Paragraph`, etc.) over the base `Typography` with a `variant` prop whenever the variant is statically known at the call site.
- Do not use the `color` prop unless you need semantic coloring (e.g. `"error"` for inline validation messages). Each component's default color token handles normal usage.
- Do not override `component` without a concrete accessibility or structural reason.
- `isPresentational` is only forwarded by `Heading1` and the base `Typography`. The prop is silently ignored by all other semantic wrappers.
- `ariaCurrent` is only forwarded by `Heading1`–`Heading6`. It is silently ignored by `Paragraph`, `Subordinate`, `Support`, `Legend`, and `Overline`.
- `typographyRef` is only available on the base `Typography`. Semantic wrappers do not expose it.
