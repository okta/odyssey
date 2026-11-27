---
summary: App content leaves the slot, repositioned via absolute coordinates
affectedExports:
  - renderUiShell
  - UiShell
files:
  - packages/odyssey-react-mui/src/ui-shell/renderUiShell.tsx
  - packages/odyssey-react-mui/src/ui-shell/UiShellContent.tsx
commit: 331570b79
onlyRelevantIf: you mount your app through renderUiShell
---

App content leaves the content area's `<slot />`. The app root element used to be a light DOM child of the web component, projected into the grid cell through `<slot />`. It is now wrapped in a new div appended to `uiShellRootElement`, beside the web component, and `UiShellContent` gives that div `position: absolute` with `top`, `left`, `width` and `height` in pixels read from `getBoundingClientRect()` of the now-empty grid cell, resynced by a `ResizeObserver` inside a `requestAnimationFrame`. Separate the two ways page CSS can arrive. Matching is not newly granted: a slotted element stays in the light DOM, so document stylesheets already matched app content and its descendants. What does change for matching is the ancestor chain, since the app root's parent goes from the web component to a new unnamed div and one extra element now sits between `uiShellRootElement` and the app root, so child combinators, selectors keyed to the old parent, and `:first-child` or `:nth-child` on the app root resolve differently. Inheritance is newly granted: `color`, `font-family`, `font-size`, `font-weight`, `line-height`, `letter-spacing`, `text-align`, `text-transform`, `white-space`, `direction`, `visibility`, `cursor`, `list-style` and custom properties now flow in from `html` and `body`, where `:host { all: initial }` previously delivered initial values at the shadow boundary. The host's `contain: content` no longer covers app content either, so `position: fixed` inside the app resolves against the viewport rather than the host box, and paint is no longer clipped to the host. The content box is also measured rather than laid out: the offsets are viewport coordinates written onto an absolutely positioned element, so placement holds only where the container div has no positioned ancestor and the page is not scrolled; the observer watches size, so a cell that moves without resizing leaves app content behind; and the styles land one animation frame after mount, so the first frame has app content in normal flow below the shell.
