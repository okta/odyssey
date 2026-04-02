# Okta Admin Console — UI Prototyping Template

A ready-to-use prototyping template for the Okta Admin Console built on
the [Odyssey Design System](https://odyssey-storybook.okta.design). The
shell (AppSwitcher, SideNav, TopNav) is fully implemented. Add your
feature content by prompting Claude Code.

---

## Quick Start

Install assets and start the dev server:

```bash
yarn
yarn dev
```

Open your browser to the address shown in the terminal
(usually http://localhost:5173).

You should see the Okta Admin Console template with the Groups page loaded.

---

## How to Build a Prototype with Claude Code

Open Claude Code in this project folder and describe what you want to
build in plain language. Claude Code knows to use Okta's Odyssey design
system for everything — you don't need to specify components or technical
details.

### Good prompts to try

**Adding content to a page:**

```
Add a table of users to the People page with columns for
name, email, status, and date created
```

**Creating a new page:**

```
Create a new page called API Services under the Applications
section with a list of active API integrations
```

**Adding interactions:**

```
Add a modal that opens when the Actions button is clicked
with options to Edit, Duplicate, and Delete
```

**Adding navigation elements:**

```
Add a tab bar to the Groups page with tabs for
Members, Settings, and History
```

**Adding feedback:**

```
Show a success banner at the top of the page when the
Actions button is clicked
```

---

## Prototyping From a Figma Design

If you have a Figma frame showing what you want to build, you can pass
the link directly to Claude Code:

```
Build this screen in the main content area: [Figma link]
```

### What Claude Code will do

- Read the Figma design automatically using the Figma MCP server
- Build everything in the main content area using Okta Odyssey components
- If your Figma design includes changes to the navigation or top bar,
  it will **stop and ask you to confirm** before touching those areas

### Tips for best results

- Link to a specific **frame** rather than a whole page — the more
  focused the link, the better the output
- Your Figma design does not need to use Odyssey components — Claude
  Code will find the closest Odyssey match automatically
- If Claude Code cannot find an Odyssey match for something in your
  design, it will tell you and ask how to proceed

### Setting up the Figma MCP server

Before using Figma links, make sure the Figma MCP server is configured
in your Claude Code environment.
See setup instructions here:
https://developers.figma.com/docs/figma-mcp-server/

---

## Adding a New Nav Item

Ask Claude Code directly:

```
Add a new nav item called "AI Agents" under the Directory section
and create a placeholder page for it
```

Claude Code will update `src/shell/NavConfig.ts`, add a route in
`src/App.tsx`, and create the page file for you.

---

## Project Structure

```
src/
  App.tsx                   — Route definitions (all routes live here)
  main.tsx                  — App entry point and Odyssey provider setup
  shell/
    AppShell.tsx            — Full shell layout (CSS Grid composition)
    SideNavConfig.tsx       — Static nav tree (SIDE_NAV_CONFIG) — edit to add/remove nav items
    SideNavIcon.tsx         — Icon wrapper component for nav items
    useBreadcrumb.ts        — Derives breadcrumb back-link from the current route
  pages/
    GroupsPage.tsx          — Default landing page (/directory/groups)
    StubPage.tsx            — Reusable placeholder for unbuilt routes
public/
  okta-wordmark.svg         — Okta wordmark used in SideNav logo
  okta-aura.svg             — Okta Aura used in AppSwitcher
  icons/                    — Product app icons for AppSwitcher
```

---

## Commands

| Command        | Description              |
| -------------- | ------------------------ |
| `yarn dev`     | Start dev server         |
| `yarn build`   | Production build         |
| `yarn preview` | Preview production build |

---

## Design System Reference

All UI components come from Okta's Odyssey Design System.

- **Storybook:** https://odyssey-storybook.okta.design
- **Available components:** see the Odyssey Storybook and existing UI usage in this app
- **Package:** `@okta/odyssey-react-mui` (managed via workspace)

Odyssey provides a comprehensive set of components and patterns. Some common
patterns (like `IconButton`, `Grid`, `Badge`) do **not** have a direct Odyssey
equivalent — refer to the Storybook and existing UI code for guidance on what
to use instead.
