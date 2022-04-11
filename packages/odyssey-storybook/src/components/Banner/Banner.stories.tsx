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

import React from "react";
import { Story } from "@storybook/react";
import { Banner as Source } from "../../../../odyssey-react/src";
import { Banner, BannerProps, Link } from "@okta/odyssey-react";
import BannerMdx from "./Banner.mdx";

export default {
  title: `Components/Banner`,
  component: Source,
  parameters: {
    layout: "fullscreen",
    docs: {
      page: BannerMdx,
    },
    actions: {
      argTypesRegex: null,
    },
  },
  args: {
    onDismiss: null,
    dismissButtonLabel: null,
  },
  argTypes: {
    children: {
      control: null,
    },
    heading: {
      defaultValue: "Banner heading",
      control: "text",
    },
    content: {
      defaultValue: "Additional string related to the heading.",
      control: null,
    },
    dismissButtonLabel: {
      control: "text",
    },
    open: {
      defaultValue: true,
    },
    onDismiss: {
      type: null,
      control: null,
    },
  },
};

const Template: Story<BannerProps> = (props) => {
  return (
    <Banner {...props}>
      <Link variant="monochrome" href="https://www.okta.com">
        Action Link
      </Link>
    </Banner>
  );
};

export const Info = Template.bind({});
Info.args = {
  variant: "info",
};

export const Danger = Template.bind({});
Danger.args = {
  variant: "danger",
};

export const Caution = Template.bind({});
Caution.args = {
  variant: "caution",
};

export const Dismissable = Template.bind({});
Dismissable.args = {
  dismissButtonLabel: "dismiss",
  onDismiss: () => {
    console.log("Banner: onDismiss!");
  },
};
