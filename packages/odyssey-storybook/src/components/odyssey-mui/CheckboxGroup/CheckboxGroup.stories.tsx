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
  Checkbox,
  CheckboxGroup,
  CheckboxGroupProps,
} from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react";

import { MuiThemeDecorator } from "../../../../.storybook/components";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

type CheckboxGroupStoryProps = CheckboxGroupProps & {
  isDefaultChecked: Parameters<typeof Checkbox>[0]["isDefaultChecked"];
  isIndeterminate: Parameters<typeof Checkbox>[0]["isIndeterminate"];
};

const storybookMeta: Meta<CheckboxGroupStoryProps> = {
  title: "MUI Components/Forms/CheckboxGroup",
  component: CheckboxGroup,
  argTypes: {
    isDefaultChecked: {
      control: "boolean",
      defaultValue: false,
    },
    isDisabled: {
      control: "boolean",
      defaultValue: false,
    },
    errorMessage: {
      control: "text",
      defaultValue: null,
    },
    hint: {
      control: "text",
      defaultValue:
        "Ensure these systems are operating before initiating warp.",
    },
    isIndeterminate: {
      control: "boolean",
      defaultValue: false,
    },
    label: {
      control: "text",
      defaultValue: "Systems check",
    },
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

const SingleTemplate: StoryObj<CheckboxGroupStoryProps> = {
  render: (args) => (
    <CheckboxGroup
      errorMessage={args.errorMessage}
      hint={args.hint}
      isDisabled={args.isDisabled}
      label={args.label}
    >
      <Checkbox
        isDefaultChecked={args.isDefaultChecked}
        isIndeterminate={args.isIndeterminate}
        label="Pre-flight systems check complete"
        name="life-support"
        value="life-support"
      />
    </CheckboxGroup>
  ),
};

export const Single: StoryObj<CheckboxGroupStoryProps> = {
  ...SingleTemplate,
  parameters: {
    controls: {
      exclude: ["hint", "label"],
    },
  },
  args: {},
};

export const Checked: StoryObj<CheckboxGroupStoryProps> = {
  ...Single,
  parameters: {
    controls: {
      exclude: ["hint", "label"],
    },
  },
  args: {
    isDefaultChecked: true,
  },
};
export const Indeterminate: StoryObj<CheckboxGroupStoryProps> = {
  ...Single,
  parameters: { controls: { exclude: ["hint", "label"] } },
  args: {
    isIndeterminate: true,
  },
};

const GroupTemplate: StoryObj<CheckboxGroupProps> = {
  render: (args) => (
    <CheckboxGroup
      errorMessage={args.errorMessage}
      hint={args.hint}
      isDisabled={args.isDisabled}
      label="Systems check"
    >
      <Checkbox label="Life support" name="life-support" value="life-support" />
      <Checkbox
        label="Warp core containment"
        name="warp-core"
        value="warp-core"
      />
      <Checkbox label="Cetacean ops" name="cetacean-ops" value="cetacean-ops" />
    </CheckboxGroup>
  ),
  parameters: {
    controls: {
      exclude: ["defaultChecked", "isIndeterminate"],
    },
  },
};

export const Group: StoryObj<CheckboxGroupStoryProps> = {
  ...GroupTemplate,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const options = await canvas.findAllByRole("checkbox");
    await expect(options).toHaveLength(3);
  },
};

export const Disabled: StoryObj<CheckboxGroupStoryProps> = {
  ...GroupTemplate,
  parameters: {
    controls: {
      exclude: ["defaultChecked", "isIndeterminate"],
    },
  },
  args: {
    isDisabled: true,
  },
};

export const Error: StoryObj<CheckboxGroupStoryProps> = {
  ...GroupTemplate,
  parameters: {
    controls: {
      exclude: ["defaultChecked", "isIndeterminate"],
    },
  },
  args: {
    errorMessage: "Select 1 or more systems to check before initiating warp.",
  },
};

export const MixedError: StoryObj<CheckboxGroupStoryProps> = {
  render: (args) => (
    <CheckboxGroup
      isDisabled={args.isDisabled}
      errorMessage={args.errorMessage}
      hint={args.hint}
      label="Who will you invite to your birthday?"
    >
      <Checkbox label="Alfred" name="alfred" value="alfred" />
      <Checkbox
        isDefaultChecked
        label="Barbara Gordon"
        name="barbara-gordon"
        value="barbara-gordon"
      />
      <Checkbox label="Hal Jordan" name="hal-jordan" value="hal-jordan" />
      <Checkbox
        isDefaultChecked
        label="The Joker"
        name="the-joker"
        value="the-joker"
      />
    </CheckboxGroup>
  ),
  parameters: {
    controls: {
      exclude: ["defaultChecked", "isIndeterminate"],
    },
  },
  args: {
    errorMessage: "These choices are incompatible.",
  },
};
