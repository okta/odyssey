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
import { useArgs } from '@storybook/client-api';
import Banner from ".";
import Link from '../Link';
import type { Props } from ".";

export default {
  title: `Components/Banner`,
  component: Banner,
  parameters:{
    layout: 'fullscreen',
  },
  argTypes: {
    children: {
      control: { type: null }
    },

    title: {
      defaultValue: "Banner title",
      control: { type: "text" }
    },
    content: {
      defaultValue: "Additional string related to the title.",
      control: { type: "text" }
    },
    visible: {
      defaultValue: true
    }
  }
};

const Template: Story<Props> = ({
  title = "Banner title",
  variant,
  content,
  dismissButtonLabel,
  visible,
  onDismiss
}) => {
  const [, updateArgs] = useArgs();
  let handleDismiss;

  if (onDismiss) {
    handleDismiss = () => {
      if (onDismiss) { onDismiss() }
      updateArgs({ visible: false })
    }
  }

  return (
    <Banner
      visible={visible}
      title={title}
      variant={variant}
      content={content}
      onDismiss={handleDismiss}
      dismissButtonLabel={dismissButtonLabel}
    >
      <Link href="https://www.okta.com">Action Link</Link>
    </Banner>
  )
};

export const Info = Template.bind({});
Info.args = {
  variant: "info",
  onDismiss: undefined
};

export const Danger = Template.bind({});
Danger.args = {
  variant: "danger",
  onDismiss: undefined
};

export const Caution = Template.bind({});
Caution.args = {
  variant: "caution",
  onDismiss: undefined
};

export const Dismissable = Template.bind({});
Dismissable.args = {
  onDismiss: () => { console.log('x') }
};
