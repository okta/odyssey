---
summary: Some translated labels change in several locales
affectedExports:
  - Pagination
  - DataTable
  - DataView
  - DatePicker
  - DateTimePicker
  - UiShell
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_da.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_de.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_es.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_fi.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_fr.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_ht.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_ja.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_ko.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_ms.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_nb.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_ru.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_sv.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_uk.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_vi.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_zh_CN.properties
commit: edab9f38c
onlyRelevantIf: the app renders Odyssey in a language other than English
---

Some existing translated strings were corrected, which changes accessible names in those locales. In German, the Pagination landmark label changes from "Seitenumbruch" to "Paginierung". In Malay, the DataTable and DataView density label and the table layout option change. Picker labels change in Danish, German, Spanish, Finnish, French, Haitian Creole, Japanese, Korean, Russian, Swedish, and Simplified Chinese. The UI Shell side nav drag handle and drag announcements change in Japanese, Norwegian, Swedish, Ukrainian, and Vietnamese. Check tests and selectors that match these labels by their translated text.
