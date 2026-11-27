---
summary: Dialog close button aligns to baseline, shifting up for multi-line titles
affectedExports:
  - Dialog
files:
  - packages/core/odyssey-react-mui/src/Dialog.tsx
commit: 361c97ac3
onlyRelevantIf: a Dialog whose `title` wraps to more than one line
---

The close button's rule in `DialogTitleContainer` gained `alignSelf: "baseline"`. The container already set `alignItems: "center"`, so the button was vertically centred in the title row, not stretched to the title block's height. The button is now the only baseline-aligned child in that row, which places it flush against the row's cross-start edge, so it sits at the top of the title block rather than matching the title's text baseline. This is not gated on viewport and reaches every Dialog at every size, unlike the rest of the same commit, but it is only visible when the title row is taller than the close button: `size="small"` gives the button a height of `Spacing6`, 2.28571429rem, and a single line of the title's default h5 is about 1.672rem, so a one-line title leaves the button where it was. With a title that wraps to more than one line the button moves from vertically centred to level with the first line.
