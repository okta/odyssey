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

import { Meta, StoryObj } from "@storybook/react";
import {
  CircularProgress,
  CircularProgressProps,
} from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

const storybookMeta: Meta<CircularProgressProps> = {
  title: "MUI Components/Circular Progress",
  component: CircularProgress,
  argTypes: {
    value: {
      control: { type: "number" },
    },
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

export const Indeterminate: StoryObj<CircularProgressProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "If the component `value` is undefined or `0`, the component will spin indefinitely.",
      },
    },
  },
  args: {
    ariaLabel: "progress",
  },
};

export const Determinate: StoryObj<CircularProgressProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "If the component has a set `value`, it will show as a static circular progress bar with that value filled as a percentage.",
      },
    },
  },
  args: {
    value: 70,
    ariaLabel: "progress",
  },
};
