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

import { TopNav, TopNavProps } from "@okta/odyssey-react-mui/labs";
import { Meta, StoryObj } from "@storybook/react";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import { Button, SearchField } from "@okta/odyssey-react-mui";
import { UserIcon } from "@okta/odyssey-react-mui/icons";

const storybookMeta: Meta<TopNavProps> = {
  title: "Labs Components/TopNav",
  component: TopNav,
  argTypes: {
    hasLogo: {
      control: "boolean",
      description: "Show Okta Logo",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    SearchFieldComponent: {
      control: "ReactElement",
      description: "Display global search field",
      table: {
        type: {
          summary: "ReactElement (SearchField)",
        },
      },
    },
    topNavLinkItems: {
      description: "Array of links to be displayed in the top nav",
      table: {
        type: {
          summary: "Array<TopNavLinkItem>",
        },
      },
    },
    AdditionalNavItemComponent: {
      description:
        "Additional element to be displayed at the end of the top nav",
      table: {
        type: {
          summary: "ReactElement (Button)",
        },
      },
    },
    settingsLink: {
      description: "Display the settings icon/link",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    helpLink: {
      description: "Display the help icon/link",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    userProfile: {
      description: "Shows the logged in user account info",
      table: {
        type: {
          summary: "UserProfileProps",
        },
      },
    },
  },
  args: {
    hasLogo: true,
    SearchFieldComponent: (
      <SearchField label="Search" placeholder="Search..." />
    ),
    topNavLinkItems: [
      {
        id: "link-01",
        label: "Home",
        href: "/",
      },
      {
        id: "link-02",
        label: "Flows",
        href: "/",
      },
      {
        id: "link-03",
        label: "Connections",
        href: "/",
        isDisabled: true,
      },
      {
        id: "link-04",
        label: "Template",
        onClick: () => {},
      },
    ],
    AdditionalNavItemComponent: (
      <Button variant="secondary" label="Connect Builder" />
    ),
    settingsLink: "/",
    helpLink: "/",
    userProfile: {
      profileIcon: <UserIcon />,
      userName: "test.user@test.com",
      orgName: "ORG123",
    },
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

export const Default: StoryObj<TopNavProps> = {
  render: (props: TopNavProps) => {
    return <TopNav {...props} />;
  },
};
