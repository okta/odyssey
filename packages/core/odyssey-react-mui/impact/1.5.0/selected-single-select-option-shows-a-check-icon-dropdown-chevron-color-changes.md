---
summary: Selected single-select option shows a check icon; dropdown chevron color changes
affectedExports:
  - Select
files:
  - packages/odyssey-react-mui/src/Select.tsx
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 00f1cfb47
---

The selected option in a single-select menu now renders a CheckIcon inside a ListItemSecondaryAction, which a new MuiSelect rule hides in the closed control but which adds an element to the open list. The dropdown chevron moved from the body text colour to the subordinate colour, and the Autocomplete listbox gained a HueNeutral200 border with top padding on its popper.
