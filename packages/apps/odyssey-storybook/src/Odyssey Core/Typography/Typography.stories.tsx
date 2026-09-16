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
  createOdysseyStyledComponent,
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
  typographyOverflowWrapValues,
  TypographyProps,
  typographyVariantMapping,
  TypographyVariantValue,
} from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react-vite";
import { createElement } from "react";

import {
  staticBoardParameters,
  StoryCell,
  StoryRow,
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

const StyledOverflowContainer = createOdysseyStyledComponent({
  tag: "div",
  shouldForwardProp: (prop) => prop !== "isFlexContainer",
})<{ isFlexContainer?: boolean }>(
  ({ isFlexContainer, odysseyDesignTokens }) => ({
    borderColor: odysseyDesignTokens.BorderColorDisplay,
    borderRadius: odysseyDesignTokens.BorderRadiusTight,
    borderStyle: odysseyDesignTokens.BorderStyleMain,
    borderWidth: odysseyDesignTokens.BorderWidthMain,
    display: isFlexContainer ? "flex" : "block",
    overflow: "hidden",
    padding: odysseyDesignTokens.Spacing3,
    width: "200px",
  }),
);

const StyledOverflowBoard = createOdysseyStyledComponent({ tag: "div" })(
  ({ odysseyDesignTokens }) => ({
    display: "flex",
    flexDirection: "column",
    gap: odysseyDesignTokens.Spacing6,
  }),
);

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
    overflowWrap: {
      options: typographyOverflowWrapValues,
      control: { type: "select" },
      description:
        "Controls where the text may break to avoid overflowing its container",
      table: {
        category: "Visual",
        defaultValue: {
          summary: "normal",
        },
        type: {
          summary: typographyOverflowWrapValues.join(" | "),
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

export const AllOverflowBehaviors: StoryObj<typeof Typography> = {
  name: "All overflow behaviors",
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StyledOverflowBoard>
        {[
          {
            isFlexContainer: false,
            sample: "0oa4b8c2d6e0f5g9h3i7j1k5l9m2n6o0p4q8r2s6t0u4v8w1x5y9z3",
            title:
              "One long identifier, with no spaces. Normal keeps it on one line. The box cuts the end.",
          },
          {
            isFlexContainer: false,
            sample:
              "The agent could not be reached, so its last known state is shown below for agent 0oa4b8c2d6e0f5g9h3i7j1k5l9m2n6o0p4q8r2s6t0u4v8w1x5y9z3.",
            title:
              "A sentence that ends with a long identifier. Normal breaks the sentence at the spaces. The identifier is still too wide, so the box cuts the end.",
          },
          {
            isFlexContainer: false,
            sample:
              "Every word in this sentence is short enough to wrap on its own.",
            title:
              "A sentence with only short words. The three values give the same result.",
          },
          {
            isFlexContainer: true,
            sample: "0oa4b8c2d6e0f5g9h3i7j1k5l9m2n6o0p4q8r2s6t0u4v8w1x5y9z3",
            title:
              "The same identifier inside a flex box. A flex item stays as wide as its longest unbroken word. Anywhere adds a break point at each character, so the item can be narrow. Break-word does not add one, so the box cuts the end, the same as normal.",
          },
        ].map(({ isFlexContainer, sample, title }) => (
          <StorySection key={title} title={title}>
            <StoryRow>
              {typographyOverflowWrapValues.map((overflowWrap) => (
                <StoryCell key={overflowWrap} label={overflowWrap}>
                  <StyledOverflowContainer isFlexContainer={isFlexContainer}>
                    <Paragraph overflowWrap={overflowWrap}>{sample}</Paragraph>
                  </StyledOverflowContainer>
                </StoryCell>
              ))}
            </StoryRow>
          </StorySection>
        ))}
      </StyledOverflowBoard>
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
