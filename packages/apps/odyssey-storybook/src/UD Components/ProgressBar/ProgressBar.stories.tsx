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

import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProgressBar } from "@okta/odyssey-contributions-ud-components";

import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";
import { UDComponentsStorybookThemeDecorator } from "../../tools/UDComponentsStorybookThemeDecorator.js";

const meta = {
  component: ProgressBar,
  decorators: [
    OdysseyStorybookThemeDecorator,
    UDComponentsStorybookThemeDecorator,
  ],
  tags: ["autodocs"],
  argTypes: {
    ariaLabel: {
      control: "text",
      description: "progress bar",
    },
    value: {
      control: "number",
      description: "Current progress value",
    },
    max: {
      control: "number",
      description: "Maximum progress value",
    },
    size: {
      control: "select",
      options: ["small", "large"],
      description: "Size of the progress bar",
    },
    title: {
      control: "text",
      description: "Title for the progress bar",
    },
    description: {
      control: "text",
      description: "Description text for the progress bar",
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ariaLabel: "Progress Bar",
    value: 80,
    max: 100,
    size: "small",
    title: "Progress Title",
    description: "This is a progress bar showing completion status",
  },
};
