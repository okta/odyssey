---
summary: Root font-size shrinks to 87.5%, shrinking every rem unit
affectedExports:
  - odysseyTheme
  - CssBaseline
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 944a76c8d
---

MuiCssBaseline's overrides were replaced wholesale, and the release shipped as a single squashed commit so this hash is the whole 0.18.0 delta. The old object form declared box-sizing: border-box and lining and proportional numerals; the new form is a template string that only sets html { font-size: calc((theme.typography.fontSize / 16) * 100%) }, which computes to 87.5%. This is not scoped to Odyssey components. It restyles the document root element, so the rem unit itself is redefined for your entire page: every rem length in your own stylesheets, your own components, and any third-party CSS on the page shrinks by 12.5%, whether or not that code has anything to do with Odyssey. A 1rem gap you wrote becomes 14px instead of 16px. Whatever the old object form was contributing, including box-sizing: border-box, is also gone. This is the largest-reach change in the release and the band. Check rem-based layouts and spacing you own, media queries and breakpoints written in rem, icon and control sizes in rem, and anything that assumed a 16px root.
