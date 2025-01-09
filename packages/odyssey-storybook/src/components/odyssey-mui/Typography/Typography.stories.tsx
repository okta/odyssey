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
import {
  Typography,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Legend,
  Overline,
  Paragraph,
  Subordinate,
  Support,
  TypographyProps,
  typographyColorValues,
  typographyVariantMapping,
  TypographyVariantValue,
} from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import { axeRun } from "../../../axe-util";
import { createElement } from "react";

const variantMapping = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  h5: Heading5,
  h6: Heading6,
  body: Paragraph,
  legend: Legend,
  overline: Overline,
  subordinate: Subordinate,
  support: Support,
};

const storybookMeta: Meta<TypographyProps> = {
  title: "MUI Components/Typography",
  component: Typography,
  parameters: {
    docs: {
      description: "",
    },
  },
  argTypes: {
    ariaDescribedBy: {
      description: "The ID of the element that describes the component.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    ariaLabel: {
      control: "text",
      description: "The ARIA label for the component.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    ariaLabelledBy: {
      description: "The ID of the element that labels the component.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    children: {
      control: "text",
      description: "The text content of the component.",
      table: {
        type: {
          summary: "ReactNode",
        },
      },
      type: {
        required: true,
        name: "string",
      },
    },
    color: {
      options: typographyColorValues,
      control: { type: "select" },
      description: "The color of the text.",
      table: {
        type: {
          summary: typographyColorValues.join(" | "),
        },
      },
    },
    component: {
      description:
        "The HTML element the component should render, if different from the default",
      table: {
        type: {
          summary: "ElementType",
        },
      },
    },
    variant: {
      options: Object.keys(typographyVariantMapping),
      control: { type: "select" },
      description: "The variant of Typography to render.",
      table: {
        type: {
          summary: Object.keys(typographyVariantMapping).join(" | "),
        },
      },
    },
  },
  args: {
    children: "Spice is vital for space travel.",
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

export const TypographyStory: StoryObj<typeof Typography> = {
  name: "Generic Typography",
  args: {
    children: "This is standard text.",
    variant: "body",
  },
  render: (args) => {
    const { variant, ...props } = args;
    return createElement(
      variantMapping[variant as TypographyVariantValue],
      props as TypographyProps,
    );
  },
};

export const Heading1Story: StoryObj<typeof Typography> = {
  name: "Heading 1",
  args: {
    children: "Heading 1",
    variant: "h1",
  },
  render: (args) => <Heading1 {...args} />,
  // h1 & h2 stories throw the "Incomplete" accessibility violation on color-contrast. Even though the contrast is correct,
  // disabling it for now as the typography color- contrast test is covered by other headings below.
  // play: async () => {
  //   await axeRun('Typography h1');
  // },
};

export const Heading2Story: StoryObj<typeof Typography> = {
  name: "Heading 2",
  args: {
    children: "Heading 2",
    variant: "h2",
  },
  render: (args) => <Heading2 {...args} />,
  // play: async () => {
  //   await axeRun('Typography h2');
  // },
};

export const Heading3Story: StoryObj<typeof Typography> = {
  name: "Heading 3",
  args: {
    children: "Heading 3",
    variant: "h3",
  },
  render: (args) => <Heading3 {...args} />,
  play: async () => {
    await axeRun("Typography h3");
  },
};

export const Heading4Story: StoryObj<typeof Typography> = {
  name: "Heading 4",
  args: {
    children: "Heading 4",
    variant: "h4",
  },
  render: (args) => <Heading4 {...args} />,
  play: async () => {
    await axeRun("Typography h4");
  },
};

export const Heading5Story: StoryObj<typeof Typography> = {
  name: "Heading 5",
  args: {
    children: "Heading 5",
    variant: "h5",
  },
  render: (args) => <Heading5 {...args} />,
  play: async () => {
    await axeRun("Typography h5");
  },
};

export const Heading6Story: StoryObj<typeof Typography> = {
  name: "Heading 6",
  args: {
    children: "Heading 6",
    variant: "h6",
  },
  render: (args) => <Heading6 {...args} />,
  play: async () => {
    await axeRun("Typography h6");
  },
};

export const BodyStory: StoryObj<typeof Typography> = {
  name: "Paragraph",
  args: {
    children: "This is body copy.",
    variant: "body",
  },
  render: (args) => <Paragraph {...args} />,
  play: async () => {
    await axeRun("Typography body");
  },
};

export const LegendStory: StoryObj<typeof Typography> = {
  name: "Legend",
  args: {
    children: "This is a legend",
    variant: "legend",
  },
  render: (args) => <Legend {...args} />,
  play: async () => {
    await axeRun("Typography legend");
  },
};

export const OverlineStory: StoryObj<typeof Typography> = {
  name: "Overline",
  args: {
    children: "This is an Overline",
    variant: "overline",
  },
  render: (args) => <Overline {...args} />,
  play: async () => {
    await axeRun("Typography Overline");
  },
};

export const SubordinateStory: StoryObj<typeof Typography> = {
  name: "Subordinate",
  args: {
    children: "This is subordinate text.",
    variant: "subordinate",
  },
  render: (args) => <Subordinate {...args} />,
  play: async () => {
    await axeRun("Typography subordinate");
  },
};

export const SupportStory: StoryObj<typeof Typography> = {
  name: "Support",
  args: {
    children: "This is support text.",
    variant: "support",
  },
  render: (args) => <Support {...args} />,
  play: async () => {
    await axeRun("Typography support");
  },
};

export const ColorStory: StoryObj<typeof Typography> = {
  name: "Color",
  render: () => {
    return (
      <>
        <Paragraph color="primary">This is a primary color.</Paragraph>
        <Paragraph color="textPrimary">This is a textPrimary color.</Paragraph>
        <Paragraph color="secondary">This is a secondary color.</Paragraph>
        <Paragraph color="textSecondary">
          This is a textSecondary color.
        </Paragraph>
        <Paragraph color="error">This is a error color.</Paragraph>
      </>
    );
  },
};
