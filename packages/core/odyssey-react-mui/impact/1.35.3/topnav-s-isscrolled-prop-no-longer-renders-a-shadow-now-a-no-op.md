---
summary: "`TopNav`'s `isScrolled` prop no longer renders a shadow, now a no-op"
affectedExports:
  - TopNav
  - UiShell
  - renderUiShell
  - WideUiShellContent
  - InnerAppContainer
files:
  - packages/odyssey-react-mui/src/ui-shell/TopNav/TopNav.tsx
  - packages/odyssey-react-mui/src/ui-shell/InnerAppContainer.tsx
  - packages/odyssey-react-mui/src/ui-shell/WideUiShellContent.tsx
commit: 479a4f142
onlyRelevantIf: you render TopNav directly and pass isScrolled
---

`isScrolled` is still on `TopNavProps` and still typechecks, and TopNav now ignores it: the prop was dropped from the destructure and from the styled container, along with the `boxShadow` and `clipPath` it drove. The scroll affordance moved to a new `InnerAppContainer` that draws an inset shadow at the top of the app content area instead. Passing `isScrolled` produces no shadow on the nav.
