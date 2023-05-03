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

import { Banner, BannerProps } from "@okta/odyssey-react-mui";
import { Meta, StoryFn } from "@storybook/react";

import { MuiThemeDecorator } from "../../../../.storybook/components";
import BannerMdx from "./Banner.mdx";

const storybookMeta: Meta<typeof Banner> = {
  title: "MUI Components/Alerts/Banner",
  component: Banner,
  parameters: {
    docs: {
      page: BannerMdx,
    },
  },
  argTypes: {
    linkText: {
      control: "text",
    },
    linkUrl: {
      control: "text",
    },
    onClose: {
      action: "closed",
    },
    role: {
      control: "radio",
      options: ["status", undefined],
    },
    severity: {
      control: "radio",
      options: ["error", "info", "warning"],
      defaultValue: "info",
    },
    text: {
      control: "text",
      defaultValue: "The mission to Sagittarius A is set for January 7.",
    },
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

const Template: StoryFn<BannerProps> = (props) => <Banner {...props}></Banner>;

export const InfoBanner = Template.bind({});
InfoBanner.args = {
  severity: "info",
  text: "The mission to Sagittarius A is set for January 7.",
};

export const ErrorBanner = Template.bind({});
ErrorBanner.args = {
  role: "status",
  severity: "error",
  text: "An unidentified flying object compromised Hangar 18.",
};

export const WarningBanner = Template.bind({});
WarningBanner.args = {
  role: "status",
  severity: "warning",
  text: "Severe solar winds detected. Local system flights may be delayed.",
};

export const BannerWithLink = Template.bind({});
BannerWithLink.args = {
  linkText: "View report",
  linkUrl: "#anchor",
  role: "status",
  severity: "error",
  text: "An unidentified flying object compromised Hangar 18.",
};

export const DismissibleBanner = Template.bind({});
DismissibleBanner.args = {
  role: "status",
  severity: "warning",
};
