---
summary: Banner content aligns to the start and top, and the link can wrap under the text
affectedExports: [Banner]
files:
  - packages/core/odyssey-react-mui/src/theme/components/Alert.tsx
commit: e570d29c2fbf268f63fd562b53d5f60f7e46faab
onlyRelevantIf: a Banner
---

Banner's layout changes from centered to start-aligned:

- The icon, text, link, and close button were centered horizontally and vertically. They now align to the inline start and to the top, so a multi-line message keeps its icon, link, and close button on the first line instead of the middle.
- The inline padding was 16px, or 32px when `onClose` is set. It is now 24px either way. The block padding stays 16px, so a one-line banner keeps its height.
- The close button was absolutely positioned 8px from the inline end and centered vertically. It is now part of the layout at the inline end, with its icon on the 24px padding edge, aligned to the first line of text.
- The message area fills the remaining width. The text hugs its content, so a short message keeps the link 16px beside it. When the text would get narrower than 20rem (280px) beside the link, the link moves onto its own line under the text with an 8px gap. A long link moves down sooner than a short one.
- Long unbroken words in the text now break anywhere instead of overflowing.

Check visual snapshots of pages with banners, layouts that relied on centered banner content, and tests that measure the close button's position or the banner's height at narrow widths, where the wrapped link makes the banner taller.
