---
label: Odyssey vs MUI Differences
description: Known MUI patterns that break in Odyssey — check these before writing component code.
---

# Odyssey vs MUI — Known Differences

Odyssey wraps MUI with intentionally restrictive TypeScript types. Code that looks valid in plain MUI will fail Odyssey's type checker. Always call `get-components` to verify a component's accepted props before writing code — do not rely on MUI documentation or training data.

## Critical rule: Vite does not typecheck

The dev server transpiles only. Type errors are invisible in the browser. Always run `yarn tsc` after writing component code before treating a prototype as done.

---

## Typography

**Problem:** Odyssey's `Typography` does not accept `sx`, `className`, or arbitrary MUI props. The `color` prop only accepts specific semantic values.

```tsx
// ❌ fails CI — sx is not a valid prop on Odyssey Typography
<Typography sx={{ color: "red" }}>text</Typography>;

// ✅ correct — use styled() with odysseyDesignTokens for token-based styles
import { styled } from "@mui/material/styles";
import { useOdysseyDesignTokens } from "@okta/odyssey-react-mui";

const StyledWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  color: odysseyDesignTokens.PalettePrimaryMain,
}));

const MyComponent = () => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  return (
    <StyledWrapper odysseyDesignTokens={odysseyDesignTokens}>
      <Typography>text</Typography>
    </StyledWrapper>
  );
};
```

**Accepted `color` values:** `"primary"` | `"textPrimary"` | `"secondary"` | `"textSecondary"` | `"error"`

---

## Button

**Problem:** Odyssey's `Button` uses a `label` prop instead of `children`. Passing `children` will fail TypeScript.

```tsx
// ❌ fails CI
<Button>Save</Button>

// ✅ correct
<Button label="Save" />
```

---

## Box

Odyssey's `Box` accepts `sx` but omits `className` and `style`. For elements that need both click handlers and hover styles, use a native `<div>` or `<button>` with inline `style` or CSS modules instead of Odyssey `Box` — the `sx` prop type intersection with event handlers can produce TS errors.

```tsx
// ❌ may fail CI — Box + onClick + &:hover sx combination
<Box onClick={handleClick} sx={{ "&:hover": { background: "blue" } }} />

// ✅ correct — native element for interactive elements needing hover
<div onClick={handleClick} style={{ cursor: "pointer" }} />
```

---

## MUI components with no Odyssey equivalent

Never import from `@mui/material` directly. Use these Odyssey replacements:

| MUI component | Odyssey replacement                                                  |
| ------------- | -------------------------------------------------------------------- |
| `IconButton`  | `<Button startIcon={<SomeIcon />} variant="floating" />`             |
| `Grid`        | `<Stack>` or `<Box sx={{ display: 'grid' }}>`                        |
| `Badge`       | `<Tag>` or SideNav `count` prop                                      |
| `Divider`     | `<Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }} />` |
| `Alert`       | `<Banner>` (page-level) or `<Callout>` (inline)                      |
| `Modal`       | `<Dialog>`                                                           |

---

## General rule

When no Odyssey component exists for a UI pattern, do not silently use a raw MUI component. Explicitly tell the user which MUI component you intend to use and why, and ask them to confirm before proceeding. Raw MUI usage is acceptable — undisclosed raw MUI usage is not.
