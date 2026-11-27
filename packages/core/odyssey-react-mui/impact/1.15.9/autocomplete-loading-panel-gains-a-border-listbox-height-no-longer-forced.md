---
summary: Autocomplete loading panel gains a border, listbox height no longer forced
affectedExports:
  - Autocomplete
  - GroupPicker
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 1eca3d606
onlyRelevantIf: an Autocomplete is rendered
---

The Autocomplete's loading slot gained a border, BorderWidthMain solid HueNeutral200 with BorderRadiusMain, so the loading panel now has a visible outline matching the listbox. The listbox itself already carried that exact border set. `position: relative` was added to the listbox's `& > ul`. The unconditional `paper: { height: "100%" }` added at 1.15.0 was narrowed to apply only when a `ListboxComponent` is set, meaning only when `isVirtualized` is true, so a non-virtualized dropdown's panel height returns to sizing on its content.
