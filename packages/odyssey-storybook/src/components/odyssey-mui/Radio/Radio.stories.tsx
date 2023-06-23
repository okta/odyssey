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
import { Meta, ReactRenderer, StoryObj } from "@storybook/react";

import { MuiThemeDecorator } from "../../../../.storybook/components";

import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { axeRun } from "../../../axe-util";
// eslint-disable-next-line import/no-extraneous-dependencies
import { StepFunction } from "@storybook/types";

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
    isDisabled: {
      control: "boolean",
      description: "If `true`, the radio button is disabled",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
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
    },
    name: {
      control: "text",
      description: "The name attribute of the radio button",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    value: {
      control: "text",
      description: "The value attribute of the radio button",
      table: {
        type: {
          summary: "string",
        },
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

const selectRadio = async (
  canvasElement: HTMLElement,
  step: StepFunction<ReactRenderer, RadioProps>,
  action: string
) => {
  await step("select the radio button", async () => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole("radio") as HTMLInputElement;
    radio && (await userEvent.click(radio));
    expect(radio.checked).toBe(true);
    await axeRun(action);
  });
};

export const Default: StoryObj<RadioProps> = {
  play: async ({ canvasElement, step }) => {
    selectRadio(canvasElement, step, "Radio Default");
  },
};
