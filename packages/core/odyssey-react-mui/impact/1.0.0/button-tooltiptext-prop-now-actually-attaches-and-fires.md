---
summary: Button `tooltipText` prop now actually attaches and fires
affectedExports:
  - Button
files:
  - packages/odyssey-react-mui/src/Button.tsx
  - packages/odyssey-react-mui/src/MuiPropsContext.ts
commit: 8f19d3045
onlyRelevantIf: an icon-only Button given tooltipText
---

`tooltipText` starts working on Button at this release. Before it, Button read MuiPropsContext with `useContext` at its own position and baked the result into a memoized button element, then handed that element to its internal Tooltip. The Tooltip publishes the props MUI injects into that context, so the element was already built and the injected props were dropped: no ref reached a DOM node, so the popper had no anchor, and no hover, focus or touch listener attached to the button. Button now reads the context through `MuiPropsContext.Consumer` placed inside the Tooltip, so the rendered button gains a `title` attribute holding the tooltip text while the tooltip is closed, `onMouseOver`, `onMouseLeave`, `onFocus`, `onBlur`, `onTouchStart` and `onTouchEnd`, a ref, and `data-mui-internal-clone-element` in development builds. A popper element mounts on hover and on focus where none mounted before, and the native browser tooltip from the `title` attribute appears alongside it. The accessible description is still absent: Button sets `aria-describedby` after the spread, so an undefined value removes the popper id the Tooltip supplied, and a screen reader announces nothing unless `ariaDescribedBy` is passed, in which case that value is announced instead of the tooltip text. A Button that sits inside a Tooltip and also carries its own `tooltipText` loses the outer Tooltip's injected props, because the inner Consumer shadows them, so that button's outer `title` attribute and outer listeners disappear and only the inner tooltip responds.
