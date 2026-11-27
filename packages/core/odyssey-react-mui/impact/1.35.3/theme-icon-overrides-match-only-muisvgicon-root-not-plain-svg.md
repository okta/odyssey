---
summary: Theme icon overrides match only `.MuiSvgIcon-root`, not plain `svg`
affectedExports:
  - Accordion
  - Breadcrumb
  - BreadcrumbList
  - Link
  - Tabs
  - DataTable
  - DataView
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: bbf71c73d
---

Five theme overrides narrowed their icon selector from `svg` / `& svg` to `.MuiSvgIcon-root`: `MuiAccordionSummary`, `MuiBreadcrumbs`, `MuiLink` (two rules), `MuiTabs`, and the `.ods-drag-handle` rule under `MuiTableCell`. An `<svg>` you supply yourself no longer picks up Odyssey's icon sizing and color there; only MUI SvgIcon-classed elements do. The commit's subject is "fix: upgrades MUI version" and says nothing about this.
