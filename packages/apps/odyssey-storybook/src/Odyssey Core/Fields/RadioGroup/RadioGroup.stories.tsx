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

import { Link, Radio, RadioGroup } from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react-vite";
import { ChangeEvent, useCallback, useState } from "react";
import { expect, userEvent, within } from "storybook/test";

import { axeRun } from "../../../axeRun.js";
import { OdysseyStorybookThemeDecorator } from "../../../tools/OdysseyStorybookThemeDecorator.js";
import { fieldComponentPropsMetaData } from "../fieldComponentPropsMetaData.js";

const meta = {
  component: RadioGroup,
  decorators: [OdysseyStorybookThemeDecorator],
  argTypes: {
    children: {
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
    errorMessageList: fieldComponentPropsMetaData.errorMessageList,
    hint: fieldComponentPropsMetaData.hint,
    HintLinkComponent: fieldComponentPropsMetaData.HintLinkComponent,
    id: fieldComponentPropsMetaData.id,
    isDisabled: fieldComponentPropsMetaData.isDisabled,
    isReadOnly: fieldComponentPropsMetaData.isReadOnly,
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
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template: Story = {
  args: {} as Story["args"], // This is a hack.
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

export const Default: Story = {
  ...Template,
  args: {
    defaultValue: "",
  } as Story["args"], // This is a hack.,
};

export const Hint: Story = {
  ...Template,
  args: {
    hint: "Select the speed at which you wish to travel.",
    defaultValue: "",
  } as Story["args"], // This is a hack.,
};

export const HintLink: Story = {
  ...Template,
  args: {
    hint: "Select the speed at which you wish to travel.",
    HintLinkComponent: <Link href="#link">Learn more</Link>,
  } as Story["args"], // This is a hack.,
};

export const Disabled: Story = {
  ...Template,
  args: {
    isDisabled: true,
    defaultValue: "",
  } as Story["args"], // This is a hack.,
};
export const ReadOnly: Story = {
  ...Template,
  args: {
    isReadOnly: true,
    defaultValue: "Warp Speed",
  } as Story["args"], // This is a hack.,
};
export const Error: Story = {
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
    defaultValue: "",
  } as Story["args"], // This is a hack.,
};

export const ErrorsList: Story = {
  ...Template,
  args: {
    errorMessage: "This field is required.",
    errorMessageList: ["Message 1", "Message 2"],
    defaultValue: "",
  } as Story["args"], // This is a hack.,
};

export const ErrorWithIndividualHint: Story = {
  args: {
    errorMessage: "This field is required.",
  } as Story["args"],
  render: function C(props) {
    return (
      <RadioGroup {...props}>
        <Radio hint="Hint Text" label="Light Speed" value="Light Speed" />
        <Radio hint="Hint Text" label="Warp Speed" value="Warp Speed" />
        <Radio
          hint="Hint Text"
          label="Ludicrous Speed"
          value="Ludicrous Speed"
        />
      </RadioGroup>
    );
  },
};

export const IndividualStates: Story = {
  args: {
    label: "Service Tier",
  } as Story["args"],
  render: function C(props) {
    return (
      <RadioGroup {...props}>
        <Radio label="Basic" value="basic" />
        <Radio label="Standard" value="standard" />
        <Radio
          isDisabled={true}
          label="Premium (Unavailable in your region)"
          value="premium"
        />
      </RadioGroup>
    );
  },
};

export const UncontrolledRadioGroup: Story = {
  ...Template,
  args: {
    defaultValue: "Warp Speed",
  } as Story["args"], // This is a hack.,
};

export const ControlledRadioGroup: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When the component is controlled, the parent component is responsible for managing the state of `RadioGroup`. `onChange` should be used to listen for component changes and to update the values in the `value` prop.",
      },
    },
  },
  args: {
    value: "Ludicrous Speed",
  } as Story["args"], // This is a hack.,
  render: function C(props) {
    const [value, setValue] = useState("Ludicrous Speed");
    const onChange = useCallback(
      (_event: ChangeEvent<HTMLInputElement>, value: string) => setValue(value),
      [],
    );
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
      const radiogroup = canvas.getByRole("radiogroup");
      const radio = canvas.getByLabelText("Warp Speed");
      if (radiogroup && radio) {
        await userEvent.click(radio);
      }
      await expect(radio).toBeChecked();
      await axeRun("select uncontrolled radio button");
    });
  },
};

export const ControlledRadioGroupWithRadioHints: Story = {
  parameters: {
    docs: {
      description: {
        story: "A controlled Radio Group with Radio-level hints.",
      },
    },
  },
  args: {
    value: "Ludicrous Speed",
  } as Story["args"], // This is a hack.,
  render: function C(props) {
    const [value, setValue] = useState("Turtle Speed");
    const onChange = useCallback(
      (_event: ChangeEvent<HTMLInputElement>, value: string) => setValue(value),
      [],
    );
    return (
      <RadioGroup {...props} onChange={onChange} value={value}>
        <Radio hint="Hint text" label="Snail Speed" value="Snail Speed" />
        <Radio hint="Hint text" label="Turtle Speed" value="Turtle Speed" />
        <Radio hint="Hint text" label="Rabbit Speed" value="Rabbit Speed" />
      </RadioGroup>
    );
  },
};
