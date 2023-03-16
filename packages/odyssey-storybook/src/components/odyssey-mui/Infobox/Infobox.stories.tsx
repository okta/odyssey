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
      defaultValue: undefined,
    },
  },
  decorators: [MuiThemeDecorator],
};

const DefaultTemplate: Story = (args) => {
  return (
    <Infobox severity={args.severity} role={args.role} title={args.title}>
      {args.children}
    </Infobox>
  );
};

export const Info = DefaultTemplate.bind({});
Info.args = {
  children: "You're signed in from Moonbase Alpha-6, located on Luna.",
  severity: "info",
};

export const Error = DefaultTemplate.bind({});
Error.args = {
  children:
    "Reconfigure the fuel mixture ratios and perform safety checks again.",
  role: "alert",
  severity: "error",
  title: "Safety checks failed",
};

export const Warning = DefaultTemplate.bind({});
Warning.args = {
  children:
    "Complete all safety checks before requesting approval to launch your mission.",
  role: "status",
  severity: "warning",
  title: "Safety checks incomplete",
};

export const Success = DefaultTemplate.bind({});
Success.args = {
  children: "Safety checks are complete. Your mission is ready for liftoff.",
  role: "status",
  severity: "success",
  title: "Approved for launch",
};

export const InlineLink = DefaultTemplate.bind({});
InlineLink.args = {
  children: (
    <>
      Your fuel mixture ratios need to be{" "}
      <Link href="#" variant="monochrome">
        reconfigured
      </Link>
      . Then, rerun all safety checks.
    </>
  ),
  role: "alert",
  severity: "error",
  title: "Safety checks failed",
};

export const BlockLink = DefaultTemplate.bind({});
BlockLink.args = {
  children: (
    <>
      <Typography paragraph>
        There is an issue with the fuel mixture ratios. Reconfigure the fuel
        mixture and perform the safety checks again.
      </Typography>

      <Link href="#" variant="monochrome">
        Visit fueling console
      </Link>
    </>
  ),
  role: "alert",
  severity: "error",
  title: "Safety checks failed",
};
