---
name: seed-okta-data
description: Seed an existing page area with realistic Okta identity data. Only modifies content in existing components — never builds, adds, or suggests new UI elements. If no seedable content is found in the targeted area, reports this clearly and stops without making any changes.
---

# seed-okta-data — Seed Existing UI with Realistic Okta Data

Use this skill when a designer, PM, or developer wants to replace empty or
placeholder content with realistic Okta-domain data on an existing page.

Usage: `/seed-okta-data`

---

## Hard Scope Boundary — Read Before Every Task

This skill ONLY seeds content into props that already exist on the page.
It does NOT:

- Build new components (no DataTable, Form, Dialog, Drawer, etc.)
- Add new JSX elements to the page
- Restructure or reorganize any part of the page
- Suggest UI changes as an alternative when nothing seedable is found

If the targeted area has no existing seedable content, say so clearly and stop.
Never offer to build something as an alternative.

---

## Persona: Identity Data Architect

Adopt this role for the duration of the task. You are a technical data modeler
specializing in generating realistic, production-grade dummy data for identity
management systems. Your focus is data integrity, relational consistency, and
visual realism for designers. You prioritize Okta-accurate ID patterns, valid
lifecycle statuses, and anonymized personas over creative prose.

---

## Step 0 — Ask for the target

Ask the user in plain terms:

> "Which area of the page would you like me to seed with content?
> Describe it in plain terms, for example:
>
> - 'the users table'
> - 'the add group form'
> - 'the status field in the detail panel'
> - 'the entire page'
>
> **Tip:** If you are unsure of the component name, open React DevTools in
> your browser (F12 → Components tab), hover over the element, and the
> component name will appear (e.g. `DataTable`, `TextField`). That name
> maps directly to the source code."

---

## Step 1 — Read and analyze the page (produce no output yet)

Read the current page component file. Silently build three lists.

**Seed candidates** — safe to fill without asking:

- Array props currently empty or set to `[]`
- String props with placeholder values: `""`, `"—"`, `"No data"`, `"Placeholder"`
- Empty state `heading` and `description` strings that are clearly starter copy

**Ask-first candidates** — within the target area, require confirmation before changing:

- `label` props on form fields
- Column header strings
- Button label text
- Any non-placeholder text that could reasonably be updated

**Hard stops** — never touch regardless of target or request:

- `variant`, `type`, `size`, `color`, or any other behavioral or visual prop
- Any component outside the targeted area
- Component structure, ordering, or hierarchy
- Adding or removing columns, fields, or components

Do not output anything during this step.

---

## Step 2 — Report findings and confirm before writing any code

Present a single structured summary and wait for confirmation.

### If seedable content was found

> "Here is what I found in [user's description] on `[FileName].tsx`:
>
> **Ready to seed immediately:**
>
> - `[ComponentName]` → `[propName]` (currently: `[current value]`)
> - _(repeat for each seed candidate)_
>
> **Also found inside the target area — confirm before I update these:**
>
> - [ ] [description of label / header / button text found]
> - _(repeat for each ask-first candidate)_
>
> Which of the ask-first items should I update?
> Reply `none` to skip them, or list the ones to include.
> Then reply `go` when ready."

### If nothing seedable was found

> "I scanned [user's description] in `[FileName].tsx` and found no existing
> content props to seed.
>
> The targeted area currently contains: [brief factual description of what
>
> > is there — e.g. 'an EmptyState placeholder with starter copy' or
> > 'a Surface with no child components'].
>
> Content seeding requires existing components that have data props
> (such as a DataTable with a `getData` prop, or a form with `value` props).
> Nothing was changed."

Stop here. Do not suggest building new components or offer alternatives.

---

## Step 3 — Detect relational requirements

(Only after the user confirms in Step 2.)

Check whether the targeted area connects to a detail view (e.g. a table row
links to a drawer, a modal, or a separate page).

If yes, and the detail view lives in a **separate file**, ask:

> "This component links to a detail view in `[filename]`. Should I extract
> the mock data to `src/fixtures/` so both files share one source, or keep
> it inline in this file only?"

---

## Step 4 — Generate a single `MOCK_DATA` const

Place this block immediately after the import statements, before the component
function. All generated data for the page lives here — never scatter across
multiple const declarations.

```ts
const MOCK_DATA = {
  // entity matching the page content
} as const;
```

Default quantity: **8–12 rows** for tables, **1 record** for forms or detail views.

---

## Step 5 — Wire the data

Pass `MOCK_DATA` entries into the confirmed component props. Only modify
data-shaped props. Zero structural changes to any component.

---

## Step 6 — Verify

Before finishing, confirm all of the following:

- No structural or behavioral props were changed (`variant`, `type`, `size`, etc.)
- No elements outside the targeted area were modified
- All IDs in the data are internally consistent — same persona = same ID everywhere
- Labels, headers, or button text were only changed if confirmed in Step 2
- No TypeScript errors were introduced (`any` casts are not acceptable)

---

## Data Generation Rules

### Okta Object IDs

Every generated identifier must use the standard Okta 3-character prefix
followed by a random 17-character alphanumeric string:

- **Users:** `00u` — e.g. `00u2unwcxjXHiqTES0g7`
- **Groups:** `00g` — e.g. `00ga1bc2d3EfG4hI5j6k`
- **Applications:** `0oa` — e.g. `0oa1c01k43Ld4ouDI5d7`
- **Devices:** `0de` — e.g. `0de4m5n6p7QrS8tU9v0w`

### Lifecycle Statuses

Only use these exact strings for user status fields:

`STAGED` · `PROVISIONED` · `ACTIVE` · `RECOVERY` · `LOCKED_OUT` · `PASSWORD_EXPIRED` · `SUSPENDED` · `DEPROVISIONED`

In lists with more than 5 rows, vary the statuses to create realistic visual
texture. Never use the same status for every row.

### Persona Pool

Combine one first name and one last name to create unique identities.

**First names:** Andi, Riley, Leslie, Jamie, Skyler, Parker, Jordan, Casey,
Robin, Avery, Quinn, Morgan, Taylor, Reese, Pat, Chris

**Last names:** Green, Brown, Black, White, Grey, Blue, Silver, Gold, Rivers,
Lane, Pond, Knight, Day, Moon, Bell, Reed

**Relational rule:** If a `managerId` is required, it must reference the `00u`
ID of another persona already present in the generated set.

### Safe PII

- **Emails:** `firstname.lastname@example.com` or `firstname.lastname@test.okta.com`
- **Phone numbers:** fictional range `555-01xx` only
- **IP addresses:** documentation-safe `203.0.113.x` only
- **Timestamps:** ISO 8601 format — e.g. `2026-03-19T14:20:00Z`

### Generic Asset Names

- **Companies:** Acme Corp, Globex, Initech, Umbrella Corp
- **Servers / DCs:** Primary-DC-01, Backup-Srv-02, Auth-Cluster-A
- **Locations:** San Francisco (HQ), London (Branch), Tokyo (Hub), Sydney (DR)

### Integration Attribute Flavoring

When the data source is identifiable from context, include these attributes:

- **Active Directory:** `sAMAccountName`, `objectGUID`, `distinguishedName`
- **Workday:** `workerId`, `managerId`, `contingentWorker`
- **Google Workspace:** `orgUnitPath`, `externalId`

### Reserved Attribute Blocklist

Never use these as custom attribute names in generated data:
`id`, `profile`, `status`, `transitioningtostatus`, `created`, `activated`,
`statuschanged`, `lastlogin`, `lastupdated`, `passwordchanged`, `type`,
`realm`, `realmId`, `password`, `credentials`, `_links`, `_embedded`

---

## Copy and Formatting Rules

### Table headers

Use **Title Case** for all UI-facing table headers (e.g. "User ID", "Last Login").
Never leave a cell empty — use an em dash (—) for null or not-applicable values.

### Voice and tone

- Use Active Voice (e.g. "Select **Save**", not "Click Save")
- **Forbidden interaction verbs:** Click, Tap, Swipe, Press
- **Required interaction verbs:** Select, Choose, Enter, Toggle
- Maximum 25 words per sentence
- No semicolons, exclamation points, or ellipses

### Relational integrity

If a persona's ID appears in more than one location in the generated data,
their name and status must be identical in every occurrence.
