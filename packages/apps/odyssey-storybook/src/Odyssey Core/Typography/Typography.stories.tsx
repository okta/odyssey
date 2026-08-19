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

import {
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
  Typography,
  typographyColorValues,
  TypographyProps,
  typographyVariantMapping,
  TypographyVariantValue,
} from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react-vite";
import { createElement } from "react";

import {
  staticBoardParameters,
  StorySection,
} from "../../tools/boardStoryHelpers.js";
import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";

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

const ariaCurrentOptions = [
  "false",
  "page",
  "step",
  "location",
  "date",
  "time",
  "true",
] as const;

const storybookMeta: Meta<typeof Typography> = {
  component: Typography,
  decorators: [OdysseyStorybookThemeDecorator],
  argTypes: {
    ariaCurrent: {
      control: { type: "select" },
      options: ariaCurrentOptions,
      description:
        "Sets `aria-current` to indicate the active item within a related set (e.g. current step or page)",
      table: {
        category: "Functional",
        type: {
          summary: ariaCurrentOptions.join(" | "),
        },
      },
    },
    ariaDescribedBy: {
      control: "text",
      description: "The ID of the element that describes the component",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
    },
    ariaLabel: {
      control: "text",
      description: "The ARIA label for the component",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
    },
    ariaLabelledBy: {
      control: "text",
      description: "The ID of the element that labels the component",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
    },
    children: {
      control: "text",
      description: "The text content of the component",
      table: {
        category: "Visual",
        type: {
          summary: "ReactNode",
        },
      },
      type: {
        required: true,
        name: "other",
        value: "ReactNode",
      },
    },
    color: {
      options: typographyColorValues,
      control: { type: "select" },
      description: "The color of the text",
      table: {
        category: "Visual",
        type: {
          summary: typographyColorValues.join(" | "),
        },
      },
    },
    component: {
      description:
        "The HTML element the component should render, if different from the default",
      table: {
        category: "Functional",
        type: {
          summary: "ElementType",
        },
      },
    },
    id: {
      control: "text",
      description: "Sets the `id` attribute on the rendered element",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
    },
    isPresentational: {
      control: "boolean",
      description:
        'If `true`, renders with `role="presentation"` so screen readers ignore the content',
      table: {
        category: "Functional",
        type: {
          summary: "boolean",
        },
      },
    },
    testId: {
      control: "text",
      description:
        "Adds a legacy `data-se` attribute. Prefer semantic selectors in new tests",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
    },
    translate: {
      control: { type: "radio" },
      options: ["yes", "no"],
      description:
        "Sets the HTML `translate` attribute to opt the text in or out of machine translation",
      table: {
        category: "Functional",
        type: {
          summary: '"yes" | "no"',
        },
      },
    },
    variant: {
      options: Object.keys(typographyVariantMapping),
      control: { type: "select" },
      description: "The variant of Typography to render",
      table: {
        category: "Visual",
        type: {
          summary: Object.keys(typographyVariantMapping).join(" | "),
        },
      },
    },
  },
  args: {
    children: "Spice is vital for space travel.",
  },
};

export default storybookMeta;

export const Playground: StoryObj<typeof Typography> = {
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

export const AllVariants: StoryObj<typeof Typography> = {
  name: "All variants",
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every typography variant.">
        <Heading1>Heading 1</Heading1>
        <Heading2>Heading 2</Heading2>
        <Heading3>Heading 3</Heading3>
        <Heading4>Heading 4</Heading4>
        <Heading5>Heading 5</Heading5>
        <Heading6>Heading 6</Heading6>
        <Paragraph>Paragraph</Paragraph>
        <Legend>This is a legend.</Legend>
        <Overline>This is an overline.</Overline>
        <Subordinate>This is subordinate text.</Subordinate>
        <Support>This is support text.</Support>
      </StorySection>
    );
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
