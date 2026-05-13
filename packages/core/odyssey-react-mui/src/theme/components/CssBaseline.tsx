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

import type { ThemeOptions } from "@mui/material";

import { stackClasses } from "@mui/material/Stack";

import type { GetComponentsProps } from "./types.js";

export const cssBaselineComponents = ({
  odysseyTokens,
}: GetComponentsProps): Pick<
  NonNullable<ThemeOptions["components"]>,
  "MuiCssBaseline" | "MuiScopedCssBaseline"
> => ({
  MuiCssBaseline: {
    styleOverrides: (themeParam) => `
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    html {
      font-size: calc((${themeParam.typography.fontSize} / 16) * 100%);
    }

    :not(code) &, :not(pre) & {
      :lang(el) {
        font-family: 'Noto Sans', sans-serif;
      }

      :lang(ja) {
        font-family: 'Noto Sans JP', sans-serif;
      }

      :lang(ko) {
        font-family: 'Noto Sans KR', sans-serif;
      }

      :lang(th) {
        font-family: 'Noto Sans Thai', sans-serif;
      }

      :lang(zh-CN) {
        font-family: 'Noto Sans SC', sans-serif;
      }

      :lang(zh-TW) {
        font-family: 'Noto Sans TC', sans-serif;
      }
    }
  `,
  },
  MuiScopedCssBaseline: {
    styleOverrides: {
      root: {
        background: "transparent",

        abbr: {
          borderBottomWidth: odysseyTokens.BorderWidthMain,
          borderBottomStyle: "dashed", // Token?
          borderBottomColor: odysseyTokens.HueNeutral700,
          textDecoration: "none",
        },

        address: {
          maxWidth: odysseyTokens.TypographyLineLengthMax,
          marginBlockStart: 0,
          marginBlockEnd: odysseyTokens.Spacing4,
          marginInline: 0,
          fontStyle: "normal",

          "&:last-child": {
            marginBlockEnd: 0,
          },
        },

        blockquote: {
          maxWidth: odysseyTokens.TypographyLineLengthMax,
          marginBlockStart: 0,
          marginBlockEnd: odysseyTokens.Spacing4,
          marginInline: 0,
          paddingBlock: 0,
          paddingInlineStart: odysseyTokens.Spacing4,
          paddingInlineEnd: 0,
          borderInlineStartWidth: "3px", // Token?
          borderInlineStartStyle: odysseyTokens.BorderStyleMain,
          borderInlineStartColor: odysseyTokens.HueNeutral200,

          "&:last-child": {
            marginBlockEnd: 0,
          },
        },

        cite: {
          fontStyle: "normal",
        },

        code: {
          fontFamily: odysseyTokens.TypographyFamilyMono,
          display: "inline-block",
          minWidth: `calc(${odysseyTokens.TypographySizeSubordinate} * ${odysseyTokens.TypographyLineHeightHeading5})`,
          borderStyle: odysseyTokens.BorderStyleMain,
          borderWidth: odysseyTokens.BorderWidthMain,
          borderRadius: odysseyTokens.BorderRadiusTight,
          borderColor: odysseyTokens.BorderColorDisplay,
          backgroundColor: odysseyTokens.HueNeutral50,
          padding: `calc(${odysseyTokens.Spacing1} / 2) ${odysseyTokens.Spacing1}`,
          fontSize: odysseyTokens.TypographySizeSubordinate,
          lineHeight: odysseyTokens.TypographyLineHeightHeading5,
        },

        del: {
          display: "inline-block",
          backgroundColor: odysseyTokens.PaletteDangerHighlight,

          "&::before, &::after": {
            clip: "rect(0 0 0 0)",
            clipPath: "inset(50%)",
            height: "1px",
            overflow: "hidden",
            position: "absolute",
            whiteSpace: "nowrap",
            width: "1px",
          },

          "&::before": {
            content: "attr(data-a11y-start)",
          },

          "&::after": {
            content: "attr(data-a11y-end)",
          },
        },

        details: {
          fontSize: odysseyTokens.TypographySizeBody,
        },

        dfn: {
          fontStyle: "italic",
        },

        dl: {
          display: "grid",
          gridGap: `${odysseyTokens.Spacing2} ${odysseyTokens.Spacing4}`,
          gridTemplateColumns: "repeat(2, minmax(min-content, max-content))",
          maxWidth: odysseyTokens.TypographyLineLengthMax,
          marginBlockStart: 0,
          marginBlockEnd: odysseyTokens.Spacing4,
          marginInline: 0,
          padding: 0,

          "&:last-child": {
            marginBlockEnd: 0,
          },

          dt: {
            gridColumn: 1,
            fontWeight: odysseyTokens.TypographyWeightBodyBold,
          },

          dd: {
            gridColumn: 2,
            marginInlineStart: odysseyTokens.Spacing0,
            fontWeight: 400,
          },
        },

        em: {
          fontStyle: "italic",

          "& > em": {
            textDecoration: "underline",
          },
        },

        figure: {
          display: "grid",
          gridGap: odysseyTokens.Spacing2,
          gridTemplateColumns: "minmax(min-content, max-content)",
          justifyContent: "start",
          justifyItems: "start",
          marginBlockStart: 0,
          marginBlockEnd: odysseyTokens.Spacing4,
          marginInline: 0,

          "&:last-child": {
            marginBlockEnd: 0,
          },
        },

        "figcaption:not([class])": {
          color: odysseyTokens.TypographyColorSubordinate,
          fontSize: odysseyTokens.TypographySizeSubordinate,
        },

        hr: {
          marginBlock: odysseyTokens.Spacing2,
          marginInline: 0,
          borderWidth: odysseyTokens.BorderWidthMain,
          borderStyle: odysseyTokens.BorderStyleMain,
          borderColor: odysseyTokens.HueNeutral200,
        },

        ins: {
          display: "inline-block",
          backgroundColor: odysseyTokens.PaletteSuccessHighlight,

          "&::before, &::after": {
            clip: "rect(0 0 0 0)",
            clipPath: "inset(50%)",
            height: "1px",
            overflow: "hidden",
            position: "absolute",
            whiteSpace: "nowrap",
            width: "1px",
          },

          "&::before": {
            content: "attr(data-a11y-start)",
          },

          "&::after": {
            content: "attr(data-a11y-end)",
          },
        },

        kbd: {
          display: "inline-block",
          minWidth: `calc(${odysseyTokens.TypographySizeSubordinate} * ${odysseyTokens.TypographyLineHeightHeading5})`,
          borderStyle: odysseyTokens.BorderStyleMain,
          borderWidth: odysseyTokens.BorderWidthMain,
          borderRadius: odysseyTokens.BorderRadiusMain,
          borderColor: odysseyTokens.HueNeutral200,
          backgroundColor: odysseyTokens.HueNeutral50,
          padding: `calc(${odysseyTokens.Spacing1} / 2) ${odysseyTokens.Spacing1}`,
          fontFamily:
            "'Inconsolata', 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', 'Courier', monospace",
          fontSize: odysseyTokens.TypographySizeSubordinate,
          fontWeight: odysseyTokens.Spacing5,
          lineHeight: odysseyTokens.TypographyLineHeightHeading5,
          boxShadow: `0 1px 1px 0 hsla(240, 6%, 12%, 0.05)`,
        },

        mark: {
          backgroundColor: odysseyTokens.PaletteWarningHighlight,

          "&::before, &::after": {
            clip: "rect(0 0 0 0)",
            clipPath: "inset(50%)",
            height: "1px",
            overflow: "hidden",
            position: "absolute",
            whiteSpace: "nowrap",
            width: "1px",
          },

          "&::before": {
            content: "attr(data-a11y-start)",
          },

          "&::after": {
            content: "attr(data-a11y-end)",
          },
        },

        "p:not([class])": {
          maxWidth: odysseyTokens.TypographyLineLengthMax,
          marginBlockStart: 0,
          marginBlockEnd: odysseyTokens.Spacing4, // Token?

          "&:last-child": {
            marginBlockEnd: 0,
          },
        },

        pre: {
          marginInline: 0,
          marginBlockStart: 0,
          marginBlockEnd: odysseyTokens.Spacing4,
          fontFamily: odysseyTokens.TypographyFamilyMono,
          whiteSpace: "pre-wrap",
          tabSize: 2,

          "&:last-child": {
            marginBlockEnd: 0,
          },
        },

        ul: {
          [`&.${stackClasses.root}`]: {
            padding: 0,
            margin: 0,
          },
        },

        "ul:not([class]), ol:not([class])": {
          maxWidth: odysseyTokens.TypographyLineLengthMax,
          marginBlockStart: 0,
          marginBlockEnd: odysseyTokens.Spacing4,
          // Unique padding to get desire appearance with "outside" position
          paddingInlineStart: "2ch",

          ol: {
            listStyleType: "lower-alpha",

            ol: {
              listStyleType: "lower-roman",
            },
          },

          "&:last-child": {
            marginBlockEnd: 0,
          },
        },

        "li:not([class])": {
          marginBlockEnd: odysseyTokens.Spacing2,
          paddingInlineStart: odysseyTokens.Spacing1,

          "ul, ol": {
            marginBlockStart: odysseyTokens.Spacing2,
            marginInlineStart: `calc(${odysseyTokens.Spacing6} - 2ch)`,
          },
        },

        q: {
          quotes: `'"' '"' "'" "'"`,

          "&::before": {
            content: "open-quote",
          },

          "&::after": {
            content: "close-quote",
          },
        },

        s: {
          textDecoration: "line-through",
        },

        samp: {
          padding: "0 0.5ch",
          backgroundColor: odysseyTokens.HueNeutral100,
          boxShadow: `0 1px 0 ${odysseyTokens.HueNeutral50}`,
          fontSize: odysseyTokens.TypographySizeBody,

          kbd: {
            background: odysseyTokens.HueNeutralWhite,
          },
        },

        small: {
          fontSize: odysseyTokens.TypographySizeSubordinate,
        },

        strong: {
          fontWeight: odysseyTokens.TypographyWeightBodyBold,
        },

        sub: {
          fontSize: odysseyTokens.TypographySizeSubordinate,
          lineHeight: 1,
          verticalAlign: "sub",
        },

        summary: {
          marginBlockEnd: odysseyTokens.Spacing2,
          fontSize: odysseyTokens.TypographySizeBody,
          fontWeight: odysseyTokens.TypographyWeightBodyBold,
          cursor: "default",

          "&:focus-visible": {
            outlineColor: odysseyTokens.FocusOutlineColorPrimary,
            outlineOffset: odysseyTokens.FocusOutlineOffsetMain,
            outlineStyle: odysseyTokens.FocusOutlineStyle,
            outlineWidth: odysseyTokens.FocusOutlineWidthMain,
          },
        },

        sup: {
          fontSize: odysseyTokens.TypographySizeSubordinate,
          lineHeight: 1,
          verticalAlign: "super",
        },

        var: {
          fontStyle: "italic",
          fontWeight: odysseyTokens.TypographyWeightBodyBold,
        },
      },
    },
  },
});
