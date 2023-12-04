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

import { Radio, RadioProps } from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { fieldComponentPropsMetaData } from "../../../fieldComponentPropsMetaData";
import { axeRun } from "../../../axe-util";

const storybookMeta: Meta<RadioProps> = {
  title: "MUI Components/Forms/Radio",
  component: Radio,
  argTypes: {
    isChecked: {
      control: "boolean",
      description: "If `true`, the radio button is checked",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    isDisabled: fieldComponentPropsMetaData.isDisabled,
    isInvalid: {
      control: "boolean",
      description: "If `true`, the radio button has an invalid value",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    label: {
      control: "text",
      description: "The label text for the radio button",
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
      description: "Callback fired when the the radio button value changes",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    onBlur: {
      control: null,
      description: "Callback fired when the blur event happens",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    name: fieldComponentPropsMetaData.name,
    value: {
      control: "text",
      description: "The value attribute of the radio button",
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
    label: "Label",
    value: "Value",
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

export const Default: StoryObj<typeof Radio> = {
  play: async ({ canvasElement, step }) => {
    await step("select the radio button", async ({ args }) => {
      const canvas = within(canvasElement);
      const radio = canvas.getByRole("radio") as HTMLInputElement;
      if (radio) {
        userEvent.click(radio);
      }
      expect(radio).toBeChecked();
      userEvent.click(canvasElement);
      expect(args.onBlur).toHaveBeenCalled();
      axeRun("Radio Default");
    });
  },
};
