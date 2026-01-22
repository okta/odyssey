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

import { deepmerge, Link, Switch, SwitchProps } from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react-vite";
import { useCallback } from "storybook/preview-api";
import { fn } from "storybook/test";

import { OdysseyStorybookThemeDecorator } from "../../../tools/OdysseyStorybookThemeDecorator.js";
import { useStoryArgOrLocalState } from "../../../tools/useStoryArgOrLocalState.js";
import { fieldComponentPropsMetaData } from "../fieldComponentPropsMetaData.js";

const meta = {
  component: Switch,
  decorators: [OdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  argTypes: {
    isChecked: {
      control: "boolean",
      description: "If `true`, the Switch button is checked",
      table: {
        category: "Visual",
        type: {
          summary: "boolean",
        },
      },
    },
    isDefaultChecked: {
      control: "boolean",
      description: "If `true`, the Switch button is checked by default",
      table: {
        category: "Functional",
        type: {
          summary: "boolean",
        },
      },
    },
    hint: fieldComponentPropsMetaData.hint,
    HintLinkComponent: fieldComponentPropsMetaData.HintLinkComponent,
    id: fieldComponentPropsMetaData.id,
    isDisabled: fieldComponentPropsMetaData.isDisabled,
    isFullWidth: fieldComponentPropsMetaData.isFullWidth,
    isReadOnly: {
      control: "boolean",
      description: "If `true`, the Switch renders as read-only",
      table: {
        category: "Visual",
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
      },
    },
    label: {
      control: "text",
      description: "The label text for the Switch button",
      table: {
        category: "Visual",
        type: {
          summary: "string",
        },
      },
      type: {
        required: true,
        name: "string",
      },
    },
    name: fieldComponentPropsMetaData.name,
    onChange: {
      description: "Callback fired when the user toggles the Switch",
      table: {
        category: "Functional",
        type: {
          summary: "({ checked, value }: OnChangeCallbackArguments) => void",
        },
      },
    },
    testId: {
      control: "text",
      description:
        "Adds a `data-se` attribute so automated tests can target the Switch.",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
    },
    value: {
      control: "text",
      description: "The value attribute of the Switch button",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
      type: {
        required: true,
        name: "string",
      },
    },
  },
  args: {
    isChecked: false,
    label: "label",
    onChange: fn(),
    value: "value",
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

const SwitchTemplate: Story = {
  args: {
    isChecked: false,
  },
  argTypes: {
    isDefaultChecked: { control: false },
  },
  render: function Render(args, context) {
    const { value: checked, setValue } = useStoryArgOrLocalState<
      SwitchProps,
      "isChecked"
    >({
      args,
      context,
      argKey: "isChecked",
      defaultValue: args.isChecked ?? false,
    });

    const handleChange = useCallback(
      (changeEvent: { checked: boolean; value: string }) => {
        setValue(changeEvent.checked);
      },
      [setValue],
    );

    return (
      <Switch
        {...args}
        isChecked={checked}
        isDefaultChecked={undefined}
        onChange={handleChange}
      />
    );
  },
};

export const Default: Story = {
  ...deepmerge(SwitchTemplate, {
    tags: ["!autodocs"],
  }),
};

export const Checked: Story = {
  ...deepmerge(SwitchTemplate, {
    args: {
      isChecked: true,
    },
  }),
};

export const Hint: Story = {
  ...deepmerge(SwitchTemplate, {
    args: {
      hint: "Hint text",
    },
  }),
};

export const HintLink: Story = {
  ...deepmerge(SwitchTemplate, {
    args: {
      hint: "Hint text",
      HintLinkComponent: <Link href="#link">Link</Link>,
    },
  }),
};

export const Disabled: Story = {
  ...deepmerge(SwitchTemplate, {
    args: {
      isDisabled: true,
    },
  }),
};

export const CheckedDisabled: Story = {
  ...deepmerge(SwitchTemplate, {
    args: {
      isDisabled: true,
      isChecked: true,
    },
  }),
};

export const CheckedReadOnly: Story = {
  ...deepmerge(SwitchTemplate, {
    args: {
      isReadOnly: true,
      isChecked: true,
    },
  }),
};

export const Uncontrolled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When `isChecked` is omitted the Switch manages its own state via `isDefaultChecked`",
      },
    },
  },
  args: {
    isDefaultChecked: false,
    isChecked: undefined,
  },
  argTypes: {
    isChecked: { control: false },
  },
  render: (props) => <Switch {...props} />,
};
