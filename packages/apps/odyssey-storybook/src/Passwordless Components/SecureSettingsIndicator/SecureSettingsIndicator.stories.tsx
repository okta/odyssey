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

import { SecureSettingsIndicator } from "@okta/odyssey-contributions-passwordless-components";
import { Meta, StoryObj } from "@storybook/react-vite";

import { PasswordlessComponentsOdysseyStorybookThemeDecorator } from "../../tools/PasswordlessComponentsOdysseyStorybookThemeDecorator.js";

const meta = {
  component: SecureSettingsIndicator,
  decorators: [PasswordlessComponentsOdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  argTypes: {
    level: {
      control: { type: "select" },
      options: ["more", "most"],
      description:
        "The security level to display. 'more' shows text only, 'most' shows icon + text",
      table: {
        type: {
          summary: '"more" | "most"',
        },
      },
      type: {
        required: true,
        name: "other",
        value: '"more" | "most"',
      },
    },
  },
} satisfies Meta<typeof SecureSettingsIndicator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MoreSecure: Story = {
  args: {
    level: "more",
  },
};

export const MostSecure: Story = {
  args: {
    level: "most",
  },
};
