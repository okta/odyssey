---
summary: Tag and Status now respond to a parent Tooltip's injected props
affectedExports:
  - Tag
  - Status
files:
  - packages/odyssey-react-mui/src/Tag.tsx
  - packages/odyssey-react-mui/src/Status.tsx
commit: 8f19d3045
onlyRelevantIf: a Tag or Status rendered as the direct child of a Tooltip
---

Tooltip starts working on Tag and Status at this release. Before it, neither component read MuiPropsContext, so the props the Tooltip injects went nowhere: no ref reached a DOM node, the popper had no anchor, and no hover, focus or touch listener attached to the chip. Tag now reads the context through `MuiPropsContext.Consumer` and Status through `useMuiProps`, each spreading it onto the underlying MUI Chip ahead of its own props. Odyssey's Tooltip is the only provider of that context and neither MuiPropsContext nor MuiPropsChild is exported from the package, so the change reaches a Tag or Status only in a Tooltip's direct child position. The chip root gains a `title` attribute holding the tooltip text while the tooltip is closed, `onMouseOver`, `onMouseLeave`, `onFocus`, `onBlur`, `onTouchStart` and `onTouchEnd`, a ref, and `data-mui-internal-clone-element` in development builds. It also gains `aria-describedby` holding the popper id while the tooltip is open, which Button does not, because neither Tag nor Status sets an `aria-describedby` of its own to overwrite it, so a tooltip on a Tag or Status is announced where the same tooltip on a Button is not.
