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
  MenuButton,
  MenuItem,
} from "@okta/odyssey-contributions-iga-components";
import { Meta, StoryObj } from "@storybook/react-vite";

import type { A11yParameters } from "../../../.storybook/a11yTypes.js";

import {
  staticBoardParameters,
  StoryCell,
  StoryGrid,
  StorySection,
} from "../../tools/boardStoryHelpers.js";
import { IgaComponentsOdysseyStorybookThemeDecorator } from "../../tools/IgaComponentsOdysseyStorybookThemeDecorator.js";

const meta: Meta<typeof MenuButton> = {
  component: MenuButton,
  decorators: [IgaComponentsOdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  argTypes: {
    ariaDisabled: {
      control: "boolean",
      description:
        "If `true`, the menu button appears disabled but remains focusable and can show tooltips. Use this instead of `isDisabled` when you need to display a tooltip on a disabled menu button.",
      table: { category: "Visual", type: { summary: "boolean" } },
    },
    buttonLabel: {
      control: "text",
      description: "The label text for the menu button.",
      table: { category: "Visual", type: { summary: "string" } },
    },
    buttonVariant: {
      options: ["primary", "secondary", "floating"],
      control: { type: "radio" },
      description: "The variant of the menu button.",
      table: {
        category: "Visual",
        type: { summary: '"primary" | "secondary" | "floating"' },
        defaultValue: { summary: "secondary" },
      },
    },
    children: {
      control: false,
      description: "The menu items to display when the menu is open.",
      table: { category: "Visual", type: { summary: "ReactNode" } },
    },
    isDisabled: {
      control: "boolean",
      description: "If `true`, the menu button will be disabled.",
      table: { category: "Visual", type: { summary: "boolean" } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof MenuButton>;

export const Playground: Story = {
  args: {
    buttonLabel: "Actions",
  },
  render: function C({ ariaDisabled, buttonLabel, buttonVariant, isDisabled }) {
    return (
      <MenuButton
        ariaDisabled={ariaDisabled}
        buttonLabel={buttonLabel ?? "Actions"}
        buttonVariant={buttonVariant}
        isDisabled={isDisabled}
      >
        <MenuItem>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
      </MenuButton>
    );
  },
};

export const AllDisabledVariants: Story = {
  name: "All disabled variants",
  parameters: {
    ...staticBoardParameters,
    docs: {
      description: {
        story:
          "Menu buttons can display tooltips when disabled by using `ariaDisabled` instead of `isDisabled`.",
      },
    },
    // Disable color-contrast check because we intentionally match Odyssey's
    // native disabled button styling, which uses low-contrast colors that are
    // exempt from WCAG requirements for disabled UI components
    a11y: {
      config: {
        rules: [{ id: "color-contrast", enabled: false }],
      },
    } satisfies A11yParameters,
  },
  render: function C() {
    const buttonVariants = ["primary", "secondary", "floating"] as const;

    return (
      <StorySection title="Every button variant with `ariaDisabled` and a tooltip.">
        <StoryGrid columns={3}>
          {buttonVariants.map((buttonVariant) => (
            <StoryCell key={buttonVariant} label={buttonVariant}>
              <MenuButton
                ariaDisabled
                buttonLabel={buttonVariant}
                buttonVariant={buttonVariant}
                tooltipText="You do not have permission to perform actions."
              >
                <MenuItem>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
              </MenuButton>
            </StoryCell>
          ))}
        </StoryGrid>
      </StorySection>
    );
  },
};
