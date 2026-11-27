---
summary: Test selectors subpath now resolves queries via `@testing-library/react`
affectedExports:
  - querySelector
  - queryOdysseySelector
  - odysseyTestSelector
  - captureElement
files:
  - packages/odyssey-react-mui/src/test-selectors/getByQuerySelector.ts
  - packages/odyssey-react-mui/src/test-selectors/testSelector.ts
commit: fb7653f66
onlyRelevantIf: you import from @okta/odyssey-react-mui/test-selectors
---

The test-selectors subpath now resolves its queries from `@testing-library/react` instead of `@testing-library/dom`. A project that has only `@testing-library/dom` installed will fail to resolve the import. The commit's subject is about side nav session state and does not mention this.
