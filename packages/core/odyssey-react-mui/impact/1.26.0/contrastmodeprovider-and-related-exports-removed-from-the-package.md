---
summary: ContrastModeProvider and related exports removed from the package
affectedExports:
  - OdysseyProvider
  - OdysseyThemeProvider
files:
  - packages/odyssey-react-mui/src/index.ts
  - packages/odyssey-react-mui/src/useContrastMode.tsx
  - packages/odyssey-react-mui/src/theme/createOdysseyMuiTheme.ts
commit: 9a6856956
---

`export * from "./ContrastModeProvider"` is removed from `index.ts` and the file is deleted, and nothing from the replacement `useContrastMode.tsx` is exported in its place. ContrastModeProvider, `useContrastContext` and `useParentBackgroundColor` leave the public surface with no export path, and so does the `ContrastMode` type, even though `OdysseyThemeProviderProps.contrastMode` is still typed with it. An import of any of the three values fails the build, because the named export no longer exists for the bundler to resolve. An import of the `ContrastMode` type fails typecheck only, since the import is erased before runtime, and a `contrastMode` prop can still be passed as a string literal. `theme.contrastMode` also goes: `createOdysseyMuiTheme` now passes `contrastMode` into `components()` alone rather than into `createTheme`, and the `@mui/material/styles` module augmentation declaring it on `Theme` is dropped. A consumer styleOverride reading `theme.contrastMode` fails typecheck, and where the type error is absent or suppressed it reads `undefined` at runtime, so every branch testing it stops matching and the contrast-dependent half of that override silently drops out. The function's own `contrastMode` default moves from `"highContrast"` typed `string` to `"lowContrast"` typed `ContrastMode`, so a direct caller gets a different theme and a narrower type whose name is no longer importable. Separately, `useContrastMode` installs a MutationObserver and a document-level listener per provider instance, observing the `html` element's `class` and `style` attributes, `document.head` for child list changes, and `transitionend` on `document` filtered to `background-color`. The head trigger is the one a normal app hits, because Emotion inserts a style element there the first time any style is used, so it fires in bursts during mount and on the first render of any component not seen yet. Each fire walks ancestors calling `getComputedStyle` until it finds a non-transparent background, which forces a style recalculation; the state it sets is normally unchanged, so no render follows. Surface mounts a provider, so the count of observers scales with the number of Surfaces rendered rather than being one per app.
