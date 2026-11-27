---
summary: Card image no longer scales up to fill its fixed-height container
affectedExports:
  - Card
  - DataView
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
  - packages/odyssey-react-mui/src/Card.tsx
  - packages/odyssey-react-mui/src/labs/DataView/DataCard.tsx
commit: a8789e54c
onlyRelevantIf: a Card or DataCard containing an img
---

MuiCard's `"& img"` rule changed from `height: CARD_IMAGE_HEIGHT`, a fixed 64px, to `maxHeight: 100%` with `height: auto` and `alignSelf: flex-start`. The image box stays 64px tall, because the same commit pins it: `Card.tsx`'s `ImageContainer` gains `height: CARD_IMAGE_HEIGHT` alongside its existing `maxHeight`, and `DataCard.tsx`'s gains `height: CARD_IMAGE_SIZE` for every variant other than `compact`. Card height and the position of everything below the image are unchanged. What changes is the image inside that box. An image taller than 64px is still capped at 64px, but one shorter than 64px is no longer scaled up to 64px: it renders at its intrinsic size, top aligned. A wide short logo is the visible case, since forcing `height: 64px` on it also scaled its width proportionally. An image element that is not an `img` tag, such as an inline SVG, is unaffected by the theme rule but now sits in a container with a hard 64px height where it previously had only a 64px cap. `CARD_IMAGE_HEIGHT` is still exported from `Card.tsx` and still 64px.
