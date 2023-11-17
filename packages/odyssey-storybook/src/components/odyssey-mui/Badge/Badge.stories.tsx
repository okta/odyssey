/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { Meta, StoryObj } from "@storybook/react";

import { MuiThemeDecorator } from "../../../../.storybook/components";
import { Badge, BadgeProps, badgeTypeValues } from "@okta/odyssey-react-mui";

const storybookMeta: Meta<BadgeProps> = {
  title: "MUI Components/Badge",
  component: Badge,
  argTypes: {
    type: {
      options: badgeTypeValues,
      control: { type: "radio" },
      type: {
        required: false,
        name: "other",
        value: "radio",
      },
      table: {
        defaultValue: {
          summary: "primary",
        },
      },
    },
    badgeContentMax: {
      control: { type: "number" },
      description:
        "The limit at which the badge will show '`{badgeContentMax}`+'. A number between 0-1000",
      table: {
        type: {
          summary: "number",
        },
        defaultValue: {
          summary: "999",
        },
      },
      type: {
        required: false,
        name: "number",
      },
    },
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

export const Primary: StoryObj<BadgeProps> = {
  args: {
    badgeContent: 8,
    type: "default",
  },
};

export const Default: StoryObj<BadgeProps> = {
  args: {
    badgeContent: 8,
    type: "attention",
  },
};

export const Error: StoryObj<BadgeProps> = {
  args: {
    badgeContent: 8,
    type: "danger",
  },
};
