---
summary: BarChart and LineChart from the charts subpath render nothing
affectedExports:
  - BarChart
  - BarChartProps
  - LineChart
  - LineChartProps
  - ChartPoint
  - ChartSeries
  - ChartValueFormat
files:
  - packages/core/odyssey-react-mui/package.json
  - packages/core/odyssey-react-mui/src/__internal.tsx
  - packages/core/odyssey-react-mui/src/charts/index.ts
  - packages/core/odyssey-react-mui/src/charts/movedToOdysseyLabs.ts
  - packages/core/odyssey-react-mui/src/properties/odyssey-react-mui.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_cs.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_da.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_de.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_el.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_es.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_eu.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_fi.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_fr.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_ht.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_hu.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_id.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_it.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_ja.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_ko.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_ms.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_nb.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_nl_NL.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_ok_PL.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_ok_SK.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_pl.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_pt_BR.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_ro.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_ru.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_sv.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_th.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_tr.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_uk.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_vi.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_zh_CN.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_zh_TW.properties
commit: af9b6c96accf11ee6f01949711f6883e8cff5831
onlyRelevantIf: an app that imports anything from @okta/odyssey-react-mui/charts
---

BarChart and LineChart moved to the `@okta/odyssey-labs` package, which exports them with the same names, props, and types. The `@okta/odyssey-react-mui/charts` subpath still resolves and still exports every old name, so existing imports keep building, but each one is now a deprecated stub.

- `BarChart` and `LineChart` from `@okta/odyssey-react-mui/charts` render nothing (`null`) and log a `console.error` that names `@okta/odyssey-labs` as the new import. A page that showed a chart now shows an empty space, with no loading or error state, and `onPointClick` and `onRetry` never fire.
- The types lose their shape. `BarChartProps`, `LineChartProps`, `ChartPoint`, and `ChartSeries` become `Record<string, unknown>`, and `ChartValueFormat` becomes `unknown`. Props passed to the stubs are no longer checked, and code that reads fields of a `ChartPoint` or `ChartSeries` from this subpath, such as `point.category` or `series.data`, can stop type-checking.
- Core no longer depends on `highcharts` or `@highcharts/react`. An app that used either package only through Odyssey's dependency no longer gets it installed.
- Core drops its four chart strings (`chart.loading.arialabel`, `chart.error.heading`, `chart.error.text`, `chart.error.retry`) and their translations.

Check every import from `@okta/odyssey-react-mui/charts`. To keep the charts rendering, import them from `@okta/odyssey-labs` instead. Check tests that fail on `console.error` output, and any test that expects a chart to render.
