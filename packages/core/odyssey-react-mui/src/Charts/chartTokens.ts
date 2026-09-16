/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { useMemo } from "react";

import { useOdysseyDesignTokens } from "../OdysseyDesignTokensContext.js";

const CSS_ROOT_FONT_SIZE_PIXELS = 16;

/**
 * The chart values that no Odyssey design token supplies. Each entry is either
 * a Highcharts implementation detail that no token will ever cover, or a chart
 * specification value that the design team has not yet turned into a token.
 */
export const chartTokens = {
  // TransitionDurationMainAsNumber is 100, and the spec asks for 250.
  ChartAnimationDuration: 250,
  // The spec asks for 3px, and BorderRadiusTight is 4px.
  ChartBarRadius: 3,
  // The spec asks for 22px, and the spacing scale has no 22px step.
  ChartLegendLineSymbolWidth: 22,
  // The amount Highcharts adds to ChartLineStrokeWidth on hover, for the
  // spec's 3px hover stroke. Set explicitly, so an undocumented Highcharts
  // default cannot move the hover stroke out of spec.
  ChartLineHoverStrokeWidthPlus: 1,
  ChartLineMarkerHoverHaloOpacity: 0.25,
  ChartLineMarkerHoverHaloSize: 20,
  ChartLineMarkerHoverSize: 12,
  ChartLineMarkerSize: 8,
  // The spec asks for 2px, and BorderWidthHeavy is 1.5px.
  ChartLineStrokeWidth: 2,
  // The floor for a consumer that sets no height on the chart container. The
  // spacing scale stops at Spacing9, which is 56px.
  ChartMinHeight: 400,
  // Highcharts gives the Y axis label less visible space than the X axis
  // label at the same `title.margin`. The comment on `yAxisLabelSpacing` below
  // gives the cause.
  ChartYAxisLabelBaselineCompensation: 8,
} as const;

/**
 * Converts an Odyssey design token length to a pixel number, because the
 * charting library takes numbers and not CSS length strings. The function
 * multiplies a `rem` token by the base font size. The function uses a `px`
 * token without a change, because a `px` value is already absolute. Therefore
 * the function does not scale a value such as `BorderRadiusTight` as a `rem`
 * value.
 */
export const getTokenValueAsPixels = ({
  tokenValue,
  typographySizeBase,
}: {
  tokenValue: string;
  typographySizeBase: string;
}) =>
  tokenValue.trimEnd().endsWith("rem")
    ? parseFloat(tokenValue) *
      ((parseFloat(typographySizeBase) / 100) * CSS_ROOT_FONT_SIZE_PIXELS)
    : parseFloat(tokenValue);

/**
 * Returns the chart values that come from the Odyssey design tokens in
 * context. The values include the series color palette, the style objects that
 * the charting library takes, and the lengths the library takes.
 *
 * A chart component calls this one hook, and does not resolve the tokens
 * itself. Therefore the same token choices apply to every chart in the family.
 *
 * The hook also returns `odysseyDesignTokens` for `ChartPopoverContent`. A
 * chart serializes that content to HTML, and does not mount it. Therefore the
 * content cannot read the context itself.
 *
 * The whole object comes from one `useMemo`. A chart passes these values to the
 * React children of the chart library, and that library rebuilds and redraws the
 * whole chart when the identity of a child changes. A new style object on each
 * render therefore costs a redraw. One memo over the whole object keeps every
 * value stable while the tokens stay the same.
 */
export const useChartTokens = () => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  return useMemo(() => {
    const toPixels = (tokenValue: string) =>
      getTokenValueAsPixels({
        tokenValue,
        typographySizeBase: odysseyDesignTokens.TypographySizeBase,
      });

    // Highcharts reads a line height with `parseInt`, so it turns a unitless
    // ratio such as `1.5` into 1 pixel and draws the wrapped lines of a label
    // on top of each other.
    const lineHeight = `${
      toPixels(odysseyDesignTokens.TypographySizeBody) *
      odysseyDesignTokens.TypographyLineHeightBody
    }px`;

    // The axis values, the axis labels and the legend items share this
    // one style. The design specifies the same text treatment for all three,
    // so an axis label carries no more weight than an axis value.
    const axisValueStyle = {
      color: odysseyDesignTokens.TypographyColorSubordinate,
      fontFamily: odysseyDesignTokens.TypographyFamilyBody,
      fontSize: odysseyDesignTokens.TypographySizeBody,
      fontWeight: odysseyDesignTokens.TypographyWeightBody,
      lineHeight,
    };

    const seriesColors = [
      odysseyDesignTokens.HueBlue600,
      odysseyDesignTokens.HueAccentThree400,
      odysseyDesignTokens.HueAccentTwo400,
      odysseyDesignTokens.HueAccentOne600,
      odysseyDesignTokens.HueYellow400,
      odysseyDesignTokens.HueGreen600,
    ];

    return {
      animationDuration: chartTokens.ChartAnimationDuration,
      barRadius: chartTokens.ChartBarRadius,
      // Highcharts also uses this as the limit for the marker in the legend: it
      // draws that marker at a radius of half this height, or at
      // `lineMarkerRadius`, whichever is less. Both come from
      // ChartLineMarkerSize, so the legend cannot cut the marker down.
      legendLineSymbolHeight: chartTokens.ChartLineMarkerSize,
      legendLineSymbolWidth: chartTokens.ChartLegendLineSymbolWidth,
      lineHoverStrokeWidthPlus: chartTokens.ChartLineHoverStrokeWidthPlus,
      lineMarkerHoverHaloOpacity: chartTokens.ChartLineMarkerHoverHaloOpacity,
      lineMarkerHoverHaloRadius: chartTokens.ChartLineMarkerHoverHaloSize / 2,
      lineMarkerHoverRadius: chartTokens.ChartLineMarkerHoverSize / 2,
      lineMarkerRadius: chartTokens.ChartLineMarkerSize / 2,
      lineStrokeWidth: chartTokens.ChartLineStrokeWidth,
      minHeight: `${chartTokens.ChartMinHeight}px`,
      odysseyDesignTokens,

      bodyFontFamily: odysseyDesignTokens.TypographyFamilyBody,
      borderColor: odysseyDesignTokens.BorderColorDisplay,
      borderWidth: toPixels(odysseyDesignTokens.BorderWidthMain),
      chartBackgroundColor: "transparent",
      crosshairColor: odysseyDesignTokens.BorderColorDisplay,
      crosshairWidth: toPixels(odysseyDesignTokens.BorderWidthMain),
      // Without some outer spacing, Highcharts clips the left edge of the
      // widest Y axis value.
      edgeSpacing: toPixels(odysseyDesignTokens.Spacing2),
      focusRingColor: odysseyDesignTokens.BorderColorPrimaryControl,
      focusRingOffset: toPixels(odysseyDesignTokens.FocusOutlineOffsetMain),
      // Highcharts types the focus border style as a `CSSObject`, so this one
      // radius carries its unit while every other length here is a number.
      focusRingRadius: `${toPixels(odysseyDesignTokens.BorderRadiusTight)}px`,
      focusRingWidth: toPixels(odysseyDesignTokens.FocusOutlineWidthMain),
      legendItemSpacing: toPixels(odysseyDesignTokens.Spacing4),
      legendSpacing: toPixels(odysseyDesignTokens.Spacing4),
      legendSymbolSpacing: toPixels(odysseyDesignTokens.Spacing2),
      popoverBackgroundColor: odysseyDesignTokens.HueNeutralWhite,
      popoverRadius: toPixels(odysseyDesignTokens.BorderRadiusMain),
      popoverSpacing: toPixels(odysseyDesignTokens.Spacing4),
      topEdgeSpacing: toPixels(odysseyDesignTokens.Spacing3),
      xAxisLabelSpacing: toPixels(odysseyDesignTokens.Spacing2),
      // Highcharts renders the gap beside a rotated Y axis label about 3px
      // smaller than requested. Add that difference back so both axis labels
      // appear Spacing2 away from their values.
      yAxisLabelSpacing:
        toPixels(odysseyDesignTokens.Spacing2) +
        chartTokens.ChartYAxisLabelBaselineCompensation,

      /**
       * The palette that a chart gives to the charting library as its series
       * colors. The library assigns these colors to the series in order. A
       * caller cannot set the color of a series.
       */
      seriesColors,

      axisLabelStyle: axisValueStyle,
      axisValueStyle,

      // Highcharts merges this over `legendItemStyle` for a legend item
      // whose series is hidden (toggled off). The spec's "Selected" state is
      // this same toggled-off item, styled with Color/Disabled.
      legendItemHiddenStyle: {
        color: odysseyDesignTokens.TypographyColorDisabled,
      },
      legendItemHoverStyle: {
        color: odysseyDesignTokens.TypographyColorBody,
      },
      // The legend spec gives its label text a different default color
      // (Color/Body) than the axis values and labels (subordinate
      // gray), so the legend does not share `axisValueStyle`.
      legendItemStyle: {
        color: odysseyDesignTokens.TypographyColorSubordinate,
        fontFamily: odysseyDesignTokens.TypographyFamilyBody,
        fontSize: odysseyDesignTokens.TypographySizeBody,
        fontWeight: odysseyDesignTokens.TypographyWeightBody,
        lineHeight,
      },

      popoverStyle: {
        // Odyssey has no token named "Depth/Menu". DepthMedium is the
        // closest match to the hover spec's "3-layer soft drop shadow": it
        // has three shadow layers, and its opacities are lighter than
        // DepthHigh's. The popover's own `shadow` prop stays `false` because
        // Highcharts' built-in shadow is a single-layer SVG filter and
        // cannot reproduce a 3-layer shadow; this CSS box-shadow applies
        // instead through the popover's HTML container (Highcharts' `Tooltip`
        // defaults to `useHTML`).
        boxShadow: odysseyDesignTokens.DepthMedium,
        color: odysseyDesignTokens.TypographyColorBody,
        fontFamily: odysseyDesignTokens.TypographyFamilyBody,
        fontSize: odysseyDesignTokens.TypographySizeBody,
        fontWeight: odysseyDesignTokens.TypographyWeightBody,
        lineHeight,
      },
    };
  }, [odysseyDesignTokens]);
};

/** The chart tokens that {@link useChartTokens} returns. */
export type ChartTokens = ReturnType<typeof useChartTokens>;
