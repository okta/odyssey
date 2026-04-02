# new-page — Add a New Page to the Odyssey Demo App

Use this skill when the user asks to create a new feature page or a new
section in the app. Follow every step in order and apply all rules from
`CLAUDE.md` throughout.

Usage: /new-page <PageName> [nav section]

Example: /new-page ApiServices "Applications"

---

## Step 0 — Clarify placement (if not already specified)

If the user has not said whether this is a new page or content on an existing
page, ask:

> "Should this go on an existing page, or do you want a new page with its
> own nav item?"

If new page and no nav section is given, ask which section to place it under
by showing the current top-level sections from `src/shell/SideNavConfig.tsx`.

---

## Step 1 — Create the page file

Create `src/pages/<PageName>Page.tsx` using `<PageTemplate>` as the wrapper:

```tsx
import { PageTemplate } from "@okta/odyssey-react-mui/labs";
import { Button } from "@okta/odyssey-react-mui";

const <PageName>Page = () => (
  <PageTemplate
    title="<Page Title>"
    description="Optional description"
  >
    {/* page content */}
  </PageTemplate>
);

export { <PageName>Page };
```

Rules:

- File must be `.tsx`
- Use `<PageTemplate>` — never build a custom header from scratch
- Use `<Surface>` for any content panels inside the page
- All components from `@okta/odyssey-react-mui` — never `@mui/material`
- All icons from `@okta/odyssey-react-mui/icons` — never `@mui/icons-material`
- Styling via `useOdysseyDesignTokens()` — no hardcoded hex or px values
- Full descriptive variable names — no abbreviations
- Callbacks named after the action they perform — no `handle` prefix

---

## Step 2 — Add the route in App.tsx

Open `src/App.tsx` and add a `<Route>` for the new page inside the existing
router structure. Follow the path naming pattern already used (lowercase,
hyphen-separated):

```tsx
import { <PageName>Page } from "./pages/<PageName>Page";

// inside the route tree:
<Route path="/<section>/<page-name>" element={<<PageName>Page />} />
```

---

## Step 3 — Add the nav item in SideNavConfig.tsx

Open `src/shell/SideNavConfig.tsx` and locate the `SIDE_NAV_CONFIG` export.
Find the correct section and add a new `SideNavItem` entry:

```tsx
{
  id: "<section>-<page-name>",
  label: "<Display Name>",
  href: "/<section>/<page-name>",
}
```

This is the only shell file you may edit without explicit user confirmation.
Do NOT touch `src/shell/AppShell.tsx` or `src/main.tsx`.

---

## Step 4 — Verify

1. Confirm the new nav item appears in the correct section of the side nav
2. Confirm clicking it navigates to the new page
3. Confirm the page renders with a `<PageTemplate>` title visible

---

## Checklist

- [ ] `src/pages/<PageName>Page.tsx` created with `<PageTemplate>` wrapper
- [ ] Route added to `src/App.tsx`
- [ ] Nav item added to `SIDE_NAV_CONFIG` in `src/shell/SideNavConfig.tsx`
- [ ] No modifications to `AppShell.tsx` or `main.tsx`
- [ ] All imports from `@okta/odyssey-react-mui` (not `@mui/material`)
- [ ] File is `.tsx`, not `.jsx` or `.js`
