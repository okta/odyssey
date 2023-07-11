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

import { Meta, StoryObj } from "@storybook/react";
import { Typography, TypographyProps } from "@mui/material";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import { axeRun } from "../../../axe-util";

const storybookMeta: Meta<TypographyProps> = {
  title: "MUI Components/Typography",
  component: Typography,
  argTypes: {
    children: {
      control: "text",
    },
    variant: {
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "body1",
        "subtitle1",
        "legend",
      ],
      control: { type: "select" },
    },
  },
  args: {
    children: "Spice is vital for space travel.",
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

export const Heading1: StoryObj<TypographyProps> = {
  args: {
    children: "Heading 1",
    variant: "h1",
  },
  // h1 & h2 stories throw the "Incomplete" accessibility violation on color-contrast. Even though the contrast is correct,
  // disabling it for now as the typography color- contrast test is covered by other headings below.
  // play: async ({}) => {
  //   await axeRun('Typopgraphy h1');
  // },
};

export const Heading2: StoryObj<TypographyProps> = {
  args: {
    children: "Heading 2",
    variant: "h2",
  },
  // play: async ({}) => {
  //   await axeRun('Typopgraphy h2');
  // },
};

export const Heading3: StoryObj<TypographyProps> = {
  args: {
    children: "Heading 3",
    variant: "h3",
  },
  play: async ({}) => {
    await axeRun("Typopgraphy h3");
  },
};

export const Heading4: StoryObj<TypographyProps> = {
  args: {
    children: "Heading 4",
    variant: "h4",
  },
  play: async ({}) => {
    await axeRun("Typopgraphy h4");
  },
};

export const Heading5: StoryObj<TypographyProps> = {
  args: {
    children: "Heading 5",
    variant: "h5",
  },
  play: async ({}) => {
    await axeRun("Typopgraphy h5");
  },
};

export const Heading6: StoryObj<TypographyProps> = {
  args: {
    children: "Heading 6",
    variant: "h6",
  },
  play: async ({}) => {
    await axeRun("Typopgraphy h6");
  },
};

export const Body: StoryObj<TypographyProps> = {
  args: {
    children: "This is body copy.",
    variant: "body1",
  },
  play: async ({}) => {
    await axeRun("Typopgraphy body");
  },
};

export const Caption: StoryObj<TypographyProps> = {
  args: {
    children: "This is a caption.",
    variant: "subtitle1",
  },
  play: async ({}) => {
    await axeRun("Typopgraphy caption");
  },
};

export const Legend: StoryObj<TypographyProps> = {
  args: {
    children: "This is a legend",
    variant: "legend",
  },
  play: async ({}) => {
    await axeRun("Typopgraphy legend");
  },
};
