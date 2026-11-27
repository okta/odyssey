---
summary: UI Shell mounts and unmounts asynchronously via dynamic import
affectedExports:
  - renderReactInWebComponent
  - UiShell
files:
  - packages/odyssey-react-mui/src/web-component/renderReactInWebComponent.ts
commit: 89a6d8560
onlyRelevantIf: renderReactInWebComponent or the UI Shell web component is mounted, and especially if anything reads the shadow root immediately after mounting
---

createRoot moved from a static import to a dynamic import("react-dom/client") stored as a promise, so connectedCallback and disconnectedCallback now render and unmount asynchronously. Mounting the element and reading its shadowRoot on the next line finds it empty; Odyssey's own tests had to be wrapped in waitFor for exactly this reason. The dynamic import also produces a separate chunk, which matters for builds that do not code-split and for strict CSP or import-map setups. This reverts at 1.28.2 and returns at 1.31.0.
