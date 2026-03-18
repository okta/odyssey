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

import * as odysseyDesignTokens from "@okta/odyssey-design-tokens";
import { Button, SearchField } from "@okta/odyssey-react-mui";
import { UserIcon } from "@okta/odyssey-react-mui/icons";
import { UserProfile } from "@okta/odyssey-react-mui/labs";
import { TopNav } from "@okta/odyssey-react-mui/ui-shell";
import { Meta, StoryObj } from "@storybook/react-vite";

import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";

const meta = {
  component: TopNav,
  decorators: [OdysseyStorybookThemeDecorator],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    leftSideComponent: {
      control: undefined,
      description: "Display global search field",
      table: {
        type: {
          summary: "ReactElement",
        },
      },
    },
    rightSideComponent: {
      description:
        "Additional element to be displayed at the end of the top nav",
      table: {
        type: {
          summary: "ReactElement",
        },
      },
    },
  },
} satisfies Meta<typeof TopNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    leftSideComponent: <SearchField label="Search" placeholder="Search..." />,
    rightSideComponent: (
      <div
        style={{
          display: "flex",
          gap: odysseyDesignTokens.Spacing5,
        }}
      >
        <Button label="Connect Builder" variant="secondary" />

        <UserProfile
          orgName="ORG123"
          profileIcon={<UserIcon />}
          userName="test.user@test.com"
        />
      </div>
    ),
  },
};
