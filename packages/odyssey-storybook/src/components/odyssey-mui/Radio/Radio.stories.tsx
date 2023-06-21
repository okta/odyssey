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
    isDisabled: {
      control: "boolean",
    },
    isInvalid: {
      control: "boolean",
    },
    label: {
      control: "text",
    },
    name: {
      control: "text",
    },
    value: {
      control: "text",
    },
  },
  args: {
    label: "Label",
    value: "Value",
  },
  decorators: [MuiThemeDecorator],
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
