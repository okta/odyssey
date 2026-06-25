/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
import { type Meta, type StoryObj } from "@storybook/react-vite";

import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";

// Styled components must be defined at module scope — defining them inside render
// functions causes React to unmount and remount the element on every render.
const StyledCard = createOdysseyStyledComponent({ tag: "div" })(
  ({ odysseyDesignTokens }) => ({
    padding: odysseyDesignTokens.Spacing4,
    borderRadius: odysseyDesignTokens.BorderRadiusTight,
    backgroundColor: odysseyDesignTokens.HueNeutral100,
    border: `1px solid ${odysseyDesignTokens.HueNeutral200}`,
    display: "inline-block",
  }),
);

const StyledHighlightCard = createOdysseyStyledComponent({
  tag: "div",
  shouldForwardProp: (prop) => prop !== "isHighlighted",
})<{ isHighlighted: boolean }>(({ odysseyDesignTokens, isHighlighted }) => ({
  padding: odysseyDesignTokens.Spacing4,
  borderRadius: odysseyDesignTokens.BorderRadiusTight,
  backgroundColor: isHighlighted
    ? odysseyDesignTokens.PalettePrimaryLighter
    : odysseyDesignTokens.HueNeutral100,
  border: `2px solid ${isHighlighted ? odysseyDesignTokens.PalettePrimaryMain : odysseyDesignTokens.HueNeutral200}`,
  display: "inline-block",
}));

const meta: Meta = {
  decorators: [OdysseyStorybookThemeDecorator],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: function C() {
    return <StyledCard>Styled with Odyssey design tokens</StyledCard>;
  },
};

export const WithCustomProps: Story = {
  render: function C() {
    return (
      <>
        <StyledHighlightCard isHighlighted={false}>
          Not highlighted
        </StyledHighlightCard>
        &nbsp;
        <StyledHighlightCard isHighlighted>Highlighted</StyledHighlightCard>
      </>
    );
  },
};
