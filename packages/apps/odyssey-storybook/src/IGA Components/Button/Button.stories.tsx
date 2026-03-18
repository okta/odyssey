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
  Button,
  type ButtonProps,
} from "@okta/odyssey-contributions-iga-components";
import {
  buttonSizeValues,
  buttonTypeValues,
  buttonVariantValues,
} from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import type { A11yParameters } from "../../../.storybook/a11yTypes.js";

import icons from "../../tools/iconUtils.js";
import { IgaComponentsOdysseyStorybookThemeDecorator } from "../../tools/IgaComponentsOdysseyStorybookThemeDecorator.js";

const meta = {
  component: Button,
  decorators: [IgaComponentsOdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  argTypes: {
    ariaDisabled: {
      control: "boolean",
      description:
        "If `true`, the button appears disabled but remains focusable and can show tooltips. Use this instead of `isDisabled` when you need to display a tooltip on a disabled button.",
      table: { category: "Visual", type: { summary: "boolean" } },
    },
    endIcon: {
      control: { type: "select" },
      options: Object.keys(icons),
      mapping: icons,
      description: "An optional icon to display at the end of the button",
      table: { category: "Visual", type: { summary: "<Icon />" } },
    },
    isDisabled: {
      control: "boolean",
      description: "If `true`, the button is disabled",
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
    onClick: fn(),
    variant: "primary",
  },
} satisfies Meta<ButtonProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DisabledWithTooltip: Story = {
  name: "Disabled with Tooltip",
  parameters: {
    docs: {
      description: {
        story:
          "Disabled buttons can display tooltips by using `ariaDisabled` instead of `isDisabled`. This keeps the button accessible and allows the tooltip to show on hover.",
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
  args: {
    ariaDisabled: true,
    label: "Button label",
    variant: "primary",
    tooltipText: "This action is currently unavailable",
  },
};

const ariaDisabledA11yParameters = {
  config: {
    rules: [{ id: "color-contrast", enabled: false }],
  },
} satisfies A11yParameters;

export const DisabledPrimaryWithTooltip: Story = {
  name: "Disabled Primary with Tooltip",
  parameters: {
    docs: {
      description: {
        story: "Primary button with `ariaDisabled` and tooltip.",
      },
    },
    a11y: ariaDisabledA11yParameters,
  },
  args: {
    ariaDisabled: true,
    label: "Primary",
    variant: "primary",
    tooltipText: "This action is currently unavailable",
  },
};

export const DisabledSecondaryWithTooltip: Story = {
  name: "Disabled Secondary with Tooltip",
  parameters: {
    docs: {
      description: {
        story: "Secondary button with `ariaDisabled` and tooltip.",
      },
    },
    a11y: ariaDisabledA11yParameters,
  },
  args: {
    ariaDisabled: true,
    label: "Secondary",
    variant: "secondary",
    tooltipText: "This action is currently unavailable",
  },
};

export const DisabledDangerWithTooltip: Story = {
  name: "Disabled Danger with Tooltip",
  parameters: {
    docs: {
      description: {
        story: "Danger button with `ariaDisabled` and tooltip.",
      },
    },
    a11y: ariaDisabledA11yParameters,
  },
  args: {
    ariaDisabled: true,
    label: "Danger",
    variant: "danger",
    tooltipText: "This action is currently unavailable",
  },
};

export const DisabledDangerSecondaryWithTooltip: Story = {
  name: "Disabled Danger Secondary with Tooltip",
  parameters: {
    docs: {
      description: {
        story: "Danger Secondary button with `ariaDisabled` and tooltip.",
      },
    },
    a11y: ariaDisabledA11yParameters,
  },
  args: {
    ariaDisabled: true,
    label: "Danger Secondary",
    variant: "dangerSecondary",
    tooltipText: "This action is currently unavailable",
  },
};

export const DisabledFloatingWithTooltip: Story = {
  name: "Disabled Floating with Tooltip",
  parameters: {
    docs: {
      description: {
        story: "Floating button with `ariaDisabled` and tooltip.",
      },
    },
    a11y: ariaDisabledA11yParameters,
  },
  args: {
    ariaDisabled: true,
    label: "Floating",
    variant: "floating",
    tooltipText: "This action is currently unavailable",
  },
};

export const DisabledFloatingActionWithTooltip: Story = {
  name: "Disabled Floating Action with Tooltip",
  parameters: {
    docs: {
      description: {
        story: "Floating Action button with `ariaDisabled` and tooltip.",
      },
    },
    a11y: ariaDisabledA11yParameters,
  },
  args: {
    ariaDisabled: true,
    label: "Floating Action",
    variant: "floatingAction",
    tooltipText: "This action is currently unavailable",
  },
};
