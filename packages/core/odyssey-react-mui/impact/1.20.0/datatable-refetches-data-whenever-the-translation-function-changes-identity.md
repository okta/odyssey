---
summary: DataTable refetches data whenever the translation function changes identity
affectedExports:
  - DataTable
files:
  - packages/odyssey-react-mui/src/DataTable/DataTable.tsx
commit: 98b733092
onlyRelevantIf: a DataTable supplies getData and the app can change locale, or its i18n setup produces a new t on each render
---

t from useTranslation was added to the dependency array of the useEffect that calls getData. The effect now re-runs, and re-fetches, whenever t changes identity. With react-i18next that happens on a language switch, and on every render in setups where t is not memoized. Check for duplicate network calls and for side effects inside getData that are not safe to repeat.
