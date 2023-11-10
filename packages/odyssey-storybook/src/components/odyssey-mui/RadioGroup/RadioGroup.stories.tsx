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

import { Radio, RadioGroup, RadioGroupProps } from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";

import { fieldComponentPropsMetaData } from "../../../fieldComponentPropsMetaData";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import { userEvent, within } from "@storybook/testing-library";
import { axeRun } from "../../../axe-util";
import { useCallback, useState } from "react";

const storybookMeta: Meta<typeof RadioGroup> = {
  title: "MUI Components/Forms/RadioGroup",
  component: RadioGroup,
  argTypes: {
    children: {
      control: null,
      description: "An array of Radio components within the group",
      table: {
        type: {
          summary: "Array<ReactElement<typeof Radio>>",
        },
      },
      type: {
        required: true,
        name: "other",
        value: "Array<ReactElement<typeof Radio>>",
      },
    },
    defaultValue: {
      control: "text",
      description:
        "The text value of the radio that should be selected by default",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    errorMessage: fieldComponentPropsMetaData.errorMessage,
    hint: fieldComponentPropsMetaData.hint,
    id: fieldComponentPropsMetaData.id,
    isDisabled: fieldComponentPropsMetaData.isDisabled,
    label: {
      control: "text",
      description: "The text label for the radio group",
      table: {
        type: {
          summary: "string",
        },
      },
      type: {
        required: true,
        name: "string",
      },
    },
    onChange: {
      control: null,
      description: "Callback fired when the value of the radio group changes",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    value: {
      control: "text",
      description: "The `value` on the selected radio button",
      table: {
        type: {
          summary: "string",
        },
      },
    },
  },
  args: {
    id: "storybook-radio",
    label: "Speed",
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

const Template: StoryObj<RadioGroupProps> = {
  render: function C(props) {
    return (
      <RadioGroup {...props}>
        <Radio label="Light Speed" value="Light Speed" />
        <Radio label="Warp Speed" value="Warp Speed" />
        <Radio label="Ludicrous Speed" value="Ludicrous Speed" />
      </RadioGroup>
    );
  },
};

export const Default: StoryObj<RadioGroupProps> = {
  ...Template,
};

export const Hint: StoryObj<RadioGroupProps> = {
  ...Template,
  args: {
    hint: "Select the speed at which you wish to travel.",
  },
};

export const Disabled: StoryObj<RadioGroupProps> = {
  ...Template,
  args: {
    isDisabled: true,
  },
};

export const Error: StoryObj<RadioGroupProps> = {
  ...Template,
  parameters: {
    docs: {
      description: {
        story:
          "Validation should happen on the group and not individually on each item.",
      },
    },
  },
  args: {
    errorMessage: "This field is required.",
  },
};

export const UncontrolledRadioGroup: StoryObj<RadioGroupProps> = {
  ...Template,
  args: {
    defaultValue: "Warp Speed",
  },
  play: async ({ canvasElement, step }) => {
    await step("select controlled radio button", async () => {
      const canvas = within(canvasElement);
      const radiogroup = canvas.getByRole("radiogroup") as HTMLInputElement;
      const radio = canvas.getByLabelText(
        "Ludicrous Speed"
      ) as HTMLInputElement;
      if (radiogroup && radio) {
        userEvent.click(radio);
      }
      expect(radio).toBeChecked();
      axeRun("select controlled radio button");
    });
  },
};

export const ControlledRadioGroup: StoryObj<RadioGroupProps> = {
  ...Template,
  args: {
    value: "Ludicrous Speed",
  },
  render: function C(props) {
    const [value, setValue] = useState("Ludicrous Speed");
    const onChange = useCallback((_, value) => setValue(value), []);
    return (
      <RadioGroup {...{ ...props, value, onChange }}>
        <Radio label="Light Speed" value="Light Speed" />
        <Radio label="Warp Speed" value="Warp Speed" />
        <Radio label="Ludicrous Speed" value="Ludicrous Speed" />
      </RadioGroup>
    );
  },
  play: async ({ canvasElement, step }) => {
    await step("select uncontrolled radio button", async () => {
      const canvas = within(canvasElement);
      const radiogroup = canvas.getByRole("radiogroup") as HTMLInputElement;
      const radio = canvas.getByLabelText("Warp Speed") as HTMLInputElement;
      if (radiogroup && radio) {
        userEvent.click(radio);
      }
      expect(radio).toBeChecked();
      axeRun("select uncontrolled radio button");
    });
  },
};
