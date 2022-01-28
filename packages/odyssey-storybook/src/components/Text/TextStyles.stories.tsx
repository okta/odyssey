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

import React from "react";
import { Story } from "@storybook/react";
import { Text } from "@okta/odyssey-react";
import type { TextProps } from "@okta/odyssey-react";
import { Text as Source } from "../../../../odyssey-react/src";

export default {
  title: `Components/Text/Styles`,
  component: Source,
  argTypes: {
    children: {
      control: { type: "string" },
    },
  },
};

const Template: Story<TextProps> = (props) => <Text as="span" {...props} />;

const TemplateWithContainer: Story<TextProps> = (props) => {
  /* prettier-ignore */
  const style = {  /* stylelint-disable-line */
    background: "#faf5dc",
    width: "min-content",
    maxWidth: "8em",
    height: "200px",
    paddingBlock: "1rem",
    paddingInline: "1rem",
  };

  return (
    <div style={style}>
      <Text as="span" {...props} />
    </div>
  );
};

export const ColorBody = Template.bind({});
ColorBody.storyName = "Color: Body (default)";
ColorBody.args = {
  children: "Default body text color",
};

export const BodyInverse = Template.bind({});
BodyInverse.storyName = "Color: Body, inverse";
BodyInverse.parameters = {
  backgrounds: { default: "Page Background (dark)" },
};
BodyInverse.args = {
  children: "Body inverse",
  color: "body-inverse",
};

export const ColorDanger = Template.bind({});
ColorDanger.storyName = "Color: Danger";
ColorDanger.args = {
  children: "Danger text color",
  color: "danger",
};

export const ColorSub = Template.bind({});
ColorSub.storyName = "Color: Sub";
ColorSub.args = {
  children: "Sub text color",
  color: "sub",
};

// Weight
export const WeightNormal = Template.bind({});
WeightNormal.storyName = "Weight: Normal";
WeightNormal.args = {
  children: "Normal text weight",
  fontWeight: "normal",
};

export const WeightBold = Template.bind({});
WeightBold.storyName = "Weight: Bold";
WeightBold.args = {
  children: "Bold text weight",
  fontWeight: "bold",
};

// Style
export const StyleNormal = Template.bind({});
StyleNormal.storyName = "Font style: Normal (default)";
StyleNormal.args = {
  children: "Normal text Style",
  fontStyle: "normal",
};

export const StyleItalic = Template.bind({});
StyleItalic.storyName = "Font style: Italic";
StyleItalic.args = {
  children: "Italic text Style",
  fontStyle: "italic",
};

// Transform
export const TransformNormal = Template.bind({});
TransformNormal.storyName = "Transform: none (default)";
TransformNormal.args = {
  children: "Normal text transform style",
  textTransform: "none",
};

export const TransformCapitalize = Template.bind({});
TransformCapitalize.storyName = "Transform: Capitalize";
TransformCapitalize.args = {
  children: "Capitalize text transform style",
  textTransform: "capitalize",
};

export const TransformLowerCase = Template.bind({});
TransformLowerCase.storyName = "Transform: Lower case";
TransformLowerCase.args = {
  children: "Lower case text transform style",
  textTransform: "lowercase",
};

export const TransformUpperCase = Template.bind({});
TransformUpperCase.storyName = "Transform: Upper case";
TransformUpperCase.args = {
  children: "Uppercase text transform style",
  textTransform: "uppercase",
};

// Transform
export const SizeBase = Template.bind({});
SizeBase.storyName = "Size: Base (default)";
SizeBase.args = {
  children: "Base text size style",
  fontSize: "base",
};

export const SizeCaption = Template.bind({});
SizeCaption.storyName = "Size: Caption";
SizeCaption.args = {
  children: "Caption text size style",
  fontSize: "caption",
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
  overflowWrap: "normal",
};

export const WrapBreakWord = TemplateWithContainer.bind({});
WrapBreakWord.storyName = "Wrap: Break word (default)";
WrapBreakWord.args = {
  children: (
    <>
      Normal text wrap style. The wrap prop can be{" "}
      <strong>incomprehensibile</strong> if viewed in the wrong context
    </>
  ),
  overflowWrap: "break-word",
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
  lineHeight: "heading",
};

export const MarginPadding = Template.bind({});
MarginPadding.storyName = "Margin and Padding";
MarginPadding.args = {
  children: "Margin and padding",
  as: "div",
  margin: "m",
  padding: "m",
};
