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

import { Meta, Story } from "@storybook/react";
import { Status, StatusProps } from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import StatusMdx from "./Status.mdx";

const storybookMeta: Meta<StatusProps> = {
  title: `MUI Components/Status`,
  component: Status,
  parameters: {
    docs: {
      page: StatusMdx,
    },
  },
  argTypes: {
    label: {
      control: "text",
      defaultValue: "Warp drive in standby",
    },
    severity: {
      control: "radio",
      options: ["default", "error", "info", "success", "warning"],
      defaultValue: "default",
    },
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

const DefaultTemplate: Story<StatusProps> = (args) => {
  return <Status label={args.label} severity={args.severity} />;
};

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Error = DefaultTemplate.bind({});
Error.args = {
  label: "Warp drive unstable",
  severity: "error",
};

export const Success = DefaultTemplate.bind({});
Success.args = {
  label: "Warp drive online",
  severity: "success",
};

export const Warning = DefaultTemplate.bind({});
Warning.args = {
  label: "Warp fuel low",
  severity: "warning",
};
