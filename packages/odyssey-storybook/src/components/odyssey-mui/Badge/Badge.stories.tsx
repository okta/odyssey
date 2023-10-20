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
import { Badge, BadgeProps } from "@okta/odyssey-react-mui";

const storybookMeta: Meta<BadgeProps> = {
  title: "MUI Components/Badge",
  component: Badge,
  argTypes: {
    children: {
      control: null,
      description:
        "The content of the component, whether text or other components.",
      table: {
        type: {
          summary: "ReactNode",
        },
      },
    },
  },
  args: {
    children: "This is the tab content. This tab happens to be about stars.",
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

export const Single: StoryObj<BadgeProps> = {
  args: {
    children: "This is the content of the box.",
  },
};
