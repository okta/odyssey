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

import type { Meta, StoryObj } from "@storybook/react";

import { PageHeader } from "@okta/odyssey-contributions-workflows-components";
import { action } from "@storybook/addon-actions";

import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";
import { WorkflowsComponentsStorybookThemeDecorator } from "../../tools/WorkflowsComponentsStorybookThemeDecorator.js";

const meta = {
  component: PageHeader,
  decorators: [
    OdysseyStorybookThemeDecorator,
    WorkflowsComponentsStorybookThemeDecorator,
  ],
  tags: ["autodocs"],
  argTypes: {
    buttonLabel: {
      control: "text",
    },
    buttonVariant: {
      control: "text",
    },
    headingText: {
      control: "text",
    },
    isLookAndFeelEnabled: {
      control: "boolean",
    },
    isResourceCreator: {
      control: "boolean",
    },
    onCreateResource: {
      action: true,
      description: "Callback fired when the button is clicked.",
      table: { type: { summary: "(() => void)" } },
    },
    resourceDescription: {
      control: "text",
    },
    resourceType: {
      control: "text",
    },
  },
  args: {
    buttonLabel: "Create Resource",
    headingText: "Header",
    isLookAndFeelEnabled: true,
  },
} satisfies Meta<typeof PageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isResourceCreator: true,
    onCreateResource: action("onCreateResource"),
    resourceDescription: "Lorem ipsum.",
  },
};
