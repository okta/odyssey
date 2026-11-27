---
summary: Dialog gained a `variant` prop that reaches the backdrop's DOM attributes
affectedExports:
  - Dialog
files:
  - packages/core/odyssey-react-mui/src/Dialog.tsx
  - packages/core/odyssey-react-mui/src/theme/components.tsx
commit: 503aba43f
---

Dialog gained a `variant` prop, `"default" | "security"`, and passes `slotProps={{ backdrop: { variant } }}` to MUI's Dialog on every render, not only when the consumer sets it. Two unconditional consequences follow. First, `variant` is not a MUI Backdrop prop, so it survives to the styled root, whose `shouldForwardProp` only strips `ownerState`, `theme`, `sx` and `as`, and React renders it on the element: every Dialog's `.MuiBackdrop-root` div now carries `variant="default"` in the DOM. Second, MUI's Modal resolves the backdrop slot as `slotProps.backdrop ?? componentsProps.backdrop`, so supplying `slotProps.backdrop` discards the `{ transitionDuration, as: BackdropComponent }` that MUI's own Dialog had built there. Both dropped values resolve to what the Backdrop already falls back to, Fade's default timeout uses the same `enteringScreen` and `leavingScreen` durations and `BackdropComponent` is undefined unless set, so the fade timing does not change. The new `backdropFilter: "blur(10px)"` in `MuiBackdrop`'s root override is gated on `ownerState.variant === "security"` and is opt-in, but `ownerState.variant` is now defined on Dialog backdrops, so a consumer's own `MuiBackdrop` override can branch on it. Check DOM snapshots and any selector that enumerates attributes on the backdrop.
