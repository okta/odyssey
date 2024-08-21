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

import { useCallback, useState } from "react";
import { Switch, SwitchProps, HintLink } from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { MuiThemeDecorator } from "../../../../.storybook/components";
import { fieldComponentPropsMetaData } from "../../../fieldComponentPropsMetaData";
import { axeRun } from "../../../axe-util";

const storybookMeta: Meta<SwitchProps> = {
  title: "Labs Components/Switch",
  component: Switch,
  argTypes: {
    isChecked: {
      control: "boolean",
      description: "If `true`, the Switch button is checked",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    isDefaultChecked: {
      control: "boolean",
      description: "If `true`, the Switch button is checked by default",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hint: fieldComponentPropsMetaData.hint,
    HintLinkComponent: fieldComponentPropsMetaData.HintLinkComponent,
    id: fieldComponentPropsMetaData.id,
    isDisabled: fieldComponentPropsMetaData.isDisabled,
    isReadOnly: {
      control: "boolean",
      description: "The value attribute of the Switch",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    label: {
      control: "text",
      description: "The label text for the Switch button",
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
    name: fieldComponentPropsMetaData.name,
    value: {
      control: "text",
      description: "The value attribute of the Switch button",
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
  },
  args: {
    hint: "Optional hint text",
    label: "Switch label",
    value: "Switch value",
    HintLinkComponent: <HintLink href="">Some hint link</HintLink>,
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

export const Default: StoryObj<typeof Switch> = {
  play: async ({ canvasElement, step }) => {
    await step("select the switch button", async () => {
      const canvas = within(canvasElement);
      const switchCheckbox = canvas.getByRole("checkbox") as HTMLInputElement;
      if (switchCheckbox) {
        await userEvent.click(switchCheckbox);
      }
      await expect(switchCheckbox).toBeChecked();
      await axeRun("Switch Default");
      await userEvent.tab();
    });
  },
};

export const Disabled: StoryObj<typeof Switch> = {
  args: {
    isDisabled: true,
  },
};

export const CheckedDisabled: StoryObj<typeof Switch> = {
  args: {
    isDisabled: true,
    isDefaultChecked: true,
  },
};
export const CheckedReadOnly: StoryObj<typeof Switch> = {
  args: {
    isReadOnly: true,
    isDefaultChecked: true,
  },
};
export const Controlled: StoryObj<typeof Switch> = {
  render: function C({ ...props }) {
    const [checked, setChecked] = useState(true);

    const onChange = useCallback<NonNullable<SwitchProps["onChange"]>>(
      ({ checked }) => setChecked(checked),
      [],
    );
    return <Switch {...props} isChecked={checked} onChange={onChange} />;
  },
};
