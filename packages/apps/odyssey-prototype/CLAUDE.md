# CLAUDE.md — AI Instructions for This Project

## What This Project Is

This is a multi-app Okta UI prototyping template built on the
Odyssey Design System (@okta/odyssey-react-mui). It models six Okta
apps — Admin Console, Enduser Dashboard, Enduser Settings, Workflows,
PAM, and ISPM — each with its own shell and routing. It is used by Designers,
PMs, and Engineers to prototype Okta features using AI prompting. The
shells (navigation, top bar, app switcher) are already built and should
not be changed unless explicitly requested.

---

## 🔴 RULES — READ BEFORE EVERY TASK

### Rule 1: Always Use Odyssey Components

Import ALL UI components directly from the Odyssey packages:

- `@okta/odyssey-react-mui` — core components (Button, TextField, Surface, etc.)
- `@okta/odyssey-react-mui/ui-shell` — shell (`renderUiShell`, `RenderedUiShell`, `SideNavItem`)
- `@okta/odyssey-react-mui/labs` — experimental components (PageTemplate, UserProfile)
- `@okta/odyssey-react-mui/icons` — icons

Never import from `@mui/material` directly.

### Rule 2: No Odyssey Match = Tell The User

If a requested UI pattern has no Odyssey component equivalent, STOP
and say:

> "There is no Odyssey component for [X]. I can either:
> A) Compose it using Odyssey primitives (Box, Typography, tokens)
> B) Skip it for now
> Which would you prefer?"

Never silently use raw MUI or custom CSS as a substitute.

### Rule 3: Odyssey Icons Only

ALL icons must come from the Odyssey icon set exported from
`@okta/odyssey-react-mui/icons`. Never use icons from `@mui/icons-material`
or any other icon library.

When you need an icon:

1. Search the Odyssey icon exports first
2. If a matching icon exists, use it
3. If NO matching icon exists in Odyssey, STOP and tell the user:
   > "I could not find an icon for [X] in the Odyssey icon set.
   > The closest available options are: [list them].
   > Would you like me to use one of these, or will you provide an SVG?"

Never silently substitute with an MUI icon or any other library.

### Rule 4: Odyssey Tokens for All Styling

Never hardcode hex colors, pixel spacing, or font sizes.
Always use Odyssey design tokens available via `useOdysseyDesignTokens()`.
If no token is a close match, use a px value and leave a comment
explaining why.

### Rule 5: The Shells are Locked

Do NOT modify any `*Shell.tsx` file or `src/main.tsx` unless the user
explicitly says "modify the shell".

To add a new admin nav item, edit `src/admin/shell/AdminSideNavConfig.tsx`
only — that is the intended extension point and does not require unlocking.
Each other app has its own `SideNavConfig` file in its `shell/` folder.

All standard apps (Admin Console, Enduser Dashboard, Enduser Settings, PAM,
ISPM, Partner Portal) delegate to the shared `src/shared/AppShell.tsx`.
Workflows uses its own shell (no SideNav).

Locked files:

- `src/shared/AppShell.tsx` — shared UiShell logic for all standard apps
- `src/admin/shell/AdminShell.tsx` — Admin Console UiShell wiring
- `src/enduser-dashboard/shell/EnduserDashboardShell.tsx` — Enduser Dashboard UiShell wiring
- `src/enduser-settings/shell/EnduserSettingsShell.tsx` — Enduser Settings UiShell wiring
- `src/workflows/shell/WorkflowsShell.tsx` — Workflows UiShell wiring
- `src/pam/shell/PamShell.tsx` — PAM UiShell wiring
- `src/ispm/shell/IspmShell.tsx` — ISPM UiShell wiring
- `src/partner-portal/shell/PartnerPortalShell.tsx` — Partner Portal UiShell wiring
- `src/main.tsx` — provider setup

### Rule 6: Adding New Pages

When a user asks to build a new feature or page:

1. **Always ask first:** "Should this go on an existing page, or do you
   want a new page with a new nav item? Which app is this for?"
2. If **new page (admin)**: create in `src/admin/pages/`, add route to
   `src/admin/AdminTemplate.tsx` (`ADMIN_ROUTES`), add nav item to
   `src/admin/shell/AdminSideNavConfig.tsx`
3. If **new page (other app)**: create in `src/<app>/pages/`, add route to
   `src/<app>/<App>Template.tsx` (routes array), add nav item to
   `src/<app>/shell/<App>SideNavConfig.ts`
4. If **existing page**: add the feature to the relevant page in the app's
   `pages/` folder

### Rule 7: TypeScript Required

All application source files must be `.tsx` or `.ts`. Do not add `.js` or `.jsx` source files. Tooling and build configuration files (for example, `eslint.config.js`, `vite.config.*`, `postcss.config.*`) may remain in JavaScript when that is the tool’s recommended format.

### Rule 8: Page Layout Patterns

When building a new page:

**Use `<PageTemplate>` for the page wrapper** (from `@okta/odyssey-react-mui/labs`):

```tsx
import { PageTemplate } from "@okta/odyssey-react-mui/labs";

<PageTemplate
  title="Page Title"
  description="Optional description"
  primaryCallToActionComponent={<Button label="Action" variant="primary" onClick={...} />}
>
  {/* page content */}
</PageTemplate>
```

Never build a custom page header from scratch (Box + Heading1 + description + buttons).

**Use `<Surface>` for content panels** (from `@okta/odyssey-react-mui`):

```tsx
import { Surface } from "@okta/odyssey-react-mui";

<Surface>{/* card/panel content */}</Surface>;
```

Never use `<Box sx={{ backgroundColor: HueNeutralWhite, borderRadius: ..., padding: ... }}>` as a white content panel. Use `<Surface>` instead.

### Rule 9: Working With Figma Designs

When the user provides a Figma link, follow this workflow exactly:

**STEP 1 — GET DESIGN CONTEXT**
Use the Figma MCP server (`get_design_context`) to fetch the design.

**STEP 2 — IDENTIFY ZONES**
Mentally split the design into two zones:

- **Zone A (Shell):** AppSwitcher, SideNav, TopNav — these are LOCKED
- **Zone B (Content):** Everything below the TopNav and to the right of
  the SideNav — this is the main content area you should build

**STEP 3 — BUILD ZONE B IMMEDIATELY**
For anything in Zone B, proceed to build using matching Odyssey
components. Apply all rules as usual — Odyssey components only,
tokens for styling, Odyssey icons only, TypeScript required.

**STEP 4 — ZONE A CHANGES REQUIRE EXPLICIT USER CONFIRMATION**
If the Figma design shows ANY changes to Zone A (shell components),
STOP and say EXACTLY this before touching any shell file:

> "I noticed the Figma design includes changes to [describe specifically
>
> > what changed — e.g. 'the side navigation has a new item called X'
> > or 'the top bar layout appears different'].
>
> The shell is locked in this template. Before I make these changes,
> can you confirm you want me to modify the shell?
>
> Specifically I would be changing:
>
> - [list each shell change clearly]
>
> Reply YES to proceed with shell changes, or NO to skip them
> and only build the main content area."

### Rule 10: Named React Imports Only

Never import from the React default export. Always use named imports:

```ts
// CORRECT
import { useState, useEffect, type ElementType } from "react";

// WRONG — never do this
import React from "react";
React.useState(...)
React.ElementType
```

In `.ts` files where JSX is unavailable, use `createElement` directly.
Prefer `.tsx` so you can use JSX and keep all imports named.

### Rule 11: Verbose Variable Names

Always use full, descriptive variable names. Never abbreviate.

```ts
// CORRECT
const navigateToBreadcrumb = useCallback((event: MouseEvent) => { ... });
const [expandedSections, setExpandedSections] = useState(...);

// WRONG — abbreviated
const navigateToBreadcrumb = useCallback((e: MouseEvent) => { ... });
const [expanded, setExpanded] = useState(...);
```

Common cases:

- Event parameters: `event`, never `e`
- Previous state in setters: `previousValue`, never `prev`
- Array/loop items: use the actual noun (`section`, `child`), never `x`, `i` (except standard loop counters)

### Rule 12: Callback Naming — No `handle` Prefix

Name callbacks after the **action they perform**, not the event that triggers them.
Avoid the `handle` prefix entirely.

```ts
// CORRECT — describes what happens
const navigateToBreadcrumb = useCallback(...);
const openActionsMenu = useCallback(...);
const toggleSectionExpanded = useCallback(...);

// WRONG — generic, doesn't say what it does
const handleBreadcrumbClick = useCallback(...);
const handlePrimaryAction = useCallback(...);
const handleChange = useCallback(...);
```

---

## Quick Reference

| Task                               | Where to look                                                                                                                                          |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Add a new page (admin)             | `src/admin/pages/` + `src/admin/AdminTemplate.tsx` + `src/admin/shell/AdminSideNavConfig.tsx`                                                          |
| Add a new page (enduser-dashboard) | `src/enduser-dashboard/pages/` + `src/enduser-dashboard/EnduserDashboardTemplate.tsx` + `src/enduser-dashboard/shell/EnduserDashboardSideNavConfig.ts` |
| Add a new page (enduser-settings)  | `src/enduser-settings/pages/` + `src/enduser-settings/EnduserSettingsTemplate.tsx` + `src/enduser-settings/shell/EnduserSettingsSideNavConfig.ts`      |
| Add a new page (workflows)         | `src/workflows/pages/` + `src/workflows/WorkflowsTemplate.tsx` + `src/workflows/shell/WorkflowsSideNavConfig.ts`                                       |
| Add a new page (pam)               | `src/pam/pages/` + `src/pam/PamTemplate.tsx` + `src/pam/shell/PamSideNavConfig.ts`                                                                     |
| Add a new page (ispm)              | `src/ispm/pages/` + `src/ispm/IspmTemplate.tsx` + `src/ispm/shell/IspmSideNavConfig.ts`                                                                |
| Change admin nav structure         | `src/admin/shell/AdminSideNavConfig.tsx`                                                                                                               |
| Change other app nav structure     | `src/<app>/shell/<App>SideNavConfig.ts`                                                                                                                |
| Change shell layout                | `src/<app>/shell/<App>Shell.tsx` (locked unless asked)                                                                                                 |
| Add a top-level route              | `src/SiteRouter.tsx`                                                                                                                                   |
| Find design tokens                 | `useOdysseyDesignTokens()` hook                                                                                                                        |

## 🔒 Do Not Modify (unless explicitly told)

- `src/shared/AppShell.tsx` — shared UiShell logic for all standard apps
- `src/admin/shell/AdminShell.tsx` — Admin Console UiShell wiring
- `src/enduser-dashboard/shell/EnduserDashboardShell.tsx` — Enduser Dashboard UiShell wiring
- `src/enduser-settings/shell/EnduserSettingsShell.tsx` — Enduser Settings UiShell wiring
- `src/workflows/shell/WorkflowsShell.tsx` — Workflows UiShell wiring
- `src/pam/shell/PamShell.tsx` — PAM UiShell wiring
- `src/ispm/shell/IspmShell.tsx` — ISPM UiShell wiring
- `src/partner-portal/shell/PartnerPortalShell.tsx` — Partner Portal UiShell wiring
- `src/main.tsx` — provider setup
- `CLAUDE.md` — this file

---

## Odyssey Reference

**Core components:**

```ts
import { Button, TextField, DataTable, Surface } from "@okta/odyssey-react-mui";
```

**Page layout (labs):**

```ts
import { PageTemplate, UserProfile } from "@okta/odyssey-react-mui/labs";
```

**UI Shell (use `renderUiShell` in `main.tsx` — do not compose SideNav/TopNav/AppSwitcher individually):**

```ts
// main.tsx — bootstraps the shell
import { renderUiShell } from "@okta/odyssey-react-mui/ui-shell";

// AppShell.tsx — types for shell props and nav items
import {
  type RenderedUiShell,
  type SideNavItem,
} from "@okta/odyssey-react-mui/ui-shell";
```

**Icons:**

```ts
import { SearchIcon, SettingsIcon } from "@okta/odyssey-react-mui/icons";
// NEVER import from @mui/icons-material
```

**Notable MUI patterns that do NOT exist in Odyssey:**

- `IconButton` → use `<Button startIcon={...} variant="floating" />`
- `Grid` → use `<Stack>` for 1-D layouts or `<Box sx={{ display: 'grid' }}>` for CSS grid
- `Badge` → use `<Tag>` with a count, or `count` prop on SideNav items
- `Divider` → use `<Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }} />`
- `Alert` → use `<Banner>` (page-level) or `<Callout>` (inline)
- `Modal` → use `<Dialog>`

**Storybook reference:**
[Odyssey Storybook](https://odyssey-storybook.okta.design/?path=/docs/introduction-readme--docs)

## Tech Stack

- Vite + React 18 + TypeScript
- `@okta/odyssey-react-mui` (Odyssey Design System)
- React Router v7
- yarn
- NO Tailwind, NO styled-components, NO custom CSS frameworks
- NO `@mui/icons-material` or any non-Odyssey icon library
