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

import { Meta, StoryObj } from "@storybook/react";
import {
  CircularProgress,
  CircularProgressProps,
} from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const storybookMeta: Meta<CircularProgressProps> = {
  title: "MUI Components/Circular Progress",
  component: CircularProgress,
  argTypes: {
    value: {
      control: { type: "number" },
      defaultValue: undefined,
    },
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

export const Indeterminate: StoryObj<CircularProgressProps> = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const el = canvas.getByRole("progressbar");
    await expect(el).toHaveAccessibleName();
  },
};

export const Determinate: StoryObj<CircularProgressProps> = {
  args: {
    value: 70,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const el = canvas.getByRole("progressbar");
    await expect(el).toHaveAccessibleName();
  },
};
