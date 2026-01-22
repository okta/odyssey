/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { ListSubheader } from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react-vite";

import { OdysseyStorybookThemeDecorator } from "../../../../tools/OdysseyStorybookThemeDecorator.js";

Object.assign(ListSubheader, { displayName: "ListSubheader" });

const storybookMeta = {
  component: ListSubheader,
  decorators: [OdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
    },
  },
  args: {
    children: "Subheader label",
  },
  parameters: {
    docs: {
      description: {
        component:
          "`ListSubheader` groups related menu items within `MenuButton`. It is not supported outside of the menu context.",
      },
    },
  },
} satisfies Meta<typeof ListSubheader>;

export default storybookMeta;

type Story = StoryObj<typeof ListSubheader>;

export const Default: Story = {
  render: (args) => (
    <ul>
      <ListSubheader {...args} />
    </ul>
  ),
};
