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
import { useArgs } from "@storybook/client-api";
import { Banner } from ".";
import Link from "../Link";
import type { BannerProps } from ".";

export default {
  title: `Components/Banner`,
  component: Banner,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    children: {
      control: null,
    },
    title: {
      defaultValue: "Banner title",
      control: "text",
    },
    content: {
      defaultValue: "Additional string related to the title.",
      control: null,
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

  return (
    <Banner {...props} {...dismissProps}>
      <Link variant="secondary" href="https://www.okta.com">
        Action Link
      </Link>
    </Banner>
  );
};

export const Info = Template.bind({});
Info.args = {
  variant: "info",
  dismissButtonLabel: undefined,
  onDismiss: undefined,
};

export const Danger = Template.bind({});
Danger.args = {
  variant: "danger",
  dismissButtonLabel: undefined,
  onDismiss: undefined,
};

export const Caution = Template.bind({});
Caution.args = {
  variant: "caution",
  dismissButtonLabel: undefined,
  onDismiss: undefined,
};

export const Dismissable = Template.bind({});
Dismissable.args = {
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
