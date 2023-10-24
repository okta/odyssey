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
      description: 'URL of the "Home" breadcrumb.',
      table: {
        type: {
          summary: "string",
        },
      },
    },
    maxVisibleItems: {
      control: "number",
      description:
        "The number of breadcrumbs displayed. Any additional breadcrumbs will be shown in a dropdown menu.",
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
    homeHref: "#home",
    maxVisibleItems: 4,
  },
  render: (args) => (
    <BreadcrumbList {...args}>
      <Breadcrumb href="#one">One</Breadcrumb>
      <Breadcrumb href="#two">Two</Breadcrumb>
      <Breadcrumb href="#three" iconName="user">
        Three
      </Breadcrumb>
      <Breadcrumb href="#four">Four</Breadcrumb>
      <Breadcrumb href="#five" iconName="group">
        Five
      </Breadcrumb>
      <Breadcrumb href="#six">Six</Breadcrumb>
      <Breadcrumb href="#seven">Seven</Breadcrumb>
      <Breadcrumb href="#eight">Eight</Breadcrumb>
      <Breadcrumb href="#nine">Nine</Breadcrumb>
      <Breadcrumb href="#ten">Ten</Breadcrumb>
    </BreadcrumbList>
  ),
};
