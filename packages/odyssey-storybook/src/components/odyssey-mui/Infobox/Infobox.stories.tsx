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
import { Infobox, Link, Typography } from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import InfoboxMdx from "./Infobox.mdx";

export default {
  title: `MUI Components/Alerts/Infobox`,
  component: Infobox,
  parameters: {
    docs: {
      page: InfoboxMdx,
    },
  },
  argTypes: {
    children: {
      control: "text",
      defaultValue:
        "You are currently logged in from Moonbase Alpha-6, located on Luna.",
    },
    role: {
      control: "radio",
      options: ["alert", "status", null],
      defaultValue: null,
    },
    severity: {
      control: "radio",
      options: ["error", "info", "success", "warning"],
      defaultValue: "info",
    },
    title: {
      control: "string",
      defaultValue: "Moonbase Alpha-6",
    },
  },
  decorators: [MuiThemeDecorator],
};

const DefaultTemplate: Story = (args) => {
  return (
    <Infobox
      severity={args.severity}
      role={args.role}
      title={args.title}
      variant="infobox"
    >
      {args.children}
    </Infobox>
  );
};

export const Info = DefaultTemplate.bind({});
Info.args = {
  children:
    "You are currently logged in from Moonbase Alpha-6, located on Luna.",
  severity: "info",
  title: "Moonbase Alpha-6",
};

export const Error = DefaultTemplate.bind({});
Error.args = {
  children:
    "An issue has been discovered with your fuel mixture ratios. Please reconfigure your fuel mixture and perform safety checks again.",
  role: "alert",
  severity: "error",
  title: "Safety checks have failed",
};

export const Warning = DefaultTemplate.bind({});
Warning.args = {
  children:
    "Safety checks must be completed before this mission can be approved for launch.",
  role: "status",
  severity: "warning",
  title: "Safety checks incomplete",
};

export const Success = DefaultTemplate.bind({});
Success.args = {
  children:
    "Safety checks are complete, and this mission has been approved for launch.",
  role: "status",
  severity: "success",
  title: "Ready for lift-off",
};

export const BodyOnly = DefaultTemplate.bind({});
BodyOnly.args = {
  children:
    "You are currently logged in from Moonbase Alpha-6, located on Luna.",
  severity: "info",
  title: null,
};

export const InlineLink = DefaultTemplate.bind({});
InlineLink.args = {
  children: (
    <>
      An issue has been discovered with your fuel mixture ratios. Please{" "}
      <Link href="#" variant="monochrome">
        reconfigure your fuel mixture
      </Link>{" "}
      and perform safety checks again.
    </>
  ),
  role: "alert",
  severity: "error",
  title: "Safety checks have failed",
};

export const BlockLink = DefaultTemplate.bind({});
BlockLink.args = {
  children: (
    <>
      <Typography paragraph>
        An issue has been discovered with your fuel mixture ratios. Please
        reconfigure your fuel mixture and perform safety checks again.
      </Typography>

      <Link href="#" variant="monochrome">
        Visit fueling console
      </Link>
    </>
  ),
  role: "alert",
  severity: "error",
  title: "Safety checks have failed",
};
