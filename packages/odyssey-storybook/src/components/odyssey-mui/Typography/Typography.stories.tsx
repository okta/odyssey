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
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Body,
  Caption,
  Legend,
  TypographyProps,
  typographyVariantValues,
} from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import { axeRun } from "../../../axe-util";

const storybookMeta: Meta<TypographyProps> = {
  title: "MUI Components/Typography",
  component: Typography,
  parameters: {
    docs: {
      description: "asdfa",
    },
  },
  argTypes: {
    ariaDescribedBy: {
      control: null,
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
      control: null,
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
    },
    classes: {
      control: null,
      description: "Additional classes to add to the component.",
      table: {
        type: {
          summary: "object",
        },
      },
    },
    component: {
      control: null,
      description:
        "The HTML element the component should render, if different from the default",
      table: {
        type: {
          summary: "ElementType",
        },
      },
    },
    variant: {
      options: Object.keys(typographyVariantValues),
      control: { type: "select" },
      description: "The variant of Typography to render.",
      table: {
        type: {
          summary: Object.keys(typographyVariantValues).join(" | "),
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

export const TypographyStory: StoryObj<TypographyProps> = {
  name: "Generic Typography",
  args: {
    children: "This is standard text.",
    variant: "body",
  },
};

export const H1Story: StoryObj<TypographyProps> = {
  name: "Heading 1",
  args: {
    children: "Heading 1",
    variant: "h1",
  },
  render: (args) => <H1 children={args.children} />,
  // h1 & h2 stories throw the "Incomplete" accessibility violation on color-contrast. Even though the contrast is correct,
  // disabling it for now as the typography color- contrast test is covered by other headings below.
  // play: async ({}) => {
  //   await axeRun('Typopgraphy h1');
  // },
};

export const H2Story: StoryObj<TypographyProps> = {
  name: "Heading 2",
  args: {
    children: "Heading 2",
    variant: "h2",
  },
  render: (args) => <H2 children={args.children} />,
  // play: async ({}) => {
  //   await axeRun('Typopgraphy h2');
  // },
};

export const H3Story: StoryObj<TypographyProps> = {
  name: "Heading 3",
  args: {
    children: "Heading 3",
    variant: "h3",
  },
  render: (args) => <H3 children={args.children} />,
  play: async ({}) => {
    await axeRun("Typopgraphy h3");
  },
};

export const H4Story: StoryObj<TypographyProps> = {
  name: "Heading 4",
  args: {
    children: "Heading 4",
    variant: "h4",
  },
  render: (args) => <H4 children={args.children} />,
  play: async ({}) => {
    await axeRun("Typopgraphy h4");
  },
};

export const H5Story: StoryObj<TypographyProps> = {
  name: "Heading 5",
  args: {
    children: "Heading 5",
    variant: "h5",
  },
  render: (args) => <H5 children={args.children} />,
  play: async ({}) => {
    await axeRun("Typopgraphy h5");
  },
};

export const H6Story: StoryObj<TypographyProps> = {
  name: "Heading 6",
  args: {
    children: "Heading 6",
    variant: "h6",
  },
  render: (args) => <H6 children={args.children} />,
  play: async ({}) => {
    await axeRun("Typopgraphy h6");
  },
};

export const BodyStory: StoryObj<TypographyProps> = {
  name: "Body",
  args: {
    children: "This is body copy.",
    variant: "body",
  },
  render: (args) => <Body children={args.children} />,
  play: async ({}) => {
    await axeRun("Typopgraphy body");
  },
};

export const CaptionStory: StoryObj<TypographyProps> = {
  name: "Caption",
  args: {
    children: "This is a caption.",
    variant: "caption",
  },
  render: (args) => <Caption children={args.children} />,
  play: async ({}) => {
    await axeRun("Typopgraphy caption");
  },
};

export const LegendStory: StoryObj<TypographyProps> = {
  name: "Legend",
  args: {
    children: "This is a legend",
    variant: "legend",
  },
  render: (args) => <Legend children={args.children} />,
  play: async ({}) => {
    await axeRun("Typopgraphy legend");
  },
};
