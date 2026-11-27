---
summary: ToastStack renders into a portal instead of inline, changing stacking context
affectedExports:
  - Toast
  - ToastStack
files:
  - packages/core/odyssey-react-mui/src/ToastStack.tsx
  - packages/core/odyssey-react-mui/src/FullScreenOverlayContext.tsx
commit: 64f4f07bf
onlyRelevantIf: an app rendering a ToastStack. Where the toasts land additionally depends on whether the consumer sets `shadowRootElement`
---

ToastStack stopped rendering inline where the consumer placed it and now renders through an overlay wrapper into a portal, so toasts land in the same stacking context as the dialog backdrop and appear above it. The toast DOM is no longer a descendant of the subtree the consumer mounted it in. Check toast position and stacking, and check any CSS that styled toasts through an ancestor selector, because that selector no longer matches.
