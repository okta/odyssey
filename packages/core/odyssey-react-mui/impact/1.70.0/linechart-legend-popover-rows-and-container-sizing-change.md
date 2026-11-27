---
summary: LineChart legend, popover rows, and container sizing change
affectedExports:
  - LineChart
files:
  - packages/core/odyssey-react-mui/src/charts/LineChart.tsx
  - packages/core/odyssey-react-mui/src/charts/components/ChartContainer.tsx
  - packages/core/odyssey-react-mui/src/charts/components/ChartFrame.tsx
  - packages/core/odyssey-react-mui/src/charts/components/ChartPopoverContent.tsx
  - packages/core/odyssey-react-mui/src/charts/utils/chartTokens.ts
commit: e34851708
onlyRelevantIf: an app that renders LineChart
---

The legend line symbol narrows from 22 to about 16 pixels, and legend items no longer align in columns when they wrap. Each popover row now shows the series line and marker shape before the series name, in a flex row with a gap. The chart now renders inside an extra `div` with `height: 100%` and a zero minimum height and width, and the chart frame and body also get a zero minimum width, so a chart in a flex or grid parent can now shrink below the width of its content. Check chart layout in narrow and flex containers, the legend when it wraps, and any test or selector that reads the popover markup.
