---
summary: UI Shell no longer wraps app content in a ScopedCssBaseline reset
affectedExports:
  - UiShell
  - renderUiShell
  - OdysseyProvider
files:
  - packages/odyssey-react-mui/src/OdysseyProvider.tsx
  - packages/odyssey-react-mui/src/ui-shell/UiShell.tsx
  - packages/odyssey-react-mui/src/ui-shell/UiShellContent.tsx
commit: 40de8448b
onlyRelevantIf: an app renders inside UI Shell
---

UI Shell no longer wraps app content in a ScopedCssBaseline. The baseline now wraps only the shell's own chrome, one per region, so app content loses both a wrapper div and MUI's element reset. Check anything that relied on the reset, and any selector or layout that counted on that div.
