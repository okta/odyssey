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

import { Story } from "@storybook/react";
import { Alert, Link } from "@mui/material";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import BannerMdx from "./Banner.mdx";

export default {
  title: `MUI Components/Alerts/Banner`,
  component: Alert,
  parameters: {
    docs: {
      page: BannerMdx,
    },
  },
  argTypes: {
    content: {
      control: "text",
      defaultValue: "The mission to Sagitarius A has been set for January 7.",
    },
    onClose: {
      control: "text",
      defaultValue: null,
    },
    role: {
      control: "radio",
      options: ["status", null],
      defaultValue: null,
    },
    severity: {
      control: "radio",
      options: ["error", "info", "warning"],
      defaultValue: "info",
    },
  },
  decorators: [MuiThemeDecorator],
};

const DefaultTemplate: Story = (args) => {
  const {} = args;
  return (
    <Alert
      severity={args.severity}
      role={args.role}
      variant="banner"
      onClose={args.onClose}
    >
      {args.content}
    </Alert>
  );
};

export const Info = DefaultTemplate.bind({});
Info.args = {};

export const Error = DefaultTemplate.bind({});
Error.args = {
  content: "Hangar 18 has been compromised.",
  role: "status",
  severity: "error",
};

export const Warning = DefaultTemplate.bind({});
Warning.args = {
  content: "Severe solar winds detected. Local system flights may be delayed.",
  role: "status",
  severity: "warning",
};

export const WithLink = DefaultTemplate.bind({});
WithLink.args = {
  content: (
    <>
      Hangar 18 has been compromised.
      <Link href="#anchor" variant="monochrome">
        View report
      </Link>
    </>
  ),
  role: "status",
  severity: "error",
};

export const Dismissible = DefaultTemplate.bind({});
Dismissible.args = {
  onClose: `{() => {}}`,
  severity: "warning",
  role: "status",
};
