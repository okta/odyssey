---
summary: "`scrollableContentElement` prop removed, top nav scroll shadow stops appearing"
affectedExports:
  - UiShell
  - renderUiShell
  - TopNav
files:
  - packages/odyssey-react-mui/src/ui-shell/UiShellContent.tsx
commit: 331570b79
onlyRelevantIf: you passed scrollableContentElement through setComponentProps
---

`scrollableContentElement` is gone from the published prop type. It was the way to nominate an element of your own as the content scroll container. Passing it as an object literal now raises an excess property error; passing it any other way leaves it silently ignored, since `UiShellContent` no longer reads the key. The shell's app content container always carries `overflow-y: auto`, so a scroll container of your own becomes a second scroller nested inside it, usually with no second scrollbar, because the outer container carries an explicit pixel height that the inner element fills. The visible loss is the top nav's drop shadow. `TopNav` paints `DepthMedium` below itself, transitioned in, whenever the content beneath has been scrolled, and the shell decides that by reading `scrollTop` on the element it listens to. That listener now sits on the container the shell owns, `scroll` does not bubble from elements, and the element that actually scrolls is the inner one, so the observed `scrollTop` stays at 0, the scrolled state never turns on, and the shadow never appears however far the content moves.
