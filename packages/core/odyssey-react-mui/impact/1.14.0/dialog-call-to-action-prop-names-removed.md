---
summary: Dialog call-to-action prop names removed
affectedExports:
  - Dialog
files:
  - packages/odyssey-react-mui/src/Dialog.tsx
onlyRelevantIf: the app passes `callToActionFirstComponent`, `callToActionSecondComponent`, or `callToActionLastComponent` to Dialog, and the target version is below 1.18.0
---

Dialog no longer accepts `callToActionFirstComponent`, `callToActionSecondComponent`, or `callToActionLastComponent`. Their replacements are `primaryCallToActionComponent`, `secondaryCallToActionComponent`, and `tertiaryCallToActionComponent`. A Dialog that still passes an old name fails the type check, and without types it renders no button in that footer slot. 1.18.0 accepts the old names again as deprecated aliases, so an upgrade that ends at 1.18.0 or later is not affected. Check Dialogs that pass the old names.
