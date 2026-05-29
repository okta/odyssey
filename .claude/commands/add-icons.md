---
description: Use when the user asks to add new SVG icons or logos to Odyssey. Handles classification, copying to the generated folder, regenerating React components, and updating Storybook stories. Use only when explicitly invoked.
---

# /add-icons — Add new icons or logos to Odyssey

End-to-end workflow for adding new SVG icons or logos to the Odyssey design system: classify SVGs, copy to the right generated folder, regenerate React components, update Storybook stories, and optionally ship.

**Arguments:** `$ARGUMENTS` — a file path, directory, or glob pattern pointing to the SVG(s) to add. If omitted, you will be asked.

Execute the following steps in order. Do not skip steps or batch them — complete each one before moving to the next.

---

## Step 1: Resolve source files

If `$ARGUMENTS` is non-empty, use it as the source specification. Otherwise, ask the user: "What SVG files should I add? Provide a file path, directory, or glob."

Expand the specification to a concrete list of `.svg` files. If no `.svg` files are found, stop and tell the user.

---

## Step 2: Classify each SVG as icon or logo

For each SVG file, read its content and check the `width` and `height` attributes on the root `<svg>` element (or the `viewBox` attribute — a `viewBox="0 0 16 16"` indicates 16×16):

- **16×16** → **icon** → destination: `packages/core/odyssey-icons/src/figma.icon.generated/`
- **32×32** → **logo** → destination: `packages/core/odyssey-icons/src/figma.logo.generated/`
- **Any other size** → warn the user: "This SVG size is not supported (icons must be 16×16, logos must be 32×32). Skip `<filename>`?" If the user confirms skip, exclude it and continue. If they say no, stop.

Present the full classification table to the user before proceeding:

```
Icon (16×16) → figma.icon.generated/:
  - icon-a.svg
  - icon-b.svg

Logo (32×32) → figma.logo.generated/:
  - logo-x.svg

Skipped (unsupported size):
  - other.svg
```

Ask the user to confirm this classification before copying.

---

## Step 3: Copy SVGs

For each classified file (icons and logos, excluding skipped), copy it to its destination folder. Overwrite if a file with the same name already exists.

Print each action: `Copied icon-a.svg → packages/core/odyssey-icons/src/figma.icon.generated/icon-a.svg`

---

## Step 4: Run `yarn generate:icons`

From the repo root, run:

```bash
yarn generate:icons
```

This builds `odyssey-icons` and regenerates React components in `odyssey-react-mui`. If it fails, stop and report the error.

---

## Step 5: Update Icon.stories.tsx (icons only)

Skip this step if no icons (16×16) were added — logos have no story yet.

File to update: `packages/apps/odyssey-storybook/src/Odyssey Core/Icon/Icon.stories.tsx`

For each new icon, find its generated component file in `packages/core/odyssey-react-mui/src/icons.generated/`. The build created a `.tsx` file named after the component (e.g. `MyNewIcon.tsx`). The stories entry name is that filename without `.tsx` plus `"Icon"` — e.g. `MyNewIcon.tsx` → `"MyNewIconIcon"`.

Ask the user for the `use` description for each new icon, batching all questions at once. Use `AskUserQuestion` with one question per new icon. If there are more than 4 new icons, ask in batches of 4 and repeat. The `use` field is a short phrase (e.g. `"To navigate back"`) or empty string `""`.

For each new icon, insert an entry into the `icons` array in `Icon.stories.tsx`:

```ts
{ name: "MyNewIconIcon", use: "<user-provided use>" },
```

Insert in **alphabetical order by `name`** within the existing array. The array is currently sorted alphabetically — find the correct position and insert without disrupting the sort order.

---

## Step 6: Ask about shipping

Use `AskUserQuestion` to ask two questions at once:

1. "Do you want to push these changes now?" (Yes / No)
2. "Do you already have a Jira story and/or branch for this change?"
   - Options: "Yes, I have both", "Yes, Jira key only", "Yes, branch only", "No, create new"
   - If they have a Jira key: ask what it is (e.g. `OKTA-123456`)
   - If they have a branch name: ask what it is (e.g. `rj-add-icons-OKTA-123456`)

---

## Step 7: Ship (if confirmed)

If the user does not want to push, stop here and summarize what was changed locally.

If they want to push, invoke `/shipit` with optional arguments based on what they provided:

- Both Jira key and branch: `/shipit --jira <KEY> --branch <name>`
- Jira key only: `/shipit --jira <KEY>`
- Branch only: `/shipit --branch <name>`
- Neither: `/shipit`
