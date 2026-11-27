---
summary: Card and DataCard gain bottom margin after every card
affectedExports:
  - Card
  - DataView
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
  - packages/odyssey-react-mui/src/labs/DataView/DataCard.tsx
commit: a8789e54c
---

MuiCard's root gained `marginBlockEnd: Spacing5`, 1.71428571rem, so every Card and every DataView card now pushes that much space below itself where it previously had none. A card as the last child of a fixed-height container, or in a stack whose gap was already tuned, gains that space, and a long card list grows by it per card. A second rule, `&.ods-card-compact`, sets `marginBlockEnd: Spacing3` and `padding: Spacing3`, the padding overriding the root's `padding: Spacing5`. DataCard is what emits that class: its className became `ods-card-${variant}` over the new three-value variant set, tile, stack and compact, so only `variant="compact"` reaches the rule. Odyssey's own `Card` never emits the class, so a plain Card always takes the Spacing5 margin and the Spacing5 padding. Check vertical rhythm on any page with cards and total scroll height on card lists.
