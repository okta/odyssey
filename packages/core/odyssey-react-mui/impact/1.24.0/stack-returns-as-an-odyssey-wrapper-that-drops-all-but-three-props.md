---
summary: "`Stack` returns as an Odyssey wrapper that drops all but three props"
affectedExports:
  - Stack
files:
  - packages/odyssey-react-mui/src/Stack.tsx
  - packages/odyssey-react-mui/src/index.ts
commit: 84fcef346
onlyRelevantIf: you imported Stack from @okta/odyssey-react-mui before 1.0.0, when it was MUI's own Stack
---

Before 1.0.0, Stack was MUI's own Stack, re-exported. From 1.0.0 to 1.23.0 the package exports no Stack. At 1.24.0 Stack returns as an Odyssey component that renders MuiStack with only children, direction (default column) and spacing (default 2). Every other prop is dropped at runtime, including sx, component, alignItems, justifyContent and the other system props, even though the type still accepts sx and component. So an import that compiled against MUI's Stack compiles again, and its layout styles silently stop applying. Check every Stack that passes a prop other than those three.
