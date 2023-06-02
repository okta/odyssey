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
import { Status, StatusProps } from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

const storybookMeta: Meta<StatusProps> = {
  title: "MUI Components/Status",
  component: Status,
  argTypes: {
    label: {
      control: "text",
    },
    severity: {
      control: "radio",
      options: ["default", "error", "info", "success", "warning"],
    },
    indicator: {
      control: "radio",
      options: ["lamp", "pill"],
    },
  },
  args: {
    indicator: "lamp",
    label: "Warp drive in standby",
    severity: "default",
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

export const DefaultLamp: StoryObj<StatusProps> = {
  args: {
    label: "Warp drive in standby",
  },
};

export const ErrorLamp: StoryObj<StatusProps> = {
  args: {
    label: "Warp drive unstable",
    severity: "error",
  },
};

export const SuccessLamp: StoryObj<StatusProps> = {
  args: {
    label: "Warp drive online",
    severity: "success",
  },
};

export const WarningLamp: StoryObj<StatusProps> = {
  args: {
    label: "Warp fuel low",
    severity: "warning",
  },
};

export const DefaultPill: StoryObj<StatusProps> = {
  args: {
    label: "Warp drive in standby",
    indicator: "pill",
  },
};

export const ErrorPill: StoryObj<StatusProps> = {
  args: {
    label: "Warp drive unstable",
    severity: "error",
    indicator: "pill",
  },
};

export const SuccessPill: StoryObj<StatusProps> = {
  args: {
    label: "Warp drive online",
    severity: "success",
    indicator: "pill",
  },
};

export const WarningPill: StoryObj<StatusProps> = {
  args: {
    label: "Warp fuel low",
    severity: "warning",
    indicator: "pill",
  },
};
