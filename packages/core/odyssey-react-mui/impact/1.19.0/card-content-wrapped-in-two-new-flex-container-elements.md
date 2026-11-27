---
summary: Card content wrapped in two new flex container elements
affectedExports:
  - Card
files:
  - packages/odyssey-react-mui/src/Card.tsx
commit: 68bce285f
---

Card's content is now wrapped in two new elements: a flex CardContentContainer div and a Box inside it. Previously the overline, title, description, image container and actions were direct children of a Fragment. Check CSS that targets Card descendants by child combinator or nth-child, and check any layout that relied on the content being a non-flex block.
