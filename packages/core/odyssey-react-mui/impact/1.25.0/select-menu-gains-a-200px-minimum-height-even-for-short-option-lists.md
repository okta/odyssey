---
summary: Select menu gains a 200px minimum height even for short option lists
affectedExports:
  - Select
files:
  - packages/odyssey-react-mui/src/Select.tsx
commit: f8ee8e08f
---

Select passes MenuProps with an sx that gives the menu paper maxHeight: 50vh and minHeight: 200px. The minimum is unconditional, so a Select with two or three options now opens a 200px-tall menu with empty space below the last item. Check short option lists and any layout positioned relative to the open menu. The minHeight is removed again at 1.30.0.
