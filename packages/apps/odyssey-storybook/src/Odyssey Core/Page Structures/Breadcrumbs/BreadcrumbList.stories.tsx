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

import { Breadcrumb, BreadcrumbList } from "@okta/odyssey-react-mui";
import { action } from "storybook/actions";
import { expect, within } from "storybook/test";

import { OdysseyStorybookThemeDecorator } from "../../../tools/OdysseyStorybookThemeDecorator.js";

const storybookMeta: Meta<typeof BreadcrumbList> = {
  component: BreadcrumbList,
  decorators: [OdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "`BreadcrumbList` arranges [Breadcrumb](../?path=/docs/odyssey-core-page-structures-breadcrumbs-breadcrumb--docs) items to describe the user's location. Use these components together to ensure correct styling and accessibility behavior.",
      },
    },
  },
  argTypes: {
    children: {
      control: false,
      description:
        "Multiple Breadcrumb components. See [Breadcrumb](../?path=/docs/odyssey-core-page-structures-breadcrumbs-breadcrumb--docs) for usage and available props",
      table: {
        category: "Visual",
        type: {
          summary: "Breadcrumb",
        },
      },
    },
    homeHref: {
      control: "text",
      description:
        'URL used for the automatically rendered "Home" breadcrumb with icon',
      table: {
        category: "Visual",
        type: {
          summary: "string",
        },
      },
    },
    maxVisibleItems: {
      control: { type: "number" },
      description:
        "Number of breadcrumbs shown before older ones collapse into the overflow menu",
      table: {
        category: "Visual",
        type: {
          summary: "number",
        },
        defaultValue: {
          summary: "5",
        },
      },
    },
    testId: {
      control: "text",
      description:
        "Adds a legacy `data-se` attribute. Prefer semantic queries in new tests",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
    },
    translate: {
      control: { type: "radio" },
      options: ["yes", "no"],
      description:
        "Sets the HTML `translate` attribute to opt the breadcrumb trail in or out of machine translation",
      table: {
        category: "Functional",
        type: {
          summary: '"yes" | "no"',
        },
      },
    },
  },
  args: {
    maxVisibleItems: 5,
  },
};

export default storybookMeta;

type BreadcrumbListStory = StoryObj<typeof BreadcrumbList>;

export const Default: BreadcrumbListStory = {
  args: {
    homeHref: "#home",
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
  play: async ({ canvasElement, step }) => {
    await step("Breadcrumbs Home Link", ({ args }) => {
      const canvas = within(canvasElement);
      const box = canvas.getByLabelText("Home");
      expect(box).toHaveAttribute("href", args.homeHref);
    });
  },
};

export const Truncation: BreadcrumbListStory = {
  args: {
    homeHref: "#home",
  },
  render: (args) => (
    <BreadcrumbList {...args}>
      <Breadcrumb href="#one">
        This is a very long title that should be truncated
      </Breadcrumb>
      <Breadcrumb href="#two">Two</Breadcrumb>
      <Breadcrumb href="#three" iconName="user">
        This is a very long title with an icon
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

export const Simple: BreadcrumbListStory = {
  args: {
    children: [
      <Breadcrumb href="#one" key="one">
        One
      </Breadcrumb>,
      <Breadcrumb href="#two" key="two">
        Two
      </Breadcrumb>,
    ],
  },
  render: (args) => <BreadcrumbList {...args} />,
};

export const WithOnClick: BreadcrumbListStory = {
  args: {
    homeHref: "#home",
  },
  render: (args) => (
    <BreadcrumbList {...args}>
      <Breadcrumb onClick={action("onClick")}>One</Breadcrumb>
      <Breadcrumb href="#two">Two</Breadcrumb>
    </BreadcrumbList>
  ),
};

export const Subordinate: BreadcrumbListStory = {
  args: {
    homeHref: "#home",
  },
  render: (args) => (
    <BreadcrumbList {...args}>
      <Breadcrumb>One</Breadcrumb>
      <Breadcrumb href="#two">Two</Breadcrumb>
      <Breadcrumb href="#three">Three</Breadcrumb>
    </BreadcrumbList>
  ),
};
