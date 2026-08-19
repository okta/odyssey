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

import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Button,
  type ButtonProps,
  buttonSizeValues,
  buttonTypeValues,
  buttonVariantValues,
} from "@okta/odyssey-react-mui";
import { AddIcon } from "@okta/odyssey-react-mui/icons";
import { action } from "storybook/actions";

import {
  staticBoardParameters,
  StoryCell,
  StoryGrid,
  StoryRow,
  StorySection,
} from "../../tools/boardStoryHelpers.js";
import icons from "../../tools/iconUtils.js";
import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";

const meta = {
  component: Button,
  decorators: [OdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  argTypes: {
    endIcon: {
      control: { type: "select" },
      options: Object.keys(icons),
      mapping: icons,
      description: "An optional icon to display at the end of the button",
      table: { category: "Visual", type: { summary: "<Icon />" } },
    },
    href: {
      control: "text",
      description: "Optional href to render the button as a link",
      table: { category: "Functional", type: { summary: "string" } },
    },
    id: {
      control: "text",
      description: "An optional ID for the button",
      table: { category: "Functional", type: { summary: "string" } },
    },
    isDisabled: {
      control: "boolean",
      description: "If `true`, the button is disabled",
      table: { category: "Visual", type: { summary: "boolean" } },
    },
    isFullWidth: {
      control: "boolean",
      description:
        "If `true`, the button will take up the full width available",
      table: { category: "Visual", type: { summary: "boolean" } },
    },
    label: {
      control: "text",
      description:
        "The button text. If blank, the button must include an icon.",
      table: { category: "Visual", type: { summary: "string" } },
    },
    onClick: {
      action: true,
      description: "Callback fired when the button is clicked",
      table: { category: "Functional", type: { summary: "(() => void)" } },
    },
    size: {
      options: buttonSizeValues,
      control: { type: "radio" },
      description: "The size of the button",
      table: {
        category: "Visual",
        type: { summary: buttonSizeValues.join(" | ") },
        defaultValue: { summary: "medium" },
      },
    },
    startIcon: {
      control: { type: "select" },
      options: Object.keys(icons),
      mapping: icons,
      description: "An optional icon to display at the start of the button",
      table: { category: "Visual", type: { summary: "<Icon />" } },
    },
    tooltipText: {
      control: "text",
      description:
        "If defined, the button will include a tooltip that contains the string.",
      table: { category: "Visual", type: { summary: "string" } },
    },
    type: {
      options: buttonTypeValues,
      control: { type: "radio" },
      description: "The type of the HTML button element.",
      table: {
        category: "Functional",
        type: { summary: buttonTypeValues.join(" | ") },
        defaultValue: { summary: "button" },
      },
    },
    variant: {
      options: buttonVariantValues,
      control: { type: "radio" },
      description: "The color and style of the button",
      table: {
        category: "Visual",
        type: { summary: buttonVariantValues.join(" | ") },
        defaultValue: { summary: "secondary" },
      },
      type: {
        required: true,
        name: "other",
        value: "radio",
      },
    },
  },
  args: {
    label: "Button label",
    onClick: action("onClick"),
    variant: "primary",
  },
} satisfies Meta<ButtonProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllVariants: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every button variant, enabled and disabled.">
        <StoryGrid columns={3}>
          {buttonVariantValues.map((variant) => (
            <StoryCell key={variant} label={variant}>
              <Button
                label={variant}
                onClick={action("onClick")}
                variant={variant}
              />

              <Button
                isDisabled
                label={`${variant} disabled`}
                variant={variant}
              />
            </StoryCell>
          ))}
        </StoryGrid>
      </StorySection>
    );
  },
};

export const AllSizes: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every button size.">
        <StoryRow>
          {buttonSizeValues.map((size) => (
            <Button
              key={size}
              label={size}
              onClick={action("onClick")}
              size={size}
              variant="primary"
            />
          ))}
        </StoryRow>
      </StorySection>
    );
  },
};

export const AllStates: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Icon, icon-only, link, and full-width states.">
        <StoryRow>
          <StoryCell label="with icon">
            <Button
              label="Button label"
              startIcon={<AddIcon />}
              variant="primary"
            />
          </StoryCell>

          <StoryCell label="icon-only (needs tooltip)">
            <Button
              ariaLabel="Add"
              startIcon={<AddIcon />}
              tooltipText="Add"
              variant="primary"
            />
          </StoryCell>

          <StoryCell label="as link">
            <Button
              href="https://okta.com"
              label="Visit okta.com"
              variant="secondary"
            />
          </StoryCell>
        </StoryRow>

        <StoryCell label="full-width">
          <Button
            isFullWidth
            label="Button label"
            onClick={action("onClick")}
            variant="primary"
          />
        </StoryCell>
      </StorySection>
    );
  },
};
