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

import { Story } from "@storybook/react";
import { Radio, RadioGroup } from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import RadioGroupMdx from "./RadioGroup.mdx";

export default {
  title: `MUI Components/Forms/RadioGroup`,
  component: RadioGroup,
  parameters: {
    docs: {
      page: RadioGroupMdx,
    },
  },
  argTypes: {
    disabled: {
      control: "boolean",
      defaultValue: false,
    },
    error: {
      control: "text",
      defaultValue: null,
    },
    hint: {
      control: "text",
      defaultValue: null,
    },
    invalid: {
      control: "boolean",
      defaultValue: false,
    },
    label: {
      control: "text",
      defaultValue: "Speed",
    },
    name: {
      control: "text",
      defaultValue: "label",
    },
  },
  decorators: [MuiThemeDecorator],
};

const DefaultTemplate: Story = (args) => {
  return (
    <RadioGroup
      disabled={args.disabled}
      invalid={args.invalid}
      error={args.error}
      label={args.label}
      hint={args.hint}
      defaultValue={args.defaultValue}
    >
      <Radio value="lightspeed" label="Lightspeed" />
      <Radio value="Warp Speed" label="Warp Speed" />
      <Radio value="Ludicrous Speed" label="Ludicrous Speed" />
    </RadioGroup>
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Hint = DefaultTemplate.bind({});
Hint.args = {
  hint: "Select the speed at which you wish to travel.",
};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = {
  disabled: true,
};

export const Invalid = DefaultTemplate.bind({});
Invalid.args = {
  invalid: true,
  error: "This field is required.",
};
