---
summary: Autocomplete isFullWidth now also widens its Field, not just the wrapper
affectedExports:
  - Autocomplete
files:
  - packages/odyssey-react-mui/src/Autocomplete.tsx
commit: dbe1c8538
onlyRelevantIf: an Autocomplete is given isFullWidth
---

Autocomplete now also passes `isFullWidth` to its Field. The prop already reaches the MUI Autocomplete root, which carries no width cap in Odyssey's theme, so the outer wrapper is already stretching. The Field's `MuiFormControl` is the constrained box: Odyssey's `MuiFormControl` root override sets `width: 100%` with `maxWidth: TypographyLineLengthMax`, 55ch, then lifts that cap to `maxWidth: 100%` only when `fullWidth` is set. MUI's own `fullWidth` contribution of `width: 100%` is redundant against the unconditional `width: 100%` already there, so the single effect is `max-width` moving from 55ch to 100% on that element. The visible field, its label, its hint and its error message are capped at roughly 55 characters and now fill the parent's width, while the stretched box before the change is the invisible wrapper around them. The FormControl also gains the `MuiFormControl-fullWidth` class. An Autocomplete without `isFullWidth` renders identically, because the prop defaults to `false` in both Autocomplete and Field, so absent and `false` are the same value.
