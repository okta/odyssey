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

import { TopNav, TopNavProps, UserProfile } from "@okta/odyssey-react-mui/labs";
import { Meta, StoryObj } from "@storybook/react";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import { Button, SearchField } from "@okta/odyssey-react-mui";
import { UserIcon } from "@okta/odyssey-react-mui/icons";

const storybookMeta: Meta<TopNavProps> = {
  title: "Labs Components/TopNav",
  component: TopNav,
  argTypes: {
    leftSideComponent: {
      control: "ReactElement",
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
  args: {
    leftSideComponent: <SearchField label="Search" placeholder="Search..." />,
    rightSideComponent: (
      <>
        <Button variant="secondary" label="Connect Builder" />

        <UserProfile
          profileIcon={<UserIcon />}
          orgName="ORG123"
          userName="test.user@test.com"
        />
      </>
    ),
    // topNavLinkItems: [
    //   {
    //     id: "link-01",
    //     label: "Home",
    //     href: "#none",
    //   },
    //   {
    //     id: "link-02",
    //     label: "Flows",
    //     href: "#none",
    //   },
    //   {
    //     id: "link-03",
    //     label: "Connections",
    //     href: "#none",
    //     isDisabled: true,
    //   },
    //   {
    //     id: "link-04",
    //     label: "Template",
    //     onClick: () => {},
    //   },
    // ],
  },
  decorators: [MuiThemeDecorator],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default storybookMeta;

export const Default: StoryObj<TopNavProps> = {
  render: (props: TopNavProps) => {
    return <TopNav {...props} />;
  },
};
