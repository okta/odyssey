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

import {
  Breadcrumb,
  BreadcrumbList,
  type BreadcrumbsProps,
} from "@okta/odyssey-react-mui";
import type { Meta, StoryObj } from "@storybook/react";

import { MuiThemeDecorator } from "../../../../.storybook/components";
import { UserIcon, GroupIcon } from "@okta/odyssey-react-mui/icons";

const storybookMeta: Meta<BreadcrumbsProps> = {
  title: "Labs Components/Breadcrumbs",
  component: BreadcrumbList,
  argTypes: {
    children: {
      control: "object",
      description: "Multiple Breadcrumb components.",
      table: {
        type: {
          summary: "Breadcrumb",
        },
      },
    },
    homeHref: {
      control: "text",
      description: "The destination of the home breadcrumb",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    maxItemsCount: {
      control: "number",
      description:
        "The number of breadcrumbs displayed. Any additional breadcrumbs will be shown in a menu.",
      table: {
        type: {
          summary: "number",
        },
      },
    },
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

export const Default: StoryObj<BreadcrumbsProps> = {
  args: {
    homeHref: "#",
    maxItemsCount: 4,
  },
  render: (args) => (
    <BreadcrumbList {...args}>
      <Breadcrumb href="#">One</Breadcrumb>
      <Breadcrumb href="#">Two</Breadcrumb>
      <Breadcrumb href="#" startIcon={<UserIcon />}>
        Three
      </Breadcrumb>
      <Breadcrumb href="#">Four</Breadcrumb>
      <Breadcrumb href="#" startIcon={<GroupIcon />}>
        Five
      </Breadcrumb>
      <Breadcrumb href="#">Six</Breadcrumb>
      <Breadcrumb href="#">Seven</Breadcrumb>
      <Breadcrumb href="#">Eight</Breadcrumb>
      <Breadcrumb href="#">Nine</Breadcrumb>
      <Breadcrumb href="#" isCurrent>
        Ten
      </Breadcrumb>
    </BreadcrumbList>
  ),
};
