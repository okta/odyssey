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

import { createOdysseyStyledComponent } from "@okta/odyssey-react-mui";

export const CellRow = createOdysseyStyledComponent({ tag: "div" })(
  ({ odysseyDesignTokens }) => ({
    alignItems: "center",
    display: "flex",
    gap: odysseyDesignTokens.Spacing1,
  }),
);

// Each table scrolls inside its own column, so a wide table never pushes the
// two columns apart or the page sideways.
export const TableScrollArea = createOdysseyStyledComponent({ tag: "div" })(
  ({ odysseyDesignTokens }) => ({
    border: `1px solid ${odysseyDesignTokens.HueNeutral200}`,
    borderRadius: odysseyDesignTokens.BorderRadiusTight,
    overflowX: "auto",
  }),
);

export const PairingTable = createOdysseyStyledComponent({ tag: "table" })(
  ({ odysseyDesignTokens }) => ({
    borderCollapse: "collapse",
    fontFamily: odysseyDesignTokens.TypographyFamilyBody,
    fontSize: odysseyDesignTokens.TypographySizeSubordinate,
    minWidth: "820px",
    width: "100%",

    "& tr:last-child td": {
      borderBlockEnd: 0,
    },

    "& th, & td": {
      borderBlockEnd: `1px solid ${odysseyDesignTokens.HueNeutral200}`,
      paddingBlock: odysseyDesignTokens.Spacing2,
      paddingInline: odysseyDesignTokens.Spacing2,
      textAlign: "start",
      verticalAlign: "middle",
    },

    "& th": {
      backgroundColor: odysseyDesignTokens.HueNeutral50,
      color: odysseyDesignTokens.TypographyColorHeading,
      fontWeight: odysseyDesignTokens.TypographyWeightHeading,
    },

    "& code": {
      fontFamily: odysseyDesignTokens.TypographyFamilyMono,
      whiteSpace: "nowrap",
    },
  }),
);

// Swatches keep a fixed gray edge so near-white and near-black values stay
// visible in either Storybook color scheme.
export const Swatch = createOdysseyStyledComponent({
  tag: "span",
  shouldForwardProp: (prop) => prop !== "swatchColor",
})<{ swatchColor: string }>(({ odysseyDesignTokens, swatchColor }) => ({
  backgroundColor: swatchColor,
  border: "1px solid #8d8d8d",
  borderRadius: odysseyDesignTokens.BorderRadiusTight,
  display: "inline-block",
  flexShrink: 0,
  height: odysseyDesignTokens.Spacing4,
  width: odysseyDesignTokens.Spacing4,
}));
