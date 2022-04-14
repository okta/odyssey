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
import { useArgs } from "@storybook/client-api";
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
  },
  argTypes: {
    children: {
      control: null,
    },
    heading: {
      defaultValue: null,
      control: "text",
    },
    content: {
      defaultValue: "The mission to Sagitarius A has been set for January 7.",
      control: "text",
    },
    onDismiss: {
      defaultValue: false,
    },
    dismissButtonLabel: {
      defaultValue: "Dismiss banner",
      control: "text",
    },
    open: {
      defaultValue: true,
    },
  },
};

type OnDismissEvent = Parameters<NonNullable<BannerProps["onDismiss"]>>[number];

const Template: Story<BannerProps> = (props) => {
  const [, updateArgs] = useArgs();
  let dismissProps = {};

  if (props.onDismiss) {
    dismissProps = {
      onDismiss: (event: OnDismissEvent) => {
        if (typeof props.onDismiss === "function") {
          props.onDismiss(event);
        }
        updateArgs({ open: false });
      },
    };
  }

  return <Banner {...props} {...dismissProps} />;
};

export const Info = Template.bind({});
Info.args = {
  variant: "info",
};

export const Danger = Template.bind({});
Danger.args = {
  variant: "danger",
  content: "Hangar 18 has been compromised.",
};

export const Caution = Template.bind({});
Caution.args = {
  variant: "caution",
  content: "Severe solar winds detected. Local system flights may be delayed.",
};

export const WithTitle = Template.bind({});
WithTitle.args = {
  variant: "info",
  heading: "New launch scheduled",
};

export const WithLink = Template.bind({});
WithLink.args = {
  variant: "danger",
  content: "Hangar 18 has been compromised.",
  children: (
    <>
      <Link variant="monochrome" href="#">
        View report
      </Link>
    </>
  ),
};

export const Dismissable = Template.bind({});
Dismissable.args = {
  variant: "caution",
  content: "Severe solar winds detected. Local system flights may be delayed.",
  onDismiss: () => {
    console.log("Banner: onDismiss!");
  },
};
Dismissable.argTypes = {
  onDismiss: {
    control: { disable: false },
  },
  dismissButtonLabel: {
    control: { disable: false, type: "text" },
  },
};
