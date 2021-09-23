/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { Story } from "@storybook/react";
import Text from ".";
import type { Props } from ".";

export default {
  title: `Utilities/Text/Styles`,
  component: Text,
  argTypes: {
    children: {
      control: { type: "string" },
    },
  },
};

const Template: Story<Props> = ({ children, ...rest }) => (
  <Text {...rest}>{children}</Text>
);

const TemplateWithContainer: Story<Props> = ({ children, ...rest }) => (
  <div
    style={{
      background: "#faf5dc",
      width: "min-content",
      maxWidth: "8em",
      height: "200px",
      padding: "1rem",
    }}
  >
    <Text {...rest}>{children}</Text>
  </div>
);

export const ColorBody = Template.bind({});
ColorBody.storyName = "Color: Body (default)";
ColorBody.args = {
  children: "Default body text color",
};

export const BodyInverse = Template.bind({});
BodyInverse.storyName = "Color: Body, inverse";
BodyInverse.parameters = {
  backgrounds: { default: "inverse (gray-900)" },
};
BodyInverse.args = {
  children: "Danger (disabled) text color",
  color: "bodyInverse",
};

export const Code = Template.bind({});
Code.storyName = "Color: Code";
Code.args = {
  children: "Code text color",
  color: "code",
};

export const ColorDanger = Template.bind({});
ColorDanger.storyName = "Color: Danger";
ColorDanger.args = {
  children: "Danger text color",
  color: "danger",
};

export const ColorDangerDisabled = Template.bind({});
ColorDangerDisabled.storyName = "Color: Danger, disabled";
ColorDangerDisabled.args = {
  children: "Danger (disabled) text color",
  color: "dangerDisabled",
};

export const ColorSub = Template.bind({});
ColorSub.storyName = "Color: Sub";
ColorSub.args = {
  children: "Sub text color",
  color: "sub",
};

// Weight
export const WeightRegular = Template.bind({});
WeightRegular.storyName = "Weight: Regular";
WeightRegular.args = {
  children: "Regular text weight",
  weight: "regular",
};

export const WeightBold = Template.bind({});
WeightBold.storyName = "Weight: Bold";
WeightBold.args = {
  children: "Bold text weight",
  weight: "bold",
};

// Style
export const StyleNormal = Template.bind({});
StyleNormal.storyName = "Style: Normal (default)";
StyleNormal.args = {
  children: "Normal text Style",
  style: "normal",
};

export const StyleItalic = Template.bind({});
StyleItalic.storyName = "Style: Italic";
StyleItalic.args = {
  children: "Italic text Style",
  style: "italic",
};

// Transform
export const TransformNormal = Template.bind({});
TransformNormal.storyName = "Transform: none (default)";
TransformNormal.args = {
  children: "Normal text transform style",
  transform: "none",
};

export const TransformCapitalize = Template.bind({});
TransformCapitalize.storyName = "Transform: Capitalize";
TransformCapitalize.args = {
  children: "Capitalize text transform style",
  transform: "capitalize",
};

export const TransformLowerCase = Template.bind({});
TransformLowerCase.storyName = "Transform: Lower case";
TransformLowerCase.args = {
  children: "Lower case text transform style",
  transform: "lowercase",
};

export const TransformUpperCase = Template.bind({});
TransformUpperCase.storyName = "Transform: Upper case";
TransformUpperCase.args = {
  children: "Uppercase text transform style",
  transform: "uppercase",
};

export const TransformFullWidth = Template.bind({});
TransformFullWidth.storyName = "Transform: Full width";
TransformFullWidth.args = {
  children: "Full width text transform style",
  transform: "fullWidth",
};

export const TransformFullSizeKana = Template.bind({});
TransformFullSizeKana.storyName = "Transform: Full size kana";
TransformFullSizeKana.args = {
  children: "Full size kana text transform style",
  transform: "fullSizeKana",
};

// Transform
export const SizeLede = Template.bind({});
SizeLede.storyName = "Size: Lede";
SizeLede.args = {
  children: "Lede text size style",
  size: "lede",
};

export const SizeBase = Template.bind({});
SizeBase.storyName = "Size: Base (default)";
SizeBase.args = {
  children: "Base text size style",
  size: "base",
};

export const SizeCaption = Template.bind({});
SizeCaption.storyName = "Size: Caption";
SizeCaption.args = {
  children: "Caption text size style",
  size: "caption",
};

// Wrap
export const WrapNormal = TemplateWithContainer.bind({});
WrapNormal.storyName = "Wrap: Normal";
WrapNormal.args = {
  children: (
    <>
      Normal text wrap style. The wrap prop can be{" "}
      <strong>incomprehensibile</strong> if viewed in the wrong context
    </>
  ),
  wrap: "normal",
};

export const WrapBreakWord = TemplateWithContainer.bind({});
WrapBreakWord.storyName = "Wrap: BreakWord (default)";
WrapBreakWord.args = {
  children: (
    <>
      Normal text wrap style. The wrap prop can be{" "}
      <strong>incomprehensibile</strong> if viewed in the wrong context
    </>
  ),
  wrap: "breakWord",
};

export const WrapAnywhere = TemplateWithContainer.bind({});
WrapAnywhere.storyName = "Wrap: Anywhere";
WrapAnywhere.args = {
  children: (
    <>
      Normal text wrap style. The wrap prop can be{" "}
      <strong>incomprehensibile</strong> if viewed in the wrong context
    </>
  ),
  wrap: "anywhere",
};

// Line Height
export const LineHeightNormal = TemplateWithContainer.bind({});
LineHeightNormal.storyName = "Line height: Normal (default)";
LineHeightNormal.args = {
  children: "Normal text LineHeight style",
  lineHeight: "normal",
};

export const LineHeightTitle = TemplateWithContainer.bind({});
LineHeightTitle.storyName = "Line height: Title";
LineHeightTitle.args = {
  children: "Title text LineHeight style",
  lineHeight: "title",
};

export const LineHeightFont = TemplateWithContainer.bind({});
LineHeightFont.storyName = "Line height: Font (1)";
LineHeightFont.args = {
  children: "Font text LineHeight style",
  lineHeight: "font",
};
